import Modal from '@/components/shared/modal/modal';
import { useTheme } from '@/hooks/theme/theme';
import styles from './task-form-modal.module.css';
import CloseIcon from '@/components/shared/icons/close';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postData, getData } from '@/util/backend-requests';
import { BasicBtn } from '@/components/shared/buttons/buttons';
import { Input, SubmitBtn } from '@/components/shared/form/form';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, loadTasks } from '@/reducers/users';
import { addYears, endOfDay } from 'date-fns';
import { DatePicker, TimePicker } from './pickers/pickers';
import {
  CalenderIcon,
  ClockIcon,
  PencilIcon,
  RightArrowIcon,
} from '@/components/shared/icons/icons';

const validationSchema = yup
  .object({
    details: yup.string().required(),
    ends: yup.string().required(),
  })
  .required();

export default function TaskFormModal({
  onCloseClick,
  dateTime = new Date(),
  description = '',
}) {
  const { colors } = useTheme();
  const [tab, setTab] = useState('date');
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    ends: dateTime,
    description,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const inputColors = {
    text: colors({
      light: 'gs-900',
      dark: 'gs-50',
    }),
    label: colors({
      light: 'gs-600',
      dark: 'gs-600',
    }),
    unFocused: colors({
      light: 'gs-600',
      dark: 'gs-600',
    }),
    focused: colors({
      light: 'prime-600',
      dark: 'prime-300',
    }),
    error: colors({
      light: 'triad-b-500',
      dark: 'triad-a-200',
    }),
  };

  const inputFonts = {
    text: 'var(--prime-font)',
    label: 'var(--prime-font)',
  };

  const dateLimits = { min: new Date(), max: endOfDay(addYears(new Date(), 10)) };

  return (
    <Modal
      style={{
        backgroundColor: colors({
          light: 'ts-1200',
          dark: 'ts-1300',
        }),
      }}>
      <div
        className={styles.modal}
        style={{
          backgroundColor: colors({
            light: 'gs-50',
            dark: 'gs-900',
          }),
        }}>
        <Tabs
          onCloseClick={onCloseClick}
          selectedTab={setTab}
          currentTab={tab}
          colors={colors}
        />
        <form
          className={styles.form}
          onSubmit={(e) => e.preventDefault()}>
          {tab === 'date' && (
            <DatePicker
              colors={{
                activeBackground: colors({ light: 'prime-500', dark: 'prime-500' }),
                activeText: colors({ light: 'gs-50', dark: 'gs-50' }),
                inactiveBackground: colors({ light: 'ts-500', dark: 'ts-500' }),
                inactiveText: colors({ light: 'gs-500', dark: 'gs-500' }),
                defaultBackground: colors({ light: 'gs-300', dark: 'gs-300' }),
                defaultText: colors({ light: 'gs-700', dark: 'gs-500' }),
              }}
              initialDate={formValues.ends}
              minDate={dateLimits.min}
              maxDate={dateLimits.max}
              onChange={(ends) => setFormValues({ ...formValues, ends })}
            />
          )}
          {tab === 'time' && (
            <TimePicker
              colors={{
                activeBackground: colors({ light: 'prime-500', dark: 'prime-500' }),
                activeText: colors({ light: 'gs-50', dark: 'gs-50' }),
                inactiveBackground: colors({ light: 'ts-500', dark: 'ts-500' }),
                inactiveText: colors({ light: 'gs-500', dark: 'gs-500' }),
                defaultBackground: colors({ light: 'gs-300', dark: 'gs-300' }),
                defaultText: colors({ light: 'gs-700', dark: 'gs-500' }),
              }}
              initialDate={formValues.ends}
              // minTime={dateLimits.min}
              // maxTime={dateLimits.max}
              onChange={(ends) => setFormValues({ ...formValues, ends })}
            />
          )}
          {tab === 'task' && (
            <Input
              name='details'
              label='Task'
              type='text'
              multiline
              className={styles.input}
              wrapperClass={styles.inputWrapper}
              control={control}
              error={formValues.description.length < 1 && true}
              variant='standard'
              defaultValue={formValues.description}
              onChange={(e) =>
                setFormValues({ ...formValues, description: e.target.value })
              }
              helperText={formValues.description.length < 1 && 'Task is required'}
              colors={inputColors}
              fonts={inputFonts}
            />
          )}
          <div className={styles.bottomContainer}>
            {tab !== 'task' ? (
              <BasicBtn
                type='button'
                onClick={() => {
                  if (tab === 'date') setTab('time');
                  if (tab === 'time') setTab('task');
                }}
                className={styles.nextBtn}>
                <RightArrowIcon
                  className={styles.nextIcon}
                  style={{ fill: colors({ light: 'gs-700', dark: 'gs-500' }) }}
                />
              </BasicBtn>
            ) : (
              <BasicBtn
                className={styles.okBtn}
                type='submit'
                style={{
                  color: colors({
                    light: 'prime-500',
                    dark: 'prime-500',
                  }),
                }}
                onClick={async (e) => {
                  e.preventDefault();
                  if (formValues.description.length < 1 || !formValues.ends) return;
                  const res = await postData(
                    '/tasks/add',
                    {
                      ...formValues,
                      completed: false,
                    },
                    {
                      Authorization: `Bearer ${user.token}`,
                    }
                  );
                  if (res.error) return console.log(res.error);
                  const tasksData = await getData('/tasks', {
                    Authorization: `Bearer ${user.token}`,
                  });
                  if (tasksData.error) return console.log(tasksData.error);
                  console.log(tasksData);
                  dispatch(loadTasks(tasksData.tasks));
                  onCloseClick();
                }}>
                OK
              </BasicBtn>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}

function Tabs({ onCloseClick, colors, selectedTab, currentTab }) {
  const selectedStyles = {
    fill: colors({
      light: 'prime-500',
      dark: 'prime-500',
    }),
  };
  const defaultStyles = {
    fill: colors({
      light: 'gs-900',
      dark: 'gs-50',
    }),
  };

  return (
    <div className={styles.tabsBar}>
      <div className={styles.tabsWrapper}>
        <BasicBtn
          className={styles.tabBtn}
          onClick={() => selectedTab('date')}>
          <CalenderIcon
            className={styles.tabIcon}
            style={currentTab === 'date' ? selectedStyles : defaultStyles}
          />
        </BasicBtn>
        <BasicBtn
          className={styles.tabBtn}
          onClick={() => selectedTab('time')}>
          <ClockIcon
            className={styles.tabIcon}
            style={currentTab === 'time' ? selectedStyles : defaultStyles}
          />
        </BasicBtn>
        <BasicBtn
          className={styles.tabBtn}
          onClick={() => selectedTab('task')}>
          <PencilIcon
            className={styles.tabIcon}
            style={currentTab === 'task' ? selectedStyles : defaultStyles}
          />
        </BasicBtn>
      </div>
      <CloseIcon
        className={styles.closeIcon}
        style={{
          fill: colors({
            light: 'gs-700',
            dark: 'gs-500',
          }),
        }}
        onMouseLeave={(e) =>
          (e.target.style.fill = colors({
            light: 'gs-700',
            dark: 'gs-500',
          }))
        }
        onMouseEnter={(e) =>
          (e.target.style.fill = colors({
            light: 'triad-b-500',
            dark: 'triad-a-200',
          }))
        }
        onClick={() => onCloseClick()}
      />
    </div>
  );
}
