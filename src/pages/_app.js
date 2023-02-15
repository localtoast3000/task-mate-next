import { ThemeProvider } from '@/hooks/theme/theme';
import { useNextFontRootLoader } from '@/hooks/next-font-root';
import '@/styles/globals.css';
import theme from '@/styles/theme.module.css';
import fonts from '@/styles/fonts';

export default function App({ Component, pageProps }) {
  useNextFontRootLoader(fonts);

  return (
    <ThemeProvider cssThemeModule={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
