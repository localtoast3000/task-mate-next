import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { emailValidator, passwordValidator } from '@/util/yup-validation';
import { postData } from '@/util/backend-requests';
import { Input, SubmitBtn } from '@/components/shared/form/form';
import styles from './auth.module.css';
import { useTheme } from '@/hooks/theme/theme';

const validationSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: emailValidator(),
    password: passwordValidator(),
  })
  .required();

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { colors } = useTheme();

  const [userExists, setUserExistsError] = useState(false);

  return (
    <main className={styles.mainContainer}>
      <header className={styles.headerContainer}>
        <h1>Sign up</h1>
      </header>
      <form
        className={styles.form}
        onSubmit={handleSubmit(async ({ firstName }) => {
          // const res = await postData('/users/signup', {
          //   firstName: firstName.replace(firstName[0], firstName[0].toUpperCase()),
          //   lastName: lastName.replace(lastName[0], lastName[0].toUpperCase()),
          //   email: email.toLowerCase(),
          //   password,
          // });
          // if (res.error) return setUserExistsError(true);
          // setUserExistsError(false);
        })}>
        <Input
          name='firstName'
          label='First Name'
          className={styles.input}
          wrapperClass={styles.inputWrapper}
          control={control}
          error={errors.firstName && true}
          variant='standard'
          helperText={
            errors.firstName?.type &&
            (() => {
              const type = errors.firstName.type;
              if (type === 'required') return 'First name is required';
            })()
          }
        />
        <Input
          name='lastName'
          label='Last Name'
          className={styles.input}
          wrapperClass={styles.inputWrapper}
          control={control}
          error={errors.lastName && true}
          variant='standard'
          helperText={
            errors.lastName?.type &&
            (() => {
              const type = errors.lastName.type;
              if (type === 'required') return 'Last name is required';
            })()
          }
        />
        <Input
          name='email'
          label='Email'
          className={styles.input}
          wrapperClass={styles.inputWrapper}
          control={control}
          error={errors.email && true}
          variant='standard'
          helperText={
            errors.email?.type &&
            (() => {
              const type = errors.email.type;
              if (type === 'required') return 'Email is required';
              if (type === 'matches') return 'Invalid email';
            })()
          }
        />
        <Input
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
              if (type === 'required') return 'Password is required';
              if (type === 'matches')
                return 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character';
            })()
          }
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
  );
}
