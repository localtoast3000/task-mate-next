import Head from 'next/head';
import { useState, useEffect } from 'react';
import ToolBar from '@/components/pages/dashboard/toolbar/toolbar';
import styles from './styles/dashboard.module.css';
import Task from '@/components/pages/dashboard/task/task';
import { useTheme } from '@/hooks/theme/theme';
import NewTaskBtn from '@/components/pages/dashboard/new-task-btn/new-task-btn';
import { useSelector } from 'react-redux';
import { selectUser } from '@/reducers/users';
import { color } from '@mui/system';

export default function Tasks() {
  const { theme, colors, bodyBackgroundColors } = useTheme();
  const user = useSelector(selectUser);

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
          {user?.tasks?.length > 0 ? (
            user.tasks.map((task, i) => (
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
            ))
          ) : (
            <p
              className={styles.noTasksMsg}
              style={{
                color: colors({
                  light: 'gs-900',
                  dark: 'gs-50',
                }),
              }}>
              No tasks added!
            </p>
          )}
          <NewTaskBtn colors={colors} />
        </main>
      </>
    </>
  );
}
