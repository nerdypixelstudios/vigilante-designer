/**
 * demoSteps.js
 * ------------
 * The 9-step demo state machine. DemoShell reads this to drive the
 * guidance shade and step transitions.
 *
 * Fields per step:
 *   id         – unique string key
 *   step       – 1-based display number (branch steps share a number)
 *   label      – short screen label shown in guidance shade
 *   action     – what the user should do next
 *   why        – one line explaining why this step matters
 *   targetId   – DOM id of the element to highlight
 *   branch     – (optional) true = this step shows the two path-choice buttons
 *   isEnd      – (optional) true = this is a terminal step (no onNext arrow)
 */

export const STEPS = [
  {
    id: 'course_landing',
    step: 1,
    label: 'Course Page',
    action: 'Click the Diagnostic Quiz button',
    why: 'The system evaluates your level before prescribing anything.',
    targetId: 'demo-diagnostic-card',
  },
  {
    id: 'diagnostic_quiz',
    step: 2,
    label: 'Diagnostic Quiz',
    action: 'Answer all 5 questions and click Submit',
    why: 'Your answers determine which activities you actually need.',
    targetId: 'demo-quiz-submit',
  },
  {
    id: 'diagnostic_results',
    step: 3,
    label: 'Diagnostic Results',
    action: "Click 'View Your Personalized Path'",
    why: 'The system now knows what to skip and what to focus on.',
    targetId: 'demo-results-cta',
  },
  {
    id: 'choice_modal',
    step: 4,
    label: 'Your Options',
    action: "Click 'View Course' to see your personalized path",
    why: 'You choose whether to start now or review your path first.',
    targetId: 'demo-choice-view-course',
  },
  {
    id: 'personalized_path',
    step: 5,
    label: 'Personalized Path',
    action: 'Toggle the PACE Island on and off — then click the highlighted activity',
    why: 'PACE Island controls whether personalized shading is active.',
    targetId: 'demo-pace-island',
  },
  {
    id: 'activity_quiz',
    step: 6,
    label: 'Activity Quiz',
    action: 'Answer freely — then choose which outcome to explore',
    why: 'Every result feeds back into your personalized path.',
    targetId: 'demo-quiz-submit',
    branch: true,
  },
  {
    id: 'good_results',
    step: 7,
    label: 'High Score Results',
    action: "See your updated path — the system prescribes what's next",
    why: 'High performance unlocks the next activity immediately.',
    targetId: 'demo-good-results',
    isEnd: true,
  },
  {
    id: 'low_results',
    step: 7,
    label: 'Low Score Results',
    action: 'See what happens when you miss the threshold',
    why: 'The system identifies the gap and acts immediately.',
    targetId: 'demo-low-results',
  },
  {
    id: 'remedial_modal',
    step: 8,
    label: 'Remedial Created',
    action: "Read the notification — then click 'Start Remedial'",
    why: 'A targeted practice session was created just for your mistakes.',
    targetId: 'demo-remedial-modal',
  },
  {
    id: 'remedial_activity',
    step: 9,
    label: 'Remedial Activity',
    action: 'This is your remedial session — focused on your exact mistakes',
    why: 'The system prescribes targeted practice, not the whole topic again.',
    targetId: 'demo-remedial-activity',
    isEnd: true,
  },
];

/** Linear step order for non-branching path */
export const STEP_IDS_LINEAR = [
  'course_landing',
  'diagnostic_quiz',
  'diagnostic_results',
  'choice_modal',
  'personalized_path',
  'activity_quiz',
];

/** Good-score branch continuation */
export const STEP_IDS_GOOD = ['good_results'];

/** Low-score branch continuation */
export const STEP_IDS_LOW = ['low_results', 'remedial_modal', 'remedial_activity'];

export function getStep(id) {
  return STEPS.find((s) => s.id === id) || STEPS[0];
}
