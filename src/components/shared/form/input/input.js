import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export default function Input({
  name,
  control,
  error,
  helperText,
  rules,
  wrapperClass,
  ...props
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        return (
          <div className={wrapperClass}>
            <TextField
              error={error}
              helperText={helperText}
              {...field}
              {...props}
            />
          </div>
        );
      }}
    />
  );
}
