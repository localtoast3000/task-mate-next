import Head from 'next/head';
import { useState } from 'react';
import ToolBar from '@/components/pages/dashboard/toolbar/toolbar';
import dummyTasks from '@/dummy_tasks.json';
import styles from '@/styles/pages/index.module.css';

export default function Tasks() {
  const [tasks, setTasks] = useState(dummyTasks);

  return (
    <>
      <Head>
        <title>Task Mate - Tasks</title>
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
        <main className={styles.mainContainer}></main>
      </>
    </>
  );
}
