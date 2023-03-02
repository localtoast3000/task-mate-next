import styles from './task.module.css';
import EditModal from './edit/edit-modal';
import { useState } from 'react';
import DateTime from '@/util/date-time';

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

  return (
    <>
      {editing ? (
        <EditModal
          onCloseClick={() => setEditing(false)}
          dateTime={dateTime.dateTime}
          description={props.description}
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
        <EditIcon
          className={styles.editIcon}
          style={iconStyle}
          onClick={() => setEditing(true)}
        />
      </article>
    </>
  );
}

function EditIcon({ className = '', style = {}, ...props }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 96 960 960'
      style={style}
      {...props}>
      <path d='M180 1044q-24 0-42-18t-18-42V384q0-24 18-42t42-18h405l-60 60H180v600h600V636l60-60v408q0 24-18 42t-42 18H180Zm300-360Zm182-352 43 42-285 284v86h85l286-286 42 42-303 304H360V634l302-302Zm171 168L662 332l100-100q17-17 42.311-17T847 233l84 85q17 18 17 42.472T930 402l-97 98Z' />
    </svg>
  );
}
