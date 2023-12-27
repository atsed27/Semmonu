import '@/styles/globals.css';
import '@/styles/HomeS.css';
import { StoreProvider } from '@/utils/store';
export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
