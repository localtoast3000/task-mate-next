import TaskFormModal from '@/components/pages/dashboard/task-form-modal/task-form-modal';

export default function EditModal({ onCloseRequest, ...props }) {
  return (
    <TaskFormModal
      type='edit'
      onCloseRequest={onCloseRequest}
      {...props}
    />
  );
}
