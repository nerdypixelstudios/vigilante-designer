import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Fonts — DM Sans, Rock Salt, Caveat */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:wght@400;800&family=Rock+Salt&display=swap"
          rel="stylesheet"
        />
        {/* Cabinet Grotesk — Fontshare (not on Google Fonts) */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
