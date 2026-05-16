import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  LiveProductArrowIcon,
  ShippedCourseLandingIcon,
  ShippedDiagnosticIcon,
  ShippedLearningIcon,
  ShippedNextIcon,
  ShippedPathIcon,
  ShippedRemedialIcon,
  ShippedResultsIcon,
  VideoEnterFullscreenIcon,
  VideoExitFullscreenIcon,
} from '../icons/icons';
import { SatLmsDemo } from './sat-lms-demo';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  RefreshIcon,
} from './sat-lms-demo/components/icons/DemoIcons';
import {
  FLOW_ORDER,
  DEMO_FLOWS,
  getFlowStepIds,
  getStep,
  getStepPosition,
} from './sat-lms-demo/data/demoSteps';
import styles from './ShippedFlowSection.module.css';

const liveProductUrl = 'https://prismlearning.academy/sat/prep/course/sentence_foundations';
const GUIDE_WIDTH_DEFAULT = 360;
const GUIDE_WIDTH_MIN = 304;
const GUIDE_WIDTH_MAX = 384;

const mapNodes = [
  ['node1', '1', 'Course landing', 'The learner enters the course and sees the diagnostic as the first clear action.', ShippedCourseLandingIcon],
  ['node2', '2', 'Attempt diagnostic', 'The learner starts the diagnostic to establish a reliable baseline.', ShippedDiagnosticIcon],
  ['node3', '3', 'Diagnostic results', 'The system turns performance into direction instead of showing a raw score alone.', ShippedResultsIcon],
  ['node4', '4', 'Personalized path', 'The product generates a focused path based on what the learner knows and still needs to prove.', ShippedPathIcon],
  ['node5', '5', 'Start learning in personalized path', 'The learner begins with one recommended lesson inside the personalized path.', ShippedLearningIcon],
  ['node6', '6', 'Remedial activity', 'If mastery is not demonstrated, the learner receives targeted remedial work.', ShippedRemedialIcon, true],
  ['node7', '7', 'Next activity / section', 'If mastery is achieved - or after remediation - the learner proceeds to the next activity.', ShippedNextIcon, true],
];

function getCompletedStepIds(flowId, stepId) {
  if (!flowId) return new Set();
  const orderedSteps = getFlowStepIds(flowId);
  const currentIndex = orderedSteps.indexOf(stepId);
  if (currentIndex === -1) return new Set();
  return new Set(orderedSteps.slice(0, currentIndex));
}

function clampGuideWidth(value) {
  return Math.min(GUIDE_WIDTH_MAX, Math.max(GUIDE_WIDTH_MIN, value));
}

