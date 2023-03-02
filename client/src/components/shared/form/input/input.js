import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export default function Input({
  name,
  control,
  error,
  helperText,
  rules,
  style = {},
  colors = { text: '', label: '', focused: '', unFocused: '', error: '' },
  fonts = { label: '', text: '' },
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
              sx={{
                input: {
                  color: colors.text,
                  fontFamily: fonts.text,
                },
                '& .MuiFormLabel-root[data-shrink=true]': {
                  color: colors.focused,
                  fontFamily: fonts.label,
                },
                '& .MuiFormLabel-root[data-shrink=true].Mui-error': {
                  color: colors.error,
                  fontFamily: fonts.label,
                },
                '& .MuiFormLabel-root[data-shrink=false]': {
                  color: colors.label,
                  fontFamily: fonts.label,
                },
                '& .MuiInput-underline::before': {
                  borderColor: colors.unFocused,
                },
                '& .MuiInput-underline:hover::before': {
                  borderColor: colors.unFocused,
                },
                '& .MuiInput-underline.Mui-error::before': {
                  borderColor: colors.error,
                },
                '& .MuiInput-underline::after': {
                  borderColor: colors.focused,
                },
                '& .MuiInput-underline.Mui-error::after': {
                  borderColor: colors.error,
                },
                '& .MuiFormHelperText-root.Mui-error': {
                  color: colors.error,
                  fontFamily: fonts.label,
                },
              }}
              {...field}
              {...props}
            />
          </div>
        );
      }}
    />
  );
}
