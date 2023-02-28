import overide from './overide';
export { overide };
export function overides(mainElement, overidesObject) {
  Object.entries(overidesObject).forEach(([selector, options]) => {
    overide(mainElement, { selector, ...options });
  });
}
