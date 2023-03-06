import styles from './modal.module.css';
import Head from 'next/head';

export default function Modal({ children, ...props }) {
  return (
    <>
      <div
        className={styles.modalBackgroundLayer}
        {...props}>
        {children}
      </div>
    </>
  );
}
