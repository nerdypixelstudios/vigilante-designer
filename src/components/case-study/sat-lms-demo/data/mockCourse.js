/**
 * mockCourse.js
 * -------------
 * Self-contained course and activity data for the SAT LMS interactive demo.
 * The UI stays product-faithful; this file is the portfolio-friendly content swap.
 */

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const PACE_FIRST_ACTIVITY_ID = 204;
const PACE_NEXT_ACTIVITY_ID = 205;
const REMEDIAL_CONTENT_ID = 9204;
const REMEDIAL_QUESTION_COUNT = 5;
const REMEDIAL_MISTAKE_COUNT = 3;

const createActivity = ({
  contentId,
  contentType,
  contentName,
  estimatedDurationMinutes,
  subType = contentType,
  canAccess = true,
}) => ({
  contentId,
  contentType,
  contentName,
  displayOrder: 0,
  estimatedDurationMinutes,
  canAccess,
  subType,
  courseCode: 'PD-FND-01',
  progressStatus: 'NOT_STARTED',
  progressPercentage: 0,
  grade: null,
  bestScore: 0,
  latestScore: 0,
  firstAttemptScore: null,
  timeSpentSeconds: 0,
  remedialQuiz: null,
  shaded: false,
});

const createRemedialActivity = ({
  motherActivityName,
  motherActivityId = PACE_FIRST_ACTIVITY_ID,
  mistakeCount = REMEDIAL_MISTAKE_COUNT,
  questionCount = REMEDIAL_QUESTION_COUNT,
  estimatedTimeMinutes = 14,
}) => ({
  contentId: REMEDIAL_CONTENT_ID,
  contentType: 'REMEDIAL',
  subType: 'REMEDIAL',
  contentName: `REM: ${motherActivityName}`,
  displayOrder: 0,
  estimatedDurationMinutes: estimatedTimeMinutes,
  canAccess: true,
  courseCode: 'PD-FND-01',
  progressStatus: 'NOT_STARTED',
  progressPercentage: 0,
  grade: null,
  bestScore: 0,
  latestScore: 0,
  firstAttemptScore: null,
  timeSpentSeconds: 0,
  remedialQuiz: {
    questionCount,
    mistakeCount,
  },
  motherActivityId,
  motherActivityName,
  mistakeCount,
  questionCount,
  shaded: false,
});