function DemoGuideIcon({ className = '' }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M13.8386 13.0132L12.2 11.3764L13.8281 9.74836C13.8974 9.67895 13.9481 9.5932 13.9755 9.49903C14.0029 9.40486 14.0061 9.3053 13.9849 9.20955C13.9636 9.1138 13.9186 9.02494 13.854 8.95118C13.7893 8.87742 13.7071 8.82114 13.615 8.78753L8.37949 6.88806C8.17095 6.81269 7.94525 6.79826 7.72881 6.84648C7.51236 6.8947 7.31413 7.00356 7.1573 7.16033C7.00047 7.3171 6.89153 7.51529 6.84323 7.73172C6.79492 7.94814 6.80926 8.17384 6.88455 8.38242L8.78928 13.6179C8.82272 13.7102 8.87887 13.7925 8.95253 13.8572C9.02619 13.922 9.11499 13.9672 9.21073 13.9886C9.25234 13.9977 9.29482 14.0022 9.3374 14.002C9.4922 14.002 9.64065 13.9405 9.7501 13.831L11.3764 12.2L13.0132 13.8368C13.1233 13.9432 13.2707 14.002 13.4238 14.0007C13.5768 13.9993 13.7232 13.9379 13.8315 13.8297C13.9397 13.7215 14.0011 13.5751 14.0024 13.422C14.0037 13.269 13.9449 13.1215 13.8386 13.0114V13.0132ZM9.57323 12.3547L7.98314 7.98256L12.3553 9.57265L9.57323 12.3547Z" fill="currentColor" />
      <path d="M5.83734 11.6747C4.68282 11.6747 3.55424 11.3323 2.59429 10.6909C1.63434 10.0495 0.886158 9.13783 0.444344 8.0712C0.00252921 7.00456 -0.11307 5.83087 0.112165 4.69853C0.3374 3.5662 0.893353 2.52609 1.70972 1.70972C2.52609 0.893353 3.5662 0.337401 4.69853 0.112165C5.83087 -0.11307 7.00456 0.00252921 8.07119 0.444344C9.13783 0.886158 10.0495 1.63434 10.6909 2.59429C11.3323 3.55424 11.6747 4.68283 11.6747 5.83734C11.6747 5.99216 11.6132 6.14063 11.5037 6.2501C11.3942 6.35958 11.2458 6.42108 11.0909 6.42108C10.9361 6.42108 10.7877 6.35958 10.6782 6.2501C10.5687 6.14063 10.5072 5.99216 10.5072 5.83734C10.5072 4.91373 10.2333 4.01086 9.7202 3.2429C9.20707 2.47494 8.47773 1.87639 7.62442 1.52294C6.77112 1.16949 5.83216 1.07701 4.9263 1.2572C4.02043 1.43739 3.18834 1.88215 2.53524 2.53524C1.88215 3.18834 1.43739 4.02043 1.2572 4.9263C1.07701 5.83216 1.16949 6.77112 1.52294 7.62442C1.87639 8.47773 2.47494 9.20707 3.2429 9.7202C4.01086 10.2333 4.91373 10.5072 5.83734 10.5072C5.99216 10.5072 6.14063 10.5687 6.2501 10.6782C6.35957 10.7877 6.42108 10.9361 6.42108 11.0909C6.42108 11.2458 6.35957 11.3942 6.2501 11.5037C6.14063 11.6132 5.99216 11.6747 5.83734 11.6747Z" fill="currentColor" />
      <path d="M4.71885 9.11792C4.64214 9.11797 4.56617 9.10289 4.49528 9.07356C3.96342 8.85265 3.49423 8.504 3.12928 8.05848C2.76433 7.61296 2.51487 7.08431 2.403 6.51937C2.29113 5.95442 2.3203 5.3706 2.48793 4.81962C2.65556 4.26864 2.95647 3.7675 3.36402 3.36057C3.77156 2.95365 4.27317 2.65351 4.8244 2.48672C5.37564 2.31994 5.9595 2.29166 6.52428 2.40439C7.08905 2.51713 7.61731 2.76739 8.06228 3.13303C8.50724 3.49866 8.85517 3.96838 9.07526 4.50058C9.10611 4.57169 9.12249 4.64822 9.12344 4.72573C9.1244 4.80323 9.10991 4.88014 9.08082 4.95199C9.05173 5.02383 9.00863 5.08916 8.95402 5.14417C8.89941 5.19917 8.8344 5.24275 8.76277 5.27236C8.69114 5.30198 8.61434 5.31703 8.53683 5.31664C8.45932 5.31625 8.38267 5.30043 8.31134 5.2701C8.24001 5.23978 8.17544 5.19555 8.12139 5.14C8.06733 5.08445 8.02489 5.01869 7.99652 4.94656C7.84946 4.59207 7.61728 4.27931 7.32054 4.03593C7.02381 3.79256 6.67166 3.62607 6.29525 3.55122C5.91884 3.47636 5.52979 3.49544 5.16251 3.60677C4.79524 3.71809 4.46106 3.91823 4.18956 4.18947C3.91806 4.46071 3.71761 4.79469 3.60593 5.16186C3.49425 5.52903 3.4748 5.91807 3.5493 6.29455C3.62379 6.67102 3.78994 7.02334 4.03303 7.32031C4.27612 7.61727 4.58867 7.84975 4.94301 7.99715C5.06788 8.04883 5.17096 8.14224 5.23465 8.26144C5.29833 8.38063 5.31869 8.51824 5.29224 8.65077C5.26579 8.7833 5.19417 8.90255 5.0896 8.98817C4.98504 9.07379 4.854 9.12047 4.71885 9.12025V9.11792Z" fill="currentColor" />
    </svg>
  );
}

