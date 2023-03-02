import * as yup from 'yup';

export function emailValidator() {
  return yup
    .string()
    .required()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/
    );
}

export function passwordValidator() {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  return yup
    .string()
    .required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
}