const COURSE_BLUEPRINT = {
  pageCode: 'product_design_foundations',
  pageName: 'Product Design Foundations',
  category: 'DESIGN',
  blocks: [
    {
      blockId: 62,
      blockName: 'Module 1: Problem Framing and Research',
      blockType: 'MODULE',
      displayOrder: 1,
      children: [
        {
          blockId: 63,
          blockName: 'Framing Product Problems',
          blockType: 'UNIT',
          displayOrder: 1,
          contentItems: [
            createActivity({ contentId: 101, contentType: 'CONCEPT', contentName: 'User Problems vs Business Goals', estimatedDurationMinutes: 60 }),
            createActivity({ contentId: 102, contentType: 'CONCEPT', contentName: 'Framing Problem Statements', estimatedDurationMinutes: 55 }),
            createActivity({ contentId: 103, contentType: 'CONCEPT', contentName: 'Defining Outcome Metrics', estimatedDurationMinutes: 50 }),
            createActivity({ contentId: 104, contentType: 'PROCESS_SKILL', contentName: 'Interview Note Synthesis', estimatedDurationMinutes: 45 }),
          ],
        },
        {
          blockId: 64,
          blockName: 'Discovery Interviews',
          blockType: 'UNIT',
          displayOrder: 2,
          contentItems: [
            createActivity({ contentId: 105, contentType: 'CONCEPT', contentName: 'Writing Interview Guides', estimatedDurationMinutes: 55 }),
            createActivity({ contentId: 106, contentType: 'PROCESS_SKILL', contentName: 'Spotting Repeated Themes', estimatedDurationMinutes: 40 }),
          ],
        },
        {
          blockId: 65,
          blockName: 'Module 1 Mock',
          blockType: 'UNIT',
          displayOrder: 99,
          contentItems: [
            createActivity({ contentId: 301, contentType: 'MQE', contentName: 'Module 1 Mock Assessment', estimatedDurationMinutes: 30, subType: 'MQE' }),
          ],
        },
      ],
    },
    {
      blockId: 66,
      blockName: 'Module 2: UX Flows and Wireframes',
      blockType: 'MODULE',
      displayOrder: 2,
      children: [
        {
          blockId: 67,
          blockName: 'Journey Mapping',
          blockType: 'UNIT',
          displayOrder: 1,
          contentItems: [
            createActivity({ contentId: 201, contentType: 'CONCEPT', contentName: 'Mapping Happy Paths', estimatedDurationMinutes: 60 }),
            createActivity({ contentId: 202, contentType: 'CONCEPT', contentName: 'Identifying Drop-Off Points', estimatedDurationMinutes: 60 }),
            createActivity({ contentId: 203, contentType: 'PROCESS_SKILL', contentName: 'Annotating Journey Pain Points', estimatedDurationMinutes: 50 }),
          ],
        },
        {
          blockId: 68,
          blockName: 'Wireframing Core Screens',
          blockType: 'UNIT',
          displayOrder: 2,
          contentItems: [
            createActivity({ contentId: 204, contentType: 'CONCEPT', contentName: 'Low-Fidelity Layout Patterns', estimatedDurationMinutes: 60 }),
            createActivity({ contentId: 205, contentType: 'CONCEPT', contentName: 'Establishing Visual Hierarchy', estimatedDurationMinutes: 55 }),
            createActivity({ contentId: 206, contentType: 'CONCEPT', contentName: 'CTA Priority and Placement', estimatedDurationMinutes: 55 }),
          ],
        },
        {
          blockId: 69,
          blockName: 'Forms and Conversion Flows',
          blockType: 'UNIT',
          displayOrder: 3,
          contentItems: [
            createActivity({ contentId: 207, contentType: 'CONCEPT', contentName: 'Form Friction Audits', estimatedDurationMinutes: 60 }),
            createActivity({ contentId: 208, contentType: 'CONCEPT', contentName: 'Empty, Error, and Success States', estimatedDurationMinutes: 55 }),
          ],
        },
        {
          blockId: 70,
          blockName: 'Interaction Decision-Making',
          blockType: 'UNIT',
          displayOrder: 4,
          contentItems: [
            createActivity({ contentId: 209, contentType: 'CONCEPT', contentName: 'Navigation and Wayfinding Choices', estimatedDurationMinutes: 60 }),
            createActivity({ contentId: 210, contentType: 'CONCEPT', contentName: 'Progressive Disclosure Rules', estimatedDurationMinutes: 55 }),
            createActivity({ contentId: 211, contentType: 'PROCESS_SKILL', contentName: 'Microcopy for Action Moments', estimatedDurationMinutes: 45 }),
          ],
        },
        {
          blockId: 72,
          blockName: 'Module 2 Mock',
          blockType: 'UNIT',
          displayOrder: 99,
          contentItems: [
            createActivity({ contentId: 302, contentType: 'MQE', contentName: 'Module 2 Mock Assessment', estimatedDurationMinutes: 30, subType: 'MQE' }),
          ],
        },
      ],
    },
    {
      blockId: 73,
      blockName: 'Module 3: Design Systems and Handoff',
      blockType: 'MODULE',
      displayOrder: 3,
      children: [
        {
          blockId: 74,
          blockName: 'Component Logic',
          blockType: 'UNIT',
          displayOrder: 1,
          contentItems: [
            createActivity({ contentId: 212, contentType: 'CONCEPT', contentName: 'Token Taxonomy Basics', estimatedDurationMinutes: 60 }),
            createActivity({ contentId: 213, contentType: 'PROCESS_SKILL', contentName: 'Naming Components for Reuse', estimatedDurationMinutes: 50 }),
          ],
        },
        {
          blockId: 75,
          blockName: 'State and Variant Strategy',
          blockType: 'UNIT',
          displayOrder: 2,
          contentItems: [
            createActivity({ contentId: 214, contentType: 'CONCEPT', contentName: 'States, Variants, and Interaction Rules', estimatedDurationMinutes: 60 }),
          ],
        },
        {
          blockId: 76,
          blockName: 'Design QA and Handoff',
          blockType: 'UNIT',
          displayOrder: 3,
          contentItems: [
            createActivity({ contentId: 215, contentType: 'PROCESS_SKILL', contentName: 'Writing Acceptance Criteria for UI', estimatedDurationMinutes: 45 }),
          ],
        },
        {
          blockId: 77,
          blockName: 'Design Systems Unit Qualifying Exam',
          blockType: 'UNIT',
          displayOrder: 90,
          contentItems: [
            createActivity({ contentId: 216, contentType: 'UQE', contentName: 'Design Systems Unit Qualifying Exam', estimatedDurationMinutes: 45, subType: 'UQE' }),
          ],
        },
        {
          blockId: 78,
          blockName: 'Module 3 Mock',
          blockType: 'UNIT',
          displayOrder: 99,
          contentItems: [
            createActivity({ contentId: 303, contentType: 'MQE', contentName: 'Module 3 Mock Assessment', estimatedDurationMinutes: 30, subType: 'MQE' }),
          ],
        },
      ],
    },
    {
      blockId: 79,
      blockName: 'Cementing Medium',
      blockType: 'MODULE',
      displayOrder: 90,
      contentItems: [
        createActivity({ contentId: 401, contentType: 'CEMENTING', contentName: 'Cementing Drill: Prioritizing UX Problems', estimatedDurationMinutes: 25, subType: 'CEMENTING' }),
      ],
      children: [],
    },
    {
      blockId: 80,
      blockName: 'Cementing Hard',
      blockType: 'MODULE',
      displayOrder: 91,
      contentItems: [
        createActivity({ contentId: 402, contentType: 'CEMENTING', contentName: 'Cementing Drill: Design System Tradeoffs', estimatedDurationMinutes: 30, subType: 'CEMENTING' }),
      ],
      children: [],
    },
    {
      blockId: 81,
      blockName: 'Course Mock',
      blockType: 'MODULE',
      displayOrder: 99,
      contentItems: [
        createActivity({ contentId: 999, contentType: 'COURSE_MOCK', contentName: 'Product Design Foundations Course Mock Assessment', estimatedDurationMinutes: 60, subType: 'COURSE_MOCK' }),
      ],
      children: [],
    },
  ],
};

