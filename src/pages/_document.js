import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon — static fallbacks; active favicon managed by MetaTags.jsx */}
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-normal-32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/favicon-normal-180.png" />

        {/* Open Graph — static; crawlers read this before JS runs */}
        <meta property="og:title" content="Lohith Savala — AI-Enabled Product Designer" />
        <meta property="og:description" content="I am a product designer who designs, builds, and ships — 4 production apps in 6 months, 7+ years of design at scale. See the work and the method behind it." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vigilante-designer.nerdypixelstudios.ca" />
        <meta property="og:image" content="https://vigilante-designer.nerdypixelstudios.ca/images/global/og-image-normal.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter/X card — static */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lohith Savala — AI-Enabled Product Designer" />
        <meta name="twitter:description" content="I am a product designer who designs, builds, and ships — 4 production apps in 6 months, 7+ years of design at scale. See the work and the method behind it." />
        <meta name="twitter:image" content="https://vigilante-designer.nerdypixelstudios.ca/images/global/og-image-normal.webp" />

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
