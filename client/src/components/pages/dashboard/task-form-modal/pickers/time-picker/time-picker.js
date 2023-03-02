import { useState, useRef, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import styles from './time-picker.module.css';
import { overides, overideAmPmButtons } from './overides/overides';
import { format, setHours, setMinutes } from 'date-fns';
import { to24Hours } from './util';

export default function TimePicker({
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
  const amPmRef = useRef(null);

  useEffect(() => {
    overideAmPmButtons(wrapperRef.current, amPmRef.current, value, {
      colors: colors,
      cssModulesObject: styles,
      initialVal: (val) => {
        amPmRef.current = val;
      },
    });
  });

  useEffect(() => {
    // Adds wrapper div to am pm buttons
    if (!wrapperRef.current.querySelector(`.${styles.amPmWrapper}`)) {
      const amPmWrapper = document.createElement('div');
      amPmWrapper.setAttribute('class', styles.amPmWrapper);
      const amBtn = wrapperRef.current.querySelector('.MuiClock-amButton');
      const pmBtn = wrapperRef.current.querySelector('.MuiClock-pmButton');
      amPmWrapper.appendChild(amBtn);
      amPmWrapper.appendChild(pmBtn);
      wrapperRef.current.querySelector('.MuiClock-clock').after(amPmWrapper);
    }

    // Changes hour / mins icon colours on load
    wrapperRef.current.querySelector(
      '.MuiSvgIcon-root[data-testid=ArrowLeftIcon]'
    ).style.fill = colors.activeBackground;
    wrapperRef.current.querySelector(
      '.MuiSvgIcon-root[data-testid=ArrowRightIcon]'
    ).style.fill = colors.inactiveText;

    overides(wrapperRef.current, {
      '.MuiPickerStaticWrapper-root': {
        style: {
          backgroundColor: 'transparent',
        },
        className: styles.mainContainer,
      },
      '.MuiPickerStaticWrapper-content': {
        style: {
          backgroundColor: 'transparent',
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
        },
        className: styles.thirdWrapper,
      },
      '.MuiClockPicker-root': {
        style: {
          backgroundColor: 'transparent',
        },
        className: styles.contentWrapper,
      },
      '.MuiPickersArrowSwitcher-button': {
        className: styles.switcherBtns,
        style: {
          backgroundColor: 'transparent',
        },
      },
      '.MuiPickersArrowSwitcher-spacer': {
        className: styles.switcherBtnsSpacer,
      },
      '.MuiPickersArrowSwitcher-root': {
        className: styles.arrowSwitchers,
      },
      '.MuiClock-root': {
        className: styles.clock,
      },
      '.MuiClock-clock': {
        style: {
          backgroundColor: colors.inactiveBackground,
        },
        className: styles.clockFace,
      },
      '.MuiClock-squareMask': {
        className: styles.clockMask,
      },
      '.MuiClock-pin': {
        style: {
          backgroundColor: colors.activeBackground,
        },
        className: styles.centerPin,
      },
      '.MuiClockPointer-root': {
        style: {
          backgroundColor: colors.activeBackground,
        },
        className: styles.clockArm,
      },
      '.MuiClockPointer-thumb': {
        style: {
          backgroundColor: 'transparent',
          borderColor: colors.activeBackground,
        },
        className: styles.clockPointer,
      },
      '.MuiClock-wrapper': {
        style: {
          width: '100%',
        },
      },
    });
    // Watches for changes on the clock wrapper element
    const clockWrapperWatcher = setInterval(() => {
      const clockWrapper = wrapperRef.current.querySelector('.MuiClock-wrapper');
      overides(clockWrapper, {
        span: {
          style: {
            color: colors.defaultText,
          },
        },
        '.Mui-selected': {
          style: {
            color: colors.activeText,
          },
        },
        '.Mui-disabled': {
          style: {
            color: colors.inactiveText,
          },
        },
      });

      // String containing data about the current selected time
      const selectedTimeString = clockWrapper.getAttribute('aria-label').split(' ');
      const selectedTime = `${
        selectedTimeString[5]
      } ${selectedTimeString[6].toLowerCase()}`;
      const currentDisplayTime = format(value, 'h:mm aaa');

      // Updates the picker value if a change is seen between the
      // selectedTime and the current displayed time
      if (selectedTime !== currentDisplayTime) {
        const [hours, mins] = to24Hours(selectedTime).split(':');
        let newDateTime = value;
        newDateTime = setHours(newDateTime, hours);
        newDateTime = setMinutes(newDateTime, mins);
        setValue(newDateTime);
        typeof onChange === 'function' && onChange(newDateTime);
      }
    }, 0);
    return () => clearInterval(clockWrapperWatcher);
  }, []);

  return (
    <>
      <style>
        {`
.${styles.datePicker} .Mui-selected {
  background-color: ${colors.activeBackground} !important;
}
.${styles.datePicker} .Mui-disabled {
  color: ${colors.inactiveText};
}
        `}
      </style>
      <div
        className={`${styles.timePicker} ${className}`}
        style={{
          color: colors.defaultText,
        }}
        ref={wrapperRef}>
        <p className={`${styles.timeDisplay}`}>{format(value, 'HH:mm')}</p>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticTimePicker
            displayStaticWrapperAs='desktop'
            value={value}
            onChange={(val) => {
              setValue(val);
            }}
            onViewChange={(view) => {
              // Changes hours / mins icons colours on view change
              if (view === 'hours') {
                wrapperRef.current.querySelector(
                  '.MuiSvgIcon-root[data-testid=ArrowLeftIcon]'
                ).style.fill = colors.activeBackground;
                wrapperRef.current.querySelector(
                  '.MuiSvgIcon-root[data-testid=ArrowRightIcon]'
                ).style.fill = colors.inactiveText;
              } else {
                wrapperRef.current.querySelector(
                  '.MuiSvgIcon-root[data-testid=ArrowRightIcon]'
                ).style.fill = colors.activeBackground;
                wrapperRef.current.querySelector(
                  '.MuiSvgIcon-root[data-testid=ArrowLeftIcon]'
                ).style.fill = colors.inactiveText;
              }
            }}
            {...props}
            renderInput={(params) => <InputComponent {...params} />}
          />
        </LocalizationProvider>
      </div>
    </>
  );
}