const PRE_DIAGNOSTIC_NEXT_UP_IDS = [101, 102, 103, 104, 105];
const POST_DIAGNOSTIC_NEXT_UP_IDS = [PACE_FIRST_ACTIVITY_ID, PACE_NEXT_ACTIVITY_ID, 211, 215, 401, 402];
const POST_DIAGNOSTIC_SHADED_IDS = [101, 102, 105, 201, 202, 206, 207, 209, 210, 212, 213, 214];

const buildUnit = (unit) => {
  const contentItems = (unit.contentItems || []).map((activity, index) => ({
    ...deepClone(activity),
    displayOrder: index + 1,
  }));
  return {
    blockId: unit.blockId,
    blockName: unit.blockName,
    blockType: unit.blockType,
    displayOrder: unit.displayOrder,
    totalContent: contentItems.length,
    completedContent: 0,
    totalEstimatedTimeMinutes: contentItems.reduce((sum, item) => sum + item.estimatedDurationMinutes, 0),
    children: [],
    contentItems,
  };
};

const buildBlock = (block) => {
  const children = (block.children || []).map(buildUnit);
  const contentItems = (block.contentItems || []).map((activity, index) => ({
    ...deepClone(activity),
    displayOrder: index + 1,
  }));
  const childTotals = children.reduce((acc, child) => ({
    totalContent: acc.totalContent + child.totalContent,
    totalEstimatedTimeMinutes: acc.totalEstimatedTimeMinutes + child.totalEstimatedTimeMinutes,
  }), { totalContent: 0, totalEstimatedTimeMinutes: 0 });

  return {
    blockId: block.blockId,
    blockName: block.blockName,
    blockType: block.blockType,
    displayOrder: block.displayOrder,
    totalContent: childTotals.totalContent + contentItems.length,
    completedContent: 0,
    totalEstimatedTimeMinutes: childTotals.totalEstimatedTimeMinutes + contentItems.reduce((sum, item) => sum + item.estimatedDurationMinutes, 0),
    children,
    contentItems,
  };
};

