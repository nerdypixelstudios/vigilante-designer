import { useEffect, useRef, useState } from 'react';
import {
  ExternalArrowIcon,
  VideoEnterFullscreenIcon,
  VideoExitFullscreenIcon,
} from '../../icons/icons';
import styles from './MoreWorkBrowserFrame.module.css';

export default function MoreWorkBrowserFrame({
  title,
  eyebrow,
  externalUrl,
  children,
  closeLabel,
  onClose,
  className = '',
  bodyClassName = '',
}) {
  const frameRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === frameRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    const frame = frameRef.current;

    if (!frame) return;

    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      return;
    }

    frame.requestFullscreen?.();
  };

  return (
    <div ref={frameRef} className={`${styles.frame} ${className}`}>
      <div className={styles.chrome}>
        <span className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className={styles.chromeTitle}>
          {eyebrow ? <span>{eyebrow}</span> : null}
          {title}
        </span>
        <span className={styles.controls}>
          {externalUrl ? (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.controlButton}
              aria-label={`Open ${title} in a new tab`}
            >
              <ExternalArrowIcon />
            </a>
          ) : null}
          <button
            type="button"
            className={styles.controlButton}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <VideoExitFullscreenIcon /> : <VideoEnterFullscreenIcon />}
          </button>
          {onClose ? (
            <button
              type="button"
              className={styles.controlButton}
              aria-label={closeLabel || 'Close'}
              onClick={onClose}
            >
              <span aria-hidden="true">x</span>
            </button>
          ) : null}
        </span>
      </div>
      <div className={`${styles.body} ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
