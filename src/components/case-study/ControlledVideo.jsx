import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import {
  VideoEnterFullscreenIcon,
  VideoExitFullscreenIcon,
  VideoPauseIcon,
  VideoPlayIcon,
} from '../icons/icons';
import styles from './ControlledVideo.module.css';

const ControlledVideo = forwardRef(function ControlledVideo({
  sources,
  poster,
  autoPlay = false,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'metadata',
  ariaLabel,
  className = '',
  mediaClassName = '',
  videoClassName = '',
  chrome = null,
  playWhen = false,
  playbackRate = 1,
}, forwardedRef) {
  const rootRef = useRef(null);
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay || playWhen);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const setRootNode = useCallback((node) => {
    rootRef.current = node;

    if (typeof forwardedRef === 'function') {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  }, [forwardedRef]);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !playWhen) {
      return;
    }

    video.play().catch(() => {});
  }, [playWhen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === mediaRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleFullscreen = () => {
    const media = mediaRef.current;
    const video = videoRef.current;

    if (!media || !video) {
      return;
    }

    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      return;
    }

    if (media.requestFullscreen) {
      media.requestFullscreen();
      return;
    }

    video.webkitEnterFullscreen?.();
  };

  return (
    <div ref={setRootNode} className={`${styles.root} ${className}`}>
      {chrome}
      <div ref={mediaRef} className={`${styles.media} ${mediaClassName}`}>
        <video
          ref={videoRef}
          className={videoClassName}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          poster={poster}
          aria-label={ariaLabel}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
        <button
          type="button"
          className={`${styles.controlButton} ${styles.playButton}`}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          onClick={togglePlayback}
        >
          {isPlaying ? <VideoPauseIcon /> : <VideoPlayIcon />}
        </button>
        <button
          type="button"
          className={`${styles.controlButton} ${styles.fullscreenButton}`}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <VideoExitFullscreenIcon /> : <VideoEnterFullscreenIcon />}
        </button>
      </div>
    </div>
  );
});

export default ControlledVideo;