const getAllActivities = (courseData) => {
  const activities = [];
  (courseData.learningBlocks || []).forEach((block) => {
    (block.contentItems || []).forEach((activity) => activities.push(activity));
    (block.children || []).forEach((unit) => {
      (unit.contentItems || []).forEach((activity) => activities.push(activity));
    });
  });
  return activities;
};

const findActivityById = (courseData, id) =>
  getAllActivities(courseData).find((activity) => Number(activity.contentId) === Number(id)) || null;

const getActivityLocation = (courseData, id) => {
  const targetId = Number(id);
  const regularBlocks = (courseData.learningBlocks || []).filter((block) => block.blockId !== -1);
  for (let moduleIndex = 0; moduleIndex < regularBlocks.length; moduleIndex += 1) {
    const block = regularBlocks[moduleIndex];
    const directIndex = (block.contentItems || []).findIndex((activity) => Number(activity.contentId) === targetId);
    if (directIndex !== -1) {
      return { moduleIndex, unitIndex: null, activityIndex: directIndex };
    }
    for (let unitIndex = 0; unitIndex < (block.children || []).length; unitIndex += 1) {
      const unit = block.children[unitIndex];
      const activityIndex = (unit.contentItems || []).findIndex((activity) => Number(activity.contentId) === targetId);
      if (activityIndex !== -1) {
        return { moduleIndex, unitIndex, activityIndex };
      }
    }
  }
  return null;
};

const setDisplayOrder = (contentItems = []) => {
  contentItems.forEach((activity, index) => {
    activity.displayOrder = index + 1;
  });
};

const markShadedActivities = (courseData, shadedIds) => {
  const shadedSet = new Set(shadedIds.map(Number));
  getAllActivities(courseData).forEach((activity) => {
    activity.shaded = shadedSet.has(Number(activity.contentId));
  });
};

const setNextUpActivities = (courseData, nextUpIds) => {
  const nextUpBlock = (courseData.learningBlocks || []).find((block) => block.blockId === -1);
  if (!nextUpBlock) return;
  nextUpBlock.contentItems = nextUpIds
    .map((id) => findActivityById(courseData, id))
    .filter(Boolean)
    .map((activity) => deepClone(activity));
  setDisplayOrder(nextUpBlock.contentItems);
  nextUpBlock.totalContent = nextUpBlock.contentItems.length;
  nextUpBlock.totalEstimatedTimeMinutes = nextUpBlock.contentItems.reduce((sum, item) => sum + item.estimatedDurationMinutes, 0);
};

const refreshProgress = (courseData) => {
  const regularBlocks = (courseData.learningBlocks || []).filter((block) => block.blockId !== -1);

  regularBlocks.forEach((block) => {
    (block.children || []).forEach((unit) => {
      unit.totalContent = (unit.contentItems || []).length;
      unit.completedContent = (unit.contentItems || []).filter((activity) => activity.progressStatus === 'COMPLETED').length;
      unit.totalEstimatedTimeMinutes = (unit.contentItems || []).reduce((sum, activity) => sum + (activity.estimatedDurationMinutes || 0), 0);
    });

    const directItems = block.contentItems || [];
    const childItems = (block.children || []).flatMap((unit) => unit.contentItems || []);
    const allItems = [...directItems, ...childItems];
    block.totalContent = allItems.length;
    block.completedContent = allItems.filter((activity) => activity.progressStatus === 'COMPLETED').length;
    block.totalEstimatedTimeMinutes = allItems.reduce((sum, activity) => sum + (activity.estimatedDurationMinutes || 0), 0);
  });

  courseData.totalContent = regularBlocks.reduce((sum, block) => sum + block.totalContent, 0);
  courseData.completedContent = regularBlocks.reduce((sum, block) => sum + block.completedContent, 0);
  courseData.totalEstimatedTimeMinutes = regularBlocks.reduce((sum, block) => sum + block.totalEstimatedTimeMinutes, 0);
  return courseData;
};

