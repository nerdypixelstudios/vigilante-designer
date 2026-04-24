import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Cabinet Grotesk — from Fontshare (not on Google Fonts) */}
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
