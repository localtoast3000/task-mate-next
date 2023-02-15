import styles from './logo.module.css';

export default function Logo({ className }) {
  return <h1 className={`${styles.logo} ${className}`}>Task Mate</h1>;
}
