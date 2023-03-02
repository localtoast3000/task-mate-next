import { Inter, Domine } from '@next/font/google';

const inter = Inter({
  variable: '--prime-font',
  subsets: ['latin'],
});

const domine = Domine({
  variable: '--second-font',
  subsets: ['latin'],
});

export default [inter.variable, domine.variable];
