import {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react';
import {
  DEMO_FLOWS,
  getStep,
} from '../data/demoSteps';
import Step1CourseLanding from './steps/Step1CourseLanding';
import Step1bDiagnosticInstructions from './steps/Step1bDiagnosticInstructions';
import Step2DiagnosticQuiz from './steps/Step2DiagnosticQuiz';
import Step3DiagnosticResults from './steps/Step3DiagnosticResults';
import Step4PostDiagnosticChoice from './steps/Step4PostDiagnosticChoice';
import Step5PersonalizedPath from './steps/Step5PersonalizedPath';
import Step6ActivityPage from './steps/Step6ActivityPage';
import Step6PersonalizedActivity from './steps/Step6PersonalizedActivity';
import Step7aGoodResults from './steps/Step7aGoodResults';
import Step7bLowResults from './steps/Step7bLowResults';
import Step8RemedialCreatedModal from './steps/Step8RemedialCreatedModal';
import Step9RemedialActivity from './steps/Step9RemedialActivity';
import Step10RemedialSuccess from './steps/Step10RemedialSuccess';
import Step10RemedialRetry from './steps/Step10RemedialRetry';
import {
  getActivityForDemo,
  PACE,
} from '../data/mockCourse';

function injectFonts() {
  if (typeof document === 'undefined') return;
  const id = 'sat-demo-fonts';
  if (document.getElementById(id)) return;

  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap';
  document.head.appendChild(link);
}

function injectHighlightStyle() {
  if (typeof document === 'undefined') return;
  const id = 'sat-demo-highlight-style';
  if (document.getElementById(id)) return;

  const style = document.createElement('style');
  style.id = id;
  style.textContent = `
    [data-demo-highlight="true"] {
      outline: 3px solid #006FEE !important;
      outline-offset: 3px !important;
      box-shadow: 0 0 0 6px rgba(0,111,238,0.15) !important;
      border-radius: 8px !important;
      animation: satDemoHighlightPulse 0.35s ease-out !important;
      position: relative !important;
      z-index: 10 !important;
    }
    @keyframes satDemoHighlightPulse {
      0%   { outline-color: transparent; box-shadow: 0 0 0 0 rgba(0,111,238,0.15); }
      40%  { outline-color: #2088FF; box-shadow: 0 0 0 10px rgba(0,111,238,0.08); }
      100% { outline-color: #006FEE; box-shadow: 0 0 0 6px rgba(0,111,238,0.15); }
    }
  `;
  document.head.appendChild(style);
}

function highlightElement(targetId) {
  if (!targetId || typeof document === 'undefined') return;
  const el = document.getElementById(targetId);
  if (!el) return;

  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  el.setAttribute('data-demo-highlight', 'true');
  setTimeout(() => el.removeAttribute('data-demo-highlight'), 2500);
}

const STEP_COMPONENTS = {
  course_landing: Step1CourseLanding,
  bad_behavior_warning: Step1CourseLanding,
  diagnostic_instructions: Step1bDiagnosticInstructions,
  diagnostic_quiz: Step2DiagnosticQuiz,
  diagnostic_results: Step3DiagnosticResults,
  choice_modal: Step4PostDiagnosticChoice,
  personalized_path: Step5PersonalizedPath,
  personalized_activity: Step6PersonalizedActivity,
  activity_quiz: Step6ActivityPage,
  good_results: Step7aGoodResults,
  low_results: Step7bLowResults,
  remedial_modal: Step8RemedialCreatedModal,
  remedial_activity: Step9RemedialActivity,
  remedial_success: Step10RemedialSuccess,
  remedial_retry: Step10RemedialRetry,
};

const INITIAL_STEP_ID = 'course_landing';

const stepRenderBuckets = {
  course_landing: 'course-entry',
  bad_behavior_warning: 'course-entry',
};

function getStepRenderBucket(stepId) {
  return stepRenderBuckets[stepId] || stepId;
}

const DemoShell = forwardRef(function DemoShell({
  className = '',
  style = {},
  onDemoComplete,
  onStateChange,
}, ref) {
  const [flowId, setFlowId] = useState(null);
  const [stepId, setStepId] = useState(INITIAL_STEP_ID);
  const [courseState, setCourseState] = useState('pre');
  const [selectedActivity, setSelectedActivity] = useState(() => getActivityForDemo(PACE.firstActivity.id, 'post'));
  const [lastVisitedActivityId, setLastVisitedActivityId] = useState(null);
  const [stepRenderKey, setStepRenderKey] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    injectFonts();
    injectHighlightStyle();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stepId]);

  const scrollToTop = useCallback((behavior = 'smooth') => {
    scrollRef.current?.scrollTo({ top: 0, behavior });
  }, []);

  const resetToNeutral = useCallback(() => {
    setFlowId(null);
    setStepId(INITIAL_STEP_ID);
    setCourseState('pre');
    setSelectedActivity(getActivityForDemo(PACE.firstActivity.id, 'post'));
    setLastVisitedActivityId(null);
    setStepRenderKey((prev) => prev + 1);
    scrollToTop('auto');
  }, [scrollToTop]);

  const startFlow = useCallback((nextFlowId) => {
    const flow = DEMO_FLOWS[nextFlowId];
    if (!flow) {
      resetToNeutral();
      return;
    }

    setFlowId(nextFlowId);
    setStepId(flow.initialStepId);
    setCourseState(nextFlowId === 'reinforcement' ? 'reinforcement' : 'pre');
    setSelectedActivity(getActivityForDemo(PACE.firstActivity.id, nextFlowId === 'reinforcement' ? 'reinforcement' : 'post'));
    setLastVisitedActivityId(nextFlowId === 'reinforcement' ? PACE.firstActivity.id : null);
    setStepRenderKey((prev) => prev + 1);
    scrollToTop('auto');
  }, [resetToNeutral, scrollToTop]);

  const goTo = useCallback((nextStepId) => {
    setStepId(nextStepId);
  }, []);

  const handleHighlight = useCallback((targetId) => {
    highlightElement(targetId);
  }, []);

  const handleOpenActivity = useCallback(
    (activity) => {
      const resolvedActivity = activity && typeof activity === 'object'
        ? activity
        : getActivityForDemo(activity, courseState);

      if (resolvedActivity) {
        setSelectedActivity(resolvedActivity);
        setLastVisitedActivityId(Number(resolvedActivity.contentId || resolvedActivity.id));
      }

      if (flowId === 'happy') {
        setStepId('personalized_activity');
        return;
      }

      setStepId('activity_quiz');
    },
    [courseState, flowId]
  );

  const handleReturnToCourse = useCallback(
    (activityId) => {
      if (activityId != null) {
        setLastVisitedActivityId(Number(activityId));
      }

      if (flowId === 'reinforcement') {
        setStepId('personalized_path');
        return;
      }

      if (flowId === 'happy') {
        setCourseState('post');
        setStepId('personalized_path');
        return;
      }

      setStepId('course_landing');
    },
    [flowId]
  );

  const handleDiagnosticComplete = useCallback(() => {
    setCourseState('post');
    setStepId('diagnostic_results');
  }, []);

  const handleActivityQuizComplete = useCallback(() => {
    setCourseState('reinforcement_remedial');
    setStepId('low_results');
  }, []);

  const handleRemedialPerfect = useCallback(() => {
    setCourseState('reinforcement_success');
    setStepId('remedial_success');
  }, []);

  const handleRemedialRetry = useCallback(() => {
    setCourseState('reinforcement_retry');
    setStepId('remedial_retry');
  }, []);

  const handleSkipDiagnosticPromptChange = useCallback((isOpen) => {
    if (flowId !== 'bad_behavior') return;
    setStepId(isOpen ? 'bad_behavior_warning' : 'course_landing');
  }, [flowId]);

  const handleDemoComplete = useCallback(
    (value) => {
      onDemoComplete?.({ branch: value, flowId });
    },
    [flowId, onDemoComplete]
  );

  const resetCurrentStep = useCallback(() => {
    setStepRenderKey((prev) => prev + 1);
    scrollToTop('auto');
  }, [scrollToTop]);

  const restartDemo = useCallback(() => {
    if (flowId) {
      startFlow(flowId);
      return;
    }
    resetToNeutral();
  }, [flowId, resetToNeutral, startFlow]);

  const stepData = getStep(stepId);
  const StepComponent = STEP_COMPONENTS[stepId] || Step1CourseLanding;

  useImperativeHandle(ref, () => ({
    restart: restartDemo,
    resetCurrentStep,
    startFlow,
    resetToNeutral,
    chooseBranch: (branchId) => {
      if (branchId === 'remedial_success') {
        handleRemedialPerfect();
      } else if (branchId === 'remedial_retry') {
        handleRemedialRetry();
      } else if (branchId === 'good') {
        setStepId('good_results');
      } else if (branchId === 'low') {
        handleActivityQuizComplete();
      }
    },
    highlightCurrent: () => {
      handleHighlight(stepData.targetId);
    },
    highlightStep: (stepOrTargetId) => {
      const resolvedStep = getStep(stepOrTargetId);
      handleHighlight(resolvedStep?.targetId || stepOrTargetId);
    },
    getState: () => ({
      flowId,
      courseState,
      stepId,
      stepData,
    }),
  }), [
    courseState,
    flowId,
    handleActivityQuizComplete,
    handleHighlight,
    handleRemedialPerfect,
    handleRemedialRetry,
    resetCurrentStep,
    resetToNeutral,
    restartDemo,
    startFlow,
    stepData,
    stepId,
  ]);

  useEffect(() => {
    onStateChange?.({
      flowId,
      courseState,
      stepId,
      stepData,
    });
  }, [courseState, flowId, onStateChange, stepData, stepId]);

  return (
    <div
      className={`sat-lms-demo${className ? ` ${className}` : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '600px',
        fontFamily: 'var(--font-family)',
        background: 'var(--background)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        ref={scrollRef}
        className="sat-lms-demo__scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <StepComponent
          key={`${getStepRenderBucket(stepId)}-${stepRenderKey}`}
          onNext={
            stepId === 'course_landing'
              ? () => goTo('diagnostic_instructions')
              : stepId === 'diagnostic_instructions'
                ? () => goTo('diagnostic_quiz')
                : stepId === 'diagnostic_quiz'
                  ? handleDiagnosticComplete
                  : stepId === 'diagnostic_results'
                    ? () => goTo('choice_modal')
                    : stepId === 'low_results'
                      ? () => goTo('remedial_modal')
                      : stepId === 'remedial_modal'
                        ? () => {
                            setCourseState('reinforcement_remedial');
                            goTo('remedial_activity');
                          }
                        : stepId === 'activity_quiz'
                          ? handleActivityQuizComplete
                          : undefined
          }
          onBack={() => {
            if (stepId === 'diagnostic_instructions') {
              goTo('course_landing');
            } else if (stepId === 'diagnostic_quiz') {
              goTo('diagnostic_instructions');
            } else if (stepId === 'diagnostic_results') {
              goTo('diagnostic_quiz');
            } else if (stepId === 'choice_modal') {
              goTo('diagnostic_results');
            } else if (stepId === 'personalized_path' && flowId === 'happy') {
              goTo('choice_modal');
            } else if (stepId === 'remedial_modal') {
              goTo('low_results');
            } else if (stepId === 'remedial_activity') {
              goTo('remedial_modal');
            }
          }}
          onHighlight={handleHighlight}
          onDemoComplete={handleDemoComplete}
          goTo={(nextStep) => {
            if (nextStep === 'personalized_path') {
              setCourseState(flowId === 'reinforcement' ? 'reinforcement' : 'post');
            }
            goTo(nextStep);
          }}
          selectedActivity={selectedActivity}
          lastVisitedActivityId={lastVisitedActivityId}
          onOpenActivity={handleOpenActivity}
          onReturnToCourse={handleReturnToCourse}
          onSkipDiagnosticPromptChange={handleSkipDiagnosticPromptChange}
          courseState={courseState}
          onRemedialPerfect={handleRemedialPerfect}
          onRemedialRetry={handleRemedialRetry}
        />
      </div>

    </div>
  );
});

export default DemoShell;
