import { useState, useEffect, useRef } from 'react';
import GradeMedal from './GradeMedal';
import { ChevronDownIcon, StarIcon } from '../icons/DemoIcons';
import ActivityLineItem from './ActivityLineItem';
import TimeBadge, { calculateTotalMinutes } from './TimeBadge';

const getGradeDescription = (grade) => {
  const descriptions = { A: 'Grade A: Excellent mastery', B: 'Grade B: Good understanding', C: 'Grade C: Satisfactory progress' };
  return (descriptions[grade] || `Grade ${grade}`) + '\nBased on the first attempt score only';
};

const getScoreTooltip = (activity) => {
  const first = activity.firstAttemptScore;
  const latest = activity.latestScore;
  const best = activity.bestScore;
  return `First Attempt: ${first != null ? first + '%' : '—'} · Latest: ${latest != null ? latest + '%' : '—'} · Best: ${best != null ? best + '%' : '—'}`;
};

const UnitBlock = ({
  unit,
  moduleIndex,
  unitIndex,
  totalUnits,
  isCurrentUnit,
  onActivityClick,
  onLockedClick,
  onShadedClick,
  isPaceOn = false,
  shadedActivityIds = [],
  paceAnimating = false,
  hideSkipped = false,
  getStatusIcon,
  getStatusColor,
  getActivityTypeTheme,
  formatTimeMMSS,
  expandAllState = null,
  blockType = null,
  searchQuery = '',
  activityTypeFilter = null,
  statusFilter = null,
  highlightedActivityIds = [],
  highlightType = 'new',
  persistentLastVisitedId = null,
  pageCode = null,
  source = 'focused',
}) => {
  const locationInfo = { moduleIndex, unitIndex, source };

  const filterActivity = (activity) => {
    const matchesSearch = !searchQuery || activity.contentName.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesType = true;
    if (activityTypeFilter) matchesType = activity.contentType === activityTypeFilter;
    let matchesStatus = true;
    if (statusFilter) {
      if (statusFilter === 'SKIPPED') matchesStatus = activity.shaded === true;
      else matchesStatus = activity.progressStatus === statusFilter && !activity.shaded;
    }
    return matchesSearch && matchesType && matchesStatus;
  };

  const SHADEABLE_HIDE_TYPES = ['CONCEPT', 'PROCESS_SKILL'];
  const filteredActivities = unit.contentItems?.filter(activity => {
    if (hideSkipped && isPaceOn && activity.shaded === true && SHADEABLE_HIDE_TYPES.includes(activity.contentType)) return false;
    return filterActivity(activity);
  }) || [];
  const hasFilteredActivities = filteredActivities.length > 0;
  const isFilterActive = searchQuery || activityTypeFilter || statusFilter;
  const shouldAutoExpand = isFilterActive && hasFilteredActivities;

  const storageKey = pageCode ? `prism_unit_expanded_${pageCode}_${moduleIndex}_${unitIndex}` : null;

  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== 'undefined' && storageKey) {
      const saved = sessionStorage.getItem(storageKey);
      if (saved !== null) return saved === 'true';
    }
    if (expandAllState === false) return false;
    if (expandAllState === true) return true;
    return isCurrentUnit || shouldAutoExpand;
  });

  useEffect(() => {
    if (shouldAutoExpand) {
      setIsExpanded(true);
      if (typeof window !== 'undefined' && storageKey) sessionStorage.setItem(storageKey, 'true');
    } else if (expandAllState !== null) {
      const hasIndividualChoice = typeof window !== 'undefined' && storageKey && sessionStorage.getItem(storageKey) !== null;
      if (!hasIndividualChoice) {
        setIsExpanded(expandAllState);
        if (typeof window !== 'undefined' && storageKey) sessionStorage.setItem(storageKey, String(expandAllState));
      }
    }
  }, [expandAllState, shouldAutoExpand, storageKey]);

  const handleToggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (typeof window !== 'undefined' && storageKey) sessionStorage.setItem(storageKey, String(newState));
  };

  if (isFilterActive && !hasFilteredActivities) return null;

  const SHADEABLE_TYPES = ['CONCEPT', 'PROCESS_SKILL'];
  const paceSkippedCount = isPaceOn && unit.contentItems
    ? unit.contentItems.filter(a => a.shaded === true && a.progressStatus !== 'COMPLETED').length
    : 0;
  const effectiveCompleted = unit.completedContent + paceSkippedCount;
  const paceProgressTooltip = paceSkippedCount > 0 ? 'Skipped lessons count as done.\nPACE recognized your existing knowledge here.' : undefined;

  const unitStatus = effectiveCompleted === unit.totalContent && unit.totalContent > 0 ? 'COMPLETED' :
    effectiveCompleted > 0 ? 'INPROGRESS' : 'NOT_STARTED';

  const isAssessment = unit.contentType === 'MQE' || unit.contentType === 'UQE' ||
    unit.blockName?.toLowerCase().includes('assessment') || unit.blockName?.toLowerCase().includes('mock');

  const singleAssessmentActivity = isAssessment
    ? (unit.contentItems?.[0] || { contentId: unit.blockId || unit.contentId, contentType: unit.contentType || 'MOCK', contentName: unit.blockName, progressStatus: unit.completedContent > 0 ? 'COMPLETED' : 'NOT_STARTED' })
    : null;

  const isRemedial = unit.blockName?.toLowerCase().includes('remedial') ||
    (unit.contentItems && unit.contentItems.some(item => item.subType === 'REMEDIAL'));
  const isRevision = blockType === 'REVISION';
  const isAttempted = effectiveCompleted > 0;
  const hasActivities = hasFilteredActivities;

  const progressPercentage = unit.totalContent > 0 ? Math.round((effectiveCompleted / unit.totalContent) * 100) : 0;
  const totalEstimatedMinutes = calculateTotalMinutes(unit.contentItems);

  const shadedMinutes = isPaceOn && unit.contentItems
    ? unit.contentItems.filter(a => a.shaded === true && SHADEABLE_TYPES.includes(a.contentType)).reduce((sum, a) => sum + (a.estimatedMinutes || a.estimatedDurationMinutes || 0), 0)
    : 0;
  const remainingMinutes = totalEstimatedMinutes - shadedMinutes;
  const [displayedUnitMinutes, setDisplayedUnitMinutes] = useState(totalEstimatedMinutes);
  const displayedUnitMinutesRef = useRef(totalEstimatedMinutes);
  const shadedActivityCount_unit = isPaceOn && unit.contentItems
    ? unit.contentItems.filter(a => a.shaded === true && SHADEABLE_TYPES.includes(a.contentType)).length
    : 0;
  const hasShadedActivities = shadedActivityCount_unit > 0;

  const formatTime = (mins) => {
    if (mins >= 60) { const h = Math.floor(mins / 60); const m = mins % 60; return m > 0 ? `${h}h ${m}min` : `${h}h`; }
    return `${mins} min`;
  };

  useEffect(() => {
    const targetMinutes = isPaceOn && hasShadedActivities ? remainingMinutes : totalEstimatedMinutes;
    const startValue = displayedUnitMinutesRef.current;
    const delta = targetMinutes - startValue;
    if (delta === 0) return undefined;

    let frameId;
    const startTime = performance.now();
    const duration = 550;

    const tick = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - ((1 - progress) * (1 - progress));
      const nextValue = Math.round(startValue + (delta * eased));
      displayedUnitMinutesRef.current = nextValue;
      setDisplayedUnitMinutes(nextValue);
      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [hasShadedActivities, isPaceOn, remainingMinutes, totalEstimatedMinutes]);

  return (
    <div className={`unit-block ${isAssessment ? 'assessment-unit' : ''} ${isExpanded ? 'expanded' : 'collapsed'} ${isCurrentUnit ? 'current-unit' : ''} ${unitStatus === 'COMPLETED' ? 'completed-unit' : ''}`}>
      <div
        className="unit-header"
        onClick={() => {
          if (singleAssessmentActivity) onActivityClick(singleAssessmentActivity.contentId, singleAssessmentActivity.contentType, locationInfo);
          else if (!isAssessment && hasActivities) handleToggleExpand();
        }}
        style={{ cursor: (singleAssessmentActivity || (!isAssessment && hasActivities)) ? 'pointer' : 'default' }}
        data-activity-id={singleAssessmentActivity?.contentId}
      >
        <div className="unit-header-left">
          {!isAssessment && <span className={`unit-marker ${isCurrentUnit ? 'current' : ''} ${unitStatus === 'COMPLETED' ? 'completed' : ''}`} />}
          {isAssessment && <span className="assessment-icon-circle"><StarIcon size={10} /></span>}
          {!isAssessment && (
            <span className={`unit-number-chip ${isRemedial ? 'remedial' : ''} ${isRevision ? 'revision' : ''} ${unitStatus === 'COMPLETED' ? 'completed' : ''}`}>
              {isRemedial ? 'Remedial' : isRevision ? 'Revision' : (<><span className="unit-text">Unit&nbsp;</span>{moduleIndex + 1}.{unitIndex + 1}</>)}
            </span>
          )}
          {isAssessment && <span className="unit-assessment-badge">Assessment</span>}
          <div className="unit-info">
            <span className="unit-title">{unit.blockName}</span>
            {totalEstimatedMinutes > 0 && (
              <>
                <span className="unit-dot-separator">·</span>
                {isPaceOn && hasShadedActivities ? (
                  <span className="unit-time-display pace-active">
                    <span className="pace-flash-icon">⚡</span>
                    <span className="pace-time-remaining">{formatTime(displayedUnitMinutes)}</span>
                    <span className="pace-time-separator">/</span>
                    <span className="pace-time-total">{formatTime(totalEstimatedMinutes)}</span>
                  </span>
                ) : (
                  <TimeBadge minutes={totalEstimatedMinutes} size="xs" />
                )}
              </>
            )}
          </div>
        </div>

        <div className="unit-header-right">
          {!isAssessment ? (
            <div className="unit-progress-container" title={paceProgressTooltip}>
              <svg className="unit-progress-donut" viewBox="0 0 36 36">
                <circle className="unit-donut-bg" cx="18" cy="18" r="13" fill="none" strokeWidth="6" />
                <circle className="unit-donut-progress" cx="18" cy="18" r="13" fill="none" strokeWidth="6"
                  strokeDasharray={`${progressPercentage} 100`} strokeLinecap="round" transform="rotate(-90 18 18)" />
              </svg>
              <span className="unit-progress">
                <span className={`unit-progress-completed ${effectiveCompleted === 0 ? 'zero' : ''} ${unitStatus === 'COMPLETED' ? 'completed' : ''}`}>{effectiveCompleted}</span>
                <span className="unit-progress-separator">/</span>
                <span className="unit-progress-total">{unit.totalContent}{paceSkippedCount > 0 && <sup>*</sup>}</span>
              </span>
            </div>
          ) : (
            isAttempted ? (
              <div className="activity-line-right-content assessment-right-content">
                {singleAssessmentActivity?.firstAttemptScore != null && (
                  <span className="activity-line-score" title={getScoreTooltip(singleAssessmentActivity)}>
                    {singleAssessmentActivity.firstAttemptScore}%
                  </span>
                )}
                {singleAssessmentActivity?.grade && (
                  <span className="activity-line-grade-wrapper" title={getGradeDescription(singleAssessmentActivity.grade)}>
                    <GradeMedal grade={singleAssessmentActivity.grade} size="xs" showLabel={false} />
                  </span>
                )}
                {(singleAssessmentActivity?.timeSpentMinutes > 0 || singleAssessmentActivity?.timeSpentSeconds > 0) && (
                  <span className="activity-line-time">
                    {formatTimeMMSS(singleAssessmentActivity.timeSpentMinutes || Math.round(singleAssessmentActivity.timeSpentSeconds / 60))}
                  </span>
                )}
                <span className="activity-line-status">{getStatusIcon(singleAssessmentActivity?.progressStatus)}</span>
              </div>
            ) : (
              <span className="unit-assessment-status unattempted">Unattempted</span>
            )
          )}
          {!isAssessment && hasActivities && (
            <span className="unit-chevron"><ChevronDownIcon size={20} /></span>
          )}
        </div>
      </div>

      {!isAssessment && hasActivities && isExpanded && (
        <div className="unit-activities">
          {filteredActivities.map((activity, index) => {
            const originalIndex = unit.contentItems.findIndex(a => a.contentId === activity.contentId);
            const isActivityShaded = isPaceOn && activity.shaded === true && SHADEABLE_TYPES.includes(activity.contentType);
            return (
              <ActivityLineItem
                key={activity.contentId}
                activity={activity}
                numbering={`${moduleIndex + 1}.${unitIndex + 1}.${originalIndex + 1}`}
                onActivityClick={onActivityClick}
                onLockedClick={onLockedClick}
                onShadedClick={onShadedClick}
                isShaded={isActivityShaded}
                animateIn={paceAnimating && isActivityShaded}
                animationIndex={index}
                getActivityTypeTheme={getActivityTypeTheme}
                formatTimeMMSS={formatTimeMMSS}
                getStatusIcon={getStatusIcon}
                isHighlighted={highlightedActivityIds.some(id => String(id) === String(activity.contentId))}
                highlightType={highlightType}
                persistentLastVisitedId={persistentLastVisitedId}
                locationInfo={locationInfo}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UnitBlock;
