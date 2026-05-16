/**
 * mockDiagnosticQuiz.js
 * ---------------------
 * 5 design-foundations questions for the diagnostic quiz (Step 2).
 * The UI stays product-faithful; only the visible course content is reskinned.
 */

export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'dq-1',
    text: 'Which research artifact is best for capturing repeated user needs and frustrations after multiple interviews?',
    choices: [
      { id: 'a', text: 'A moodboard' },
      { id: 'b', text: 'An affinity map' },
      { id: 'c', text: 'A hi-fi mockup' },
      { id: 'd', text: 'A release checklist' },
    ],
    correct: 'b',
    topic: 'Research Synthesis',
  },
  {
    id: 'dq-2',
    text: 'What is the strongest reason to start a flow in low fidelity before adding visual polish?',
    choices: [
      { id: 'a', text: 'It locks the team into the final UI faster' },
      { id: 'b', text: 'It makes usability issues cheaper to spot and change' },
      { id: 'c', text: 'It eliminates the need for stakeholder reviews' },
      { id: 'd', text: 'It replaces the need for product requirements' },
    ],
    correct: 'b',
    topic: 'Wireframing',
  },
  {
    id: 'dq-3',
    text: 'In a design system, what is a variant primarily used for?',
    choices: [
      { id: 'a', text: 'Tracking unresolved bugs' },
      { id: 'b', text: 'Creating multiple states or styles of the same component' },
      { id: 'c', text: 'Replacing accessibility reviews' },
      { id: 'd', text: 'Writing SQL queries for analytics' },
    ],
    correct: 'b',
    topic: 'Design Systems',
  },
  {
    id: 'dq-4',
    text: 'Which UX writing choice usually reduces hesitation in a high-intent form flow?',
    choices: [
      { id: 'a', text: 'Vague CTA labels like "Submit"' },
      { id: 'b', text: 'Long paragraphs before every field' },
      { id: 'c', text: 'Specific action labels and clear helper text' },
      { id: 'd', text: 'Removing validation until after the page refreshes' },
    ],
    correct: 'c',
    topic: 'Interaction Copy',
  },
  {
    id: 'dq-5',
    text: 'What should a strong handoff note most clearly communicate to engineering?',
    choices: [
      { id: 'a', text: 'Only the final hex values' },
      { id: 'b', text: 'The intent, states, and acceptance details for the UI' },
      { id: 'c', text: 'A list of every design inspiration link' },
      { id: 'd', text: 'A promise that no questions will come back' },
    ],
    correct: 'b',
    topic: 'Handoff',
  },
];

export const DIAGNOSTIC_RESULTS_MOCK = {
  quizType: 'DIAGNOSTIC',
  quizName: 'PACE Diagnostic',
  score: 72,
  grade: 'B',
  accuracyPercentage: 72,
  pacingPercentage: 88,
  hoursSaved: 12.5,
  activitiesSkipped: 13,
  totalActivities: 28,
  summary:
    "You've built a solid foundation. PACE can now skip what you already understand and focus your path on the product design concepts that still need reinforcement.",
  leaksToPlug: [
    {
      questionNumber: 2,
      topic: 'Wireframing',
      note: 'Strengthen your instinct for testing flow structure before moving into polish.',
    },
    {
      questionNumber: 4,
      topic: 'Interaction Copy',
      note: 'Sharpen CTA and helper-text decisions so high-intent moments stay friction-light.',
    },
  ],
  winsToRepeat: [
    {
      questionNumber: 1,
      topic: 'Research Synthesis',
      note: 'You identified the right artifact for extracting repeated user patterns.',
    },
    {
      questionNumber: 3,
      topic: 'Design Systems',
      note: 'Your component-system understanding is already strong enough to skip basics.',
    },
    {
      questionNumber: 5,
      topic: 'Handoff',
      note: 'You recognized that implementation clarity matters as much as final visuals.',
    },
  ],
};
