import { useState, useRef, useEffect, useMemo } from 'react';
import CurrentModuleCard from '../ui/CurrentModuleCard';
import JourneyChips from '../ui/JourneyChips';
import DiagnosticBox from '../ui/DiagnosticBox';
import PaceIsland from '../ui/PaceIsland';
import HeroPaceIsland from '../ui/HeroPaceIsland';
import NextUpSection from '../ui/NextUpSection';
import SkipDiagnosticAlert from '../ui/SkipDiagnosticAlert';
import AdvisoryWarningModal from '../ui/AdvisoryWarningModal';
import DemoAppHeader from '../ui/DemoAppHeader';
import PaceToggleToast from '../ui/PaceToggleToast';
import {
  BookOpenIcon,
  PencilSquareIcon,
  UQEIcon,
  TrophyOutlineIcon,
  CementingQuizIcon,
  RemedialIcon,
  RevisionActivityIcon,
  CourseMockIcon,
  CompleteIcon,
  InProgressIcon,
  CircleIcon,
  FilterIcon,
  SearchIcon,
  CloseIcon,
  ExpandAllIcon,
  CollapseAllIcon,
  CurrentLocationIcon,
  EyeIcon,
  EyeOffIcon,
} from '../icons/DemoIcons';

// ─── Helper functions ─────────────────────────────────────────────────────────

const getStatusIcon = (status) => {
  switch (status) {
    case 'COMPLETED': return <CompleteIcon size={14} />;
    case 'INPROGRESS': return <InProgressIcon size={14} />;
    default: return <CircleIcon size={14} />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'COMPLETED': return '#10B981';
    case 'INPROGRESS': return '#006FEE';
    default: return '#CBD5E1';
  }
};

const getActivityTypeTheme = (contentType) => {
  switch (contentType) {
    case 'CONCEPT':
      return { name: 'Concept', icon: <BookOpenIcon size={14} />, colorClass: 'concept', gradient: 'var(--gradient-primary)', bgColor: 'rgba(0,111,238,0.08)', borderColor: 'rgba(0,111,238,0.2)', shimmerColor: 'rgba(0,111,238,0.6)', chipBg: 'rgba(0,111,238,0.1)', chipColor: 'var(--color-primary)' };
    case 'SKILL':
    case 'PROCESS_SKILL':
      return { name: 'Process Skill', icon: <PencilSquareIcon size={14} />, colorClass: 'skill', gradient: 'var(--gradient-warning)', bgColor: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.2)', shimmerColor: 'rgba(245,158,11,0.6)', chipBg: 'rgba(245,158,11,0.12)', chipColor: 'var(--color-warning-dark)' };
    case 'UQE':
      return { name: 'UQE', icon: <UQEIcon size={14} />, colorClass: 'uqe', gradient: 'var(--gradient-success)', bgColor: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.2)', shimmerColor: 'rgba(34,197,94,0.6)', chipBg: 'rgba(34,197,94,0.12)', chipColor: 'var(--color-success-dark)' };
    case 'MQE':
      return { name: 'Module Mock', icon: <TrophyOutlineIcon size={14} />, colorClass: 'module-mock', gradient: 'var(--gradient-purple)', bgColor: 'rgba(139,92,246,0.08)', borderColor: 'rgba(139,92,246,0.2)', shimmerColor: 'rgba(139,92,246,0.6)', chipBg: 'rgba(139,92,246,0.12)', chipColor: 'var(--color-purple-dark)' };
    case 'CEMENTING':
      return { name: 'Cementing Quiz', icon: <CementingQuizIcon size={14} />, colorClass: 'cementing', gradient: 'var(--gradient-cyan)', bgColor: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.2)', shimmerColor: 'rgba(6,182,212,0.6)', chipBg: 'rgba(6,182,212,0.12)', chipColor: '#0891B2' };
    case 'REMEDIAL':
      return { name: 'Remedial', icon: <RemedialIcon size={14} />, colorClass: 'remedial', gradient: 'var(--gradient-red)', bgColor: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)', shimmerColor: 'rgba(239,68,68,0.6)', chipBg: 'rgba(239,68,68,0.12)', chipColor: 'var(--color-red)' };
    case 'REVISION':
      return { name: 'Revision', icon: <RevisionActivityIcon size={14} />, colorClass: 'revision', gradient: 'var(--gradient-orange)', bgColor: 'rgba(249,115,22,0.08)', borderColor: 'rgba(249,115,22,0.2)', shimmerColor: 'rgba(249,115,22,0.6)', chipBg: 'rgba(249,115,22,0.12)', chipColor: '#EA580C' };
    case 'COURSE_MOCK':
      return { name: 'Course Mock', icon: <CourseMockIcon size={14} />, colorClass: 'course-mock', gradient: 'var(--gradient-yellow)', bgColor: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.2)', shimmerColor: 'rgba(245,158,11,0.6)', chipBg: 'rgba(245,158,11,0.12)', chipColor: '#B45309' };
    default:
      return { name: 'Activity', icon: <BookOpenIcon size={14} />, colorClass: 'concept', gradient: 'var(--gradient-primary)', bgColor: 'rgba(0,111,238,0.08)', borderColor: 'rgba(0,111,238,0.2)', shimmerColor: 'rgba(0,111,238,0.6)', chipBg: 'rgba(0,111,238,0.1)', chipColor: 'var(--color-primary)' };
  }
};

