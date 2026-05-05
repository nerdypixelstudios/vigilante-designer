import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ExternalArrowIcon, RedditIcon, TutorAnswerArrowIcon, TutorBulbIcon } from '../../components/icons/icons';
import Navigation from '../../components/sections/Navigation/Navigation';
import Tooltip from '../../components/shared/Tooltip';
import styles from './neuron.module.css';

const caseStudyLinks = [
  { href: '#tldr', label: 'TL;DR' },
  { href: '#problem', label: 'Problem' },
  { href: '#solution', label: 'Solution' },
  { href: '#outcome', label: 'Outcome' },
];

const metrics = [
  {
    label: 'Next-step continuation',
    value: '89%',
    startValue: 32,
    endValue: 89,
    suffix: '%',
    detail: 'up from 32%',
    tooltip: [
      'Measures how often students start the next recommended activity immediately after completing one.',
      'This improved by making the next step explicit, removing alternate paths, and keeping the user in a continuous flow instead of returning them to a menu.',
    ],
  },
  {
    label: 'Progress depth',
    value: '72%',
    startValue: 52,
    endValue: 72,
    suffix: '%',
    detail: 'up from 52%',
    tooltip: [
      'Measures how much of the system-recommended path a student completes before dropping off.',
      'This increased by structuring the course into guided, adaptive paths, ensuring students only see what they need and do not get lost in the full syllabus.',
    ],
  },
  {
    label: 'Time to first meaningful action',
    value: '45 sec',
    startValue: 112,
    endValue: 45,
    suffix: ' sec',
    detail: 'down from 1 min 52 sec',
    tooltip: [
      'Measures how long it takes for a student to start their first learning activity after opening the app.',
      'Reduced by removing setup decisions and surfacing a single, immediate next action, so users can start learning without figuring out where to begin.',
    ],
  },
];

const redditCards = [
  {
    subreddit: 'r/digitalSATs',
    title: 'Practice was not turning into learning',
    quote: "I don’t feel like I’m learning anything useful…",
    interpretation: 'Practice was happening, but it was not reliably translating into understanding or progress.',
    href: 'https://www.reddit.com/r/digitalSATs/comments/1gh5y4p',
  },
  {
    subreddit: 'r/SAT',
    title: 'Explanations answered questions, not concepts',
    quote: 'The explanations… don’t teach the concepts involved.',
    interpretation: 'Students could review answers, but not always learn the underlying concept well enough to transfer.',
    href: 'https://www.reddit.com/r/Sat/comments/14lpzv9',
  },
  {
    subreddit: 'r/SAT',
    title: 'Foundational gaps stayed hidden',
    quote: 'I fundamentally don’t know…',
    interpretation: 'Many students were not just making mistakes — they were missing buried foundations the system failed to surface.',
    href: 'https://www.reddit.com/r/Sat/comments/1sd5pgn/review_course_was_a_bust/',
  },
  {
    subreddit: 'r/satprep',
    title: 'Resources became a content dump',
    quote: 'Here’s 800 pages… weak spots get two problems.',
    interpretation: 'The market had enough material, but not enough intelligence to decide what deserved attention for each student.',
    href: 'https://www.reddit.com/r/satprep/comments/1lqvbql',
  },
];

const answerFrames = [
  {
    id: 'evaluate',
    headline: 'Evaluate first',
    bodyText: 'A tutor would not hand over a content dump. They would first understand where the student stands.',
    body: [
      { text: 'A tutor would not hand over a content dump. ' },
      { text: 'They would first understand where the student stands.', strong: true },
    ],
    video: '/videos/case-studies/sat-lms/private-tutor-evaluate.mp4',
  },
  {
    id: 'curate',
    headline: 'Curate the path',
    bodyText: 'A tutor would focus the student on what matters, skip what they already know, and keep proof where needed.',
    body: [
      { text: 'A tutor would ' },
      { text: 'focus the student on what matters', strong: true },
      { text: ', skip what they already know, and keep proof where needed.' },
    ],
    video: '/videos/case-studies/sat-lms/private-tutor-evaluate.mp4',
  },
  {
    id: 'momentum',
    headline: 'Keep momentum alive',
    bodyText: 'A tutor would not let confusion, low scores, or breaks become dead ends. They would give the next useful action.',
    body: [
      { text: 'A tutor ' },
      { text: 'would not let confusion, low scores, or breaks become dead ends', strong: true },
      { text: '. They would give the next useful action.' },
    ],
    video: '/videos/case-studies/sat-lms/private-tutor-evaluate.mp4',
  },
];

const decisionVideos = {
  diagnostic: '/videos/case-studies/sat-lms/diagnostic-first.mp4',
  personalizedPath: '/videos/case-studies/sat-lms/personalized-path.mp4',
  nextAction: '/videos/case-studies/sat-lms/next-action.mp4',
  remedial: '/videos/case-studies/sat-lms/remedial.mp4',
};

