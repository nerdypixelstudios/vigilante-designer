import Head from 'next/head';
import { useEffect } from 'react';
import { useTheme } from './ThemeContext';

export default function MetaTags() {
  const { isFunMode } = useTheme();

  const title = isFunMode
    ? 'Lohith Savala — Vigilante Designer'
    : 'Lohith Savala — AI-Enabled Product Designer';

  useEffect(() => {
    const src = isFunMode
      ? '/favicons/favicon-fun-32.png'
      : '/favicons/favicon-normal-32.png';

    // Draw the PNG onto a canvas and use a data URL — Chrome reliably updates favicons this way
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      canvas.getContext('2d').drawImage(img, 0, 0, 32, 32);

      const existing = document.querySelector("link[rel~='icon'][type='image/png']");
      if (existing) document.head.removeChild(existing);

      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = canvas.toDataURL('image/png');
      document.head.appendChild(link);
    };
    img.src = src;

    // Apple Touch Icon — iOS home screen (best-effort toggle)
    const touchLink = document.querySelector("link[rel='apple-touch-icon']");
    if (touchLink) {
      touchLink.href = isFunMode
        ? '/favicons/favicon-fun-180.png'
        : '/favicons/favicon-normal-180.png';
    }
  }, [isFunMode]);

  const description =
    'I am a product designer who designs, builds, and ships — 4 production apps in 6 months, 7+ years of design at scale. See the work and the method behind it.';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph — used by LinkedIn, iMessage, Slack, WhatsApp */}
      <meta property="og:title" content="Lohith Savala — AI-Enabled Product Designer" />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://vigilante-designer.nerdypixelstudios.ca" />
      <meta property="og:image" content="https://vigilante-designer.nerdypixelstudios.ca/images/global/og-image-normal.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter/X card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Lohith Savala — AI-Enabled Product Designer" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://vigilante-designer.nerdypixelstudios.ca/images/global/og-image-normal.webp" />
    </Head>
  );
}
