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
    </Head>
  );
}
