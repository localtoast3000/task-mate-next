import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { emailValidator, passwordValidator } from '@/util/yup-validation';
import { loginRequest, getData } from '@/api/requests';
import { Input, Password, SubmitBtn } from '@/components/shared/form/form';
import styles from './auth.module.css';
import { useTheme } from '@/hooks/theme/theme';
import { useDispatch } from 'react-redux';
import { mountUser } from '@/reducers/users';
import { useRouter } from 'next/router';

const validationSchema = yup
  .object({
    email: emailValidator(),
    password: passwordValidator(),
  })
  .required();

export default function SignUp() {
  const [submitError, setSubmitError] = useState(false);
  const { theme, colors, bodyBackgroundColors, DarkModeBtn } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    bodyBackgroundColors({
      light: 'gs-200',
      dark: 'gs-900',
    });
  }, [theme]);

  const inputColors = {
    text: colors({
      light: 'gs-900',
      dark: 'gs-50',
    }),
    label: colors({
      light: 'gs-600',
      dark: 'gs-600',
    }),
    unFocused: colors({
      light: 'gs-600',
      dark: 'gs-600',
    }),
    focused: colors({
      light: 'prime-600',
      dark: 'prime-300',
    }),
    error: colors({
      light: 'triad-b-500',
      dark: 'triad-a-200',
    }),
  };

  const inputFonts = {
    text: 'var(--prime-font)',
    label: 'var(--prime-font)',
  };

  const resetFields = () => {
    reset({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Head>
        <title>Task Mate - Login</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <main className={styles.mainContainer}>
        <header className={styles.headerContainer}>
          <h1
            style={{
              color: colors({
                light: 'gs-900',
                dark: 'gs-50',
              }),
            }}>
            Login
          </h1>
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
        </header>
        <form
          className={styles.form}
          onSubmit={handleSubmit(async ({ email, password }) => {
            const loginRes = await loginRequest({
              email: email.toLowerCase(),
              password,
            });

            let userRes = await getData('/user', {
              Authorization: `Bearer ${loginRes.accesToken}`,
            });
            if (userRes.status >= 300) {
              return setSubmitErrors({ ...submitErrors, failed: true });
            }
            userRes = await userRes.json();

            setSubmitErrors({ failed: false, notFound: false });

            let tasksRes = await getData('/tasks', {
              Authorization: `Bearer ${loginRes.accesToken}`,
            });
            tasksRes = await tasksRes.json();

            dispatch(
              mountUser({
                tokens: {
                  access: loginRes.accesToken,
                  refresh: loginRes.refreshToken,
                },
                ...userRes.user,
                tasks: tasksRes.tasks ? tasksRes.tasks : [],
              })
            );
            router.push(`/${userRes.user.firstName}-${userRes.user.lastName}/dashboard`);
          })}>
          {submitError && (
            <p
              className={styles.submitError}
              style={{
                color: inputColors.error,
              }}>
              User not found
            </p>
          )}

          <Input
            name='email'
            label='Email'
            type='email'
            className={styles.input}
            wrapperClass={styles.inputWrapper}
            control={control}
            error={errors.email && true}
            variant='standard'
            helperText={
              errors.email?.type &&
              (() => {
                const type = errors.email.type;
                if (type === 'required' || type === 'optionality')
                  return 'Email is required';
                if (type === 'matches') return 'Invalid email';
              })()
            }
            colors={inputColors}
            fonts={inputFonts}
          />
          <Password
            name='password'
            label='Password'
            className={styles.input}
            wrapperClass={styles.inputWrapper}
            control={control}
            error={errors.password && true}
            variant='standard'
            helperText={
              errors.password?.type &&
              (() => {
                const type = errors.password.type;
                if (type === 'required' || type === 'optionality')
                  return 'Password is required';
                if (type === 'matches') return 'Invalid Password';
              })()
            }
            iconStyle={{
              fill: colors({
                light: 'gs-600',
                dark: 'gs-600',
              }),
            }}
            colors={inputColors}
            fonts={inputFonts}
          />
          <SubmitBtn
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
            }}
            className={styles.submitBtn}>
            Login
          </SubmitBtn>
        </form>
      </main>
    </>
  );
}
