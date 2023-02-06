import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import Head from "next/head";

import { NotificationContextProvider } from "../store/notificationContext";

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next.js Events | Developed by Dan Phillips</title>
          <meta
            name="viewport"
            content="initial-scale=1.0 width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