const createBaseCourseData = () => {
  const blocks = COURSE_BLUEPRINT.blocks.map(buildBlock);
  const nextUpBlock = {
    blockId: -1,
    blockName: 'Next Up',
    blockType: 'MODULE',
    displayOrder: 0,
    totalContent: 0,
    completedContent: 0,
    totalEstimatedTimeMinutes: 0,
    children: [],
    contentItems: [],
  };
  const learningBlocks = [nextUpBlock, ...blocks];
  const regularBlocks = learningBlocks.filter((block) => block.blockId !== -1);
  const totalContent = regularBlocks.reduce((sum, block) => sum + block.totalContent, 0);
  const totalEstimatedTimeMinutes = regularBlocks.reduce((sum, block) => sum + block.totalEstimatedTimeMinutes, 0);

  return {
    pageCode: COURSE_BLUEPRINT.pageCode,
    pageName: COURSE_BLUEPRINT.pageName,
    category: COURSE_BLUEPRINT.category,
    totalContent,
    completedContent: 0,
    totalEstimatedTimeMinutes,
    learningBlocks,
    diagnostic: {
      status: 'not_attempted',
      progressStatus: 'NOT_STARTED',
      estimated_duration_minutes: 10,
      estimatedDurationMinutes: 10,
      question_count: 5,
      progress: {
        questions_completed: 0,
        total_questions: 5,
        time_remaining_minutes: 10,
      },
      results: null,
    },
    pace: {
      toggle_state: false,
      hours_saved: 0,
      activities_remaining: totalContent,
      activities_shaded: [],
      preferredActivityId: null,
    },
  };
};

const markActivityProgress = (courseData, contentId, patch) => {
  const activity = findActivityById(courseData, contentId);
  if (!activity) return null;
  Object.assign(activity, patch);
  return activity;
};

const insertRemedialAfterMother = (courseData, motherActivityId = PACE_FIRST_ACTIVITY_ID) => {
  const location = getActivityLocation(courseData, motherActivityId);
  const motherActivity = findActivityById(courseData, motherActivityId);
  if (!location || !motherActivity) return null;
  const block = (courseData.learningBlocks || []).filter((entry) => entry.blockId !== -1)[location.moduleIndex];
  const unit = location.unitIndex != null ? block?.children?.[location.unitIndex] : null;
  const targetList = unit ? unit.contentItems : block?.contentItems;

  if (!targetList) return null;
  if (targetList.some((activity) => Number(activity.contentId) === REMEDIAL_CONTENT_ID)) {
    return findActivityById(courseData, REMEDIAL_CONTENT_ID);
  }

  const remedialActivity = createRemedialActivity({
    motherActivityName: motherActivity.contentName,
    motherActivityId,
  });

  targetList.splice(location.activityIndex + 1, 0, remedialActivity);
  setDisplayOrder(targetList);
  refreshProgress(courseData);
  return remedialActivity;
};

