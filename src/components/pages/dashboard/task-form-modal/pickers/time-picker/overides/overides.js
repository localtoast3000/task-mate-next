import overide from './overide';
export { default as overideAmPmButtons } from './am-pm-btns';
export { overide };
export function overides(mainElement, overidesObject) {
  Object.entries(overidesObject).forEach(([selector, options]) => {
    overide(mainElement, { selector, ...options });
  });
}
