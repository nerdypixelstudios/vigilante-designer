import { useEffect, useRef, useState } from 'react';
import { SkipIcon, LightningBoltIcon, CloseIcon } from '../icons/DemoIcons';

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export default function SkipIndicator({
  skippedActivities = [],
  getActivityTypeTheme,
  position = 'middle',
}) {
  const [showPopover, setShowPopover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const indicatorRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalMinutesSaved = skippedActivities.reduce((total, activity) => {
    return total + (activity.estimatedMinutes || activity.estimatedDurationMinutes || 0);
  }, 0);

  const handleClick = () => {
    if (isMobile || isTouchDevice()) {
      setShowPopover((prev) => !prev);
    }
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setShowPopover(false);
  };

  useEffect(() => {
    if (!showPopover || isMobile) return;
    const circle = circleRef.current;
    if (!circle) return;
    const rect = circle.getBoundingClientRect();
    setPopoverPos({
      top: rect.top + rect.height / 2,
      left: rect.right + 12,
    });
  }, [showPopover, isMobile]);

  useEffect(() => {
    if (!showPopover || !isMobile) return;
    const handleOutsideClick = (e) => {
      if (indicatorRef.current && !indicatorRef.current.contains(e.target)) {
        setShowPopover(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [showPopover, isMobile]);

  if (skippedActivities.length === 0) return null;

  return (
    <div
      className={`skip-indicator ${showPopover ? 'popover-open' : ''}`}
      ref={indicatorRef}
      onMouseEnter={() => !isMobile && !isTouchDevice() && setShowPopover(true)}
      onMouseLeave={() => !isMobile && !isTouchDevice() && setShowPopover(false)}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-expanded={showPopover}
      aria-label={`${skippedActivities.length} skipped ${skippedActivities.length === 1 ? 'activity' : 'activities'}, ${totalMinutesSaved} minutes saved`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setShowPopover((prev) => !prev);
        } else if (e.key === 'Escape' && showPopover) {
          setShowPopover(false);
        }
      }}
    >
      {position !== 'start' && (
        <div className="skip-indicator__line skip-indicator__line--top" />
      )}

      <div className="skip-indicator__circle" ref={circleRef}>
        <SkipIcon size={14} />
        <span className="skip-indicator__count">{skippedActivities.length}</span>
      </div>

      {position !== 'end' && (
        <div className="skip-indicator__line skip-indicator__line--bottom" />
      )}

      {showPopover && (
        <>
          {isMobile && <div className="skip-indicator__backdrop" onClick={handleDismiss} />}

          <div
            className={`skip-indicator__popover ${isMobile ? 'skip-indicator__popover--mobile' : ''}`}
            style={!isMobile ? { position: 'fixed', top: popoverPos.top, left: popoverPos.left, transform: 'translateY(-50%)' } : undefined}
          >
            {!isMobile && <div className="skip-indicator__popover-arrow" />}

            <div className="skip-indicator__popover-header">
              <div className="skip-indicator__popover-header-title">
                <SkipIcon size={14} />
                <span>{skippedActivities.length} {skippedActivities.length === 1 ? 'activity' : 'activities'} skipped</span>
              </div>
              {isMobile && (
                <button
                  className="skip-indicator__dismiss"
                  onClick={handleDismiss}
                  aria-label="Close skipped activities popup"
                >
                  <CloseIcon size={16} />
                </button>
              )}
            </div>

            <ul className="skip-indicator__popover-list">
              {skippedActivities.map((activity, index) => {
                const typeTheme = getActivityTypeTheme?.(activity.contentType, activity.subType) || {};
                const activityNumber = (activity.originalIndex !== undefined ? activity.originalIndex : index) + 1;
                return (
                  <li key={activity.contentId || index} className="skip-indicator__popover-item">
                    <span className="skip-indicator__popover-number">{activityNumber}</span>
                    <span className={`skip-indicator__popover-icon ${typeTheme.colorClass || ''}`}>
                      {typeTheme.icon || 'A'}
                    </span>
                    <span className="skip-indicator__popover-name">{activity.contentName}</span>
                  </li>
                );
              })}
            </ul>

            <div className="skip-indicator__popover-footer">
              <LightningBoltIcon size={12} />
              <span>{totalMinutesSaved} min saved</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
