import { useEffect, useState } from 'react';
import { CheckIcon, LightningBoltIcon } from '../icons/DemoIcons';

const formatTimeSaved = (hours) => {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  if (minutes === 0) return `${wholeHours}h`;
  return `${wholeHours}h ${minutes}m`;
};

export default function PaceToggleToast({
  isOn,
  isVisible,
  onDismiss,
  autoDismissMs = 2800,
  hoursSaved = 0,
}) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isVisible) return undefined;

    const exitTimer = setTimeout(() => setIsExiting(true), autoDismissMs - 180);
    const dismissTimer = setTimeout(() => {
      setIsExiting(false);
      onDismiss?.();
    }, autoDismissMs);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(dismissTimer);
    };
  }, [autoDismissMs, isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <div
      className={`pace-toggle-toast ${isOn ? 'pace-toggle-toast--on' : 'pace-toggle-toast--off'} ${isExiting ? 'pace-toggle-toast--exiting' : ''}`}
      role="alert"
      aria-live="polite"
    >
      <div className="pace-toggle-toast__icon">
        <CheckIcon size={14} />
      </div>
      <span className="pace-toggle-toast__message">
        {isOn ? (
          <>
            Showing only needed activities
            <span className="pace-toggle-toast__time-saved">
              <LightningBoltIcon size={12} className="pace-toggle-toast__lightning" />
              Saving {formatTimeSaved(hoursSaved)}
            </span>
          </>
        ) : (
          'Showing all activities, including skipped ones'
        )}
      </span>
      <div
        className="pace-toggle-toast__progress"
        style={{ animationDuration: `${autoDismissMs}ms` }}
      />
    </div>
  );
}