const tutorDecisions = [
  {
    number: '01',
    title: 'I made the diagnostic the first evident action.',
    aim: 'Establish the student\'s starting point before the LMS prescribes anything.',
    productDecision: [
      { text: 'Students should ' },
      { text: 'begin the course with the diagnostic', strong: true },
      { text: ', so the LMS can understand their level before shaping the path.' },
    ],
    uxSupport: [
      { text: 'I kept it prominent until it was taken through the ' },
      { text: 'hero advisory', strong: true },
      { text: ', the ' },
      { text: 'recommended first card', strong: true },
      { text: ', and ' },
      { text: 'friction that warned', strong: true },
      { text: ' against skipping ahead.' },
    ],
    visualType: 'diagnostic',
    video: decisionVideos.diagnostic,
    placeholderTitle: 'Course focus screenshot',
    placeholderLabel: 'Diagnostic-first course state',
    insetTitle: 'Diagnostic advisory modal',
    annotations: [
      'Diagnostic gets top priority',
      'Why this matters is explained',
      'Browsing stays secondary',
      'Guided before exploration',
    ],
  },
  {
    number: '02',
    title: 'I made the personalized path feel earned — not magical.',
    aim: 'Make personalization feel trustworthy by showing the logic behind the changed path.',
    productDecision: [
      { text: 'After the diagnostic, students should get a ' },
      { text: 'path shaped by what they know, what they can skip, and what still needs proof', strong: true },
      { text: '.' },
    ],
    uxSupport: [
      { text: 'I made that payoff visible through ' },
      { text: 'recommended items', strong: true },
      { text: ', ' },
      { text: 'skipped content', strong: true },
      { text: ', ' },
      { text: 'proof checkpoints', strong: true },
      { text: ', and ' },
      { text: 'time saved', strong: true },
      { text: ', so the path felt like the reward for effort.' },
    ],
    visualType: 'personalize',
    video: decisionVideos.personalizedPath,
    placeholderTitle: 'PACE-on course screenshot',
    placeholderLabel: 'Personalized path with skipped and recommended work',
    annotations: [
      'Skipped, not hidden',
      'Recommended path',
      'Time saved',
      'Proof still required',
      'Adaptive, not arbitrary',
    ],
  },
  {
    number: '03',
    title: 'I made the next action dominant and pushed exploration into the background.',
    aim: 'Keep students moving through the right next activity instead of returning them to a syllabus.',
    productDecision: [
      { text: 'Once the path is known, the course should ' },
      { text: 'keep prescribing what to do next', strong: true },
      { text: ' instead of asking students to browse the full syllabus.' },
    ],
    uxSupport: [
      { text: 'I centered the page around ' },
      { text: 'Next Up', strong: true },
      { text: ', the ' },
      { text: 'current module', strong: true },
      { text: ', and ' },
      { text: 'resume learning', strong: true },
      { text: ', while keeping broader exploration available but secondary.' },
    ],
    visualType: 'prescribe',
    video: decisionVideos.nextAction,
    placeholderTitle: 'Prescribed next-action screenshot',
    placeholderLabel: 'Next Up, current module, and resume learning focus',
    annotations: [
      'Immediate next step',
      'Current module stays visible',
      'Exploration is secondary',
      'Action over browsing',
    ],
  },
  {
    number: '04',
    title: 'I turned weak moments into guided re-entry points.',
    aim: 'Turn low-score and return moments into clear recovery instead of self-diagnosis.',
    productDecision: [
      { text: 'When students underperform or return after a break, the LMS should ' },
      { text: 'generate a recovery path', strong: true },
      { text: ' instead of leaving them to self-correct.' },
    ],
    uxSupport: [
      { text: 'The recovery state should ' },
      { text: 'show what happened', strong: true },
      { text: ' and surface a ' },
      { text: 'clear remedial or revision action', strong: true },
      { text: ', so students ' },
      { text: 'restart from motion', strong: true },
      { text: ', not confusion.' },
    ],
    visualType: 'recover',
    video: decisionVideos.remedial,
    placeholderTitle: 'Recovery-state screenshot to be added',
    placeholderLabel: 'Will show remedial / revision re-entry state',
    annotations: [],
  },
];

const shippedFlow = [
  {
    title: 'Course landing before diagnostic',
    text: 'The first job is not browsing. It is starting the diagnostic that unlocks the path.',
    image: '/images/case-studies/sat-lms/course-before-diagnostic.webp',
    width: 1600,
    height: 947,
  },
  {
    title: 'Diagnostic advisory',
    text: 'The student sees the value before committing time to the assessment.',
    image: '/images/case-studies/sat-lms/diagnostic-advisory.webp',
    width: 1600,
    height: 1285,
  },
  {
    title: 'Diagnostic results',
    text: 'The result is direction, not just a score.',
    image: '/images/case-studies/sat-lms/diagnostic-results-summary.webp',
    width: 1600,
    height: 979,
  },
  {
    title: 'PACE path choice',
    text: 'The product explains what changed and invites the student into the personalized path.',
    image: '/images/case-studies/sat-lms/pace-choice-modal.webp',
    width: 1600,
    height: 1017,
  },
  {
    title: 'PACE focus mode',
    text: 'The course now opens around the prescribed next items.',
    image: '/images/case-studies/sat-lms/hero-focus-pace-on.webp',
    width: 1600,
    height: 947,
  },
  {
    title: 'Recovery path',
    text: 'Missed learning converts into the next action instead of becoming another search task.',
    image: '/images/case-studies/sat-lms/next-activity-recovery.webp',
    width: 1600,
    height: 844,
  },
];

const designForgeInputFiles = [
  '00-README-remedials.md',
  '01-context-and-business-rules-remedials.md',
  '02-screen-inventory-remedials.md',
  '03-user-journey-map-remedials.md',
  '04-component-specification-remedials.md',
  '05-wireframes-remedials.md',
  '06-screen-flow-diagram-remedials.md',
  '07-backend-specification-remedials.md',
  '08-frontend-success-criteria-remedials.md',
  'html-renders/',
];

const journeyComponentLibrary = {
  R1: {
    name: 'Remedial Created Modal',
    type: 'Modal (New)',
    purpose: 'Single-button prompt after activity with mistakes. Shows mistake count, question count, and time estimate. One button: "Start Remedial".',
    states: ['Visible', 'Dismissed'],
  },
  R2: {
    name: 'Remedial Activity Row',
    type: 'Row (New)',
    purpose: 'Indented sidebar entry under mother activity. Shows remedial name, question count, time estimate, and status.',
    states: ['Not Started', 'In Progress', 'Completed (Pass)', 'Completed (Fail)'],
  },
  R3: {
    name: 'Remedial Completion Feedback',
    type: 'Feedback (New)',
    purpose: 'Score-based messaging after remedial completion. Green checkmark for 100%, amber warning for <100%.',
    states: ['Perfect (100%)', 'With Mistakes (<100%)'],
  },
  R4: {
    name: 'Remedial Activity Header',
    type: 'Header (New)',
    purpose: 'Header during remedial quiz showing context: "REMEDIAL" badge, mother activity name, mistake count, progress.',
    states: ['Default'],
  },
  R5: {
    name: 'Remedial Reason Tooltip',
    type: 'Tooltip (New)',
    purpose: 'Hover explanation showing why remedial was created: "Created because you made X mistake(s) in [Mother Activity]".',
    states: ['Hidden', 'Visible'],
  },
  R6: {
    name: 'Results Screen Notice',
    type: 'Notice (New)',
    purpose: 'Section in activity results screen indicating remedial was created. Shows question count and time estimate.',
    states: ['Visible (remedial created)', 'Hidden (no remedial)'],
  },
  M1: {
    name: 'Activity Results Screen',
    type: 'Modified',
    purpose: 'Add space for R6 notice. Continue button triggers R1 modal if remedial created.',
    states: ['Results Only', 'Results + Remedial Notice'],
  },
  M2: {
    name: 'Course Sidebar',
    type: 'Modified',
    purpose: 'Support indented remedial rows (R2). Remedials insert below mother activity with visual hierarchy.',
    states: ['Default', 'With Remedials'],
  },
  M3: {
    name: 'Next Up Section',
    type: 'Modified',
    purpose: 'Include remedials in queue. Priority: oldest pending remedial first (FIFO), then regular activities.',
    states: ['No Remedials', 'With Pending Remedials'],
  },
  M4: {
    name: 'Course Progress Display',
    type: 'Modified',
    purpose: 'Account for remedials: total = base - pace_shaded + remedials_created. Completed includes remedials.',
    states: ['Default'],
  },
  M6: {
    name: 'Course Time Estimate',
    type: 'Modified',
    purpose: 'Include pending remedial time in remaining estimate. Updates when remedial created.',
    states: ['Default'],
  },
};

