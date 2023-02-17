import Modal from '@/components/shared/modal/modal';
import { useTheme } from '@/hooks/theme/theme';
import { color } from '@mui/system';
import styles from './edit-modal.module.css';
import CloseIcon from '@/components/shared/icons/close';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postData } from '@/util/backend-requests';
import { Input, SubmitBtn } from '@/components/shared/form/form';
import { useDispatch } from 'react-redux';
import { mountUser } from '@/reducers/users';

const validationSchema = yup
  .object({
    details: yup.string().required(),
    ends: yup.string().required(),
  })
  .required();

export default function EditModal({ onCloseClick }) {
  const { colors } = useTheme();

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
        <form
          className={styles.form}
          onSubmit={handleSubmit(async ({ details, ends }) => {
            const res = await postData('/tasks/update', {
              details: details.replace(details[0], details[0].toUpperCase()).trim(),
              ends,
            });
            // if (res.error) return setUserExistsError(true);
            // setUserExistsError(false);
          })}>
          <Input
            name='details'
            label='Task'
            type='text'
            className={styles.input}
            wrapperClass={styles.inputWrapper}
            control={control}
            error={errors.details && true}
            variant='standard'
            helperText={
              errors.details?.type &&
              (() => {
                const type = errors.details.type;
                if (type === 'required' || type === 'optionality')
                  return 'Task is required';
              })()
            }
            colors={inputColors}
            fonts={inputFonts}
          />

          <SubmitBtn
            style={{
              backgroundColor: colors({
                light: 'prime-700',
                dark: 'prime-400',
              }),
              boxShadow: `0px 3px 3px ${colors({
                light: 'prime-900',
                dark: 'prime-900',
              })}`,
              color: colors({
                light: 'gs-50',
                dark: 'gs-50',
              }),
            }}
            className={styles.submitBtn}>
            Submit
          </SubmitBtn>
        </form>
      </div>
    </Modal>
  );
}
