import { useState, useRef, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import styles from './time-picker.module.css';
import { overides, overide, overideAmPmButtons } from './overides/overides';

export default function TimePicker({
  InputComponent,
  className = '',
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
  const [value, setValue] = useState(new Date());
  const wrapperRef = useRef();
  const amPmRef = useRef(null);

  useEffect(() => {
    overideAmPmButtons(wrapperRef.current, amPmRef.current, {
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

    wrapperRef.current.querySelector(
      '.MuiSvgIcon-root[data-testid=ArrowLeftIcon]'
    ).style.fill = colors.activeBackground;
    wrapperRef.current.querySelector(
      '.MuiSvgIcon-root[data-testid=ArrowRightIcon]'
    ).style.fill = colors.inactiveBackground;

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
      '.MuiTouchRipple-root': {
        style: {
          backgroundColor: 'transparent',
        },
        className: styles.ripple,
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
      '.MuiClock-squareMask': {
        className: styles.clockMask,
      },
      '.MuiClock-clock': {
        className: styles.clockFace,
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
    });
  }, []);

  return (
    <div
      className={`${styles.timePicker} ${className}`}
      ref={wrapperRef}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticTimePicker
          displayStaticWrapperAs='desktop'
          value={value}
          onChange={(val) => {
            setValue(val);
            onChange(val);
          }}
          onViewChange={(view) => {
            if (view === 'hours') {
              wrapperRef.current.querySelector(
                '.MuiSvgIcon-root[data-testid=ArrowLeftIcon]'
              ).style.fill = colors.activeBackground;
              wrapperRef.current.querySelector(
                '.MuiSvgIcon-root[data-testid=ArrowRightIcon]'
              ).style.fill = colors.inactiveBackground;
            } else {
              wrapperRef.current.querySelector(
                '.MuiSvgIcon-root[data-testid=ArrowRightIcon]'
              ).style.fill = colors.activeBackground;
              wrapperRef.current.querySelector(
                '.MuiSvgIcon-root[data-testid=ArrowLeftIcon]'
              ).style.fill = colors.inactiveBackground;
            }
          }}
          renderInput={(params) => <InputComponent {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}
