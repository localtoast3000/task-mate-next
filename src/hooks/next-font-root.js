import { useEffect } from 'react';

export function useNextFontRootLoader(nextFontClassNames) {
  useEffect(() => {
    if (document.body.hasAttribute('class'))
      nextFontClassNames.forEach((className) => {
        document.body.classList.add(className);
      });
    else
      nextFontClassNames.forEach((className) => {
        document.body.setAttribute('class', className);
      });
  }, []);
}
