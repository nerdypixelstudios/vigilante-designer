export const DEMO_STEPS = {
  course_landing: {
    id: 'course_landing',
    label: 'Take the diagnostic quiz',
    detail: 'Open the diagnostic from the course home',
    why: 'The system evaluates the learner before prescribing a path.',
    targetId: 'demo-diagnostic-card',
  },
  diagnostic_instructions: {
    id: 'diagnostic_instructions',
    label: 'Start the diagnostic quiz',
    detail: 'Review the instructions, then begin the assessment',
    why: 'This sets expectations before the adaptive quiz begins.',
    targetId: 'demo-diagnostic-start',
  },
  diagnostic_quiz: {
    id: 'diagnostic_quiz',
    label: 'Submit the 5-question diagnostic',
    detail: 'Answer the questions one by one and submit the diagnostic',
    why: 'The answers determine what the learner can skip and what needs work.',
    targetId: 'demo-quiz-submit',
  },
  diagnostic_results: {
    id: 'diagnostic_results',
    label: 'Review quiz results',
    detail: 'Inspect the score and open the personalized path',
    why: 'The result explains how PACE personalizes the course.',
    targetId: 'demo-results-cta',
  },
  choice_modal: {
    id: 'choice_modal',
    label: 'Open the personalized course',
    detail: 'Use the recommendation modal to view the course path',
    why: 'The learner can start immediately or inspect the prescribed path first.',
    targetId: 'demo-choice-view-course',
  },
  personalized_path: {
    id: 'personalized_path',
    label: 'Check the personalized course',
    detail: 'Turn PACE off to see everything, then turn it on to see skipped content',
    why: 'PACE reveals the exact course state the learner should follow next.',
    targetId: 'demo-pace-island',
  },
  personalized_activity: {
    id: 'personalized_activity',
    label: 'Start the first prescribed activity',
    detail: 'Open the immediate next activity from the personalized course',
    why: 'The first prescribed lesson should match the course state and next-up rail.',
    targetId: 'demo-personalized-activity',
  },
  activity_quiz: {
    id: 'activity_quiz',
    label: 'Complete the learning activity quiz',
    detail: 'Attempt the personalized activity and submit the quiz',
    why: 'Activity performance decides whether the learner can continue or needs remedial practice.',
    targetId: 'demo-activity-quiz-submit',
  },
  low_results: {
    id: 'low_results',
    label: 'Review the below-threshold result',
    detail: 'See the low-score state and the remedial that was created',
    why: 'The system turns a weak attempt into targeted follow-up work immediately.',
    targetId: 'demo-low-results-remedial',
  },
  remedial_modal: {
    id: 'remedial_modal',
    label: 'Start the remedial activity',
    detail: 'Open the targeted remedial created from the low-score attempt',
    why: 'The remedial is anchored to the exact concept gap surfaced in the activity.',
    targetId: 'demo-remedial-modal',
  },
  remedial_activity: {
    id: 'remedial_activity',
    label: 'Complete the remedial quiz',
    detail: 'Work through the remedial questions one at a time',
    why: 'The learner gets focused practice instead of repeating the whole lesson.',
    targetId: 'demo-remedial-submit-perfect',
  },
  remedial_success: {
    id: 'remedial_success',
    label: 'See the positive remedial outcome',
    detail: 'Preview the success state when the learner scores 100%',
    why: 'A perfect remedial attempt closes the gap and unlocks the next activity.',
    targetId: 'demo-remedial-success',
  },
  remedial_retry: {
    id: 'remedial_retry',
    label: 'See the less-than-perfect outcome',
    detail: 'Preview the fallback state when the learner still misses the mark',
    why: 'The learner is sent back to the course after reviewing what still needs work.',
    targetId: 'demo-remedial-retry',
  },
  bad_behavior_warning: {
    id: 'bad_behavior_warning',
    label: 'See the advisory guardrail',
    detail: 'Try a course activity before the diagnostic and trigger the advisory',
    why: 'The system blocks the shortcut and nudges the learner back toward personalization first.',
    targetId: 'demo-skip-diagnostic-alert',
  },
};

export const DEMO_FLOWS = {
  happy: {
    id: 'happy',
    title: 'User happy path',
    description:
      'Attempt the diagnostic quiz, review quiz results, let PACE personalize the course, and start learning in the recommended path.',
    shortTitle: 'Happy path',
    initialStepId: 'course_landing',
    groups: [
      {
        id: 'happy-step-1',
        badge: 'STEP 1',
        title: 'User takes the Diagnostic Quiz',
        description: "This evaluates the learner's current level.",
        substeps: ['course_landing', 'diagnostic_instructions', 'diagnostic_quiz', 'diagnostic_results'],
      },
      {
        id: 'happy-step-2',
        badge: 'STEP 2',
        title: 'Check the personalized course',
        description: "PACE customizes the course according to the learner's level.",
        substeps: ['choice_modal', 'personalized_path', 'personalized_activity'],
      },
    ],
  },
  reinforcement: {
    id: 'reinforcement',
    title: 'Reinforcement path',
    description:
      'Start from the personalized course, perform poorly in one concept, create a remedial activity, and review the remedial outcome.',
    shortTitle: 'Reinforcement',
    initialStepId: 'personalized_path',
    groups: [
      {
        id: 'reinforcement-step-1',
        badge: 'STEP 1',
        title: 'Continue in the personalized path',
        description: 'This flow assumes the diagnostic is already completed and PACE is on.',
        substeps: ['personalized_path', 'activity_quiz'],
      },
      {
        id: 'reinforcement-step-2',
        badge: 'STEP 2',
        title: 'Fix the gap with remedial practice',
        description: 'A low score creates a targeted remedial linked to the mother activity.',
        substeps: ['low_results', 'remedial_modal', 'remedial_activity'],
      },
      {
        id: 'reinforcement-step-3',
        badge: 'STEP 3',
        title: 'Review the remedial outcome',
        description: 'Preview both the perfect-score and less-than-perfect result models.',
        substeps: ['remedial_success', 'remedial_retry'],
      },
    ],
  },
  bad_behavior: {
    id: 'bad_behavior',
    title: 'System against bad behaviours',
    description:
      'Try to open a course activity before personalizing and watch the advisory guardrail step in.',
    shortTitle: 'Bad behaviours',
    initialStepId: 'course_landing',
    groups: [
      {
        id: 'bad-behavior-step-1',
        badge: 'STEP 1',
        title: 'Try to skip personalization',
        description: 'The learner attempts to bypass the diagnostic and the system advises against it.',
        substeps: ['course_landing', 'bad_behavior_warning'],
      },
    ],
  },
};

export const FLOW_ORDER = ['happy', 'reinforcement', 'bad_behavior'];

export function getStep(stepId) {
  return DEMO_STEPS[stepId] || DEMO_STEPS.course_landing;
}

export function getFlow(flowId) {
  return DEMO_FLOWS[flowId] || DEMO_FLOWS.happy;
}

export function getFlowStepIds(flowId) {
  return getFlow(flowId).groups.flatMap((group) => group.substeps);
}

export function getStepPosition(flowId, stepId) {
  const stepIds = getFlowStepIds(flowId);
  return stepIds.indexOf(stepId);
}
