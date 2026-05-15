/**
 * mockActivityQuiz.js
 * -------------------
 * 5 SAT-style questions for the activity quiz (Step 6).
 * Used for "Linear Equations — Core Concepts".
 * The recruiter answers freely — the outcome is chosen via the guidance
 * shade's branch buttons ("Show high-score path" / "Show low-score path").
 */

export const ACTIVITY_QUESTIONS = [
  {
    id: 'aq-1',
    text: 'What is the solution to 2x − 4 = 10?',
    choices: [
      { id: 'a', text: 'x = 3' },
      { id: 'b', text: 'x = 5' },
      { id: 'c', text: 'x = 7' },
      { id: 'd', text: 'x = 8' },
    ],
    correct: 'c',
  },
  {
    id: 'aq-2',
    text: 'Which value of x satisfies 5x + 3 = 3x + 11?',
    choices: [
      { id: 'a', text: 'x = 2' },
      { id: 'b', text: 'x = 4' },
      { id: 'c', text: 'x = 6' },
      { id: 'd', text: 'x = 8' },
    ],
    correct: 'b',
  },
  {
    id: 'aq-3',
    text: 'A linear equation has no solution when the lines are:',
    choices: [
      { id: 'a', text: 'Intersecting at one point' },
      { id: 'b', text: 'The same line' },
      { id: 'c', text: 'Parallel' },
      { id: 'd', text: 'Perpendicular' },
    ],
    correct: 'c',
  },
  {
    id: 'aq-4',
    text: 'If 4(x − 1) = 2(x + 5), what is the value of x?',
    choices: [
      { id: 'a', text: 'x = 5' },
      { id: 'b', text: 'x = 6' },
      { id: 'c', text: 'x = 7' },
      { id: 'd', text: 'x = 8' },
    ],
    correct: 'c',
  },
  {
    id: 'aq-5',
    text: 'The equation 3x + 6 = 3(x + 2) has:',
    choices: [
      { id: 'a', text: 'No solution' },
      { id: 'b', text: 'Exactly one solution' },
      { id: 'c', text: 'Exactly two solutions' },
      { id: 'd', text: 'Infinitely many solutions' },
    ],
    correct: 'd',
  },
];
