import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SkipIcon, CloseIcon, PaceLogo } from '../icons/DemoIcons';

const DimmedActivityTooltip = ({
  isVisible,
  onTogglePaceOff,
  onDismiss,
  anchorElement,
}) => {
  const tooltipRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!anchorElement) return;
    if (isVisible) {
      anchorElement.classList.add('dimmed-tooltip-anchor');
    } else {
      anchorElement.classList.remove('dimmed-tooltip-anchor');
    }
    return () => anchorElement.classList.remove('dimmed-tooltip-anchor');
  }, [isVisible, anchorElement]);

  useLayoutEffect(() => {
    if (!isVisible || !anchorElement || !tooltipRef.current || isMobile) return;

    const positionTooltip = () => {
      const rect = anchorElement.getBoundingClientRect();
      const tooltip = tooltipRef.current;
      if (!tooltip) return;

      const tooltipWidth = 480;
      const tooltipHeight = tooltip.offsetHeight;
      const gap = 16;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let left = rect.right + gap;
      let top = rect.top + (rect.height / 2) - (tooltipHeight / 2);

      const fitsOnRight = left + tooltipWidth <= viewportWidth - 16;

      if (!fitsOnRight) {
        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
        top = rect.bottom + 12;
      }

      if (left < 16) left = 16;
      if (left + tooltipWidth > viewportWidth - 16) left = viewportWidth - tooltipWidth - 16;
      if (top < 16) top = 16;
      if (top + tooltipHeight > viewportHeight - 16) top = viewportHeight - tooltipHeight - 16;

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
    };

    positionTooltip();
  }, [isVisible, anchorElement, isMobile]);

  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        onDismiss?.();
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') onDismiss?.();
    };

    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }, 100);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, onDismiss]);

  useEffect(() => {
    if (!isVisible || isMobile) return;
    const handleScroll = () => onDismiss?.();
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [isVisible, isMobile, onDismiss]);

  if (!isVisible) return null;

  const tooltipContent = (
    <>
      {isMobile && (
        <div className="dimmed-tooltip-backdrop" onClick={onDismiss} />
      )}

      <div
        className="dimmed-tooltip"
        ref={tooltipRef}
        role="dialog"
        aria-label="Activity explanation"
      >
        <div className="dimmed-tooltip__header">
          <div className="dimmed-tooltip__icon">
            <SkipIcon size={22} />
          </div>
          <div className="dimmed-tooltip__header-text">
            <span className="dimmed-tooltip__title">You Already Know This</span>
            <span className="dimmed-tooltip__subtitle">Based on your diagnostic results</span>
          </div>
          <button
            className="dimmed-tooltip__close"
            onClick={onDismiss}
            aria-label="Close"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        <div className="dimmed-tooltip__content">
          <p className="dimmed-tooltip__text">
            You&apos;ve demonstrated knowledge of this activity&apos;s content in your diagnostic.
            That&apos;s why it&apos;s shaded — you can skip it and focus on what you need to learn!
          </p>
        </div>

        <div className="dimmed-tooltip__action-section">
          <h5 className="dimmed-tooltip__action-heading">Still want to access it?</h5>
          <p className="dimmed-tooltip__action-text">
            Turn off PACE using the button below. Remember, you will be turning it off for this
            entire course and can turn it back on from the PACE panel at the top.
          </p>

          <div className="dimmed-tooltip__actions">
            <button
              className="dimmed-tooltip__btn dimmed-tooltip__btn--primary"
              onClick={onDismiss}
            >
              Got it
            </button>
            <button
              className="dimmed-tooltip__btn dimmed-tooltip__btn--secondary"
              onClick={onTogglePaceOff}
            >
              <span>Turn off</span>
              <PaceLogo width={44} height={13} className="dimmed-tooltip__pace-logo" />
            </button>
          </div>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return createPortal(tooltipContent, document.body);
  }

  return tooltipContent;
};

export default DimmedActivityTooltip;
