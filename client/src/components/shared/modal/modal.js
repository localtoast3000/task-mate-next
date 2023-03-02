import styles from './modal.module.css';

export default function Modal({ children, ...props }) {
  return (
    <div
      className={styles.modalBackgroundLayer}
      {...props}>
      {children}
    </div>
  );
}
