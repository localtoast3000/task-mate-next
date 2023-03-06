import styles from './task.module.css';
import EditModal from './edit/edit-modal';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, loadTasks } from '@/reducers/users';
import DateTime from '@/util/date-time';
import { deleteData, getData } from '@/util/backend-requests';
import { BasicBtn } from '@/components/shared/buttons/buttons';
import { EditIcon, BinIcon } from '@/components/shared/icons/icons';
import { useTheme } from '@/hooks/theme/theme';

export default function Task({
  style = {},
  idStyle = {},
  headerStyle = {},
  textStyle = {},
  iconStyle = {},
  ...props
}) {
  const [editing, setEditing] = useState(false);
  const dateTime = new DateTime(props.ends);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <>
      {editing ? (
        <EditModal
          onCloseRequest={() => setEditing(false)}
          task={{
            id: props.id,
            ends: dateTime.dateTime,
            description: props.description,
          }}
        />
      ) : (
        <></>
      )}
      <article
        className={styles.taskContainer}
        style={style}>
        <div
          className={styles.id}
          style={idStyle}>
          {props.description[0].toUpperCase()}
        </div>
        <div className={styles.textContainer}>
          <div className={styles.dateTime}>
            <div className={styles.textWrapper}>
              <p style={headerStyle}>Date: </p>
              <p style={textStyle}>{dateTime.formatedDate}</p>
            </div>
            <div className={styles.textWrapper}>
              <p style={headerStyle}>Time: </p>
              <p style={textStyle}>{dateTime.formatedTime}</p>
            </div>
          </div>
          <p style={textStyle}>{props.description}</p>
        </div>
        <div className={styles.controlBtnsContainer}>
          <BasicBtn
            className={styles.editBtn}
            onClick={() => setEditing(true)}>
            <EditIcon
              className={styles.editIcon}
              style={iconStyle}
            />
          </BasicBtn>
          <BasicBtn
            type='button'
            className={styles.deleteBtn}
            onClick={async () => {
              await deleteData(`/tasks/?id=${props.id}`, null, {
                Authorization: `Bearer ${user.token}`,
              });
              let tasksRes = await getData('/tasks', {
                Authorization: `Bearer ${user.token}`,
              });
              tasksRes = await tasksRes.json();
              if (tasksRes.status >= 300) {
                tasksRes = await getData('/tasks', {
                  Authorization: `Bearer ${user.token}`,
                });
              }
              dispatch(loadTasks(tasksRes.tasks));
            }}>
            <BinIcon
              className={styles.binIcon}
              style={{
                fill: colors({
                  light: 'triad-b-600',
                  dark: 'triad-a-300',
                }),
              }}
            />
          </BasicBtn>
        </div>
      </article>
    </>
  );
}
