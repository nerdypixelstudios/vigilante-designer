import { useState, useCallback, useEffect, useRef } from 'react';
import { STEP_IDS_LINEAR, STEP_IDS_GOOD, STEP_IDS_LOW, getStep } from '../data/demoSteps';
import GuidanceShade from './GuidanceShade';

import Step1CourseLanding      from './steps/Step1CourseLanding';
import Step2DiagnosticQuiz     from './steps/Step2DiagnosticQuiz';
import Step3DiagnosticResults  from './steps/Step3DiagnosticResults';
import Step4PostDiagnosticChoice from './steps/Step4PostDiagnosticChoice';
import Step5PersonalizedPath   from './steps/Step5PersonalizedPath';
import Step6ActivityPage       from './steps/Step6ActivityPage';
import Step7aGoodResults       from './steps/Step7aGoodResults';
import Step7bLowResults        from './steps/Step7bLowResults';
import Step8RemedialCreatedModal from './steps/Step8RemedialCreatedModal';
import Step9RemedialActivity   from './steps/Step9RemedialActivity';

import tokenStyles from '../styles/tokens.module.css';

// Inject Google Fonts once at mount
function injectFonts() {
  if (typeof document === 'undefined') return;
  const id = 'sat-demo-fonts';
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap';
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
  // Apply highlight ring from highlight.module.css via a data attribute
  // (CSS modules scope class names, so we use a global data attribute instead)
  el.setAttribute('data-demo-highlight', 'true');
  setTimeout(() => el.removeAttribute('data-demo-highlight'), 2500);
}

const STEP_COMPONENTS = {
  course_landing:         Step1CourseLanding,
  diagnostic_quiz:        Step2DiagnosticQuiz,
  diagnostic_results:     Step3DiagnosticResults,
  choice_modal:           Step4PostDiagnosticChoice,
  personalized_path:      Step5PersonalizedPath,
  activity_quiz:          Step6ActivityPage,
  good_results:           Step7aGoodResults,
  low_results:            Step7bLowResults,
  remedial_modal:         Step8RemedialCreatedModal,
  remedial_activity:      Step9RemedialActivity,
};

const TOTAL_STEPS = 9;

export default function DemoShell({ className = '', style = {}, onDemoComplete }) {
  const [stepId, setStepId] = useState('course_landing');
  const [branch, setBranch] = useState(null); // 'good' | 'low' | null

  const scrollRef = useRef(null);

  useEffect(() => { injectFonts(); injectHighlightStyle(); }, []);

  // Scroll to top of demo on step change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stepId]);

  const goTo = useCallback((id) => {
    setStepId(id);
  }, []);

  const goNext = useCallback(() => {
    const linearIdx = STEP_IDS_LINEAR.indexOf(stepId);
    if (linearIdx !== -1 && linearIdx < STEP_IDS_LINEAR.length - 1) {
      goTo(STEP_IDS_LINEAR[linearIdx + 1]);
      return;
    }
    if (branch === 'good') {
      const idx = STEP_IDS_GOOD.indexOf(stepId);
      if (idx !== -1 && idx < STEP_IDS_GOOD.length - 1) {
        goTo(STEP_IDS_GOOD[idx + 1]);
      }
    } else if (branch === 'low') {
      const idx = STEP_IDS_LOW.indexOf(stepId);
      if (idx !== -1 && idx < STEP_IDS_LOW.length - 1) {
        goTo(STEP_IDS_LOW[idx + 1]);
      }
    }
  }, [stepId, branch, goTo]);

  const handleGoodPath = useCallback(() => {
    setBranch('good');
    goTo('good_results');
  }, [goTo]);

  const handleLowPath = useCallback(() => {
    setBranch('low');
    goTo('low_results');
  }, [goTo]);

  const handleHighlight = useCallback((targetId) => {
    highlightElement(targetId);
  }, []);

  const handleDemoComplete = useCallback((b) => {
    onDemoComplete?.({ branch: b || branch });
  }, [onDemoComplete, branch]);

  const stepData = getStep(stepId);
  const StepComponent = STEP_COMPONENTS[stepId] || Step1CourseLanding;

  // Calculate display step number
  const displayStep = stepData.step;

  return (
    <div
      className={`${tokenStyles.demoTheme}${className ? ' ' + className : ''}`}
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
      {/* Scrollable content area */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <StepComponent
          onNext={goNext}
          onHighlight={handleHighlight}
          onDemoComplete={handleDemoComplete}
          branch={branch}
          goTo={goTo}
        />
      </div>

      {/* Persistent guidance shade — always visible */}
      <GuidanceShade
        stepNumber={displayStep}
        totalSteps={TOTAL_STEPS}
        stepLabel={stepData.label}
        action={stepData.action}
        why={stepData.why}
        targetId={stepData.targetId}
        onHighlight={handleHighlight}
        isBranch={stepData.branch === true}
        onGoodPath={handleGoodPath}
        onLowPath={handleLowPath}
      />
    </div>
  );
}