const journeyComponentRows = [
  {
    id: 'J1',
    name: 'CF Remedial (Happy Path)',
    desc: 'Primary flow — Concept File with any mistake',
    frequency: 'high',
    trigger: 'Any mistake in Concept File (100% required)',
    flows: [
      { label: 'Activity Complete', tags: [{ id: 'M1' }, { id: 'R6' }, { id: 'R1' }] },
      { label: 'Remedial Quiz', tags: [{ id: 'R4' }, { id: 'R3' }] },
      { label: 'Course Home', tags: [{ id: 'M2' }, { id: 'M3' }, { id: 'M4' }, { id: 'M6' }] },
    ],
  },
  {
    id: 'J2',
    name: 'Process Skill Remedial',
    desc: 'PrS with <80% accuracy',
    frequency: 'medium',
    trigger: 'Score below 80% in Process Skill',
    flows: [{ note: 'Same as J1 (different trigger threshold: <80% instead of any mistake)' }],
  },
  {
    id: 'J6',
    name: 'Remedial Skipped',
    desc: 'Student dismisses modal',
    frequency: 'medium',
    trigger: 'User dismisses R1 modal',
    flows: [
      { tags: [{ id: 'R1', state: 'dismissed' }, { id: 'M2', state: 'pending' }] },
      { label: 'Result', note: 'Remedial stays in sidebar (not_started), appears in Next Up. NOT blocking.' },
    ],
  },
];

const designForgeSandboxRows = [
  '# Remedials Sandbox Requirement Document',
  '## Base Pages Needed',
  '## Existing Components to DELETE',
  '## New Components to Create (R1-R6)',
  '## Mock Data Requirements',
  '## Routing Setup',
];

const designForgeGapRows = [
  'Q1 | mistake_count for R1/R5',
  'Q2 | question_count for R1/R6',
  'Q4 | R6 Notice / R1 Modal integration',
  'Q6 | activity completion response for remedial states',
  'X. Backend Issues.md | missing remedialData in quiz summary',
];

const designForgeInterfaceRows = [
  '3. Design iteration.jpg',
  'Gap-Closure-Tracker-Specification.md',
  'activity-rows-demo.html',
  'ActivitySidebarDemo.jsx',
  'r2-remedial-row.jsx',
  'r6-dual-placement.jsx',
];

const designForgeIntegrationRows = [
  '# Parallel Component Documentation Template',
  '## What to Document (Non-Obvious Things)',
  'Integration Patterns | State Dependencies | Data Requirements',
  '## PaceTogglePanel (PC2)',
  '### Easy to Miss',
];

const designForgeMigrationRows = [
  'O6. Prod migration map.md',
  'O7. Migration Process Flowchart.md',
  'O8. Remedials Frontend Audit.md',
  'O9. Remedials Backend Audit.md',
  'O7. Token deviation report.md | empty',
];

const designForgeSteps = [
  {
    id: 'input-spec',
    number: '00',
    title: 'Talk it through before walking it',
    artifact: 'Input specification package',
    body: [
      { text: 'Before build, I wrote down ' },
      { text: 'all', strong: true },
      { text: ' the business rules, screens, journeys, component behavior, wireframes, screen flow, backend contracts, and success criteria, so the feature had one source of truth.' },
    ],
    prevented: 'AI inventing product logic mid-build.',
    previewType: 'inputTree',
  },
  {
    id: 'map-behavior',
    number: '01',
    title: 'Map the behavior',
    artifact: 'Journey component map',
    body: [
      { text: 'Once the specification — what we are trying to build — was written into an ironclad input, I converted that into a ' },
      { text: 'student journey and a component dependency map', strong: true },
      { text: ', so the feature could be judged as a flow instead of isolated screens.' },
    ],
    prevented: 'Screens that looked right alone but failed in sequence.',
    previewType: 'journeyMap',
  },
  {
    id: 'safe-build-space',
    number: '02',
    title: 'Create a safe build space',
    artifact: 'Sandbox requirement doc',
    body: [
      { text: 'With the journey and component map in hand, I set up a ' },
      { text: 'sandbox', strong: true },
      { text: ' where those components could be assembled, tested, broken, and improved away from production pressure.' },
    ],
    prevented: 'Production constraints deciding the UX too early.',
    previewType: 'sandboxDoc',
  },
  {
    id: 'rough-experience',
    number: '03',
    title: 'Make the experience work before making it beautiful',
    artifact: 'Rough working build + gap docs',
    body: [
      { text: 'Inside the sandbox, I used a ' },
      { text: 'rough working build', strong: true },
      { text: ' to find missing states, unclear next actions, weak hierarchy, and backend gaps before any visual polish.' },
    ],
    prevented: 'Polishing while core data contracts were still unclear.',
    previewType: 'roughBuildGaps',
  },
  {
    id: 'forge-interface',
    number: '04',
    title: 'Forge the interface',
    artifact: 'Component renders + design specification',
    body: [
      { text: 'Once the rough build had exposed the real UX behavior, I moved into interface design — ' },
      { text: 'only then', strong: true },
      { text: ' documenting hierarchy, states, and treatment.' },
    ],
    prevented: 'Pretty UI detached from behavior.',
    previewType: 'componentOptions',
  },
  {
    id: 'assemble-experience',
    number: '05',
    title: 'Assemble the experience',
    artifact: 'Integrated sandbox',
    body: [
      { text: 'I dropped the polished components back into the sandbox and tested them as ' },
      { text: 'one complete flow', strong: true },
      { text: ', so the polish had to survive the journey end to end.' },
    ],
    prevented: 'Polished components that did not survive the full flow.',
    previewType: 'integratedSandbox',
  },
  {
    id: 'production',
    number: '06',
    title: 'Move into production',
    artifact: 'Migration map, token deviation report, productionized component',
    body: [
      { text: 'With the full flow validated, I moved to production with ' },
      { text: 'migration notes, system checks, backend contracts, and token-deviation reports', strong: true },
      { text: ', so intent did not get flattened in handoff.' },
    ],
    prevented: 'Intent getting flattened in handoff.',
    previewType: 'productionMigration',
  },
];

const designForgePromptExcerpts = [
  {
    label: 'Map behavior',
    copy: 'Review the requirement package and identify user journeys, component dependencies, missing decisions, and build priority before UI work begins.',
  },
  {
    label: 'Forge interface',
    copy: 'Create three distinct design options. Use the component purpose, user state, required data, states, constraints, and rough render as context.',
  },
];

