import { ThemeProvider } from '@/hooks/theme/theme';
import { useNextFontRootLoader } from '@/hooks/next-font-root';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import '@/styles/globals.css';
import theme from '@/styles/theme.module.css';
import fonts from '@/styles/fonts';

export default function App({ Component, pageProps }) {
  useNextFontRootLoader(fonts);

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider cssThemeModule={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  );
}
