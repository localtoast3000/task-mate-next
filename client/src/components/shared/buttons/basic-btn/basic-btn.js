import styles from './basic-btn.module.css';

export default function BasicBtn({ className, children, ...props }) {
  return (
    <button
      className={`${styles.btn} ${className}`}
      {...props}>
      {children}
    </button>
  );
}
