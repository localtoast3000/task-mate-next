import styles from './logo.module.css';

export default function Logo({ className, ...props }) {
  return (
    <h1
      className={`${styles.logo} ${className}`}
      {...props}>
      Task Mate
    </h1>
  );
}
