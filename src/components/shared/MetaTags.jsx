import Head from 'next/head';
import { useEffect } from 'react';
import { useTheme } from './ThemeContext';

const faviconSources = {
  normal: '/favicons/favicon-normal.png',
  fun: '/favicons/favicon-fun.png',
};

export default function MetaTags() {
  const { isFunMode } = useTheme();

  const title = isFunMode
    ? 'Lohith Savala — Vigilante Designer'
    : 'Lohith Savala — AI-Enabled Product Designer';

  useEffect(() => {
    const src = isFunMode ? faviconSources.fun : faviconSources.normal;

    // Draw the PNG onto a square canvas so Chrome reliably updates favicons without stretching portraits.
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const context = canvas.getContext('2d');
      const size = Math.min(canvas.width / img.width, canvas.height / img.height);
      const width = img.width * size;
      const height = img.height * size;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, width, height);

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
      touchLink.href = src;
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
