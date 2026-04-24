import "@/styles/globals.css";
import { DM_Sans, Rock_Salt, Caveat } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-src",
  weight: ["400", "800"],
  display: "swap",
});

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  variable: "--font-rock-salt-src",
  weight: ["400"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat-src",
  weight: ["400", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${dmSans.variable} ${rockSalt.variable} ${caveat.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
