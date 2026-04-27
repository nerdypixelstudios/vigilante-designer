import { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';
import styles from './StoryBanner.module.css';

const AUTO_DISMISS_MS = 3600;

export default function StoryBanner() {
  const { bannerEvent, dismissBanner } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!bannerEvent) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const hideTimer = setTimeout(() => setVisible(false), AUTO_DISMISS_MS);
    const cleanupTimer = setTimeout(() => dismissBanner(), AUTO_DISMISS_MS + 420);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(cleanupTimer);
    };
  }, [bannerEvent, dismissBanner]);

  if (!bannerEvent) return null;

  const isFun = bannerEvent.mode === 'fun';
  const cardClass = isFun ? styles.cardFun : styles.cardNormal;

  return (
    <div
      className={`${styles.bannerWrap} ${visible ? styles.visible : ''}`}
      onClick={() => { setVisible(false); setTimeout(dismissBanner, 320); }}
      role="status"
      aria-live="polite"
    >
      <div className={`${styles.card} ${cardClass}`}>
        <span className={styles.accent} aria-hidden="true">{bannerEvent.accent}</span>
        <div className={styles.copyStack}>
          {bannerEvent.intro && (
            <span className={styles.intro}>{bannerEvent.intro}</span>
          )}
          <span className={isFun ? styles.headlineFun : styles.headlineNormal}>
            {bannerEvent.headline}
          </span>
          {bannerEvent.caption && (
            <span className={styles.caption}>{bannerEvent.caption}</span>
          )}
        </div>
      </div>
    </div>
  );
}
