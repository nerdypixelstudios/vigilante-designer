import { useState, useRef, useEffect, useCallback } from 'react';
import GradeMedal from './GradeMedal';
import TimeBadge from './TimeBadge';
import { SkippedCheckmarkIcon, WarningCircleFilledIcon } from '../icons/DemoIcons';

const getGradeDescription = (grade) => {
  const descriptions = { A: 'Grade A: Excellent mastery', B: 'Grade B: Good understanding', C: 'Grade C: Satisfactory progress' };
  return (descriptions[grade] || `Grade ${grade}`) + '\nBased on the first attempt score only';
};

const getScoreTooltip = (activity) => {
  const first = activity.firstAttemptScore;
  const latest = activity.latestScore;
  const best = activity.bestScore;
  return `First Attempt: ${first != null ? first + '%' : '—'}\nLatest Attempt: ${latest != null ? latest + '%' : '—'}\nBest Attempt: ${best != null ? best + '%' : '—'}`;
};

const getStatusDescription = (status) => {
  const descriptions = { COMPLETED: 'Activity completed', INPROGRESS: 'Activity in progress', NOT_STARTED: 'Not started yet' };
  return descriptions[status] || status;
};

const ActivityLineItem = ({
  activity,
  numbering,
  onActivityClick,
  onLockedClick,
  onShadedClick,
  isShaded = false,
  animateIn = false,
  animationIndex = 0,
  getActivityTypeTheme,
  formatTimeMMSS,
  getStatusIcon,
  isHighlighted = false,
  highlightType = 'new',
  persistentLastVisitedId = null,
  locationInfo = null,
}) => {
  const [showShadedTooltip, setShowShadedTooltip] = useState(false);
  const [isShadedPinned, setIsShadedPinned] = useState(false);
  const shadedTooltipRef = useRef(null);
  const shadedHoverTimeoutRef = useRef(null);
  const rowRef = useRef(null);

  const shadedTooltipText = 'You already know this based on your diagnostic results. Turn off PACE from the panel above to access it.';

  const handleMouseEnter = () => {
    if (isShaded && !isShadedPinned) {
      shadedHoverTimeoutRef.current = setTimeout(() => setShowShadedTooltip(true), 400);
    }
  };

  const handleMouseLeave = () => {
    if (shadedHoverTimeoutRef.current) {
      clearTimeout(shadedHoverTimeoutRef.current);
      shadedHoverTimeoutRef.current = null;
    }
    if (!isShadedPinned) setShowShadedTooltip(false);
  };

  useEffect(() => {
    if (!isShadedPinned) return;
    const handleClickOutside = (e) => {
      if (shadedTooltipRef.current && !shadedTooltipRef.current.contains(e.target) &&
          rowRef.current && !rowRef.current.contains(e.target)) {
        setIsShadedPinned(false);
        setShowShadedTooltip(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') { setIsShadedPinned(false); setShowShadedTooltip(false); }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isShadedPinned]);

  useEffect(() => {
    return () => { if (shadedHoverTimeoutRef.current) clearTimeout(shadedHoverTimeoutRef.current); };
  }, []);

  const isLocked = activity.canAccess === false;
  const typeTheme = getActivityTypeTheme(activity.contentType);
  const isCompleted = activity.progressStatus === 'COMPLETED';
  const isInProgress = activity.progressStatus === 'INPROGRESS';
  const isNotStarted = activity.progressStatus === 'NOT_STARTED';
  const hasScore = isCompleted && activity.firstAttemptScore != null;
  const grade = hasScore ? activity.grade : null;
  const timeSpent = activity.timeSpentMinutes || (activity.timeSpentSeconds ? activity.timeSpentSeconds / 60 : 0);

  const highlightClass = isHighlighted
    ? `highlighted-activity ${highlightType === 'last-visited' ? 'highlight-last-visited' : 'highlight-new'}`
    : '';

  const isLastVisited = persistentLastVisitedId && String(activity.contentId) === String(persistentLastVisitedId);
  const animationStyle = animateIn ? { '--animation-delay': `${animationIndex * 0.08}s` } : {};

  const handleClick = useCallback((e) => {
    if (isLocked) {
      e.preventDefault();
      e.stopPropagation();
      onLockedClick?.(activity);
      return;
    }
    if (isShaded) {
      e.preventDefault();
      e.stopPropagation();
      if (isShadedPinned) {
        setIsShadedPinned(false);
        setShowShadedTooltip(false);
      } else {
        setIsShadedPinned(true);
        setShowShadedTooltip(true);
      }
      return;
    }
    onActivityClick(activity.contentId, activity.contentType, locationInfo);
  }, [isLocked, isShaded, activity, onLockedClick, onActivityClick, locationInfo, isShadedPinned]);

  return (
    <div
      ref={rowRef}
      className={`activity-line-item ${isInProgress ? 'in-progress' : ''} ${isCompleted ? 'completed' : ''} ${isNotStarted ? 'not-started' : ''} ${highlightClass} ${isLastVisited ? 'last-visited-persistent' : ''} ${isLocked ? 'locked' : ''} ${isShaded ? 'pace-shaded' : ''} ${animateIn ? 'pace-animate-in' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-activity-id={activity.contentId}
      title={isLocked ? 'This activity is locked. Upgrade to access.' : undefined}
      style={animationStyle}
    >
      {showShadedTooltip && isShaded && (
        <div ref={shadedTooltipRef} className="shaded-click-tooltip">
          <span className="shaded-click-tooltip__text">{shadedTooltipText}</span>
          <button
            className="shaded-click-tooltip__dismiss"
            onClick={(e) => { e.stopPropagation(); setIsShadedPinned(false); setShowShadedTooltip(false); }}
            aria-label="Dismiss"
          >×</button>
        </div>
      )}

      <span className={`activity-line-type-icon ${typeTheme.colorClass}`} title={typeTheme.name}>
        {typeTheme.icon}
      </span>

      <div className="activity-line-name-wrapper">
        <span className={`activity-line-number ${isShaded ? 'struck' : ''}`}>
          {(() => {
            const parts = numbering.split('.');
            const serial = parts[parts.length - 1];
            const prefix = parts.slice(0, -1).join('.') + '.';
            return (
              <>
                <span className="activity-number-prefix">{prefix}</span>
                <span className="activity-number-serial">{serial}</span>
              </>
            );
          })()}
        </span>

        <div className="activity-line-name-content">
          <span className={`activity-line-name ${isShaded ? 'struck' : ''}`}>{activity.contentName}</span>
          {(activity.estimatedMinutes > 0 || activity.estimatedDurationMinutes > 0) && (
            <>
              <span className="activity-line-dot-separator">·</span>
              <span className={`activity-line-time-badge-wrapper activity-line-time-badge-desktop ${isShaded ? 'time-badge-shaded' : ''}`}>
                <TimeBadge minutes={activity.estimatedMinutes || activity.estimatedDurationMinutes} size="xs" />
              </span>
              <span className={`activity-line-time-badge-wrapper activity-line-time-badge-mobile ${isShaded ? 'time-badge-shaded' : ''}`}>
                <TimeBadge minutes={activity.estimatedMinutes || activity.estimatedDurationMinutes} size="xs" customIcon={typeTheme.icon} customTheme={typeTheme.colorClass} />
              </span>
            </>
          )}
        </div>
      </div>

      <div className="activity-line-right-content">
        {isShaded && (
          <span className="skipped-badge">
            <span className="skipped-badge__icon">⏭</span>
            <span className="skipped-badge__text-full">Skipped</span>
            <span className="skipped-badge__text-short">Skip</span>
          </span>
        )}
        {hasScore && (
          <span className="activity-line-score" title={getScoreTooltip(activity)}>
            {activity.firstAttemptScore}%
          </span>
        )}
        {hasScore && (
          <span className="activity-line-grade-wrapper" title={getGradeDescription(grade)}>
            <GradeMedal grade={grade} size="xs" showLabel={false} />
          </span>
        )}
        {(isCompleted || isInProgress) && timeSpent > 0 && (
          <span className="activity-line-time" title="Time spent on this activity">
            {formatTimeMMSS(timeSpent)}
          </span>
        )}
        <span
          className="activity-line-status"
          title={isLocked ? 'Locked - Upgrade to access' : isShaded ? 'Skipped by PACE - you already know this' : getStatusDescription(activity.progressStatus)}
        >
          {isLocked ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          ) : isShaded ? (
            <SkippedCheckmarkIcon size={16} />
          ) : (
            getStatusIcon(activity.progressStatus)
          )}
        </span>
      </div>
    </div>
  );
};

export default ActivityLineItem;
