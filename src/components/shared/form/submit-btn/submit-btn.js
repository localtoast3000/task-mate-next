import styles from './submit-btn.module.css';

export default function SubmitBtn({ className, onClick, children, ...props }) {
  return (
    <button
      type='submit'
      className={`${styles.btn} ${className}`}
      {...props}
      onClick={(e) => {
        if (typeof onClick === 'function') onClick(e);
      }}>
      {children}
    </button>
  );
}
