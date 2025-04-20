// ** Next Imports
import Head from "next/head";
import { useEffect, useState } from 'react';
import { Router } from "next/router";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// ** Loader Import
import NProgress from "nprogress";

// ** Emotion Imports
import { CacheProvider } from "@emotion/react";
import type { EmotionCache } from "@emotion/cache";

// ** Config Imports
import themeConfig from "src/configs/themeConfig";

// ** Component Imports
import UserLayout from "src/layouts/UserLayout";
import ThemeComponent from "src/@core/theme/ThemeComponent";

// ** Contexts
import {
  SettingsConsumer,
  SettingsProvider,
} from "src/@core/context/settingsContext";

// ** Utils Imports
import { createEmotionCache } from "src/@core/utils/create-emotion-cache";

// ** React Perfect Scrollbar Style
import "react-perfect-scrollbar/dist/css/styles.css";

// ** Global css styles
import "../../styles/globals.css";

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

import FooterContent from "src/@core/layouts/components/shared-components/footer/FooterContent";

// ✅ Mantine
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Layout function
  const getLayout =
    Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Do Re Mi Admin Panel</title>
        <meta name="description" content="Do Re Mi Admin Panel" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => (
            <ThemeComponent settings={settings}>
              <MantineProvider theme={{}}>
                {getLayout(<Component {...pageProps} />)}
                <FooterContent />
              </MantineProvider>
            </ThemeComponent>
          )}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  );
};

export default App;
