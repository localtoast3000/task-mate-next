import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useTheme } from '@/hooks/theme/theme';

export default function DatePicker({ InputComponent }) {
  const [value, setValue] = useState(new Date());
  const { colors } = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs='desktop'
        openTo='day'
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <InputComponent {...params} />}
      />
    </LocalizationProvider>
  );
}
