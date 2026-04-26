import "@/styles/globals.css";
import { ThemeProvider } from '../components/shared/ThemeContext';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