const formatTimeMMSS = (minutes) => {
  if (!minutes || minutes === 0) return '00:00';
  const totalSeconds = Math.round(minutes * 60);
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  if (hours > 0) return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getBlockStatus = (block) => {
  let allActivities = [];
  if (block.children) block.children.forEach(u => { if (u.contentItems) allActivities.push(...u.contentItems); });
  if (block.contentItems) allActivities.push(...block.contentItems);
  if (allActivities.length === 0) return 'NOT_STARTED';
  if (allActivities.every(a => a.progressStatus === 'COMPLETED')) return 'COMPLETED';
  if (allActivities.some(a => a.progressStatus === 'INPROGRESS' || a.progressStatus === 'COMPLETED')) return 'INPROGRESS';
  return 'NOT_STARTED';
};

const buildJourneyStages = (regularBlocks) => {
  const diagnosticDots = [];
  const learningDots = [];
  const cementingDots = [];

  regularBlocks.forEach((block, idx) => {
    const blockStatus = block.progressStatus || getBlockStatus(block);
    const blockType = (block.blockType || '').toUpperCase();
    const blockNameLower = (block.blockName || '').toLowerCase();

    const isCementing = blockType === 'CEMENTING' || blockType === 'CEMENTING_MODULE' || blockType === 'CEMENTING_HARD' || blockNameLower.includes('cementing');
    const isDiagnostic = blockType === 'DIAGNOSTIC' || blockNameLower.includes('diagnostic');

    const dot = { id: block.blockId, name: block.blockName, status: blockStatus, blockIndex: idx };

    if (isDiagnostic) diagnosticDots.push(dot);
    else if (isCementing) cementingDots.push(dot);
    else learningDots.push(dot);
  });

  const stages = [];
  if (diagnosticDots.length > 0) stages.push({ name: 'diagnostic', label: 'DIAGNOSTIC', dots: diagnosticDots });
  if (learningDots.length > 0) stages.push({ name: 'learning', label: 'LEARNING', dots: learningDots });
  if (cementingDots.length > 0) stages.push({ name: 'cementing', label: 'CEMENTING', dots: cementingDots });
  return stages;
};

const getJourneyPosition = (stages, currentModuleData) => {
  if (!currentModuleData || stages.length === 0) return { stageIndex: 0, dotIndex: 0 };
  const blockType = (currentModuleData.block.blockType || '').toUpperCase();
  const blockNameLower = (currentModuleData.block.blockName || '').toLowerCase();

  let targetStageName = 'learning';
  if (blockType === 'DIAGNOSTIC' || blockNameLower.includes('diagnostic')) targetStageName = 'diagnostic';
  else if (blockType === 'CEMENTING' || blockType === 'CEMENTING_MODULE' || blockType === 'CEMENTING_HARD' || blockNameLower.includes('cementing')) targetStageName = 'cementing';

  const stageIndex = stages.findIndex(s => s.name === targetStageName);
  if (stageIndex === -1) return { stageIndex: 0, dotIndex: 0 };
  const dotIndex = Math.max(0, stages[stageIndex].dots.findIndex(d => d.id === currentModuleData.block.blockId));
  return { stageIndex: Math.max(0, stageIndex), dotIndex };
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CourseHomePage({
  courseData,
  onActivityClick,
  isPaceOn = false,
  onPaceToggle,
  onDiagnosticClick,
  persistentLastVisitedId = null,
  onSkipDiagnosticPromptChange,
}) {
  const [viewMode, setViewMode] = useState('focused');
  const [searchQuery, setSearchQuery] = useState('');
  const [activityTypeFilter, setActivityTypeFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [expandCycleState, setExpandCycleState] = useState(null);
  const [expandAllState, setExpandAllState] = useState(null);
  const [showSkipDiagAlert, setShowSkipDiagAlert] = useState(false);
  const [showAdvisoryModal, setShowAdvisoryModal] = useState(false);
  const [pendingActivity, setPendingActivity] = useState(null);
  const [isHeroIslandVisible, setIsHeroIslandVisible] = useState(false);
  const [hideSkipped, setHideSkipped] = useState(false);
  const [paceAnimating, setPaceAnimating] = useState(false);
  const [paceToastVisible, setPaceToastVisible] = useState(false);
  const [paceToastState, setPaceToastState] = useState(isPaceOn);
  const filterDropdownRef = useRef(null);
  const heroBannerRef = useRef(null);

  const diagnostic = courseData.diagnostic;
  const diagnosticStatus = !diagnostic ? null
    : diagnostic.progressStatus === 'COMPLETED' ? 'completed'
    : diagnostic.progressStatus === 'INPROGRESS' ? 'in_progress'
    : 'not_attempted';

  const allActivities = useMemo(() => {
    const activities = [];
    (courseData.learningBlocks || []).forEach((block) => {
      (block.contentItems || []).forEach((activity) => activities.push(activity));
      (block.children || []).forEach((unit) => {
        (unit.contentItems || []).forEach((activity) => activities.push(activity));
      });
    });
    return activities;
  }, [courseData.learningBlocks]);

  const shadeableSkippedCount = useMemo(() => (
    isPaceOn && diagnosticStatus === 'completed'
      ? allActivities.filter((activity) => (
        activity.shaded === true &&
        ['CONCEPT', 'PROCESS_SKILL'].includes(activity.contentType) &&
        activity.progressStatus !== 'COMPLETED'
      )).length
      : 0
  ), [allActivities, diagnosticStatus, isPaceOn]);

  const preferredActivityId = persistentLastVisitedId
    ?? (diagnosticStatus === 'completed' ? courseData?.pace?.preferredActivityId : null);
  const highlightedActivityIds = preferredActivityId != null ? [Number(preferredActivityId)] : [];
  const paceHoursSaved = diagnostic?.results?.hours_saved || courseData?.pace?.hours_saved || 0;
  const paceActivitiesSkipped = diagnostic?.results?.activities_skipped || diagnostic?.activities_shaded?.length || 0;

  const findActivityRecord = (activityOrId, contentType) => {
    if (activityOrId && typeof activityOrId === 'object') {
      return activityOrId;
    }
    return allActivities.find((activity) => (
      Number(activity.contentId) === Number(activityOrId) &&
      (!contentType || activity.contentType === contentType || activity.subType === contentType)
    )) || null;
  };

  useEffect(() => {
    if (!filterExpanded) return;
    const handleClickOutside = (e) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
        setFilterExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterExpanded]);

  useEffect(() => {
    const banner = heroBannerRef.current;
    if (!banner || diagnosticStatus !== 'completed') {
      setIsHeroIslandVisible(false);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroIslandVisible(!entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(banner);
    return () => observer.disconnect();
  }, [diagnosticStatus]);

  useEffect(() => {
    if (persistentLastVisitedId == null) return undefined;
    const scrollTimer = setTimeout(() => {
      const activityElement = document.querySelector(`[data-activity-id="${persistentLastVisitedId}"]`);
      activityElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 180);
    return () => clearTimeout(scrollTimer);
  }, [persistentLastVisitedId, viewMode]);

  useEffect(() => {
    if (!isPaceOn) {
      setHideSkipped(false);
    }
  }, [isPaceOn]);

  useEffect(() => {
    onSkipDiagnosticPromptChange?.(showSkipDiagAlert);
  }, [onSkipDiagnosticPromptChange, showSkipDiagAlert]);

  // Filter blocks: exclude Next Up (blockId -1) and diagnostic blocks
  const regularBlocks = (courseData.learningBlocks || []).filter(block =>
    block.blockId !== -1 &&
    block.blockType !== 'DIAGNOSTIC_MODULE' &&
    block.blockType !== 'DIAGNOSTIC' &&
    !(block.blockName || '').toLowerCase().includes('diagnostic')
  );

  const findBlockIndexForActivity = (activityId) => regularBlocks.findIndex((block) => {
    if ((block.contentItems || []).some((activity) => Number(activity.contentId) === Number(activityId))) {
      return true;
    }
    return (block.children || []).some((unit) => (
      (unit.contentItems || []).some((activity) => Number(activity.contentId) === Number(activityId))
    ));
  });

  const fallbackCurrentModuleIndex = regularBlocks.findIndex((block) => {
    const allItems = [
      ...(block.contentItems || []),
      ...(block.children?.flatMap(u => u.contentItems || []) || []),
    ];
    return allItems.some((activity) => activity.progressStatus === 'INPROGRESS' || activity.progressStatus === 'NOT_STARTED');
  });

  const currentModuleIndex = preferredActivityId != null
    ? findBlockIndexForActivity(preferredActivityId)
    : fallbackCurrentModuleIndex;

  const resolvedCurrentModuleIndex = currentModuleIndex >= 0 ? currentModuleIndex : fallbackCurrentModuleIndex;

  const currentModuleData = resolvedCurrentModuleIndex >= 0
    ? { block: regularBlocks[resolvedCurrentModuleIndex], index: resolvedCurrentModuleIndex }
    : regularBlocks.length > 0 ? { block: regularBlocks[0], index: 0 } : null;

  const progressPercentage = courseData.totalContent > 0
    ? Math.round(((courseData.completedContent + shadeableSkippedCount) / courseData.totalContent) * 100)
    : 0;

  const journeyStages = buildJourneyStages(regularBlocks);
  const journeyPosition = getJourneyPosition(journeyStages, currentModuleData);

  // Build filter options from all blocks (excluding Next Up)
  const getExistingFilterOptions = () => {
    const allItems = [];
    const blocks = (courseData.learningBlocks || []).filter(b => b.blockId !== -1);
    blocks.forEach(block => {
      block.contentItems?.forEach(a => allItems.push({ type: a.contentType, status: a.progressStatus }));
      block.children?.forEach(unit => {
        unit.contentItems?.forEach(a => allItems.push({ type: a.contentType, status: a.progressStatus }));
      });
    });

    const types = new Set();
    allItems.forEach(item => {
      if (!statusFilter || item.status === statusFilter) types.add(item.type);
    });

    const statuses = new Set();
    allItems.forEach(item => {
      if (!activityTypeFilter || item.type === activityTypeFilter) {
        if (item.status) statuses.add(item.status);
      }
    });

    return { types, statuses };
  };
  const { types: existingActivityTypes, statuses: existingStatuses } = getExistingFilterOptions();

  const getActiveFilterCount = () => (activityTypeFilter ? 1 : 0) + (statusFilter ? 1 : 0);
  const clearAllFilters = () => { setActivityTypeFilter(null); setStatusFilter(null); };

  const handleExpandMode = (mode) => {
    if (mode === expandCycleState) { setExpandCycleState(null); return; }
    if (mode === 1) { setExpandCycleState(1); setExpandAllState(true); }
    else if (mode === 2) { setExpandCycleState(2); setExpandAllState(null); }
    else { setExpandCycleState(0); setExpandAllState(false); }
  };

  const handlePaceToggle = (nextState) => {
    const willTurnOn = Boolean(nextState);
    setPaceToastState(willTurnOn);
    setPaceToastVisible(false);
    setPaceAnimating(willTurnOn && !isPaceOn);
    if (!willTurnOn) {
      setHideSkipped(false);
    }
    onPaceToggle?.(willTurnOn);
    window.setTimeout(() => setPaceToastVisible(true), 0);
    if (willTurnOn && !isPaceOn) {
      window.setTimeout(() => setPaceAnimating(false), 900);
    } else {
      setPaceAnimating(false);
    }
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleActivityClick = (activityOrId, contentType, locationInfo) => {
    const activity = findActivityRecord(activityOrId, contentType);

    if (!isPaceOn && diagnosticStatus === 'not_attempted') {
      setShowSkipDiagAlert(true);
      return;
    }

    if (activity?.contentType === 'MQE' || activity?.subType === 'MQE') {
      setPendingActivity(activity);
      setShowAdvisoryModal(true);
      return;
    }

    if (activity) {
      onActivityClick?.(activity, locationInfo);
      return;
    }

    onActivityClick?.(activityOrId, locationInfo);
  };
  const nextUpBlock = (courseData.learningBlocks || []).find((block) => block.blockId === -1) || null;
  const shadedActivityIds = diagnostic?.activities_shaded || [];
  const hasCompletedDiagnostic = diagnosticStatus === 'completed';
  const heroBannerClassName = [
    'course-hero-banner',
    viewMode === 'focused' ? 'focus-mode' : 'full-view-mode',
    !hasCompletedDiagnostic ? 'no-pace-panel' : '',
  ].filter(Boolean).join(' ');
  const pageContentClassName = [
    'page-home-content',
    viewMode === 'full' ? 'full-view-mode' : '',
    !hasCompletedDiagnostic ? 'no-pace-panel' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="page-home">
      <DemoAppHeader currentCourseName={courseData.pageName} />

      {/* Course Hero Banner */}
      <div className={`course-hero-wrapper${viewMode === 'full' ? ' with-stats-bar' : ''}`}>
        <section
          ref={heroBannerRef}
          className={heroBannerClassName}
          style={viewMode === 'focused' ? { background: 'linear-gradient(135deg, #006FEE 0%, #006FEE 60%, #3B82F6 100%)' } : {}}
        >
          <div className="course-hero-content">
            <div className="course-hero-left">
              <span className="course-hero-category">{courseData.category}</span>
              <h1 className="course-hero-title">{courseData.pageName}</h1>
              <div className="course-hero-progress">
                <div className="course-hero-progress-bar">
                  <div className="course-hero-progress-fill" style={{ width: `${progressPercentage}%` }} />
                </div>
                <div className="course-hero-progress-row">
                  <span className="course-hero-progress-text">{progressPercentage}% complete</span>
                  {viewMode === 'full' && journeyStages.length > 0 && (
                    <>
                      <span className="course-hero-dot-separator">·</span>
                      <JourneyChips
                        stages={journeyStages}
                        currentStageIndex={journeyPosition.stageIndex}
                        isCourseCompleted={false}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="course-hero-right">
              <div id="demo-pace-island">
                <HeroPaceIsland
                  isOn={isPaceOn}
                  onToggle={handlePaceToggle}
                  showPaceToggle={diagnosticStatus === 'completed'}
                  viewMode={viewMode}
                  onViewModeChange={handleViewChange}
                  paceAnimating={paceAnimating}
                  hoursSaved={paceHoursSaved}
                  activitiesSkipped={paceActivitiesSkipped}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <main className={pageContentClassName}>
        {viewMode === 'focused' ? (
          <>
            {/* Diagnostic Box */}
            {diagnostic && diagnosticStatus && (
              <DiagnosticBox
                status={diagnosticStatus}
                diagnosticConfig={{
                  estimated_duration_minutes: diagnostic.estimatedDurationMinutes || diagnostic.estimated_duration_minutes || 10,
                  question_count: diagnostic.question_count || 5,
                }}
                results={diagnostic.results || diagnostic}
                onTakeDiagnostic={onDiagnosticClick}
                onResumeDiagnostic={onDiagnosticClick}
                onViewResults={onDiagnosticClick}
              />
            )}

            <NextUpSection
              nextUpBlock={nextUpBlock}
              onActivityClick={handleActivityClick}
              onLockedClick={() => {}}
              isPaceOn={isPaceOn}
              diagnosticStatus={diagnosticStatus}
              onTakeDiagnostic={onDiagnosticClick}
              getActivityTypeTheme={getActivityTypeTheme}
              formatTimeMMSS={formatTimeMMSS}
              preferredActivityId={courseData?.pace?.preferredActivityId}
            />

            {/* Current/First Module */}
            {currentModuleData && (
              <section className="activity-listing-section">
                <div className="activity-listing-header">
                  <div className="activity-listing-title-container">
                    <div className="activity-listing-title-group">
                      <div className="activity-listing-title-row">
                        <span className="activity-listing-title">
                          {!hasCompletedDiagnostic && progressPercentage === 0 ? 'Your First Module' : 'Current Module'}
                        </span>
                      </div>
                      <span className="activity-listing-descriptor">
                        {!hasCompletedDiagnostic && progressPercentage === 0
                          ? 'Start your course with this module'
                          : 'Your active learning module in this course'}
                      </span>
                    </div>
                  </div>

                  {isPaceOn && paceActivitiesSkipped > 0 && (
                    <button
                      type="button"
                      className={`hide-skipped-toggle ${hideSkipped ? 'active' : ''}`}
                      onClick={() => setHideSkipped((prev) => !prev)}
                    >
                      {hideSkipped ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                      <span>{hideSkipped ? 'Show skipped' : 'Hide skipped'}</span>
                    </button>
                  )}
                </div>
                <CurrentModuleCard
                  key={`focused-${currentModuleData.block.blockId}`}
                  block={currentModuleData.block}
                  moduleIndex={currentModuleData.index}
                  pageCode={null}
                  onActivityClick={handleActivityClick}
                  onLockedClick={() => {}}
                  onShadedClick={() => {}}
                  isPaceOn={isPaceOn}
                  shadedActivityIds={shadedActivityIds}
                  paceAnimating={paceAnimating}
                  hideSkipped={hideSkipped}
                  getStatusIcon={getStatusIcon}
                  getStatusColor={getStatusColor}
                  getActivityTypeTheme={getActivityTypeTheme}
                  formatTimeMMSS={formatTimeMMSS}
                  expandAllState={true}
                  searchQuery={searchQuery}
                  activityTypeFilter={activityTypeFilter}
                  statusFilter={statusFilter}
                  highlightedActivityIds={highlightedActivityIds}
                  highlightType="last-visited"
                  persistentLastVisitedId={persistentLastVisitedId}
                  isCurrentModule={true}
                  source="focused"
                />
              </section>
            )}
          </>
        ) : (
          /* Full View — all modules */
          <section className="full-view-section">
            {diagnostic && diagnosticStatus && (
              <DiagnosticBox
                status={diagnosticStatus}
                diagnosticConfig={{
                  estimated_duration_minutes: diagnostic.estimatedDurationMinutes || diagnostic.estimated_duration_minutes || 10,
                  question_count: diagnostic.question_count || 5,
                }}
                results={diagnostic.results || diagnostic}
                onTakeDiagnostic={onDiagnosticClick}
                onResumeDiagnostic={onDiagnosticClick}
                onViewResults={onDiagnosticClick}
              />
            )}

            {/* Header: title + search + filter + expand controls */}
            <div className="activity-listing-header">
              <div className="activity-listing-title-container">
                <div className="activity-listing-title-group">
                  <div className="activity-listing-title-row">
                    <span className="activity-listing-title">All Modules</span>
                  </div>
                  <span className="activity-listing-descriptor">
                    Complete course content with {regularBlocks.length} modules
                  </span>
                </div>
              </div>

                <div className="header-controls">
                {/* Search box */}
                <div className="activity-search-box search-box-compact search-desktop">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="activity-search-input"
                  />
                  {searchQuery ? (
                    <button className="search-action-btn clear" onClick={() => setSearchQuery('')}>
                      <CloseIcon size={18} />
                    </button>
                  ) : (
                    <button className="search-action-btn">
                      <SearchIcon size={18} />
                    </button>
                  )}
                </div>

                {/* Filter dropdown */}
                <div className="filter-dropdown-wrapper" ref={filterDropdownRef}>
                  <button
                    className={`filter-toggle-btn ${filterExpanded ? 'active' : ''}`}
                    onClick={() => setFilterExpanded(!filterExpanded)}
                    title="Filters"
                  >
                    <FilterIcon size={18} />
                    <span>Filters</span>
                    {getActiveFilterCount() > 0 && (
                      <span className="filter-badge">{getActiveFilterCount()}</span>
                    )}
                  </button>
                  {filterExpanded && (
                    <div className="filter-dropdown">
                      <div className="filter-dropdown-section">
                        <span className="filter-dropdown-label">ACTIVITY TYPE</span>
                        <div className="filter-dropdown-pills">
                          {existingActivityTypes.has('CONCEPT') && <button className={`filter-pill ${activityTypeFilter === 'CONCEPT' ? 'active' : ''}`} onClick={() => setActivityTypeFilter(p => p === 'CONCEPT' ? null : 'CONCEPT')}>Concept</button>}
                          {existingActivityTypes.has('SKILL') && <button className={`filter-pill ${activityTypeFilter === 'SKILL' ? 'active' : ''}`} onClick={() => setActivityTypeFilter(p => p === 'SKILL' ? null : 'SKILL')}>Skill</button>}
                          {existingActivityTypes.has('PROCESS_SKILL') && <button className={`filter-pill ${activityTypeFilter === 'PROCESS_SKILL' ? 'active' : ''}`} onClick={() => setActivityTypeFilter(p => p === 'PROCESS_SKILL' ? null : 'PROCESS_SKILL')}>Process Skill</button>}
                          {existingActivityTypes.has('UQE') && <button className={`filter-pill ${activityTypeFilter === 'UQE' ? 'active' : ''}`} onClick={() => setActivityTypeFilter(p => p === 'UQE' ? null : 'UQE')}>UQE</button>}
                          {existingActivityTypes.has('MQE') && <button className={`filter-pill ${activityTypeFilter === 'MQE' ? 'active' : ''}`} onClick={() => setActivityTypeFilter(p => p === 'MQE' ? null : 'MQE')}>MQE</button>}
                          {existingActivityTypes.has('CEMENTING') && <button className={`filter-pill ${activityTypeFilter === 'CEMENTING' ? 'active' : ''}`} onClick={() => setActivityTypeFilter(p => p === 'CEMENTING' ? null : 'CEMENTING')}>Cementing</button>}
                          {existingActivityTypes.has('REMEDIAL') && <button className={`filter-pill ${activityTypeFilter === 'REMEDIAL' ? 'active' : ''}`} onClick={() => setActivityTypeFilter(p => p === 'REMEDIAL' ? null : 'REMEDIAL')}>Remedial</button>}
                          {existingActivityTypes.has('COURSE_MOCK') && <button className={`filter-pill ${activityTypeFilter === 'COURSE_MOCK' ? 'active' : ''}`} onClick={() => setActivityTypeFilter(p => p === 'COURSE_MOCK' ? null : 'COURSE_MOCK')}>Course Mock</button>}
                        </div>
                      </div>
                      {existingStatuses.size > 0 && (
                        <div className="filter-dropdown-section">
                          <span className="filter-dropdown-label">STATUS</span>
                          <div className="filter-dropdown-pills">
                            {existingStatuses.has('NOT_STARTED') && <button className={`filter-pill ${statusFilter === 'NOT_STARTED' ? 'active' : ''}`} onClick={() => setStatusFilter(p => p === 'NOT_STARTED' ? null : 'NOT_STARTED')}>Not Started</button>}
                            {existingStatuses.has('INPROGRESS') && <button className={`filter-pill ${statusFilter === 'INPROGRESS' ? 'active' : ''}`} onClick={() => setStatusFilter(p => p === 'INPROGRESS' ? null : 'INPROGRESS')}>In Progress</button>}
                            {existingStatuses.has('COMPLETED') && <button className={`filter-pill ${statusFilter === 'COMPLETED' ? 'active' : ''}`} onClick={() => setStatusFilter(p => p === 'COMPLETED' ? null : 'COMPLETED')}>Completed</button>}
                          </div>
                        </div>
                      )}
                      {getActiveFilterCount() > 0 && (
                        <div className="filter-dropdown-footer">
                          <button className="filter-clear-btn" onClick={clearAllFilters}>Clear All Filters</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {isPaceOn && paceActivitiesSkipped > 0 && (
                  <button
                    type="button"
                    className={`hide-skipped-toggle ${hideSkipped ? 'active' : ''}`}
                    onClick={() => setHideSkipped((prev) => !prev)}
                  >
                    {hideSkipped ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                    <span>{hideSkipped ? 'Show skipped' : 'Hide skipped'}</span>
                  </button>
                )}

                {/* Expand mode switcher */}
                <div className="expand-mode-switcher">
                  <button
                    className={`expand-mode-btn ${expandCycleState === 1 ? 'expand-mode-btn--active' : ''}`}
                    onClick={() => handleExpandMode(1)}
                    title="Expand all modules"
                  >
                    <ExpandAllIcon size={13} /><span>All</span>
                  </button>
                  <button
                    className={`expand-mode-btn ${expandCycleState === 2 ? 'expand-mode-btn--active' : ''}`}
                    onClick={() => handleExpandMode(2)}
                    title="Show current module only"
                  >
                    <CurrentLocationIcon size={13} /><span>Current</span>
                  </button>
                  <button
                    className={`expand-mode-btn ${expandCycleState === 0 ? 'expand-mode-btn--active' : ''}`}
                    onClick={() => handleExpandMode(0)}
                    title="Collapse all modules"
                  >
                    <CollapseAllIcon size={13} /><span>None</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="full-view-modules">
              {regularBlocks.map((block, index) => (
                <CurrentModuleCard
                  key={block.blockId}
                  block={block}
                  moduleIndex={index}
                  pageCode={null}
                  onActivityClick={handleActivityClick}
                  onLockedClick={() => {}}
                  onShadedClick={() => {}}
                  isPaceOn={isPaceOn}
                  shadedActivityIds={shadedActivityIds}
                  paceAnimating={paceAnimating}
                  hideSkipped={hideSkipped}
                  getStatusIcon={getStatusIcon}
                  getStatusColor={getStatusColor}
                  getActivityTypeTheme={getActivityTypeTheme}
                  formatTimeMMSS={formatTimeMMSS}
                  initialExpanded={
                    expandCycleState === 2
                      ? (currentModuleData ? index === currentModuleData.index : index === 0)
                      : undefined
                  }
                  expandAllState={expandAllState}
                  searchQuery={searchQuery}
                  activityTypeFilter={activityTypeFilter}
                  statusFilter={statusFilter}
                  highlightedActivityIds={highlightedActivityIds}
                  highlightType="last-visited"
                  persistentLastVisitedId={persistentLastVisitedId}
                  isCurrentModule={currentModuleData ? index === currentModuleData.index : false}
                  source="full-view"
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <SkipDiagnosticAlert
        isOpen={showSkipDiagAlert}
        onClose={() => setShowSkipDiagAlert(false)}
        onLaunchDiagnostic={() => {
          setShowSkipDiagAlert(false);
          onDiagnosticClick?.();
        }}
        onSkip={() => setShowSkipDiagAlert(false)}
        estimatedDuration={diagnostic?.estimated_duration_minutes || diagnostic?.estimatedDurationMinutes || 10}
        hoursCouldSave={12}
      />

      <AdvisoryWarningModal
        isOpen={showAdvisoryModal}
        onClose={() => {
          setShowAdvisoryModal(false);
          setPendingActivity(null);
        }}
        title="Not Quite Ready"
        subtitle="You haven't completed enough of this module yet."
        body={
          <p>It's recommended to complete all activities in this module before attempting the mock assessment. This helps ensure you're fully prepared.</p>
        }
        primaryLabel="Continue Learning"
        onPrimary={() => {
          setShowAdvisoryModal(false);
          setPendingActivity(null);
        }}
        secondaryLabel="Take Mock Anyway"
        onSecondary={() => {
          setShowAdvisoryModal(false);
          onActivityClick?.(pendingActivity);
          setPendingActivity(null);
        }}
        theme="amber"
      />

      <PaceToggleToast
        isOn={paceToastState}
        isVisible={paceToastVisible}
        onDismiss={() => setPaceToastVisible(false)}
        hoursSaved={paceHoursSaved}
      />

      <PaceIsland
        isOn={isPaceOn}
        onToggle={handlePaceToggle}
        showPaceToggle={diagnosticStatus === 'completed'}
        viewMode={viewMode}
        onViewModeChange={handleViewChange}
        isVisible={diagnosticStatus === 'completed' && isHeroIslandVisible}
        paceAnimating={paceAnimating}
      />
    </div>
  );
}
