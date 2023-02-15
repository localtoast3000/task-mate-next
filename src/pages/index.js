import Head from 'next/head';
import ToolBar from '@/components/shared/toolbar/toolbar';
import { useTheme } from '@/hooks/theme/theme';

export default function Home() {
  const { ThemeSelector, DarkModeBtn } = useTheme();

  return (
    <>
      <Head>
        <title>Task Mate</title>
        <meta
          name='description'
          content='Generated by create next app'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <>
        <ToolBar />
        <main>
          <DarkModeBtn />
          {/* <ThemeSelector
          // selectClass={styles.select}
          // optionClass={styles.option}
          /> */}
        </main>
      </>
    </>
  );
}
