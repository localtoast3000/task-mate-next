import TaskFormModal from '@/components/pages/dashboard/task-form-modal/task-form-modal';

export default function EditModal({ onCloseClick, ...props }) {
  return (
    <TaskFormModal
      onCloseClick={onCloseClick}
      {...props}
    />
  );
}