export default function ShippedFlowSection() {
  const [activeTab, setActiveTab] = useState('demo');
  const [isDemoFullscreen, setIsDemoFullscreen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [selectedFlowId, setSelectedFlowId] = useState(null);
  const [guideWidth, setGuideWidth] = useState(GUIDE_WIDTH_DEFAULT);
  const [guideMetrics, setGuideMetrics] = useState({ top: 0, height: 0 });
  const [demoState, setDemoState] = useState(() => ({
    flowId: null,
    courseState: 'pre',
    stepId: 'course_landing',
    stepData: getStep('course_landing'),
  }));
  const demoRef = useRef(null);
  const demoStageRef = useRef(null);
  const demoViewportRef = useRef(null);
  const pageScrollTopRef = useRef(0);
  const resizeCleanupRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isActive = document.fullscreenElement === demoViewportRef.current;
      setIsDemoFullscreen(isActive);

      if (!isActive) {
        window.setTimeout(() => {
          window.scrollTo({ top: pageScrollTopRef.current, behavior: 'auto' });
        }, 0);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const stageNode = demoStageRef.current;
    const viewportNode = demoViewportRef.current;
    if (!stageNode || !viewportNode) return undefined;

    const syncGuideMetrics = () => {
      const stageRect = stageNode.getBoundingClientRect();
      const viewportRect = viewportNode.getBoundingClientRect();
      const nextTop = Math.max(0, viewportRect.top - stageRect.top);
      const nextHeight = viewportRect.height;

      setGuideMetrics((prev) => {
        if (
          Math.abs(prev.top - nextTop) < 1 &&
          Math.abs(prev.height - nextHeight) < 1
        ) {
          return prev;
        }

        return {
          top: nextTop,
          height: nextHeight,
        };
      });
    };

    syncGuideMetrics();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', syncGuideMetrics);
      return () => window.removeEventListener('resize', syncGuideMetrics);
    }

    const observer = new ResizeObserver(syncGuideMetrics);
    observer.observe(stageNode);
    observer.observe(viewportNode);
    window.addEventListener('resize', syncGuideMetrics);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncGuideMetrics);
    };
  }, []);

  useEffect(() => () => {
    resizeCleanupRef.current?.();
  }, []);

  const toggleDemoFullscreen = async () => {
    const demoViewport = demoViewportRef.current;

    if (!demoViewport) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen?.().catch?.(() => {});
      return;
    }

    pageScrollTopRef.current = window.scrollY;
    await demoViewport.requestFullscreen?.().catch?.(() => {});
  };

  const handleGuideToggle = () => {
    setIsGuideOpen((prev) => {
      return !prev;
    });
  };

  const handleTabChange = (nextTab) => {
    setActiveTab(nextTab);

    if (nextTab !== 'demo') {
      setIsGuideOpen(false);
      setSelectedFlowId(null);
      demoRef.current?.resetToNeutral?.();
    }
  };

  const handleStartFlow = (flowId) => {
    setSelectedFlowId(flowId);
    setIsGuideOpen(true);
    demoRef.current?.startFlow?.(flowId);
  };

  const handleGuideBack = () => {
    setSelectedFlowId(null);
    demoRef.current?.resetToNeutral?.();
  };

  const handleRestartDemo = () => {
    if (selectedFlowId) {
      demoRef.current?.startFlow?.(selectedFlowId);
    } else {
      demoRef.current?.resetToNeutral?.();
    }
  };

  const handleHighlightStep = (stepId) => {
    demoRef.current?.highlightStep?.(stepId);
  };

  const handleGuideWidthChange = (deltaX) => {
    setGuideWidth((prev) => clampGuideWidth(prev - deltaX));
  };

  const handleGuideResizeStart = (event) => {
    const startX = event.clientX;
    const startWidth = guideWidth;

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handlePointerMove = (moveEvent) => {
      const nextWidth = clampGuideWidth(startWidth - (moveEvent.clientX - startX));
      setGuideWidth(nextWidth);
    };

    const stopResize = () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopResize);
      resizeCleanupRef.current = null;
    };

    resizeCleanupRef.current = stopResize;
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopResize);
  };

  const handleGuideResizeKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handleGuideWidthChange(16);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleGuideWidthChange(-16);
    }
  };

  const completedStepIds = useMemo(
    () => getCompletedStepIds(selectedFlowId, demoState.stepId),
    [demoState.stepId, selectedFlowId]
  );

  const currentFlow = selectedFlowId ? DEMO_FLOWS[selectedFlowId] : null;
  const currentStepPosition = selectedFlowId ? getStepPosition(selectedFlowId, demoState.stepId) : -1;
  const activeGroupId = useMemo(
    () => currentFlow?.groups.find((group) => group.substeps.includes(demoState.stepId))?.id ?? currentFlow?.groups[0]?.id ?? null,
    [currentFlow, demoState.stepId]
  );
  const shouldBreakout = activeTab === 'demo' && isGuideOpen && !isDemoFullscreen;
  const showGuideAlongsideFullscreen = activeTab === 'demo' && isDemoFullscreen && isGuideOpen;
  const showStageControlDock = activeTab === 'demo' && !isGuideOpen;

  const renderControlDock = (position) => (
    <div
      className={`${styles.controlDock} ${
        position === 'guide'
          ? styles.controlDockAttachedToGuide
          : position === 'fullscreen'
            ? styles.controlDockAttachedToFullscreen
            : styles.controlDockAttachedToStage
      }`}
      style={position === 'stage' ? { top: `${Math.max(guideMetrics.top + 16, 16)}px` } : undefined}
      aria-label="Demo controls"
    >
      <button
        type="button"
        className={`${styles.demoControlButton} ${isGuideOpen ? styles.demoControlButtonActive : ''}`}
        aria-label={isGuideOpen ? 'Hide guide' : 'Show guide'}
        onClick={handleGuideToggle}
      >
        <DemoGuideIcon />
      </button>
      <button
        type="button"
        className={styles.demoControlButton}
        aria-label={isDemoFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
        onClick={toggleDemoFullscreen}
      >
        {isDemoFullscreen ? <VideoExitFullscreenIcon /> : <VideoEnterFullscreenIcon />}
      </button>
    </div>
  );

  const renderFlowPicker = () => (
    <aside className={styles.guidePanel} aria-label="Demo guide">
      <div className={styles.guideStickyHeader}>
        <div className={styles.guideHeadingGroup}>
          <h3 className={styles.guideTitle}>Walk the learning flow</h3>
          <p className={styles.guideIntro}>Choose a user flow to explore in the demo</p>
        </div>
      </div>

      <div className={styles.guideBody}>
        <div className={styles.flowPickerList}>
          {FLOW_ORDER.map((flowId) => {
            const flow = DEMO_FLOWS[flowId];
            return (
              <article key={flow.id} className={styles.flowPickerCard}>
                <div className={styles.flowPickerHeaderRow}>
                  <h4>{flow.title}</h4>
                  <button
                    type="button"
                    className={styles.flowPickerButton}
                    onClick={() => handleStartFlow(flow.id)}
                  >
                    Start flow
                    <ChevronRightIcon size={14} />
                  </button>
                </div>
                <div className={styles.flowPickerCopy}>
                  <p>{flow.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </aside>
  );

  const renderFlowDetail = () => (
    <aside className={styles.guidePanel} aria-label="Demo guide">
      <div className={styles.guideStickyHeader}>
        <div className={styles.guideHeaderTopRow}>
          <div className={styles.guideHeadingGroup}>
            <h3 className={styles.guideTitle}>{currentFlow.title}:</h3>
            <p className={styles.guideIntro}>Click on the step to highlight the relevant element in the demo</p>
          </div>

          <div className={styles.guideHeaderActions}>
            <button
              type="button"
              className={styles.guideHeaderIconButton}
              aria-label="Back to flow list"
              onClick={handleGuideBack}
            >
              <ArrowLeftIcon size={14} />
            </button>
            <button
              type="button"
              className={styles.guideHeaderIconButton}
              aria-label="Restart flow"
              onClick={handleRestartDemo}
            >
              <RefreshIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.guideBody}>
        {currentFlow.groups.map((group) => {
          const groupStepPositions = group.substeps
            .map((substepId) => getStepPosition(selectedFlowId, substepId))
            .filter((value) => value >= 0);
          const isGroupCompleted = groupStepPositions.length > 0 && groupStepPositions.every((index) => index < currentStepPosition);
          const isGroupActive = group.substeps.includes(demoState.stepId);
          const shouldShowSubsteps = group.id === activeGroupId;

          return (
            <section
              key={group.id}
              className={`${styles.guideGroup} ${isGroupActive ? styles.guideGroupActive : ''} ${isGroupCompleted ? styles.guideGroupDone : ''}`}
            >
              <div className={styles.guideGroupHeader}>
                <span className={styles.guideStepBadge}>{group.badge}</span>
                <h4>{group.title}</h4>
                <p>{group.description}</p>
              </div>

              {shouldShowSubsteps ? (
                <div className={styles.guideSubstepList}>
                  {group.substeps.map((substepId) => {
                    const step = getStep(substepId);
                    const isActive = demoState.stepId === substepId;
                    const isCompleted = completedStepIds.has(substepId);

                    return (
                      <article
                        key={substepId}
                        className={`${styles.guideSubstep} ${isActive ? styles.guideSubstepActive : ''} ${isCompleted ? styles.guideSubstepDone : ''}`}
                      >
                        {isActive ? (
                          <button
                            type="button"
                            className={`${styles.guideSubstepRow} ${styles.guideSubstepRowButton}`}
                            onClick={() => handleHighlightStep(substepId)}
                          >
                            <span className={styles.guideSubstepMarker} aria-hidden="true">
                              <span className={styles.guideSubstepDot} />
                            </span>
                            <span className={styles.guideSubstepCopy}>
                              <span className={styles.guideSubstepTitleButton}>{step.label}</span>
                            </span>
                          </button>
                        ) : (
                          <div className={styles.guideSubstepRow}>
                            <span className={styles.guideSubstepMarker} aria-hidden="true">
                              {isCompleted ? <CheckCircleIcon size={16} /> : <span className={styles.guideSubstepDot} />}
                            </span>
                            <span className={styles.guideSubstepCopy}>
                              <span className={`${styles.guideSubstepTitleButton} ${isCompleted ? styles.guideSubstepTitleDone : ''}`}>
                                {step.label}
                              </span>
                            </span>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </aside>
  );

  const renderGuidePanel = () => (selectedFlowId ? renderFlowDetail() : renderFlowPicker());

  return (
    <section id="flow" className={styles.section} aria-labelledby="shipped-flow-heading">
      <Image
        src="/images/case-studies/sat-lms/shipped-flow-sky-background.jpg"
        alt=""
        fill
        sizes="100vw"
        className={styles.skyImage}
        aria-hidden="true"
      />
      <div className={styles.skyWash} aria-hidden="true" />
      <div className={styles.skyGlow} aria-hidden="true" />

      <div className={styles.container}>
        <header>
          <p className={styles.eyebrow}>Shipped Flow</p>
          <h2 id="shipped-flow-heading" className={styles.heading}>
            <span className={styles.staggerWord} style={{ '--word-index': 0 }}>Experience</span>{' '}
            <span className={styles.staggerWord} style={{ '--word-index': 1 }}>it</span>{' '}
            <span className={`${styles.staggerWord} ${styles.headingAccent}`} style={{ '--word-index': 2 }}>yourself!</span>
          </h2>
          <p className={styles.intro}>
            Below is a <strong>recreated interactive demo</strong> of the shipped flow, using mock data and content. It preserves the case-study experience even as the live product evolves.
          </p>
          <p className={styles.helper}>
            Explore the flow as an interactive demo, or switch to a behavior map to see the full learning journey.
          </p>
        </header>

        <div className={styles.toggleWrap}>
          <div className={styles.toggle} data-active={activeTab} role="tablist" aria-label="Shipped flow view">
            <span className={styles.toggleIndicator} aria-hidden="true" />
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'demo'}
              aria-controls="shipped-flow-demo"
              className={`${styles.toggleButton} ${activeTab === 'demo' ? styles.toggleButtonActive : ''}`}
              onClick={() => handleTabChange('demo')}
            >
              Interactive demo
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'map'}
              aria-controls="shipped-flow-map"
              className={`${styles.toggleButton} ${activeTab === 'map' ? styles.toggleButtonActive : ''}`}
              onClick={() => handleTabChange('map')}
            >
              Behavior map
            </button>
          </div>
        </div>

        <div className={`${styles.panel} ${shouldBreakout ? styles.panelBreakout : ''}`}>
          <div className={`${styles.demoLayout} ${shouldBreakout ? styles.demoLayoutGuideOpen : ''}`}>
            <div className={styles.demoStageShell}>
              <div ref={demoStageRef} className={styles.demoStage}>
                {showStageControlDock ? renderControlDock('stage') : null}

                <div
                  ref={demoViewportRef}
                  className={`${styles.demoViewport} ${activeTab === 'demo' ? styles.demoViewportInteractive : ''}`}
                >
                  {activeTab === 'demo' ? (
                    <div id="shipped-flow-demo" role="tabpanel" className={styles.demoFramePanel}>
                      <div className={`${styles.fullscreenSplitLayout} ${showGuideAlongsideFullscreen ? styles.fullscreenSplitLayoutOpen : ''}`}>
                        <div className={styles.demoAppShell}>
                          {isDemoFullscreen && !isGuideOpen ? renderControlDock('fullscreen') : null}
                          <div className={styles.demoScaleShellWrap}>
                            <div className={`${styles.demoScaleShell} ${isDemoFullscreen ? styles.demoScaleShellFullscreen : ''}`}>
                              <SatLmsDemo
                                ref={demoRef}
                                className={styles.demoEmbed}
                                style={{ height: '100%', minHeight: '100%' }}
                                onStateChange={setDemoState}
                              />
                            </div>
                          </div>
                        </div>

                        {showGuideAlongsideFullscreen ? (
                          <div className={styles.fullscreenGuideShell} style={{ width: `${guideWidth}px` }}>
                            <div
                              className={styles.guideResizeHandle}
                              role="separator"
                              tabIndex={0}
                              aria-label="Resize demo guide panel"
                              aria-orientation="vertical"
                              aria-valuemin={GUIDE_WIDTH_MIN}
                              aria-valuemax={GUIDE_WIDTH_MAX}
                              aria-valuenow={Math.round(guideWidth)}
                              onPointerDown={handleGuideResizeStart}
                              onKeyDown={handleGuideResizeKeyDown}
                            />
                            {renderControlDock('guide')}
                            {renderGuidePanel()}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <div id="shipped-flow-map" role="tabpanel" className={styles.mapFramePanel}>
                      <div className={styles.mapCard}>
                        <div className={styles.mapHeader}>
                          <div>
                            <h3>Behavior map</h3>
                            <p>
                              The journey shows how one lesson turns into a mastery loop: progress when the learner is ready, remediate when gaps appear, then continue to the next activity.
                            </p>
                          </div>
                          <span className={styles.mapBadge}>Lesson to mastery check to next action</span>
                        </div>

                        <div className={styles.mapScroll}>
                          <div className={styles.mapCanvas}>
                            <svg className={styles.mapLines} viewBox="0 0 940 928" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <defs>
                                <marker id="shippedFlowArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
                                  <path d="M1.5 1.5L8 5L1.5 8.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </marker>
                              </defs>
                              <path d="M470 106V136" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                              <path d="M470 246V276" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                              <path d="M470 386V416" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                              <path d="M470 526V556" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                              <path d="M470 666V710" stroke="currentColor" strokeWidth="1.35" />
                              <path d="M220 710H720" stroke="currentColor" strokeWidth="1.35" />
                              <path d="M220 710V758" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                              <path d="M720 710V758" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                              <path d="M416 858H522" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                              <path d="M720 898C835 898 840 662 740 662" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                            </svg>

                            {mapNodes.map(([key, step, title, body, Icon, narrow]) => (
                              <article
                                key={key}
                                className={`${styles.mapNode} ${narrow ? styles.mapNodeNarrow : ''} ${styles[key]}`}
                              >
                                <div className={styles.mapNodeInner}>
                                  <span className={styles.mapIcon}><Icon /></span>
                                  <div>
                                    <h4>{step}. {title}</h4>
                                    <p>{body}</p>
                                  </div>
                                </div>
                              </article>
                            ))}

                            <span className={`${styles.branchLabel} ${styles.branchLeft}`}>Mastery not demonstrated</span>
                            <span className={`${styles.branchLabel} ${styles.branchRight}`}>Mastery achieved</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Image
                  src="/images/case-studies/sat-lms/shipped-flow-mac-frame.png"
                  alt=""
                  fill
                  unoptimized
                  sizes="(min-width: 1280px) 1120px, 120vw"
                  className={styles.frameImage}
                  aria-hidden="true"
                />
              </div>
            </div>

            {activeTab === 'demo' && isGuideOpen && !isDemoFullscreen ? (
              <div
                className={styles.normalGuideShell}
                style={{
                  width: `${guideWidth}px`,
                  height: `${guideMetrics.height}px`,
                  marginTop: `${guideMetrics.top}px`,
                }}
              >
                <div
                  className={styles.guideResizeHandle}
                  role="separator"
                  tabIndex={0}
                  aria-label="Resize demo guide panel"
                  aria-orientation="vertical"
                  aria-valuemin={GUIDE_WIDTH_MIN}
                  aria-valuemax={GUIDE_WIDTH_MAX}
                  aria-valuenow={Math.round(guideWidth)}
                  onPointerDown={handleGuideResizeStart}
                  onKeyDown={handleGuideResizeKeyDown}
                />
                {renderControlDock('guide')}
                {renderGuidePanel()}
              </div>
            ) : null}
          </div>
        </div>

        <article className={styles.liveCard}>
          <div className={styles.liveCardMain}>
            <div>
              <h3>
                <span className={styles.staggerWord} style={{ '--word-index': 0 }}>Try</span>{' '}
                <span className={styles.staggerWord} style={{ '--word-index': 1 }}>the</span>{' '}
                <span className={styles.staggerWord} style={{ '--word-index': 2 }}>current</span>{' '}
                <span className={`${styles.staggerWord} ${styles.headingAccent}`} style={{ '--word-index': 3 }}>live</span>{' '}
                <span className={`${styles.staggerWord} ${styles.headingAccent}`} style={{ '--word-index': 4 }}>product</span>
              </h3>
              <p>You can also experience the product on the live platform by following the steps below.</p>
              <div className={styles.steps} aria-label="Steps to try the live product">
                <span><b>1</b> Create a free account</span>
                <i className={styles.stepRule} aria-hidden="true" />
                <span><b>2</b> Open the course</span>
                <i className={styles.stepRule} aria-hidden="true" />
                <span><b>3</b> Start the diagnostic</span>
              </div>
            </div>

            <div className={styles.liveCtaCluster}>
              <svg className={styles.liveCtaTextRing} viewBox="0 0 144 144" aria-hidden="true">
                <defs>
                  <path id="liveProductTextPath" d="M72 72m-55 0a55 55 0 1 1 110 0a55 55 0 1 1-110 0" />
                </defs>
                <text>
                  <textPath href="#liveProductTextPath" startOffset="0">
                    Experience now
                  </textPath>
                </text>
              </svg>
              <a
                href={liveProductUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open live product in a new tab"
                className={styles.liveCta}
              >
                <LiveProductArrowIcon />
              </a>
            </div>
          </div>

          <div className={styles.caveat}>
            <span className={styles.caveatIcon}>i</span>
            <p><strong>Small caveat:</strong> The live product is actively maintained, so the current experience may differ from the archived flow shown in this case study.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