const buildCourseData = ({
  diagnosticCompleted = false,
  preferredActivityId = null,
  includeRemedial = false,
  motherActivityCompleted = false,
  motherActivityLowScore = false,
  remedialCompleted = false,
  remedialPerfect = false,
} = {}) => {
  const courseData = createBaseCourseData();

  if (diagnosticCompleted) {
    courseData.diagnostic = {
      ...courseData.diagnostic,
      progressStatus: 'COMPLETED',
      score: 72,
      grade: 'B',
      time_spent_minutes: 18,
      activities_shaded: [...POST_DIAGNOSTIC_SHADED_IDS],
      results: {
        score: 72,
        grade: 'B',
        hours_saved: 12.5,
        activities_skipped: POST_DIAGNOSTIC_SHADED_IDS.length,
        total_activities: courseData.totalContent,
        time_spent_minutes: 18,
      },
    };
    courseData.pace = {
      toggle_state: true,
      hours_saved: 12.5,
      activities_remaining: courseData.totalContent - POST_DIAGNOSTIC_SHADED_IDS.length,
      activities_shaded: [...POST_DIAGNOSTIC_SHADED_IDS],
      preferredActivityId: preferredActivityId || PACE_FIRST_ACTIVITY_ID,
    };
    markShadedActivities(courseData, POST_DIAGNOSTIC_SHADED_IDS);
    setNextUpActivities(courseData, POST_DIAGNOSTIC_NEXT_UP_IDS);
  } else {
    markShadedActivities(courseData, []);
    setNextUpActivities(courseData, PRE_DIAGNOSTIC_NEXT_UP_IDS);
  }

  if (motherActivityCompleted) {
    markActivityProgress(courseData, PACE_FIRST_ACTIVITY_ID, {
      progressStatus: 'COMPLETED',
      progressPercentage: 100,
      latestScore: motherActivityLowScore ? 40 : 82,
      bestScore: motherActivityLowScore ? 40 : 82,
      firstAttemptScore: motherActivityLowScore ? 40 : 82,
      grade: motherActivityLowScore ? 'C' : 'A',
      timeSpentSeconds: 18 * 60,
    });
  }

  if (includeRemedial) {
    const remedial = insertRemedialAfterMother(courseData, PACE_FIRST_ACTIVITY_ID);
    if (remedialCompleted) {
      markActivityProgress(courseData, REMEDIAL_CONTENT_ID, {
        progressStatus: 'COMPLETED',
        progressPercentage: 100,
        latestScore: remedialPerfect ? 100 : 60,
        bestScore: remedialPerfect ? 100 : 60,
        firstAttemptScore: remedialPerfect ? 100 : 60,
        grade: remedialPerfect ? 'A' : 'D',
        timeSpentSeconds: 12 * 60,
      });
    }

    if (diagnosticCompleted) {
      if (remedialCompleted && remedialPerfect) {
        courseData.pace.preferredActivityId = PACE_NEXT_ACTIVITY_ID;
        setNextUpActivities(courseData, [PACE_NEXT_ACTIVITY_ID, 211, 215, 401, 402]);
      } else {
        courseData.pace.preferredActivityId = REMEDIAL_CONTENT_ID;
        setNextUpActivities(courseData, [REMEDIAL_CONTENT_ID, PACE_NEXT_ACTIVITY_ID, 211, 215, 401]);
      }
    }
  } else if (diagnosticCompleted) {
    courseData.pace.preferredActivityId = preferredActivityId || PACE_FIRST_ACTIVITY_ID;
  }

  refreshProgress(courseData);
  return courseData;
};

export const COURSE = {
  id: COURSE_BLUEPRINT.pageCode,
  name: COURSE_BLUEPRINT.pageName,
  category: COURSE_BLUEPRINT.category,
};

export const DIAGNOSTIC = {
  status: 'not_attempted',
  config: {
    estimated_duration_minutes: 10,
    question_count: 5,
  },
  results: {
    score: 72,
    grade: 'B',
    hours_saved: 12.5,
    activities_skipped: POST_DIAGNOSTIC_SHADED_IDS.length,
    total_activities: 28,
    time_spent_minutes: 18,
  },
};

export const PACE = {
  hoursSaved: 12.5,
  activitiesSkipped: POST_DIAGNOSTIC_SHADED_IDS.length,
  totalActivities: 28,
  firstActivity: {
    id: PACE_FIRST_ACTIVITY_ID,
    number: '2.2.1',
    name: 'Low-Fidelity Layout Patterns',
    duration: 60,
    type: 'CONCEPT',
    subType: 'CONCEPT',
  },
  nextActivity: {
    id: PACE_NEXT_ACTIVITY_ID,
    number: '2.2.2',
    name: 'Establishing Visual Hierarchy',
    duration: 55,
    type: 'CONCEPT',
    subType: 'CONCEPT',
  },
};

export const PRE_DIAGNOSTIC_COURSE = buildCourseData({ diagnosticCompleted: false });
export const POST_DIAGNOSTIC_COURSE = buildCourseData({
  diagnosticCompleted: true,
  preferredActivityId: PACE_FIRST_ACTIVITY_ID,
});
export const REINFORCEMENT_COURSE = buildCourseData({
  diagnosticCompleted: true,
  preferredActivityId: PACE_FIRST_ACTIVITY_ID,
});
export const REINFORCEMENT_REMEDIAL_COURSE = buildCourseData({
  diagnosticCompleted: true,
  includeRemedial: true,
  motherActivityCompleted: true,
  motherActivityLowScore: true,
});
export const REINFORCEMENT_SUCCESS_COURSE = buildCourseData({
  diagnosticCompleted: true,
  includeRemedial: true,
  motherActivityCompleted: true,
  motherActivityLowScore: true,
  remedialCompleted: true,
  remedialPerfect: true,
});
export const REINFORCEMENT_RETRY_COURSE = buildCourseData({
  diagnosticCompleted: true,
  includeRemedial: true,
  motherActivityCompleted: true,
  motherActivityLowScore: true,
  remedialCompleted: true,
  remedialPerfect: false,
});

