import { Inter, Domine } from '@next/font/google';

const inter = Inter({
  variable: '--logo-font',
  subsets: ['latin'],
});

const domine = Domine({
  variable: '--global-font',
  subsets: ['latin'],
});

export default [inter.variable, domine.variable];
