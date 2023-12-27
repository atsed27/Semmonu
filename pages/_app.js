import '@/styles/globals.css';
import '@/styles/HomeS.css';
import { SessionProvider } from 'next-auth/react';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Component {...pageProps} />
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}
