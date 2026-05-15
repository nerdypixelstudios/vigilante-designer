/**
 * mockDiagnosticQuiz.js
 * ---------------------
 * 5 SAT-style math questions for the diagnostic quiz (Step 2).
 * Questions span different difficulty levels to simulate a real diagnostic.
 */

export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'dq-1',
    text: 'If 3x + 7 = 22, what is the value of x?',
    choices: [
      { id: 'a', text: '3' },
      { id: 'b', text: '4' },
      { id: 'c', text: '5' },
      { id: 'd', text: '6' },
    ],
    correct: 'c',
    topic: 'Linear Equations',
  },
  {
    id: 'dq-2',
    text: 'A car travels 240 miles in 4 hours. At the same speed, how many miles will it travel in 7 hours?',
    choices: [
      { id: 'a', text: '360 miles' },
      { id: 'b', text: '400 miles' },
      { id: 'c', text: '420 miles' },
      { id: 'd', text: '480 miles' },
    ],
    correct: 'c',
    topic: 'Ratios and Proportions',
  },
  {
    id: 'dq-3',
    text: 'Which of the following is equivalent to (x + 3)(x − 3)?',
    choices: [
      { id: 'a', text: 'x² + 6x + 9' },
      { id: 'b', text: 'x² − 9' },
      { id: 'c', text: 'x² + 9' },
      { id: 'd', text: 'x² − 6x + 9' },
    ],
    correct: 'b',
    topic: 'Quadratics',
  },
  {
    id: 'dq-4',
    text: 'In the equation y = 2x − 5, what is the y-intercept?',
    choices: [
      { id: 'a', text: '2' },
      { id: 'b', text: '−2' },
      { id: 'c', text: '5' },
      { id: 'd', text: '−5' },
    ],
    correct: 'd',
    topic: 'Linear Equations',
  },
  {
    id: 'dq-5',
    text: 'If the average of five numbers is 14, what is their sum?',
    choices: [
      { id: 'a', text: '56' },
      { id: 'b', text: '60' },
      { id: 'c', text: '70' },
      { id: 'd', text: '75' },
    ],
    correct: 'c',
    topic: 'Statistics',
  },
];
