/**
 * mockCourse.js
 * -------------
 * All mock data for the course page views used in the demo.
 * Self-contained — no backend calls required.
 */

export const COURSE = {
  id: 'sat-math',
  name: 'SAT Math',
  category: 'MATH',
  totalHours: 18.5,
  completedHours: 3.2,
};

export const DIAGNOSTIC = {
  status: 'not_attempted', // changes to 'completed' in Step 5
  config: {
    estimated_duration_minutes: 25,
    question_count: 20,
  },
  results: {
    score: 72,
    grade: 'B',
    hours_saved: 12,
    activities_skipped: 14,
    total_activities: 48,
    time_spent_minutes: 22,
  },
};

export const PACE = {
  hoursSaved: 12,
  activitiesSkipped: 14,
  totalActivities: 48,
  firstActivity: {
    number: '2.1.1',
    name: 'Linear Equations — Core Concepts',
    duration: 45,
    type: 'concept',
    subType: 'CONCEPT',
  },
};

/** Activity statuses used by the demo */
export const STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'INPROGRESS',
  COMPLETED: 'COMPLETED',
  SHADED: 'SHADED', // PACE-skipped
};

export const MODULES = [
  {
    id: 'mod-diagnostic',
    name: 'Diagnostic',
    type: 'DIAGNOSTIC',
    displayOrder: 0,
    activities: [], // The DiagnosticCard renders separately above the modules
  },
  {
    id: 'mod-1',
    name: 'Module 1 — Foundations',
    type: 'MODULE',
    displayOrder: 1,
    activities: [
      {
        id: 'act-1-1',
        number: '1.1',
        name: 'Number Properties',
        type: 'concept',
        subType: 'CONCEPT',
        durationMinutes: 40,
        status: STATUS.COMPLETED,
        shaded: false,
        score: 88,
        grade: 'A',
      },
      {
        id: 'act-1-2',
        number: '1.2',
        name: 'Ratios and Proportions',
        type: 'skill',
        subType: 'PROCESS_SKILL',
        durationMinutes: 35,
        status: STATUS.COMPLETED,
        shaded: false,
        score: 74,
        grade: 'B',
      },
      {
        id: 'act-1-3',
        number: '1.3',
        name: 'Percentages and Fractions',
        type: 'skill',
        subType: 'PROCESS_SKILL',
        durationMinutes: 30,
        status: STATUS.SHADED,
        shaded: true,
        score: null,
        grade: null,
      },
      {
        id: 'act-1-4',
        number: '1.4',
        name: 'Module 1 Quiz',
        type: 'module_mock',
        subType: 'MODULE_MOCK',
        durationMinutes: 20,
        status: STATUS.SHADED,
        shaded: true,
        score: null,
        grade: null,
      },
    ],
  },
  {
    id: 'mod-2',
    name: 'Module 2 — Linear Equations',
    type: 'MODULE',
    displayOrder: 2,
    activities: [
      {
        id: 'act-2-1',
        number: '2.1.1',
        name: 'Linear Equations — Core Concepts',
        type: 'concept',
        subType: 'CONCEPT',
        durationMinutes: 45,
        status: STATUS.IN_PROGRESS,
        shaded: false,
        score: null,
        grade: null,
        isCurrent: true, // Highlighted as the "start here" activity
      },
      {
        id: 'act-2-2',
        number: '2.1.2',
        name: 'Solving One-Variable Equations',
        type: 'skill',
        subType: 'PROCESS_SKILL',
        durationMinutes: 35,
        status: STATUS.NOT_STARTED,
        shaded: false,
        score: null,
        grade: null,
      },
      {
        id: 'act-2-3',
        number: '2.1.3',
        name: 'Special Solution Types',
        type: 'skill',
        subType: 'PROCESS_SKILL',
        durationMinutes: 30,
        status: STATUS.SHADED,
        shaded: true,
        score: null,
        grade: null,
      },
      {
        id: 'act-2-4',
        number: '2.2',
        name: 'Systems of Equations',
        type: 'concept',
        subType: 'CONCEPT',
        durationMinutes: 50,
        status: STATUS.NOT_STARTED,
        shaded: false,
        score: null,
        grade: null,
      },
      {
        id: 'act-2-5',
        number: '2.UQE',
        name: 'Unit Qualifying Exam',
        type: 'uqe',
        subType: 'UQE',
        durationMinutes: 30,
        status: STATUS.SHADED,
        shaded: true,
        score: null,
        grade: null,
      },
    ],
  },
  {
    id: 'mod-3',
    name: 'Module 3 — Quadratics',
    type: 'MODULE',
    displayOrder: 3,
    activities: [
      {
        id: 'act-3-1',
        number: '3.1',
        name: 'Quadratic Equations',
        type: 'concept',
        subType: 'CONCEPT',
        durationMinutes: 55,
        status: STATUS.NOT_STARTED,
        shaded: false,
        score: null,
        grade: null,
      },
      {
        id: 'act-3-2',
        number: '3.2',
        name: 'Factoring Techniques',
        type: 'skill',
        subType: 'PROCESS_SKILL',
        durationMinutes: 40,
        status: STATUS.SHADED,
        shaded: true,
        score: null,
        grade: null,
      },
    ],
  },
];

/** Activity used for the demo quiz (Step 6) */
export const DEMO_ACTIVITY = {
  id: 'act-2-1',
  number: '2.1.1',
  name: 'Linear Equations — Core Concepts',
  type: 'concept',
  subType: 'CONCEPT',
  durationMinutes: 45,
  heroTitle: 'Linear Equations',
  heroBadge: 'Concept',
  conceptSummary: 'A linear equation represents a straight line on a graph. The standard form is ax + b = c, where a, b, and c are constants. The solution is the value of x that makes the equation true.',
};

/** Remedial activity data shown in Step 9 */
export const REMEDIAL_ACTIVITY = {
  id: 'rem-2-1',
  name: 'REM: Linear Equations — Core Concepts',
  motherActivityName: 'Linear Equations — Core Concepts',
  mistakeCount: 3,
  questionCount: 6,
  estimatedTimeMinutes: 14,
  heroTitle: 'Targeted Practice',
  heroBadge: 'Remedial',
  conceptSummary: 'This session focuses on the specific equation types you found difficult. Work through each problem carefully — these are your exact gaps.',
};

/** Quiz results for the two demo branches */
export const QUIZ_RESULTS = {
  good: {
    score: 82,
    grade: 'A',
    correct: 4,
    total: 5,
    message: 'Great work! Your path has been updated.',
    nextActivity: {
      number: '2.1.2',
      name: 'Solving One-Variable Equations',
      durationMinutes: 35,
      type: 'skill',
    },
  },
  low: {
    score: 40,
    grade: 'D',
    correct: 2,
    total: 5,
    message: 'Below threshold. A remedial session has been created.',
    remedialCreated: true,
  },
};