export const getCourseDataForDemoState = (state = 'pre') => {
  switch (state) {
    case 'post':
    case 'happy':
      return buildCourseData({
        diagnosticCompleted: true,
        preferredActivityId: PACE_FIRST_ACTIVITY_ID,
      });
    case 'reinforcement':
      return buildCourseData({
        diagnosticCompleted: true,
        preferredActivityId: PACE_FIRST_ACTIVITY_ID,
      });
    case 'reinforcement_remedial':
      return buildCourseData({
        diagnosticCompleted: true,
        includeRemedial: true,
        motherActivityCompleted: true,
        motherActivityLowScore: true,
      });
    case 'reinforcement_success':
      return buildCourseData({
        diagnosticCompleted: true,
        includeRemedial: true,
        motherActivityCompleted: true,
        motherActivityLowScore: true,
        remedialCompleted: true,
        remedialPerfect: true,
      });
    case 'reinforcement_retry':
      return buildCourseData({
        diagnosticCompleted: true,
        includeRemedial: true,
        motherActivityCompleted: true,
        motherActivityLowScore: true,
        remedialCompleted: true,
        remedialPerfect: false,
      });
    default:
      return buildCourseData({ diagnosticCompleted: false });
  }
};

export const getActivityForDemo = (contentId, state = 'post') => {
  const courseData = getCourseDataForDemoState(state);
  const activity = findActivityById(courseData, contentId);
  if (!activity) return null;
  const location = getActivityLocation(courseData, contentId);
  return {
    ...deepClone(activity),
    location,
  };
};

export const DEMO_ACTIVITY = {
  id: PACE_FIRST_ACTIVITY_ID,
  number: '2.2.1',
  name: 'Low-Fidelity Layout Patterns',
  type: 'CONCEPT',
  subType: 'CONCEPT',
  durationMinutes: 60,
  heroTitle: 'Low-Fidelity Layout Patterns',
  heroBadge: 'Concept',
  conceptSummary:
    'This lesson teaches how to move from fuzzy ideas to fast, testable screen structures before visual polish begins.',
};

export const REMEDIAL_ACTIVITY = {
  id: REMEDIAL_CONTENT_ID,
  name: 'REM: Low-Fidelity Layout Patterns',
  motherActivityId: PACE_FIRST_ACTIVITY_ID,
  motherActivityName: 'Low-Fidelity Layout Patterns',
  mistakeCount: REMEDIAL_MISTAKE_COUNT,
  questionCount: REMEDIAL_QUESTION_COUNT,
  estimatedTimeMinutes: 14,
  heroTitle: 'Targeted Practice',
  heroBadge: 'Remedial',
  conceptSummary:
    'This remedial session focuses only on the decision gaps surfaced in your attempt, so you can correct the pattern without redoing the full lesson.',
};

export const QUIZ_RESULTS = {
  good: {
    score: 82,
    grade: 'A',
    correct: 4,
    total: 5,
    message: 'Great work! Your path has been updated.',
    nextActivity: {
      number: '2.2.2',
      name: 'Establishing Visual Hierarchy',
      durationMinutes: 55,
      type: 'CONCEPT',
    },
  },
  low: {
    score: 40,
    grade: 'C',
    correct: 2,
    total: 5,
    message: 'Below threshold. A remedial session has been created.',
    remedialCreated: true,
  },
};

export const REMEDIAL_RESULTS = {
  success: {
    score: 100,
    title: 'Gaps fixed',
    message: "You've plugged the targeted gap and can move forward in the course.",
  },
  retry: {
    score: 60,
    title: 'Gap still open',
    message: 'Review the result and head back to the course when you are ready to try again.',
  },
};

export default PRE_DIAGNOSTIC_COURSE;
