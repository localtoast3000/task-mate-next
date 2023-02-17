import { createContext, useState, useEffect, useContext, ReactNode, useRef } from 'react';
import { ArrowIcon, SunIcon, MoonIcon } from './icons/icons';
import selectorStyles from './style/selector.module.css';
import darkModeBtnStyles from './style/dark-mode-btn.module.css';

const ThemeContext = createContext(undefined);

/**
 *
 * @param { object } props
 * @param { object } props.cssThemeModule - The module.css file to be imported into the project and passed into the provider
 * @param { ReactNode } props.children - The rest of the application that will have the theme provided to
 * @returns { ThemeContext } ThemeContext
 */
function ThemeProvider({ cssThemeModule, defaultTheme, children }) {
  const [theme, setTheme] = useState(
    defaultTheme ? defaultTheme : Object.keys(cssThemeModule)[0]
  );

  useEffect(() => {
    if (document.body.hasAttribute('class'))
      document.body.classList.add(cssThemeModule[theme]);
    else document.body.setAttribute('class', cssThemeModule[theme]);

    return () => {
      if (document.body.hasAttribute('class'))
        document.body.classList.remove(cssThemeModule[theme]);
      else document.body.removeAttribute('class');
    };
  }, [theme]);

  /**
   *  @param { object } cssVars
   *  @param { color_variant } cssVars.anyThemeProp "primary-900"
   *  @returns { css_color_variuble } "var(--primary-900)"
   */
  const colors = (cssVars) => {
    return `var(--${cssVars[theme]})`;
  };

  const colorValues = (cssVars) => {
    const color = getComputedStyle(document.body).getPropertyValue(`--${cssVars[theme]}`);
    return color;
  };

  const bodyBackgroundColors = (cssVars) => {
    document.body.style = `background: var(--${cssVars[theme]})`;
  };

  const DarkModeBtn = ({
    className = '',
    darkIconClass = '',
    lightIconClass = '',
    iconScale = 1,
    buttonProps = {},
    iconProps = {},
    iconStyle = {},
    DarkIcon = MoonIcon,
    LightIcon = SunIcon,
  }) => {
    const [lightIconWidth, setLightIconWidth] = useState(0);
    const [darkIconWidth, setDarkIconWidth] = useState(0);

    iconScale = iconScale >= 0.1 ? iconScale : 1;

    useEffect(() => {
      theme === 'light'
        ? setDarkIconWidth(25 * iconScale)
        : setLightIconWidth(32 * iconScale);
    }, [theme]);

    return (
      <button
        className={`${darkModeBtnStyles.btn} ${className}`}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        {...buttonProps}>
        {theme === 'light' ? (
          <DarkIcon
            className={`${darkModeBtnStyles.darkIcon} ${darkIconClass}`}
            style={{
              width: darkIconWidth,
              transition: 'width 0.2s ease-in',
              ...iconStyle,
            }}
            {...iconProps}
          />
        ) : (
          <LightIcon
            className={`${darkModeBtnStyles.lightIcon} ${lightIconClass}`}
            style={{
              width: lightIconWidth,
              transition: 'width 0.2s ease-in',
              ...iconStyle,
            }}
            {...iconProps}
          />
        )}
      </button>
    );
  };

  const ThemeSelector = ({
    selectClass = '',
    optionClass = '',
    styles = { select: {}, option: {} },
  }) => {
    const [open, setOpen] = useState(false);
    const selectorRef = useRef();

    useEffect(() => {
      const handler = (e) => {
        if (e.target === selectorRef.current) return;
        let isElement = false;

        const recursiveChildrenSearch = (childNodes = selectorRef.current.children) => {
          for (let node of childNodes) {
            if (node === e.target) {
              isElement = true;
              return;
            }
            recursiveChildrenSearch(node.children);
          }
        };
        recursiveChildrenSearch();
        if (!isElement) setOpen(false);
      };
      window.addEventListener('click', handler);
      return () => window.removeEventListener('click', handler);
    }, []);

    return (
      <div
        className={`${selectorStyles.selector} ${selectClass}`}
        style={styles.select}
        ref={selectorRef}>
        <div
          className={`${selectorStyles.selected} ${
            open ? selectorStyles.bottomBorder : ''
          }`}
          onClick={() => setOpen((val) => !val)}>
          <p>
            {String(theme)
              .replaceAll('[^A-Za-z0-9]', '')
              .replace(String(theme)[0], String(theme)[0].toUpperCase())}
          </p>
          <ArrowIcon
            className={selectorStyles.arrowIcon}
            style={{
              transform: `rotate(${open ? 90 : -90}deg)`,
              transition: 'transform 0.2s ease-in',
            }}
          />
        </div>
        <div
          className={selectorStyles.options}
          style={{
            transition: 'height 0.2s ease-in',
          }}>
          {open ? (
            <>
              {Object.keys(cssThemeModule).map((key, i) => (
                <div
                  className={`${selectorStyles.option} ${optionClass}`}
                  style={{ ...styles.option, opacity: theme === key ? 0.5 : 1 }}
                  key={i}
                  onClick={() => (theme !== key ? setTheme(key) : null)}>
                  {String(key)
                    .replaceAll('[^A-Za-z0-9]', '')
                    .replace(String(key)[0], String(key)[0].toUpperCase())}
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        setTheme,
        colors,
        colorValues,
        bodyBackgroundColors,
        ThemeSelector,
        DarkModeBtn,
        theme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 *
 * @returns - {
 * * colors --> Function ref to set colors on style objects in relation to current theme state,
 * * setTheme --> State setter ref to set the theme
 * - }
 */
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error('useThemeSetter must be used within a ThemeProvider');
  return context;
}

export { ThemeProvider, useTheme };
