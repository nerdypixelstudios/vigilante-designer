import { ChevronRightIcon } from '../icons/DemoIcons';
import TimeBadge from './TimeBadge';

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export default function ActivityCard({
  activity,
  index,
  isCurrent,
  isCompleted,
  typeTheme,
  onActivityClick,
  onLockedClick,
  formatTimeMMSS,
  cardId,
}) {
  const isNotStarted = activity.progressStatus === 'NOT_STARTED';
  const timeSpentMinutes =
    activity.timeSpentMinutes || (activity.timeSpentSeconds ? activity.timeSpentSeconds / 60 : 0);
  const hasTimeSpent = timeSpentMinutes > 0;
  const estimatedMinutes = activity.estimatedMinutes || activity.estimatedDurationMinutes || 0;
  const isRemedial = activity.contentType === 'REMEDIAL' || activity.subType === 'REMEDIAL';
  const isLocked = activity.canAccess === false;

  const handleCardClick = (e) => {
    if (isTouchDevice()) return;
    if (e.target.closest('.activity-card-cta')) return;
    if (isLocked && onLockedClick) {
      onLockedClick(activity);
      return;
    }
    if (!isLocked) {
      onActivityClick(activity.contentId, activity.contentType, { source: 'next-up' });
    }
  };

  const handleCtaClick = () => {
    if (isLocked && onLockedClick) {
      onLockedClick(activity);
      return;
    }
    onActivityClick(activity.contentId, activity.contentType, { source: 'next-up' });
  };

  return (
    <div
      id={cardId}
      className={`activity-card ${typeTheme.colorClass} ${isCurrent ? 'current-card' : ''} ${isCompleted ? 'completed-card' : ''} ${isLocked ? 'locked-card' : ''}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCtaClick();
        }
      }}
      title={isLocked ? 'This activity is locked. Upgrade to access.' : activity.contentName}
    >
      {isLocked && (
        <div className="activity-card-lock-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
      )}

      <div className="activity-card-top">
        <div className="activity-card-header">
          <div className="activity-card-number">
            {index + 1}
          </div>
        </div>

        <div className="activity-card-body">
          <h3 className="activity-card-name">{activity.contentName}</h3>
          <div className="activity-card-type-chip">
            {typeTheme.icon}
            <span>{typeTheme.name}</span>
          </div>
          {isRemedial && activity.mistakeCount && (
            <div className="activity-card-remedial-descriptor">
              <strong>Fix {activity.mistakeCount} gap{activity.mistakeCount !== 1 ? 's' : ''}</strong> based on{' '}
              {activity.motherActivityName && (
                <><span className="remedial-mother-name">{activity.motherActivityName}</span> attempt</>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="activity-card-footer">
        <div className="activity-card-time-stack">
          {!isNotStarted && hasTimeSpent && (
            <div className="activity-card-time-spent" title="Time spent on this activity">
              <span>{formatTimeMMSS(timeSpentMinutes)}</span>
            </div>
          )}
          {estimatedMinutes > 0 && (
            <span className="activity-card-time-badge-wrapper">
              <TimeBadge minutes={estimatedMinutes} size="xs" />
            </span>
          )}
        </div>
        <button
          className="activity-card-cta"
          onClick={handleCtaClick}
        >
          {isLocked && (
            <svg className="activity-card-cta-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
          {isCompleted ? 'Review' : (activity.progressStatus === 'INPROGRESS' ? 'Resume' : 'Start')}
          {!isLocked && <ChevronRightIcon size={14} />}
        </button>
      </div>
    </div>
  );
}
