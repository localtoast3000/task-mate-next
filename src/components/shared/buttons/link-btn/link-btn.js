import { useRouter } from 'next/router';
import styles from './link-btn.module.css';

export default function LinkBtn({ className, href = '/', onClick, children, ...props }) {
  const router = useRouter();

  return (
    <button
      className={`${styles.btn} ${className}`}
      {...props}
      onClick={(e) => {
        if (typeof onClick === 'function') onClick(e);
        e.preventDefault();
        router.push(href);
      }}>
      {children}
    </button>
  );
}
