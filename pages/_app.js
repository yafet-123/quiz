import "../styles/globals.css";
import Layout from '../components/layout/layout';
import { SessionProvider } from "next-auth/react";
import { Aurora } from "../components/common/Aurora";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Aurora />
      <SessionProvider session={session}>
        <Layout session={session} pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}
