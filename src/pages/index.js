import Head from 'next/head';
import styles from '@/styles/pages/index.module.css';
import Logo from '@/components/shared/logo/logo';
import { LinkBtn } from '@/components/shared/buttons/buttons';
import { useEffect } from 'react';
import { useTheme } from '@/hooks/theme/theme';
import LandingTaskSvg from '@/components/pages/index/landing-task-svg/landing-task-svg';

export default function Home() {
  const { theme, colors, bodyBackgroundColors, DarkModeBtn } = useTheme();

  useEffect(() => {
    bodyBackgroundColors({
      light: 'gs-200',
      dark: 'gs-900',
    });
  }, [theme]);

  return (
    <>
      <Head>
        <title>Task Mate</title>
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
        <main className={styles.mainContainer}>
          <header className={styles.headerContainer}>
            <DarkModeBtn
              className={styles.darkModeBtn}
              darkIconClass={styles.darkModeBtnDarkIcon}
              lightIconClass={styles.darkModeBtnLightIcon}
              buttonProps={{
                style: {
                  backgroundColor: colors({
                    light: 'ts-400',
                    dark: 'ts-800',
                  }),
                },
              }}
              iconStyle={{
                fill: colors({
                  light: 'gs-700',
                  dark: 'gs-200',
                }),
              }}
            />
            <p
              className={styles.intro}
              style={{
                color: colors({
                  light: 'gs-800',
                  dark: 'gs-50',
                }),
              }}>
              Managing your tasks just became easier with
            </p>
            <Logo
              className={styles.logo}
              style={{
                color: colors({
                  light: 'prime-400',
                  dark: 'prime-300',
                }),
                textShadow: `0px 3px 3px ${colors({
                  light: 'prime-900',
                  dark: 'prime-900',
                })}`,
              }}
            />
          </header>
          <div className={styles.centerSection}>
            <LandingTaskSvg
              classNames={{
                svg: styles.landingTaskSvg,
              }}
              colors={{
                phone: [
                  colors({
                    light: 'gs-700',
                    dark: 'gs-300',
                  }),
                  colors({
                    light: 'gs-800',
                    dark: 'gs-500',
                  }),
                  colors({
                    light: 'gs-300',
                    dark: 'gs-800',
                  }),
                ],
                bigTask: [
                  colors({
                    light: 'gs-300',
                    dark: 'gs-800',
                  }),
                  colors({
                    light: 'prime-500',
                    dark: 'prime-500',
                  }),
                  colors({
                    light: 'gs-500',
                    dark: 'gs-600',
                  }),
                  colors({
                    light: 'gs-500',
                    dark: 'gs-600',
                  }),
                  colors({
                    light: 'gs-500',
                    dark: 'gs-600',
                  }),
                  colors({
                    light: 'gs-500',
                    dark: 'gs-600',
                  }),
                  colors({
                    light: 'gs-500',
                    dark: 'gs-600',
                  }),
                ],
                smallTask: [
                  colors({
                    light: 'gs-300',
                    dark: 'gs-800',
                  }),
                  colors({
                    light: 'prime-500',
                    dark: 'prime-500',
                  }),
                  colors({
                    light: 'gs-500',
                    dark: 'gs-600',
                  }),
                  colors({
                    light: 'gs-500',
                    dark: 'gs-600',
                  }),
                  colors({
                    light: 'gs-500',
                    dark: 'gs-600',
                  }),
                ],
                person: [
                  colors({
                    light: 'sk-200',
                    dark: 'sk-200',
                  }),
                  colors({
                    light: 'gs-700',
                    dark: 'gs-600',
                  }),
                  colors({
                    light: 'sk-200',
                    dark: 'sk-200',
                  }),
                  colors({
                    light: 'gs-700',
                    dark: 'gs-600',
                  }),
                  colors({
                    light: 'gs-800',
                    dark: 'gs-100',
                  }),
                  colors({
                    light: 'sk-200',
                    dark: 'sk-200',
                  }),
                  colors({
                    light: 'gs-500',
                    dark: 'gs-600',
                  }),
                  // Hair
                  colors({
                    light: 'gs-800',
                    dark: 'prime-600',
                  }),
                  colors({
                    light: 'gs-300',
                    dark: 'gs-800',
                  }),
                  // TASK BALL
                  colors({
                    light: 'prime-500',
                    dark: 'prime-500',
                  }),
                  colors({
                    light: 'gs-500',
                    dark: 'gs-600',
                  }),
                  colors({
                    light: 'gs-500',
                    dark: 'gs-600',
                  }),
                  colors({
                    light: 'gs-500',
                    dark: 'gs-600',
                  }),
                  colors({
                    light: 'sk-200',
                    dark: 'sk-200',
                  }),
                  colors({
                    light: 'gs-500',
                    dark: 'gs-600',
                  }),
                ],
              }}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <LinkBtn
              className={styles.authBtn}
              href='/auth/signup'
              style={{
                backgroundColor: colors({
                  light: 'prime-700',
                  dark: 'prime-400',
                }),
                boxShadow: `0px 3px 3px ${colors({
                  light: 'prime-900',
                  dark: 'prime-900',
                })}`,
                color: colors({
                  light: 'gs-50',
                  dark: 'gs-50',
                }),
              }}>
              Sign Up
            </LinkBtn>
            <LinkBtn
              className={styles.authBtn}
              href='/auth/login'
              style={{
                backgroundColor: colors({
                  light: 'ts-400',
                  dark: 'ts-900',
                }),
                border: `solid 2px ${colors({
                  light: 'ts-700',
                  dark: 'ts-300',
                })}`,
                color: colors({
                  light: 'gs-900',
                  dark: 'gs-50',
                }),
              }}>
              Login
            </LinkBtn>
          </div>
        </main>
      </>
    </>
  );
}
