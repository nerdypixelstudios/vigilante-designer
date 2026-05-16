import { useState, useEffect, useRef } from 'react';
import GradeMedal from './GradeMedal';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  LockIcon,
  CourseMockIcon,
  RevisionIcon,
  PlayIcon,
  ModuleMockIcon,
  SkippedCheckmarkIcon,
} from '../icons/DemoIcons';
import UnitBlock from './UnitBlock';
import ActivityLineItem from './ActivityLineItem';
import { findCurrentUnitIndex } from '../../data/courseHelpers';
import TimeBadge, { formatEstimatedTime, calculateTotalMinutes } from './TimeBadge';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== 'undefined' ? window.innerWidth <= 767 : false
  ));
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
};

const BLOCK_TYPE_CONFIG = {
  ASSESSMENT: { icon: CourseMockIcon, label: 'Assessment', colorClass: 'assessment', isSingleActivity: true },
  REVISION: { icon: RevisionIcon, label: 'Revision', colorClass: 'revision', isSingleActivity: false },
};

const CurrentModuleCard = ({
  block,
  moduleIndex,
  pageCode,
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
  initialExpanded = true,
  expandAllState = null,
  searchQuery = '',
  activityTypeFilter = null,
  statusFilter = null,
  highlightedActivityIds = [],
  highlightType = 'new',
  persistentLastVisitedId = null,
  courseName = 'this course',
  difficultyLevel = 'medium',
  isCurrentModule = false,
  onManualToggle = null,
  source = 'focused',
}) => {
  const SHADEABLE_TYPES = ['CONCEPT', 'PROCESS_SKILL'];
  const isItemShadeable = (item) => item.shaded === true && SHADEABLE_TYPES.includes(item.contentType);

  const paceSkippedCount = (() => {
    if (!isPaceOn) return 0;
    let count = 0;
    if (block.contentItems) count += block.contentItems.filter(a => a.shaded === true && a.progressStatus !== 'COMPLETED').length;
    if (block.children) block.children.forEach(unit => {
      if (unit.contentItems) count += unit.contentItems.filter(a => a.shaded === true && a.progressStatus !== 'COMPLETED').length;
    });
    return count;
  })();
  const effectiveCompleted = block.completedContent + paceSkippedCount;

  const progressPercentage = block.totalContent > 0 ? Math.round((effectiveCompleted / block.totalContent) * 100) : 0;
  const donutCircumference = 2 * Math.PI * 13;
  const donutDash = (progressPercentage / 100) * donutCircumference;
  const paceProgressTooltip = paceSkippedCount > 0 ? 'Skipped lessons count as done.\nPACE recognized your existing knowledge here.' : undefined;

  const calculateModuleTotalMinutes = () => {
    let total = 0;
    if (block.contentItems) total += calculateTotalMinutes(block.contentItems);
    if (block.children) block.children.forEach(unit => { if (unit.contentItems) total += calculateTotalMinutes(unit.contentItems); });
    return total;
  };
  const totalEstimatedMinutes = calculateModuleTotalMinutes();

  const calculateModuleShadedMinutes = () => {
    if (!isPaceOn || shadedActivityIds.length === 0) return 0;
    let total = 0;
    if (block.contentItems) total += block.contentItems.filter(isItemShadeable).reduce((sum, a) => sum + (a.estimatedMinutes || a.estimatedDurationMinutes || 0), 0);
    if (block.children) block.children.forEach(unit => { if (unit.contentItems) total += unit.contentItems.filter(isItemShadeable).reduce((sum, a) => sum + (a.estimatedMinutes || a.estimatedDurationMinutes || 0), 0); });
    return total;
  };
  const shadedMinutes = calculateModuleShadedMinutes();
  const remainingMinutes = totalEstimatedMinutes - shadedMinutes;
  const [displayedModuleMinutes, setDisplayedModuleMinutes] = useState(totalEstimatedMinutes);
  const displayedModuleMinutesRef = useRef(totalEstimatedMinutes);

  const shadedActivityCount_module = (() => {
    if (!isPaceOn || shadedActivityIds.length === 0) return 0;
    let count = 0;
    if (block.contentItems) count += block.contentItems.filter(isItemShadeable).length;
    if (block.children) block.children.forEach(unit => { if (unit.contentItems) count += unit.contentItems.filter(isItemShadeable).length; });
    return count;
  })();
  const hasShadedActivities = shadedActivityCount_module > 0;

  const skippedActivityCount = (() => {
    if (!isPaceOn) return 0;
    let count = 0;
    if (block.contentItems) count += block.contentItems.filter(isItemShadeable).length;
    if (block.children) block.children.forEach(unit => { if (unit.contentItems) count += unit.contentItems.filter(isItemShadeable).length; });
    return count;
  })();

  const formatTime = (mins) => {
    if (mins >= 60) { const h = Math.floor(mins / 60); const m = mins % 60; return m > 0 ? `${h}h ${m}min` : `${h}h`; }
    return `${mins} min`;
  };

  useEffect(() => {
    const targetMinutes = isPaceOn && hasShadedActivities ? remainingMinutes : totalEstimatedMinutes;
    const startValue = displayedModuleMinutesRef.current;
    const delta = targetMinutes - startValue;
    if (delta === 0) return undefined;

    let frameId;
    const startTime = performance.now();
    const duration = 550;

    const tick = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - ((1 - progress) * (1 - progress));
      const nextValue = Math.round(startValue + (delta * eased));
      displayedModuleMinutesRef.current = nextValue;
      setDisplayedModuleMinutes(nextValue);
      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [hasShadedActivities, isPaceOn, remainingMinutes, totalEstimatedMinutes]);

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
  const filterActivityOrRemedials = (activity) => filterActivity(activity);
  const isFilterActive = searchQuery || activityTypeFilter || statusFilter;

  const checkHasMatchingActivities = () => {
    if (!isFilterActive) return true;
    if (block.contentItems?.some(filterActivityOrRemedials)) return true;
    if (block.children?.some(unit => unit.contentItems?.some(filterActivityOrRemedials))) return true;
    return false;
  };
  const hasMatches = checkHasMatchingActivities();
  const shouldAutoExpand = isFilterActive && hasMatches;

  const moduleStorageKey = pageCode ? `prism_module_expanded_${pageCode}_${moduleIndex}` : null;

  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== 'undefined' && moduleStorageKey) {
      const saved = sessionStorage.getItem(moduleStorageKey);
      if (saved !== null) return saved === 'true';
    }
    return initialExpanded || shouldAutoExpand;
  });

  const [showLockedToast, setShowLockedToast] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (shouldAutoExpand) {
      setIsExpanded(true);
      if (typeof window !== 'undefined' && moduleStorageKey) sessionStorage.setItem(moduleStorageKey, 'true');
    } else if (expandAllState !== null) {
      const hasIndividualChoice = typeof window !== 'undefined' && moduleStorageKey && sessionStorage.getItem(moduleStorageKey) !== null;
      if (!hasIndividualChoice) {
        setIsExpanded(expandAllState);
        if (typeof window !== 'undefined' && moduleStorageKey) sessionStorage.setItem(moduleStorageKey, String(expandAllState));
      }
    }
  }, [shouldAutoExpand, expandAllState, moduleStorageKey]);

  const handleModuleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (typeof window !== 'undefined' && moduleStorageKey) sessionStorage.setItem(moduleStorageKey, String(newState));
    if (onManualToggle) onManualToggle();
  };

  useEffect(() => {
    if (showLockedToast) {
      const timer = setTimeout(() => setShowLockedToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showLockedToast]);

  if (!hasMatches) return null;

  const currentUnitIndex = block.children ? findCurrentUnitIndex(block.children) : 0;
  const blockTypeClass = block.blockType ? `block-type-${block.blockType.toLowerCase().replace('_', '-')}` : 'block-type-module';
  const isLocked = block.isLocked || false;
  const isSpecialBlock = block.blockType && BLOCK_TYPE_CONFIG[block.blockType];
  const typeConfig = isSpecialBlock ? BLOCK_TYPE_CONFIG[block.blockType] : null;
  const TypeIcon = typeConfig?.icon;
  const isRevision = block.blockType === 'REVISION';
  const isNotStarted = effectiveCompleted === 0 && block.totalContent > 0;
  const triggerReason = block.triggerReason || block.generationReason;
  const isSingleActivity = typeConfig?.isSingleActivity || false;
  const singleActivity = isSingleActivity ? block.contentItems?.[0] : null;
  const singleActivityId = singleActivity?.contentId;
  const isCompleted = effectiveCompleted > 0 && effectiveCompleted === block.totalContent;
  const containsLastVisitedActivity = persistentLastVisitedId != null && (
    (block.contentItems || []).some((activity) => String(activity.contentId) === String(persistentLastVisitedId)) ||
    (block.children || []).some((unit) => (
      (unit.contentItems || []).some((activity) => String(activity.contentId) === String(persistentLastVisitedId))
    ))
  );
  const singleActivityScore = singleActivity?.progressPercentage;
  const singleActivityGrade = isCompleted ? singleActivity?.grade : null;
  const singleActivityTime = singleActivity?.timeSpentMinutes || (singleActivity?.timeSpentSeconds ? singleActivity.timeSpentSeconds / 60 : 0);
  const singleActivityStatus = singleActivity?.progressStatus;

  const handleHeaderClick = () => {
    if (isLocked && isSingleActivity && isMobile) { setShowLockedToast(true); return; }
    if (isLocked) return;
    if (isSingleActivity && singleActivityId) {
      const locationInfo = { moduleIndex, unitIndex: null, source };
      onActivityClick(singleActivityId, singleActivity?.contentType, locationInfo);
    } else if (isSingleActivity) {
      return;
    } else {
      handleModuleToggle();
    }
  };

  return (
    <div
      className={`block-card ${isSingleActivity ? 'single-activity' : ''} ${isExpanded && !isSingleActivity ? 'expanded' : 'collapsed'} ${blockTypeClass} ${isLocked ? 'locked' : ''} ${isCompleted ? 'module-completed' : ''}`}
      data-block-id={block.blockId}
    >
      <div className="block-header" onClick={handleHeaderClick}>
        <div className="block-header-left">
          <div className="block-number">
            {isSpecialBlock && TypeIcon ? <TypeIcon size={18} /> : moduleIndex + 1}
          </div>
          <div className="block-info">
            <div className="block-name-row">
              <span className="block-name">{block.blockName}</span>
              {containsLastVisitedActivity && !isLocked && <span className="block-last-visited-badge">Last visited</span>}
              {isLocked && (
                <span className="block-lock-badge">
                  {isSingleActivity ? (
                    <span>*{block.lockReason || 'Complete all modules to unlock'}</span>
                  ) : (
                    <><LockIcon size={12} /><span>{block.lockReason || 'Locked'}</span></>
                  )}
                </span>
              )}
            </div>
            {(totalEstimatedMinutes > 0 || (isRevision && triggerReason) || (isPaceOn && hideSkipped && skippedActivityCount > 0)) && (
              <div className="block-meta-line">
                {totalEstimatedMinutes > 0 && (
                  isPaceOn && hasShadedActivities ? (
                    <span className="module-time-display pace-active">
                      <span className="pace-flash-icon">⚡</span>
                    <span className="pace-time-remaining">{formatTime(displayedModuleMinutes)}</span>
                      <span className="pace-time-separator">/</span>
                      <span className="pace-time-total">{formatTime(totalEstimatedMinutes)}</span>
                    </span>
                  ) : (
                    <TimeBadge minutes={totalEstimatedMinutes} size="xs" />
                  )
                )}
                {isRevision && triggerReason && totalEstimatedMinutes > 0 && <span className="block-meta-separator">·</span>}
                {isRevision && triggerReason && <span className="block-ai-descriptor">{triggerReason}</span>}
                {isPaceOn && hideSkipped && skippedActivityCount > 0 && (
                  <><span className="block-meta-separator">·</span>
                  <span className="skipped-hidden-note-inline">{skippedActivityCount} skipped {skippedActivityCount === 1 ? 'activity' : 'activities'} hidden</span></>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="block-header-right">
          {isSingleActivity ? (
            <div className="block-single-status">
              {isCompleted ? (
                <>
                  <span className="block-single-score">{singleActivityScore}%</span>
                  <GradeMedal grade={singleActivityGrade} size="xs" showLabel={false} />
                  <span className="block-single-time">{formatTimeMMSS(singleActivityTime)}</span>
                  <span className="block-single-status-icon">{getStatusIcon(singleActivityStatus)}</span>
                </>
              ) : isLocked ? (
                <div className="block-single-locked-status">
                  <span className="block-single-locked-text">*{block.lockReason || 'Complete all modules to unlock'}</span>
                  <LockIcon size={16} />
                </div>
              ) : (
                <button className={block.blockType === 'ASSESSMENT' ? 'block-single-text-cta' : 'block-single-cta'}>
                  {block.blockType === 'ASSESSMENT' ? (
                    <>{singleActivityStatus === 'INPROGRESS' ? 'Resume' : 'Start'} Ability Quiz <ChevronRightIcon size={14} /></>
                  ) : (
                    <><PlayIcon size={12} /><span>{singleActivityStatus === 'INPROGRESS' ? 'Resume' : 'Start'} {block.blockType === 'DIAGNOSTIC' ? 'Diagnostic' : 'Course Mock'}</span></>
                  )}
                </button>
              )}
            </div>
          ) : !isLocked ? (
            <div className="block-progress-donut-container" title={paceProgressTooltip}>
              <svg className="block-progress-donut" viewBox="0 0 36 36">
                <circle className="block-donut-bg" cx="18" cy="18" r="13" fill="none" strokeWidth="6" />
                <circle className="block-donut-progress" cx="18" cy="18" r="13" fill="none" strokeWidth="6"
                  strokeDasharray={`${donutDash} ${donutCircumference}`} strokeLinecap="round" transform="rotate(-90 18 18)" />
              </svg>
              <div className={`block-progress-count ${effectiveCompleted === 0 ? 'no-progress' : ''}`}>
                <span className="block-progress-completed">{effectiveCompleted}</span>
                <span className="block-progress-separator">/</span>
                <span className="block-progress-total">{block.totalContent}{paceSkippedCount > 0 && <sup>*</sup>}</span>
              </div>
            </div>
          ) : (
            <span className="block-locked-status"><LockIcon size={16} /></span>
          )}
          {!isSingleActivity && <span className="block-chevron"><ChevronDownIcon size={20} /></span>}
        </div>
      </div>

      {isExpanded && !isSingleActivity && (() => {
        const hasSingleUnit = block.children && block.children.length === 1;
        const skipUnitLevel = hasSingleUnit && block.blockType !== 'REVISION';
        const singleUnitActivities = skipUnitLevel ? block.children[0].contentItems : null;

        return (
          <div className="block-content">
            {skipUnitLevel && singleUnitActivities ? (
              <div className="module-direct-activities">
                {singleUnitActivities
                  .filter(filterActivityOrRemedials)
                  .filter(activity => !(hideSkipped && isPaceOn && isItemShadeable(activity)))
                  .map((activity, index) => {
                    const originalIndex = singleUnitActivities.findIndex(a => a.contentId === activity.contentId);
                    const isActivityShaded = isPaceOn && isItemShadeable(activity);
                    return (
                      <ActivityLineItem
                        key={activity.contentId}
                        activity={activity}
                        numbering={`${moduleIndex + 1}.1.${originalIndex + 1}`}
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
                        locationInfo={{ moduleIndex, unitIndex: 0, source }}
                      />
                    );
                  })}
              </div>
            ) : block.children && block.children.length > 0 ? (
              block.children.map((unit, unitIndex) => (
                <UnitBlock
                  key={unit.blockId}
                  unit={unit}
                  moduleIndex={moduleIndex}
                  unitIndex={unitIndex}
                  totalUnits={block.children.length}
                  isCurrentUnit={unitIndex === currentUnitIndex}
                  onActivityClick={onActivityClick}
                  onLockedClick={onLockedClick}
                  onShadedClick={onShadedClick}
                  isPaceOn={isPaceOn}
                  shadedActivityIds={shadedActivityIds}
                  paceAnimating={paceAnimating}
                  hideSkipped={hideSkipped}
                  getStatusIcon={getStatusIcon}
                  getStatusColor={getStatusColor}
                  getActivityTypeTheme={getActivityTypeTheme}
                  formatTimeMMSS={formatTimeMMSS}
                  expandAllState={expandAllState}
                  blockType={block.blockType}
                  searchQuery={searchQuery}
                  activityTypeFilter={activityTypeFilter}
                  statusFilter={statusFilter}
                  highlightedActivityIds={highlightedActivityIds}
                  highlightType={highlightType}
                  persistentLastVisitedId={persistentLastVisitedId}
                  pageCode={pageCode}
                  source={source}
                />
              ))
            ) : (
              block.contentItems && block.contentItems.length > 0 && (
                <div className="module-direct-activities">
                  {block.contentItems.filter(filterActivityOrRemedials).map((activity, index) => {
                    const originalIndex = block.contentItems.findIndex(a => a.contentId === activity.contentId);
                    const isActivityShaded = isPaceOn && isItemShadeable(activity);
                    return (
                      <ActivityLineItem
                        key={activity.contentId}
                        activity={activity}
                        numbering={`${moduleIndex + 1}.${originalIndex + 1}`}
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
                        locationInfo={{ moduleIndex, unitIndex: null, source }}
                      />
                    );
                  })}
                </div>
              )
            )}
          </div>
        );
      })()}

      {showLockedToast && (
        <div className="block-locked-toast">
          <LockIcon size={14} />
          <span>{block.lockReason || 'Complete all modules to unlock'}</span>
        </div>
      )}
    </div>
  );
};

export default CurrentModuleCard;
