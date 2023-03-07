import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { emailValidator, passwordValidator } from '@/util/yup-validation';
import { postData, getData } from '@/api/requests';
import { Input, Password, SubmitBtn } from '@/components/shared/form/form';
import styles from './auth.module.css';
import { useTheme } from '@/hooks/theme/theme';
import { useDispatch } from 'react-redux';
import { mountUser } from '@/reducers/users';
import { useRouter } from 'next/router';

const validationSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: emailValidator(),
    password: passwordValidator(),
  })
  .required();

export default function SignUp() {
  const [submitErrors, setSubmitErrors] = useState({ failed: false, exists: false });
  const { theme, colors, bodyBackgroundColors, DarkModeBtn } = useTheme();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const router = useRouter();

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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Head>
        <title>Task Mate - Sign up</title>
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
            Sign up
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
          onSubmit={handleSubmit(async ({ firstName, lastName, email, password }) => {
            let signupRes = await postData('/user/signup', {
              firstName: firstName.replace(firstName[0], firstName[0].toUpperCase()),
              lastName: lastName.replace(lastName[0], lastName[0].toUpperCase()),
              email: email.toLowerCase(),
              password,
            });
            if (signupRes.status === 409) {
              setSubmitErrors({ ...submitErrors, exists: true });
              resetFields();
              return;
            }
            if (signupRes.status >= 300)
              return setSubmitErrors({ ...submitErrors, failed: true });
            signupRes = await signupRes.json();

            let userRes = await getData('/user', {
              Authorization: `Bearer ${signupRes.accessToken}`,
            });
            if (userRes.status >= 300) {
              router.push(`/login`);
              resetFields();
              return;
            }
            userRes = await userRes.json();

            setSubmitErrors({ failed: false, exists: false });

            let tasksRes = await getData('/tasks', {
              Authorization: `Bearer ${signupRes.accessToken}`,
            });
            tasksRes = await tasksRes.json();
            dispatch(
              mountUser({
                tokens: {
                  access: signupRes.accesToken,
                  refresh: signupRes.refreshToken,
                },
                ...userRes.user,
                tasks: tasksRes.tasks ? tasksRes.tasks : [],
              })
            );
            router.push(`/${userRes.user.firstName}-${userRes.user.lastName}/dashboard`);
          })}>
          {submitErrors.exists ? (
            <p
              className={styles.submitError}
              style={{
                color: inputColors.error,
              }}>
              User already exists
            </p>
          ) : submitErrors.failed ? (
            <p
              className={styles.submitError}
              style={{
                color: inputColors.error,
              }}>
              Oops, something went wrong. <br />
              Please try again
            </p>
          ) : (
            <></>
          )}
          <Input
            name='firstName'
            label='First Name'
            type='text'
            className={styles.input}
            wrapperClass={styles.inputWrapper}
            control={control}
            error={errors.firstName && true}
            variant='standard'
            helperText={
              errors.firstName?.type &&
              (() => {
                const type = errors.firstName.type;
                if (type === 'required' || type === 'optionality')
                  return 'First name is required';
              })()
            }
            colors={inputColors}
            fonts={inputFonts}
          />
          <Input
            name='lastName'
            label='Last Name'
            type='text'
            className={styles.input}
            wrapperClass={styles.inputWrapper}
            control={control}
            error={errors.lastName && true}
            variant='standard'
            helperText={
              errors.lastName?.type &&
              (() => {
                const type = errors.lastName.type;
                if (type === 'required' || type === 'optionality')
                  return 'Last name is required';
              })()
            }
            colors={inputColors}
            fonts={inputFonts}
          />
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
                if (type === 'matches')
                  return 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character';
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
            Submit
          </SubmitBtn>
        </form>
      </main>
    </>
  );
}
