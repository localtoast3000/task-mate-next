import Logo from '@/components/shared/logo/logo';
import Link from 'next/link';
import { useTheme } from '@/hooks/theme/theme';
import styles from './toolbar.module.css';

export default function ToolBar() {
  const { colors, DarkModeBtn } = useTheme();

  return (
    <div
      className={styles.toolbarContainer}
      style={{
        backgroundColor: colors({
          light: 'prime-600',
          dark: 'prime-600',
          alt: 'prime-600',
        }),
      }}>
      <Link href='/'>
        <Logo className={styles.logo} />
      </Link>
      <DarkModeBtn
        className={styles.darkModeBtn}
        darkIconClass={styles.darkModeBtnDarkIcon}
        lightIconClass={styles.darkModeBtnLightIcon}
      />
    </div>
  );
}
