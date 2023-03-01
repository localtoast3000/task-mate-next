import { BasicBtn } from '@/components/shared/buttons/buttons';
import styles from './new-task-btn.module.css';
import { PlusIcon } from '@/components/shared/icons/icons';
import TaskFormModal from '../task-form-modal/task-form-modal';
import { useState } from 'react';

export default function NewTaskBtn({ colors, ...props }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal ? <TaskFormModal onCloseClick={() => setShowModal(false)}/> : <></>}
      <BasicBtn
        onClick={() => setShowModal(true)}
        className={styles.btn}
        {...props}
        style={{
          backgroundColor: colors({
            light: 'prime-500',
            dark: 'gs-50',
          }),
          fill: colors({
            light: 'gs-50',
            dark: 'gs-900',
          }),
        }}>
        <PlusIcon className={styles.plusIcon} />
      </BasicBtn>
    </>
  );
}
