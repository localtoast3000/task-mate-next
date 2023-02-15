import Logo from '@/components/shared/logo/logo';
import { useTheme } from '@/hooks/theme/theme';
import styles from './toolbar.module.css';

export default function ToolBar() {
  const { colors } = useTheme();

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
      <Logo className={styles.logo} />
    </div>
  );
}
