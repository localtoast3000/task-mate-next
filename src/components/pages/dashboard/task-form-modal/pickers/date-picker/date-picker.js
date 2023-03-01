import { useState, useRef, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import styles from './date-picker.module.css';
import { format, addYears } from 'date-fns';
import { overides } from './overides/overides';
import { color } from '@mui/system';

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
  ...props
}) {
  const [value, setValue] = useState(initialDate);
  const wrapperRef = useRef();

  useEffect(() => {
    overides(wrapperRef.current, {
      '.MuiPickersDay-root': {
        style: {
          backgroundColor: 'transparent',
          color: colors.defaultText,
          opacity: 0.9,
        },
      },
      '.MuiPickersDay-root:hover': {
        style: {
          backgroundColor: colors.inactiveBackground,
        },
      },
      '.Mui-selected': {
        style: {
          backgroundColor: colors.activeBackground,
          color: colors.activeText,
          opacity: 1,
        },
      },
      '.MuiDayPicker-weekDayLabel': {
        style: {
          color: colors.inactiveText,
        },
      },
      '.MuiPickerStaticWrapper-root': {
        style: {
          backgroundColor: 'transparent',
        },
        className: styles.mainContainer,
      },
      '.MuiPickerStaticWrapper-content': {
        style: {
          backgroundColor: 'transparent',
          width: '100%',
          minWidth: '100%',
        },
        className: styles.firstWrapper,
      },
      '.MuiCalendarOrClockPicker-root': {
        style: {
          backgroundColor: 'transparent',
        },
        className: styles.secondWrapper,
      },
      '.css-epd502': {
        style: {
          backgroundColor: 'transparent',
          width: '100%',
          maxHeight: 'auto',
          minWidth: '100%',
        },
      },
      '.MuiSvgIcon-root[data-testid=ArrowLeftIcon]': {
        style: {
          fill: colors.inactiveText,
        },
      },
      '.MuiSvgIcon-root[data-testid=ArrowRightIcon]': {
        style: {
          fill: colors.inactiveText,
        },
      },
      '.MuiPickersCalendarHeader-switchViewIcon': {
        style: {
          fill: colors.inactiveText,
        },
      },
    });
    const interval = setInterval(() => {
      overides(wrapperRef.current, {
        '.MuiPickersDay-root': {
          style: {
            backgroundColor: 'transparent',
            color: colors.defaultText,
            opacity: 0.9,
          },
        },
        '.MuiPickersDay-root:hover': {
          style: {
            backgroundColor: colors.inactiveBackground,
          },
        },
        '.Mui-selected': {
          style: {
            backgroundColor: colors.activeBackground,
            color: colors.activeText,
            opacity: 1,
          },
        },
        '.MuiPickersCalendarHeader-switchViewButton': {
          style: {
            backgroundColor: 'transparent',
            transition: 'background-color 0.2s ease-in',
          },
        },
        '.MuiPickersCalendarHeader-switchViewButton:hover': {
          style: {
            backgroundColor: colors.inactiveBackground,
          },
        },
        '.MuiPickersArrowSwitcher-button': {
          style: {
            backgroundColor: 'transparent',
            transition: 'background-color 0.2s ease-in',
          },
        },
        '.MuiPickersArrowSwitcher-button:hover': {
          style: {
            backgroundColor: colors.inactiveBackground,
          },
        },
        '.PrivatePickersYear-yearButton': {
          style: {
            backgroundColor: 'transparent',
            transition: 'background-color 0.2s ease-in',
          },
        },
        '.PrivatePickersYear-yearButton:hover': {
          style: {
            backgroundColor: colors.inactiveBackground,
          },
        },
        '.Mui-disabled': {
          style: {
            color: colors.inactiveText,
          }
        }
      });
    }, 0);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>
        {`
.${styles.datePicker} .MuiDayPicker-weekDayLabel {
  color: ${colors.inactiveText} !important;
}
.${styles.datePicker} .MuiPickersDay-root {
  background-color: 'transparent;
}
.${styles.datePicker} .Mui-selected {
  background-color: ${colors.activeBackground} !important;
}
.${styles.datePicker} .Mui-disabled {
  color: ${colors.inactiveText};
}
.${styles.datePicker} .MuiPickersDay-today {
  border: solid 1px ${colors.activeBackground};
}
.${styles.datePicker} .MuiPickersDay-today.MuiPickersDay-hiddenDaySpacingFiller {
  border: none;
}
        `}
      </style>
      <div
        className={`${styles.datePicker} ${className}`}
        ref={wrapperRef}
        style={{
          color: colors.defaultText,
        }}>
        <p className={`${styles.dateDisplay}`}>{format(value, 'dd/MM/yyyy')}</p>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs='desktop'
            openTo='day'
            value={value}
            onViewChange={() => {
              overides(wrapperRef.current, {
                '.MuiPickersDay-root': {
                  style: {
                    backgroundColor: 'transparent',
                    color: colors.defaultText,
                    opacity: 0.9,
                  },
                },
                '.MuiPickersDay-root:hover': {
                  style: {
                    backgroundColor: colors.inactiveBackground,
                  },
                },
                '.Mui-selected': {
                  style: {
                    backgroundColor: colors.activeBackground,
                    color: colors.activeText,
                    opacity: 1,
                  },
                },
                '.MuiDayPicker-weekDayLabel': {
                  style: {
                    color: colors.inactiveText,
                  },
                },
              });
            }}
            onChange={(newValue) => {
              setValue(newValue);
              onChange(newValue);
            }}
            {...props}
            renderInput={(params) => <InputComponent {...params} />}
          />
        </LocalizationProvider>
      </div>
    </>
  );
}
