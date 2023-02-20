import Head from 'next/head';
import { useState, useEffect } from 'react';
import ToolBar from '@/components/pages/dashboard/toolbar/toolbar';
import dummyTasks from '@/dummy_tasks.json';
import styles from './styles/dashboard.module.css';
import Task from '@/components/pages/dashboard/task/task';
import { useTheme } from '@/hooks/theme/theme';

export default function Tasks() {
  const [tasks, setTasks] = useState(dummyTasks);
  const { theme, colors, bodyBackgroundColors } = useTheme();

  useEffect(() => {
    bodyBackgroundColors({
      light: 'gs-300',
      dark: 'gs-800',
    });
  }, [theme]);

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
        <main className={styles.mainContainer}>
          {tasks.map((task, i) => (
            <Task
              key={i}
              style={{
                boxShadow: `0px 3px 10px ${colors({
                  light: 'gs-400',
                  dark: 'gs-1000',
                })}`,
                backgroundColor: colors({
                  light: 'gs-50',
                  dark: 'gs-900',
                }),
              }}
              idStyle={{
                backgroundColor: colors({
                  light: 'compl-500',
                  dark: 'compl-300',
                }),
                color: colors({
                  light: 'gs-50',
                  dark: 'gs-50',
                }),
                boxShadow: `0px 3px 10px ${colors({
                  light: 'gs-400',
                  dark: 'gs-1000',
                })}`,
              }}
              iconStyle={{
                fill: colors({
                  light: 'triad-a-500',
                  dark: 'analo-a-200',
                }),
              }}
              headerStyle={{
                color: colors({
                  light: 'gs-600',
                  dark: 'gs-600',
                }),
              }}
              textStyle={{
                color: colors({
                  light: 'gs-900',
                  dark: 'gs-100',
                }),
              }}
              {...task}
            />
          ))}
        </main>
      </>
    </>
  );
}
