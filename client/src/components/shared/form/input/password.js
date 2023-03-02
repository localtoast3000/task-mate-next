import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import styles from './styles/password.module.css';

export default function Password({
  name,
  control,
  error,
  helperText,
  rules,
  colors = { text: '', label: '', focused: '', unFocused: '', error: '' },
  fonts = { label: '', text: '' },
  wrapperClass,
  iconClass = '',
  iconStyle = {},

  ...props
}) {
  const [visableText, setVisableText] = useState(false);

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
              type={visableText ? 'text' : 'password'}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {visableText ? (
                      <VisibilityOffIcon
                        style={iconStyle}
                        className={`${styles.icon} ${iconClass}`}
                        onClick={() => setVisableText(false)}
                      />
                    ) : (
                      <VisibilityIcon
                        style={iconStyle}
                        className={`${styles.icon} ${iconClass}`}
                        onClick={() => setVisableText(true)}
                      />
                    )}
                  </InputAdornment>
                ),
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

function VisibilityIcon({ style, ...props }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 96 960 960'
      style={style}
      {...props}>
      <path d='M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-146 0-264-83T40 556q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Z' />
    </svg>
  );
}

function VisibilityOffIcon({ style, ...props }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 96 960 960'
      style={style}
      {...props}>
      <path d='M816 992 648 827q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40 556q20-52 55.5-101.5T182 360L56 234l42-43 757 757-39 44ZM480 726q14 0 30-2.5t27-7.5L320 499q-5 12-7.5 27t-2.5 30q0 72 50 121t120 49Zm278 40L629 637q10-16 15.5-37.5T650 556q0-71-49.5-120.5T480 386q-22 0-43 5t-38 16L289 296q35-16 89.5-28T485 256q143 0 261.5 81.5T920 556q-26 64-67 117t-95 93ZM585 593 443 451q29-11 60-4.5t54 28.5q23 23 32 51.5t-4 66.5Z' />
    </svg>
  );
}
