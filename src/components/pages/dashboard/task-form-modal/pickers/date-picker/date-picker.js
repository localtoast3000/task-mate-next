import { useState, useRef, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import styles from './date-picker.module.css';
import { useTheme } from '@/hooks/theme/theme';

export default function DatePicker({
  InputComponent,
  className = '',
  initialDate = new Date(),
  colors = {
    activeBackground: 'blue',
    activeText: 'black',
    inactiveBackground: 'white',
    inactiveText: 'white',
    defaultBackground: 'white',
    defaultText: 'black',
  },
  onChange,
}) {
  const [value, setValue] = useState(initialDate);
  const wrapperRef = useRef();

  return (
    <div
      className={`${styles.timePicker} ${className}`}
      ref={wrapperRef}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs='desktop'
          openTo='day'
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            onChange(newValue);
          }}
          renderInput={(params) => <InputComponent {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}
