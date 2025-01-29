import { settings } from "@/settings/register";

import type { AppProps } from "next/app";
import "@blocksweb/core/dist/frontend/style.css";
import Head from "next/head";
import CookieBanner from "@/components/component/CookieBanner";
import { BlockswebProvider } from "@blocksweb/core";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BlockswebProvider settings={settings}>
      <>
        <Head>
          <link
            rel="icon"
            href="/static/images/logo/favicon.png"
            type="image/png"
            sizes="16x16"
          />
          {settings.scripts.map((script, index) => (
            // eslint-disable-next-line @next/next/no-sync-scripts
            <script key={index} src={script} />
          ))}
          {settings.styles.map((style, index) => (
            <link key={index} rel={style} />
          ))}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
        </Head>
        <Component {...pageProps} />
        <CookieBanner />
      </>
    </BlockswebProvider>
  );
}
