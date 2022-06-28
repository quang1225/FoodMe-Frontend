import PageWrapper from '@components/AppGlobalUI/PageWrapper';
import { ThemeProvider } from '@mui/material/styles';
import store from '@stateManager/stores/appStore';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import theme from '../styles/theme';
import { Provider as ReduxProvider } from 'react-redux';
import Script from 'next/script';

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  const [isClient, setIsClient] = useState(false);

  // not using typeof window
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon.ico" />
      </Head>

      <ReduxProvider store={store}>
        {/* <AppLocale> */}
        <ThemeProvider theme={theme}>
          <PageWrapper>
            <Component {...pageProps} />
            <ToastContainer />
          </PageWrapper>
        </ThemeProvider>
        {/* </AppLocale> */}
      </ReduxProvider>

      {isClient && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_TAG_ID}`}
            strategy="lazyOnload"
          />
          <Script
            id="gtag"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_TAG_ID}');`,
            }}
          />
        </>
      )}
    </>
  );
};

export default appWithTranslation(MyApp);
