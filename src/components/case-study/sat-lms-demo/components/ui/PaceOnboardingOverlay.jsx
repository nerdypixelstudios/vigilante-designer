import { useState } from 'react';
import { CloseIcon, PlayIcon, PaceLogo, ArrowLeftIcon } from '../icons/DemoIcons';

const DEFAULT_VIDEO_URL = 'https://youtu.be/Wtppm3wCzBQ';

const getEmbedUrl = (url) => {
  const youtubeShortMatch = url.match(/youtu\.be\/([^?&/]+)/);
  if (youtubeShortMatch) {
    return `https://www.youtube.com/embed/${youtubeShortMatch[1]}?autoplay=1&rel=0`;
  }
  const youtubeFullMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (youtubeFullMatch) {
    return `https://www.youtube.com/embed/${youtubeFullMatch[1]}?autoplay=1&rel=0`;
  }
  if (url.includes('loom.com/share/')) {
    const embedUrl = url.replace('/share/', '/embed/').split('?')[0];
    return `${embedUrl}?hideEmbedTopBar=true&autoplay=1`;
  }
  return url;
};

const PaceOnboardingOverlay = ({
  isOpen,
  onClose,
  onGotIt,
  onWatchVideo,
  videoUrl = DEFAULT_VIDEO_URL,
}) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleGotIt = () => {
    (onGotIt || onClose)?.();
  };

  const handleWatchVideo = () => {
    if (onWatchVideo) {
      onWatchVideo();
    } else {
      setShowVideo(true);
    }
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  if (showVideo) {
    return (
      <div
        className="pace-onboarding__backdrop"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label="PACE introduction video"
      >
        <div className="pace-onboarding__video-modal">
          <button
            className="pace-onboarding__close"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon size={18} />
          </button>
          <div className="pace-onboarding__video-header">
            <button
              className="pace-onboarding__back-btn"
              onClick={handleCloseVideo}
              aria-label="Back to introduction"
            >
              <ArrowLeftIcon size={16} />
            </button>
            <h3 className="pace-onboarding__video-title">Introduction to PACE</h3>
          </div>
          <div className="pace-onboarding__video-container">
            <iframe
              src={getEmbedUrl(videoUrl)}
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; encrypted-media"
              title="PACE Introduction Video"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="pace-onboarding__backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pace-onboarding-title"
    >
      <div className="pace-onboarding__modal">
        <button
          className="pace-onboarding__close"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon size={18} />
        </button>

        <div className="pace-onboarding__header">
          <div className="pace-onboarding__emoji pace-onboarding__emoji--waving">
            <span role="img" aria-label="waving hand">👋</span>
          </div>
          <h2 id="pace-onboarding-title" className="pace-onboarding__title">
            Welcome to Your Personalized Course
          </h2>
        </div>

        <div className="pace-onboarding__content">
          <div className="pace-onboarding__pointer">
            <div className="pace-onboarding__pointer-bullet">•</div>
            <div className="pace-onboarding__pointer-content">
              <p className="pace-onboarding__pointer-text">
                We&apos;ve &ldquo;skipped&rdquo; activities you already know based on your diagnostic.
              </p>
              <div className="pace-onboarding__legend">
                <div className="pace-onboarding__legend-row">
                  <span className="pace-onboarding__badge pace-onboarding__badge--skipped">
                    <span className="pace-onboarding__badge-icon">⏭</span>
                    SKIPPED
                  </span>
                  <span className="pace-onboarding__legend-label">You already know this</span>
                </div>
                <div className="pace-onboarding__legend-row">
                  <span className="pace-onboarding__badge pace-onboarding__badge--normal">
                    NORMAL
                  </span>
                  <span className="pace-onboarding__legend-label">Recommended for you</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pace-onboarding__pointer">
            <div className="pace-onboarding__pointer-bullet">•</div>
            <div className="pace-onboarding__pointer-content">
              <p className="pace-onboarding__pointer-text">
                Use the PACE toggle to show/hide skipped activities anytime:
              </p>
              <div className="pace-onboarding__toggle-visual">
                <div className="pace-onboarding__toggle-demo">
                  <PaceLogo width={48} height={14} className="pace-onboarding__toggle-logo" />
                  <div className="pace-onboarding__toggle-switch">
                    <div className="pace-onboarding__toggle-track">
                      <div className="pace-onboarding__toggle-thumb" />
                    </div>
                  </div>
                </div>
                <span className="pace-onboarding__toggle-hint">Toggle this to see all activities</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pace-onboarding__actions">
          <div className="pace-onboarding__action-wrapper">
            <button
              className="pace-onboarding__btn pace-onboarding__btn--secondary"
              onClick={handleWatchVideo}
            >
              <PlayIcon size={16} />
              Watch 1-min video
            </button>
            <span className="pace-onboarding__action-subtext">optional</span>
          </div>
          <button
            className="pace-onboarding__btn pace-onboarding__btn--primary"
            onClick={handleGotIt}
          >
            Got it →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaceOnboardingOverlay;