const designForgeOutcomes = [
  {
    title: 'Faster build',
    copy: 'Less rework because the product was not being rediscovered during execution.',
  },
  {
    title: 'Cleaner UX',
    copy: 'Building the rough experience first exposed UX problems before visual polish.',
  },
  {
    title: 'Better UI output',
    copy: 'Every component had a known role inside the student journey.',
  },
  {
    title: 'Safer production migration',
    copy: 'The final feature carried product logic and design intent into the real system.',
  },
];

function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealVisible);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className={`${styles.reveal} ${className}`}>
      {children}
    </div>
  );
}

function useInViewOnce({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { ref, isVisible };
}

function StaggeredText({ as: Tag = 'h2', segments, text, id, className = '' }) {
  const { ref, isVisible } = useInViewOnce();
  const textSegments = segments || [{ text }];
  let wordIndex = 0;
  const ariaLabel = textSegments.map((segment) => segment.text).join(' ');

  return (
    <Tag
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      className={`${className} ${styles.staggerText} ${isVisible ? styles.staggerTextVisible : ''}`}
    >
      {textSegments.map((segment, segmentIndex) => {
        const words = segment.text.split(' ');

        return (
          <span key={`${segment.text}-${segmentIndex}`} className={segment.className || ''} aria-hidden="true">
            {words.map((word, index) => {
              const currentIndex = wordIndex;
              wordIndex += 1;

              return (
                <span
                  key={`${word}-${currentIndex}`}
                  className={styles.staggerWord}
                  style={{ '--word-index': currentIndex }}
                >
                  {word}
                </span>
              );
            })}
            {segment.breakAfter ? <br /> : segmentIndex < textSegments.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </Tag>
  );
}

function AnimatedMetricValue({ metric }) {
  const { ref, isVisible } = useInViewOnce();
  const [displayValue, setDisplayValue] = useState(metric.startValue);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(metric.endValue);
      return undefined;
    }

    if (!isVisible) {
      return undefined;
    }

    let animationFrame;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / 1400, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(metric.startValue + ((metric.endValue - metric.startValue) * easedProgress));

      setDisplayValue(nextValue);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [isVisible, metric.endValue, metric.startValue]);

  return (
    <p ref={ref} className="font-cabinet text-6xl font-extrabold leading-none text-accent-green md:text-7xl">
      {displayValue}{metric.suffix}
    </p>
  );
}

function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="block h-auto w-full"
      autoPlay
      loop
      muted
      playsInline
      poster="/images/case-studies/sat-lms/hero-focus-pace-on.webp"
    >
      <source src="/videos/case-studies/sat-lms/pace-path.mp4" type="video/mp4" />
    </video>
  );
}

function BrowserChrome() {
  return (
    <div className="flex items-center gap-2 rounded-t-xl border-b border-ink-100 bg-surface-white px-4 py-3">
      <div className="h-3 w-3 rounded-full bg-ink-100"></div>
      <div className="h-3 w-3 rounded-full bg-ink-100"></div>
      <div className="h-3 w-3 rounded-full bg-ink-100"></div>
    </div>
  );
}

function ApproachInteraction() {
  const shellRef = useRef(null);
  const wordplayRef = useRef(null);

  useEffect(() => {
    const shell = shellRef.current;
    const wordplay = wordplayRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!shell) {
      return undefined;
    }

    if (!wordplay || prefersReducedMotion) {
      shell.classList.add(styles.wordplayReady);
      return undefined;
    }

    const wordplayObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          shell.classList.add(styles.wordplayReady);
          wordplayObserver.disconnect();
        }
      },
      { threshold: 0.95 }
    );

    wordplayObserver.observe(wordplay);

    return () => wordplayObserver.disconnect();
  }, []);

  return (
    <div ref={shellRef} className={styles.approachPinShell}>
      <div className={styles.approachSticky}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className={styles.approachInteractionLayout}>
              <div className={styles.approachThinkingRow}>
                <p id="approach-heading" className="mb-10 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">How I approached the problem</p>
                <div className={styles.approachCopyColumn}>
                  <p className="font-dm text-body leading-relaxed text-ink-950">
                    Once the problem was clear, I asked the question —
                    <br />
                    <span className="box-decoration-clone bg-accent-yellow px-1 font-extrabold">
                      If the student were working with a private tutor,
                      <br />
                      what would the tutor do for them?
                    </span>
                  </p>

                  <p
                    ref={wordplayRef}
                    className={styles.wordplayStatement}
                    aria-label="I began thinking of the LMS as an intelligent tutor."
                  >
                    <span>I began thinking of the LMS </span>
                    <span className={styles.wordplayRejected}>not as a place to browse courses, but </span>
                    <span>as an intelligent tutor.</span>
                  </p>
                </div>
                <TutorAnswerArrowIcon className={styles.approachAnswerArrow} />
              </div>

              <div className={styles.approachAnswerRow}>
                <div className={styles.answerStatic}>
                  <TutorBulbIcon className={styles.answerBulbIcon} />
                  <p>The answer:</p>
                </div>
                <div className={styles.answerViewport}>
                  <div className={styles.answerTrack}>
                    {answerFrames.map((frame) => (
                      <article
                        key={frame.id}
                        className={styles.answerFrame}
                        aria-label={`${frame.headline}: ${frame.bodyText}`}
                      >
                        <div className={styles.answerVideoWrap} aria-hidden="true">
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                          >
                            <source src={frame.video} type="video/mp4" />
                          </video>
                        </div>
                        <div className={styles.answerCopy}>
                          <h3 className="font-cabinet text-case-study-statement font-extrabold leading-tight text-ink-950">{frame.headline}</h3>
                          <p className="mt-6 font-dm text-small leading-relaxed text-ink-800">
                            {frame.body.map((segment) => (
                              segment.strong ? (
                                <strong key={segment.text} className="font-extrabold text-ink-950">{segment.text}</strong>
                              ) : (
                                <span key={segment.text}>{segment.text}</span>
                              )
                            ))}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function DecisionVisual({ decision }) {
  if (decision.video) {
    return <DecisionVideoFrame decision={decision} />;
  }

  return <DecisionPlaceholderGraphic decision={decision} />;
}

function DecisionVideoFrame({ decision }) {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;

    if (!frame) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(frame);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <div
      ref={frameRef}
      className={`${styles.decisionBrowser} ${styles.decisionVideoBrowser} ${styles.decisionVideoFrame} ${isInView ? styles.decisionVideoFrameVisible : ''}`}
    >
      <BrowserChrome />
      <div className={styles.decisionVideoReveal}>
        <video
          ref={videoRef}
          className={styles.decisionVideo}
          loop
          muted
          playsInline
          preload="auto"
          aria-label={decision.placeholderLabel}
        >
          <source src={decision.video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

function DecisionPlaceholderGraphic({ decision }) {
  const visualClassName = `${styles.decisionVisualFrame} ${styles[`decisionVisualFrame${decision.visualType}`]}`;

  return (
    <div>
      <div className={visualClassName}>
        {decision.visualType === 'recover' ? (
          <div className={styles.recoveryPlaceholder}>
            <p className="font-cabinet text-2xl font-extrabold leading-tight text-ink-950">{decision.placeholderTitle}</p>
            <p className="mt-2 font-dm text-base leading-relaxed text-ink-500">{decision.placeholderLabel}</p>
          </div>
        ) : (
          <>
            <div className={styles.decisionBrowser}>
              <BrowserChrome />
              <div className={styles.decisionPlaceholderCanvas}>
                <div className={styles.placeholderHeader}>
                  <span>{decision.placeholderTitle}</span>
                  {decision.visualType === 'personalize' ? <span className={styles.paceToggle}>PACE on</span> : null}
                </div>
                <div className={styles.placeholderHero}></div>
                <div className={styles.placeholderCards}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p className="font-dm text-sm font-extrabold uppercase tracking-widest text-ink-500">{decision.placeholderLabel}</p>
              </div>
            </div>

            {decision.visualType === 'diagnostic' ? (
              <div className={styles.decisionInset}>
                <p className="font-cabinet text-xl font-extrabold leading-tight text-ink-950">{decision.insetTitle}</p>
                <p className="mt-3 font-dm text-sm leading-relaxed text-ink-700">Shows why the diagnostic matters before exploration.</p>
                <div className={styles.insetActions}>
                  <span></span>
                  <span></span>
                </div>
              </div>
            ) : null}
          </>
        )}

        {decision.annotations.length > 0 ? (
          <div className={styles.decisionAnnotationLayer}>
            {decision.annotations.map((annotation, index) => (
              <span
                key={annotation}
                className={`${styles.decisionAnnotation} ${styles[`decisionAnnotation${index}`]}`}
              >
                {annotation}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function DecisionSentence({ segments }) {
  return (
    <>
      {segments.map((segment, index) => (
        segment.strong ? (
          <strong key={`${segment.text}-${index}`} className={styles.decisionEvidenceStrong}>{segment.text}</strong>
        ) : (
          <span key={`${segment.text}-${index}`}>{segment.text}</span>
        )
      ))}
    </>
  );
}

function ProcessSentence({ segments }) {
  return (
    <>
      {segments.map((segment, index) => (
        segment.strong ? (
          <strong key={`${segment.text}-${index}`}>{segment.text}</strong>
        ) : (
          <span key={`${segment.text}-${index}`}>{segment.text}</span>
        )
      ))}
    </>
  );
}

function TutorDecision({ decision }) {
  return (
    <article className={styles.tutorDecision}>
      <div className="grid gap-6 md:grid-cols-12 md:items-start">
        <p className={`${styles.decisionNumber} font-cabinet text-5xl font-extrabold leading-none md:col-span-1`}>{decision.number}</p>
        <div className="md:col-span-11">
          <h3 className={`${styles.decisionTitle} font-cabinet text-3xl font-extrabold leading-tight md:text-4xl`}>{decision.title}</h3>
          <div className={styles.decisionEvidenceTable}>
            <div className={styles.decisionEvidenceRow}>
              <p className={styles.decisionEvidenceLabel}>Decision aim</p>
              <p className={styles.decisionEvidenceCopy}>{decision.aim}</p>
            </div>
            <div className={styles.decisionEvidenceRow}>
              <p className={styles.decisionEvidenceLabel}>Product decision</p>
              <p className={styles.decisionEvidenceCopy}>
                <DecisionSentence segments={decision.productDecision} />
              </p>
            </div>
            <div className={styles.decisionEvidenceRow}>
              <p className={styles.decisionEvidenceLabel}>UX support</p>
              <p className={styles.decisionEvidenceCopy}>
                <DecisionSentence segments={decision.uxSupport} />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <DecisionVisual decision={decision} />
      </div>
    </article>
  );
}

function DesignForgeProcessSection() {
  return (
    <section id="process" aria-labelledby="designforge-process-heading" className={styles.designForgeProcessSection}>
      <div className={`${styles.designForgeProcessContainer} mx-auto max-w-5xl`}>
        <Reveal>
          <div className={styles.processIntro}>
            <p className={styles.processEyebrow}>Process: the engine behind the speed</p>
            <h2 id="designforge-process-heading" className={styles.processHeading}>
              Built with <span className={styles.processHighlight}>DesignForge</span> in four weeks
            </h2>
            <p className={styles.processSubline}>
              Not by brute force. Experience first, interface next, production last.
            </p>
          </div>

          <div className={styles.processStoryGrid}>
            <div className={styles.processStoryCopy}>
              <p>
                <strong>I had already seen the trap:</strong> when product logic, UX flow, UI polish, code, data, and production constraints are solved together, the work gets noisy.
              </p>
              <p>
                So I split the build into layers: <strong>experience first, interface next, production last.</strong>
              </p>
              <p>
                That separation gave DesignForge room to move fast without asking AI to guess.
              </p>
            </div>

            <aside className={styles.processLayerPanel} aria-label="DesignForge separated layers">
              <p className={styles.processLayerKicker}>Separated layers</p>
              <div className={styles.processLayerRow}>
                <span>Layer 01</span>
                <strong>Experience first</strong>
              </div>
              <div className={styles.processLayerRow}>
                <span>Layer 02</span>
                <strong>Interface next</strong>
              </div>
              <div className={styles.processLayerRow}>
                <span>Layer 03</span>
                <strong>Production last</strong>
              </div>
            </aside>
          </div>

          <div className={styles.processTrailIntro}>
            <p className={styles.processTrailKicker}>Each step produced evidence.</p>
            <h3>The product did not jump from idea to UI.</h3>
            <p className={styles.processTrailSupport}>
              It moved <strong>one node at a time.</strong>
            </p>
          </div>

          <div className={styles.processTrail} aria-label="DesignForge process artifact trail">
            {designForgeSteps.map((step) => (
              <article className={styles.processStep} key={step.id}>
                <div className={styles.processStepCopy}>
                  <p className={styles.processStepNumber}>{step.number}</p>
                  <p className={styles.processArtifactLabel}>{step.artifact}</p>
                  <h4>{step.title}</h4>
                  <p><ProcessSentence segments={step.body} /></p>
                  <p className={styles.processPrevented}>
                    <strong>What this prevented:</strong> {step.prevented}
                  </p>
                </div>

                <ArtifactPreview type={step.previewType} />
              </article>
            ))}
          </div>

          <div className={styles.processPromptBlock}>
            <div className={styles.processPromptIntro}>
              <h3>Prompt discipline made the output usable</h3>
              <p>
                Each prompt carried <strong>context, state, data, constraints,</strong> and the artifact in progress.
              </p>
            </div>
            <div className={styles.processPromptGrid}>
              {designForgePromptExcerpts.map((prompt) => (
                <article className={styles.processPromptCard} key={prompt.label}>
                  <p>{prompt.label}</p>
                  <blockquote>{prompt.copy}</blockquote>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.processOutcomeBlock}>
            <h3>What this changed</h3>
            <div className={styles.processOutcomeGrid}>
              {designForgeOutcomes.map((outcome) => (
                <article className={styles.processOutcomeCard} key={outcome.title}>
                  <h4>{outcome.title}</h4>
                  <p>{outcome.copy}</p>
                </article>
              ))}
            </div>
            <p className={styles.processClosing}>
              DesignForge worked because it separated the work that usually gets tangled together.
              <span>Experience first.</span>
              <span>Interface next.</span>
              <strong>Production last.</strong>
            </p>
            <p className={styles.processFinalLine}>
              That is how the SAT LMS moved fast without becoming shallow.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArtifactPreview({ type }) {
  if (type === 'inputTree') {
    return (
      <SourceArtifactPreview
        title="Input specification | Remedials"
        rows={designForgeInputFiles.map((file, index) => `${index === designForgeInputFiles.length - 1 ? '`--' : '|--'} ${file}`)}
      />
    );
  }

  if (type === 'journeyMap') {
    return <JourneyComponentMapArtifact />;
  }

  if (type === 'sandboxDoc') {
    return (
      <SourceArtifactPreview title="Sandbox requirement | Remedials" rows={designForgeSandboxRows} />
    );
  }

  if (type === 'roughBuildGaps') {
    return (
      <SourceArtifactPreview title="Gap analysis | Remedials" rows={designForgeGapRows} />
    );
  }

  if (type === 'componentOptions') {
    return (
      <SourceArtifactPreview title="Design iteration | Remedials" rows={designForgeInterfaceRows} />
    );
  }

  if (type === 'integratedSandbox') {
    return (
      <SourceArtifactPreview title="Integration notes | Remedials" rows={designForgeIntegrationRows} />
    );
  }

  return (
    <SourceArtifactPreview title="Production migration | Remedials" rows={designForgeMigrationRows} />
  );
}

function JourneyComponentChip({ id, state }) {
  const data = journeyComponentLibrary[id];
  const kind = id.startsWith('R') ? 'new' : 'modified';

  const tooltipContent = (
    <span className={styles.journeyTipBody}>
      <span className={styles.journeyTipHeader}>
        <span className={styles.journeyTipCode}>
          {id}
          {state ? <span className={styles.journeyTipState}> ({state})</span> : null}
        </span>
        <span className={styles.journeyTipType}>{data.type}</span>
      </span>
      <span className={styles.journeyTipName}>{data.name}</span>
      <span className={styles.journeyTipPurpose}>{data.purpose}</span>
      <span className={styles.journeyTipStatesLabel}>States</span>
      <span className={styles.journeyTipStates}>
        {data.states.map((s) => (
          <span key={s} className={styles.journeyTipStateTag}>{s}</span>
        ))}
      </span>
    </span>
  );

  return (
    <Tooltip
      content={tooltipContent}
      panelClassName={styles.journeyTipPanel}
      className={styles.journeyChipWrap}
      position="bottom"
    >
      <span className={`${styles.journeyChip} ${kind === 'new' ? styles.journeyChipNew : styles.journeyChipModified}`}>
        {id}
      </span>
    </Tooltip>
  );
}

function JourneyComponentMapArtifact() {
  return (
    <ArtifactWindow title="Journey component mapping | Remedials" bodyClassName={`${styles.artifactBodyJourney} ${styles.artifactBodyClipRight}`}>
      <table className={styles.journeyMapTable}>
        <thead>
          <tr>
            <th className={styles.journeyMapColJourney}>Journey</th>
            <th className={styles.journeyMapColFlow}>Component flow</th>
          </tr>
        </thead>
        <tbody>
          {journeyComponentRows.map((row) => (
            <tr key={row.id}>
              <td>
                <span className={styles.journeyMapNameRow}>
                  <span className={styles.journeyMapName}>{row.name}</span>
                  <span className={`${styles.journeyMapFrequency} ${styles[`journeyMapFrequency_${row.frequency}`]}`}>
                    {row.frequency.charAt(0).toUpperCase() + row.frequency.slice(1)}
                  </span>
                </span>
                <span className={styles.journeyMapTrigger}>
                  <span className={styles.journeyMapTriggerLabel}>Trigger:</span> {row.trigger}
                </span>
              </td>
              <td>
                {row.flows.map((flow, flowIndex) => (
                  <div key={flowIndex} className={styles.journeyMapFlowRow}>
                    {flow.label ? <span className={styles.journeyMapFlowLabel}>{flow.label}:</span> : null}
                    {flow.tags
                      ? flow.tags.map((tag, tagIndex) => (
                          <span key={`${tag.id}-${tagIndex}`} className={styles.journeyMapFlowItem}>
                            <JourneyComponentChip id={tag.id} state={tag.state} />
                            {tagIndex < flow.tags.length - 1 ? <span className={styles.journeyMapFlowArrow}>→</span> : null}
                          </span>
                        ))
                      : null}
                    {flow.note ? <span className={styles.journeyMapFlowNote}>{flow.note}</span> : null}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ArtifactWindow>
  );
}

function ArtifactWindow({ title, bodyClassName, children }) {
  const bodyClasses = bodyClassName ? `${styles.artifactBody} ${bodyClassName}` : styles.artifactBody;

  return (
    <div className={styles.processArtifactPreview}>
      <div className={styles.artifactWindow}>
        <div className={styles.artifactChrome}>
          <span className={styles.artifactChromeDots}>
            <span className={`${styles.artifactChromeDot} ${styles.artifactChromeDotRed}`} />
            <span className={`${styles.artifactChromeDot} ${styles.artifactChromeDotYellow}`} />
            <span className={`${styles.artifactChromeDot} ${styles.artifactChromeDotGreen}`} />
          </span>
          <span className={styles.artifactChromeTitle}>{title}</span>
          <span className={styles.artifactChromeSpacer} />
        </div>
        <div className={bodyClasses}>{children}</div>
      </div>
    </div>
  );
}

function SourceArtifactPreview({ title, rows }) {
  return (
    <ArtifactWindow title={title}>
      {rows.map((row) => (
        <span key={row}>{row}</span>
      ))}
    </ArtifactWindow>
  );
}

export default function SatLmsCaseStudy() {
  const [activeSignalIndex, setActiveSignalIndex] = useState(0);
  const [isSignalStackPaused, setIsSignalStackPaused] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || isSignalStackPaused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveSignalIndex((currentIndex) => (currentIndex + 1) % redditCards.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, [isSignalStackPaused]);

  return (
    <div className="min-h-screen bg-surface-white text-ink-950">
      <Navigation
        links={caseStudyLinks}
        showToggle={false}
        backHref="/"
        backLabel="Back"
      />

      <main>
        <section className={`${styles.heroGrid} px-6 pb-24 pt-32 text-center md:pt-36`}>
          <div className="mx-auto max-w-[1100px]">
            <Reveal>
              <p className="mb-6 font-dm text-xs font-extrabold uppercase tracking-[0.2em] text-ink-500">SAT LMS</p>
              <h1 className="mx-auto mb-8 max-w-4xl font-cabinet text-5xl font-extrabold leading-[1.05] tracking-tight text-ink-950 md:text-7xl">
                The LMS that personalizes your learning so that you <span className="inline-block -rotate-1 bg-accent-yellow px-1">learn only what you need to.</span>
              </h1>

              <p className="mb-10 font-cabinet text-3xl font-extrabold leading-tight text-ink-950">
                No browsing. No guessing. Just learning.
              </p>

              <p className="mx-auto mb-10 max-w-4xl font-dm text-body leading-relaxed text-ink-800">
                It diagnoses each student's strengths and gaps, curates only the concepts they need, and turns the course into ready action items instead of another library to browse.
              </p>

              <div className="mb-3 flex flex-wrap justify-center gap-4 font-dm text-sm text-ink-700">
                <span className="rounded-full border border-ink-100 bg-surface-light px-4 py-2">Principal Product Designer & Frontend Developer</span>
                <span className="rounded-full border border-ink-100 bg-surface-light px-4 py-2">Dec 2025 - Mar 2026</span>
                <a
                  href="https://e-gmat.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-surface-light px-4 py-2 text-ink-700 no-underline"
                >
                  <Image
                    src="/images/case-studies/sat-lms/e-gmat.png"
                    alt="e-gmat.com logo"
                    width={889}
                    height={790}
                    className="h-5 w-5 object-contain"
                  />
                  <span>e-gmat.com</span>
                </a>
              </div>
              <p className="mb-16 font-dm text-xs italic leading-relaxed text-ink-500">
                Logos are properties of their respective companies.
              </p>

              <div className={`${styles.heroImage} shadow-2xl`}>
                <BrowserChrome />
                <HeroVideo />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="tldr" className="bg-surface-white px-6 pb-20 pt-6 md:pb-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="mb-5 font-dm text-xs font-extrabold uppercase tracking-[0.2em] text-ink-500">TL;DR</p>
              <StaggeredText
                className="font-cabinet text-case-study-statement font-extrabold leading-tight text-ink-950"
                segments={[
                  { text: 'I redesigned the LMS experience', className: 'box-decoration-clone bg-accent-green px-1 text-ink-950' },
                  { text: 'as a behavior-driven system, replacing user-led navigation with guided progression and removing decision points across the learning flow.' },
                ]}
              />

              <div className="mx-auto mt-12 max-w-5xl">
                <Image
                  src="/images/case-studies/sat-lms/lms-central-graphic.svg"
                  alt="Learning management system transforms confused SAT learners into clear and confident students"
                  width={1845}
                  height={919}
                  sizes="(min-width: 1280px) 1152px, 100vw"
                  className="h-auto w-full"
                />
              </div>

              <div className="mt-16 pt-4">
                <p className="mb-8 font-dm text-xs font-extrabold uppercase tracking-[0.2em] text-ink-500">My Impact</p>
                <h3 className="font-cabinet text-case-study-statement font-extrabold leading-tight text-ink-950">
                  After my redesign, the LMS showed a clear shift in learning behavior: faster starts, deeper progression, and significantly higher continuation rates.
                </h3>
                <div className="mx-auto mt-14 grid max-w-5xl gap-8 text-center md:grid-cols-3">
                  {metrics.map((metric) => (
                    <div key={metric.label}>
                      <AnimatedMetricValue metric={metric} />
                      <p className="mt-5 inline-flex items-center justify-center gap-2 font-dm text-base font-extrabold leading-relaxed text-ink-700">
                        <span>{metric.label}</span>
                        <Tooltip
                          content={(
                            <span className="block space-y-3">
                              {metric.tooltip.map((item) => (
                                <span key={item} className="block">{item}</span>
                              ))}
                            </span>
                          )}
                          panelClassName={styles.metricTooltipPanel}
                        >
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-ink-100 bg-surface-light font-dm text-xs font-extrabold text-ink-700">
                            ?
                          </span>
                        </Tooltip>
                      </p>
                      <p className="font-dm text-base leading-relaxed text-ink-700">{metric.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="problem" aria-labelledby="problem-heading" className={`${styles.problemSection} px-6 py-20 md:py-28`}>
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
                <div>
                  <p className="mb-6 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">THE PROBLEM</p>
                  <StaggeredText
                    id="problem-heading"
                    className="font-cabinet text-5xl font-extrabold leading-tight text-ink-950 md:text-6xl"
                    segments={[
                      { text: 'SAT prep had enough content.', breakAfter: true },
                      { text: 'What students lacked was a path built for them.', className: 'box-decoration-clone bg-surface-white px-1 text-ink-950' },
                    ]}
                  />
                  <p className="mt-10 max-w-xl font-dm text-body leading-relaxed text-ink-800">
                    Before designing the LMS, I looked at student conversations outside the product. The problem was not missing content. It was missing direction: students had practice and explanations, but still did not know which gap to fix next.
                  </p>
                </div>

                <div>
                  <p className="mb-6 text-center font-dm text-sm font-normal italic leading-relaxed text-ink-500">
                    Student signals · hover on a card to pause
                  </p>
                  <div
                    className={styles.problemEvidenceStack}
                    onMouseEnter={() => setIsSignalStackPaused(true)}
                    onMouseLeave={() => setIsSignalStackPaused(false)}
                    onFocus={() => setIsSignalStackPaused(true)}
                    onBlur={(event) => {
                      if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) {
                        setIsSignalStackPaused(false);
                      }
                    }}
                  >
                    {redditCards.map((card, index) => {
                      const position = (index - activeSignalIndex + redditCards.length) % redditCards.length;

                      return (
                        <a
                          key={card.title}
                          href={card.href}
                          target="_blank"
                          rel="noreferrer"
                          tabIndex={position === 0 ? 0 : -1}
                          aria-label={`${card.subreddit} student signal: ${card.title}`}
                          className={`${styles.problemEvidenceCard} ${styles[`problemEvidenceCard${position}`]}`}
                        >
                          <div className="mb-6 flex items-center gap-3">
                            <RedditIcon className="h-7 w-7 shrink-0" />
                            <span className="font-dm text-sm font-extrabold text-ink-800">{card.subreddit}</span>
                            <span className="rounded-full bg-surface-light px-3 py-1 font-dm text-xs font-bold text-ink-500">Student voice</span>
                            <ExternalArrowIcon className="ml-auto h-5 w-5 shrink-0 text-ink-950" />
                          </div>
                          <h3 className="font-cabinet text-3xl font-extrabold leading-tight text-ink-950">{card.title}</h3>
                          <p className="mt-5 font-dm text-lg font-bold italic leading-relaxed text-ink-700">
                            <span className="mr-2 text-ink-300">“</span>
                            {card.quote}
                            <span className="ml-2 text-ink-300">”</span>
                          </p>
                          <div className="my-6 border-t border-ink-100"></div>
                          <p className="font-dm text-base leading-relaxed text-ink-700">{card.interpretation}</p>
                        </a>
                      );
                    })}
                  </div>
                  <p className="mt-6 text-center font-dm text-xs italic leading-relaxed text-ink-500">
                    Logos are properties of their respective companies.
                  </p>
                </div>
              </div>

              <div className="mt-20 border-t border-ink-100 pt-10 md:mt-24 md:pt-12">
                <p className="font-cabinet text-3xl font-extrabold leading-tight text-ink-950 md:text-case-study-statement">
                  Students didn’t need another content dump. They needed a system that <span className="box-decoration-clone bg-accent-yellow px-1">diagnoses</span>, <span className="box-decoration-clone bg-accent-yellow px-1">prioritizes</span>, and <span className="box-decoration-clone bg-accent-yellow px-1">prescribes</span> what to learn - an intelligent tutor!
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="solution" aria-labelledby="approach-heading" className={`${styles.approachSection} px-6 pb-20 pt-4 md:pb-28 md:pt-6`}>
          <ApproachInteraction />
        </section>

        <section id="decisions" aria-labelledby="decisions-heading" className={`${styles.decisionSection} px-6 pb-20 pt-12 md:pb-28 md:pt-16`}>
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div>
                <p className={`${styles.decisionKicker} mb-5 font-dm text-xs font-extrabold uppercase tracking-widest`}>Key design decisions</p>
                <StaggeredText
                  id="decisions-heading"
                  className={`${styles.decisionHeading} max-w-4xl font-cabinet text-4xl font-extrabold leading-tight md:text-6xl`}
                  segments={[
                    { text: 'With the tutor lens on, I made', breakAfter: true },
                    { text: '4 pivotal decisions', className: styles.decisionHighlight },
                    { text: 'that made the LMS behave like a private tutor.' },
                  ]}
                />
              </div>

              <div className="mt-12 space-y-16 md:mt-16 md:space-y-20">
                {tutorDecisions.map((decision) => (
                  <TutorDecision key={decision.number} decision={decision} />
                ))}
              </div>

              <div className={styles.decisionSummary}>
                <p className={`${styles.decisionSummaryText} mx-auto max-w-4xl text-center font-cabinet text-3xl font-extrabold leading-tight md:text-case-study-statement`}>
                  Together, these decisions made <span className={styles.decisionHighlight}>Good learning behavior the default</span>, not left to willpower.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="flow" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">Shipped Flow</p>
            <h2 className="max-w-4xl font-cabinet text-4xl font-extrabold leading-tight text-ink-950 md:text-6xl">
              From diagnostic to recovery, uncertainty keeps turning into action.
            </h2>

            <div className="mt-14 space-y-12">
              {shippedFlow.map((screen, index) => (
                <article key={screen.title} className="grid gap-6 lg:grid-cols-12 lg:items-start">
                  <div className="lg:col-span-4">
                    <p className="mb-4 font-cabinet text-5xl font-extrabold text-accent-orange">{String(index + 1).padStart(2, '0')}</p>
                    <h3 className="font-cabinet text-3xl font-extrabold leading-tight text-ink-950">{screen.title}</h3>
                    <p className="mt-4 font-dm text-xl leading-relaxed text-ink-700">{screen.text}</p>
                  </div>
                  <figure className="overflow-hidden rounded-lg border border-ink-100 bg-surface-white shadow-lg lg:col-span-8">
                    <Image
                      src={screen.image}
                      alt={`${screen.title} screenshot`}
                      width={screen.width}
                      height={screen.height}
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="h-auto w-full"
                    />
                  </figure>
                </article>
              ))}
            </div>
          </div>
        </section>

        <DesignForgeProcessSection />

        <section id="outcome" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="mb-4 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">Outcome</p>
                <h2 className="font-cabinet text-4xl font-extrabold leading-tight text-ink-950 md:text-6xl">
                  The prescribed path changed student movement.
                </h2>
                <p className="mt-8 font-dm text-xl leading-relaxed text-ink-700">
                  Students started faster, continued more often, and completed more of what the system recommended.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="bg-surface-mint p-8 md:col-span-2">
                    <p className="font-cabinet text-3xl font-extrabold leading-tight text-ink-950">
                      "It is the first product I have seen that decides for the student instead of asking them to decide. The diagnostic alone justifies the build."
                    </p>
                    <p className="mt-5 font-dm text-sm font-extrabold uppercase tracking-widest text-ink-700">Internal stakeholder, e-GMAT</p>
                  </div>
                  <div className="border border-ink-100 bg-surface-light p-6">
                    <h3 className="font-cabinet text-3xl font-extrabold text-ink-950">What I would improve</h3>
                    <p className="mt-4 font-dm text-lg leading-relaxed text-ink-700">
                      I would extract shared UI patterns earlier. By the time PACE and Remedials were moving, the repeatable atoms were obvious.
                    </p>
                  </div>
                  <div className="border border-ink-100 bg-surface-light p-6">
                    <h3 className="font-cabinet text-3xl font-extrabold text-ink-950">What v2 should push</h3>
                    <p className="mt-4 font-dm text-lg leading-relaxed text-ink-700">
                      The system surfaces the next action, but the student still has to click. The next version should make that continuation even more inevitable.
                    </p>
                  </div>
                </div>
                <figure className="mt-6 overflow-hidden rounded-lg border border-ink-100 bg-surface-white shadow-lg">
                  <Image
                    src="/images/case-studies/sat-lms/pace-course-stats.webp"
                    alt="PACE course stats showing time saved and skipped work"
                    width={1600}
                    height={813}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="h-auto w-full"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
