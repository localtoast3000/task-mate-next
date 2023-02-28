import { format } from 'date-fns';
import overide from './overide';

export default function overideAmPmButtons(
  picker,
  amPmDefaults,
  date,
  { colors, cssModulesObject, initialVal }
) {
  const amBtn = picker.querySelector('.MuiClock-amButton');
  const pmBtn = picker.querySelector('.MuiClock-pmButton');

  overide(picker, {
    selector: '.MuiClock-amButton',
    className: cssModulesObject.amBtnMain,
  });
  overide(picker, {
    selector: '.MuiClock-pmButton',
    className: cssModulesObject.pmBtnMain,
  });

  if (!amPmDefaults) {
    const timePosition = format(date, 'aaa');
    initialVal({
      am: {
        hash: amBtn.classList[4].split('-')[1],
        defaultState: timePosition === 'am' ? true : false,
      },
      pm: {
        hash: pmBtn.classList[4].split('-')[1],
        defaultState: timePosition === 'pm' ? true : false,
      },
    });
    overide(picker, {
      selector: '.MuiClock-amButton',
      style: {
        backgroundColor: timePosition === 'am' ? colors.activeBackground : 'transparent',
      },
      className: cssModulesObject.amBtn,
    });
    overide(picker, {
      selector: '.MuiClock-pmButton',
      style: {
        backgroundColor: timePosition === 'pm' ? colors.activeBackground : 'transparent',
      },
      className: cssModulesObject.amBtn,
    });
  } else {
    const amHash = amBtn.classList[4].split('-')[1];
    const pmHash = pmBtn.classList[4].split('-')[1];

    if (amPmDefaults.am.defaultState) {
      if (amHash === amPmDefaults.am.hash) {
        overide(picker, {
          selector: '.MuiClock-amButton',
          style: {
            backgroundColor: colors.activeBackground,
            color: colors.activeText,
          },
        });
      } else {
        overide(picker, {
          selector: '.MuiClock-amButton',
          style: {
            backgroundColor: 'transparent',
            color: colors.defaultText,
          },
        });
      }
    } else {
      if (amHash === amPmDefaults.am.hash) {
        overide(picker, {
          selector: '.MuiClock-amButton',
          style: {
            backgroundColor: 'transparent',
            color: colors.defaultText,
          },
        });
      } else {
        overide(picker, {
          selector: '.MuiClock-amButton',
          style: {
            backgroundColor: colors.activeBackground,
            color: colors.activeText,
          },
        });
      }
    }

    if (amPmDefaults.pm.defaultState) {
      if (pmHash === amPmDefaults.pm.hash) {
        overide(picker, {
          selector: '.MuiClock-pmButton',
          style: {
            backgroundColor: colors.activeBackground,
            color: colors.activeText,
          },
        });
      } else {
        overide(picker, {
          selector: '.MuiClock-pmButton',
          style: {
            backgroundColor: 'transparent',
            color: colors.defaultText,
          },
        });
      }
    } else {
      if (pmHash === amPmDefaults.pm.hash) {
        overide(picker, {
          selector: '.MuiClock-pmButton',
          style: {
            backgroundColor: 'transparent',
            color: colors.defaultText,
          },
        });
      } else {
        overide(picker, {
          selector: '.MuiClock-pmButton',
          style: {
            backgroundColor: colors.activeBackground,
            color: colors.activeText,
          },
        });
      }
    }
  }
}
