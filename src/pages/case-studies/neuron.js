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

const tutorDecisions = [
  {
    number: '01',
    title: 'I made the diagnostic the first evident action.',
    productDecision: 'Students should begin the course with the diagnostic, so the LMS can understand their level before shaping the path.',
    uxSupport: 'I kept it prominent until it was taken — through the hero advisory, the recommended first card, and friction that warned against skipping ahead.',
    visualType: 'diagnostic',
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
    productDecision: 'After the diagnostic, students should get a path shaped by what they know, what they can skip, and what still needs proof.',
    uxSupport: 'I made that payoff visible — recommended items, skipped content, proof checkpoints, and time saved — so the path felt like the reward for effort.',
    visualType: 'personalize',
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
    productDecision: 'Once the path is known, the course should keep prescribing what to do next instead of asking students to browse the full syllabus.',
    uxSupport: 'I centered the page around Next Up, the current module, and resume learning, while keeping broader exploration available but secondary.',
    visualType: 'prescribe',
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
    productDecision: 'When students underperform or return after a break, the LMS should generate a recovery path instead of leaving them to self-correct.',
    uxSupport: 'The recovery state should show what happened and surface a clear remedial or revision action, so students restart from motion, not confusion.',
    visualType: 'recover',
    placeholderTitle: 'Recovery-state screenshot to be added',
    placeholderLabel: 'Will show remedial / revision re-entry state',
    annotations: [],
  },
];

const courseLayers = [
  'Module',
  'Unit',
  'Logical group',
  'Concept file',
  'Process skill file',
  'Unit qualifying exam',
  'Module qualifying exam',
  'Course ability quiz',
  'Cementing modules',
];

const paceSteps = [
  'One-time diagnostic',
  'Inferred placement',
  'Activity map',
  'Known work shaded',
  'Assessments protected',
  'Next Up prescribed',
];

const reinforcementItems = [
  {
    title: 'Remedials',
    text: 'If a student misses the threshold after an assessment, the system creates targeted recovery work while the mistake is still fresh.',
  },
  {
    title: 'Revision modules',
    text: 'After learning is complete, revision loops keep the course from becoming one-and-done content.',
  },
  {
    title: 'Cementing modules',
    text: 'The final layer shifts students from newly learned concepts into durable ability before score-critical practice.',
  },
];

const uxPrinciples = [
  {
    title: 'Default action',
    text: 'The page opens around what the student should do next, not around everything the course contains.',
    image: '/images/case-studies/sat-lms/hero-focus-pace-on.webp',
    width: 1600,
    height: 947,
  },
  {
    title: 'Friction asymmetry',
    text: 'Starting the right task is visually easy. Drifting into the full course requires a deliberate choice.',
    image: '/images/case-studies/sat-lms/diagnostic-advisory.webp',
    width: 1600,
    height: 1285,
  },
  {
    title: 'Continuous flow',
    text: 'The diagnostic does not end in a score. It hands the student into a chosen path.',
    image: '/images/case-studies/sat-lms/pace-choice-modal.webp',
    width: 1600,
    height: 1017,
  },
  {
    title: 'Visibility drives behavior',
    text: 'Skipped work stays visible, dimmed, and explained. Efficiency still feels earned.',
    image: '/images/case-studies/sat-lms/pace-skip-visible.webp',
    width: 1600,
    height: 813,
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

const designForgeSteps = [
  'Journey map',
  'Sandbox setup',
  'System rough build',
  'UX hole review',
  'Three design options',
  'Curate and migrate',
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

function TutorDecision({ decision }) {
  return (
    <article className={styles.tutorDecision}>
      <div className="grid gap-6 md:grid-cols-12 md:items-start">
        <p className="font-cabinet text-5xl font-extrabold leading-none text-accent-orange md:col-span-1">{decision.number}</p>
        <div className="md:col-span-11">
          <h3 className="font-cabinet text-3xl font-extrabold leading-tight text-ink-950 md:text-4xl">{decision.title}</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">Product decision</p>
              <p className="font-dm text-base leading-relaxed text-ink-800">{decision.productDecision}</p>
            </div>
            <div>
              <p className="mb-3 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">UX support</p>
              <p className="font-dm text-base leading-relaxed text-ink-800">{decision.uxSupport}</p>
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

        <section id="solution" aria-labelledby="approach-heading" className={`${styles.approachSection} border-b border-ink-100 px-6 pb-20 pt-4 md:pb-28 md:pt-6`}>
          <ApproachInteraction />

          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="border-t border-ink-100 pt-8">
                <p className="mb-5 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">Key design decisions</p>
                <h2 className="max-w-4xl font-cabinet text-4xl font-extrabold leading-tight text-ink-950 md:text-6xl">
                  With the tutor lens on, I made <br/><span className="box-decoration-clone bg-accent-yellow px-1">4 pivotal decisions</span> that made the LMS behave like a private tutor.
                </h2>
              </div>

              <div className="mt-12 space-y-16 md:mt-16 md:space-y-20">
                {tutorDecisions.map((decision) => (
                  <TutorDecision key={decision.number} decision={decision} />
                ))}
              </div>

              <div className="mt-16 border-t border-ink-100 pt-10 md:mt-20">
                <p className="mx-auto max-w-4xl text-center font-cabinet text-3xl font-extrabold leading-tight text-ink-950 md:text-case-study-statement">
                  Together, these decisions shifted the LMS from a place students had to navigate into a system that kept <span className="box-decoration-clone bg-accent-yellow px-1">diagnosing, guiding, and pulling them back into progress.</span>
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="strategy" className="border-b border-ink-100 bg-surface-light px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <p className="mb-4 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">Product Strategy</p>
                <h2 className="font-cabinet text-4xl font-extrabold leading-tight text-ink-950 md:text-6xl">
                  Intelligence enabled through structure and diagnostic.
                </h2>
                <p className="mt-8 font-dm text-xl leading-relaxed text-ink-700">
                  PACE could prescribe a path because the course was not a loose content library. It was structured tightly enough for a diagnostic to reason about.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-3">
                  {courseLayers.map((layer, index) => (
                    <div key={layer} className="grid grid-cols-12 items-center gap-3">
                      <div className="col-span-3 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">
                        Step {index + 1}
                      </div>
                      <div className="col-span-9 border border-ink-100 bg-surface-white p-4 font-cabinet text-xl font-extrabold text-ink-950">
                        {layer}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-l-4 border-accent-orange bg-surface-peach p-6">
                  <p className="font-dm text-xl font-extrabold leading-relaxed text-ink-950">
                    Structure made intelligence possible. The diagnostic did not guess from thin air; it worked against a course map built from modules, units, logical groups, concept files, process-skill files, and protected exams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pace" className="bg-ink-950 px-6 py-20 text-surface-white md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="mb-4 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-300">PACE</p>
                <h2 className="font-cabinet text-4xl font-extrabold leading-tight text-surface-white md:text-6xl">
                  The diagnostic does not just score the student. It rewrites the path.
                </h2>
                <p className="mt-8 font-dm text-xl leading-relaxed text-ink-100">
                  PACE begins each course with a one-time diagnostic. At a safe public level: it uses the course dependency structure to infer known and unknown zones, then produces an activity map for the course layer.
                </p>
                <p className="mt-5 font-dm text-xl leading-relaxed text-ink-100">
                  Known work stays visible but dimmed, receives system-assigned completion credit, and is skipped in Next Up. Protected assessments remain required.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="grid gap-4 md:grid-cols-2">
                  {paceSteps.map((step, index) => (
                    <div key={step} className="border border-ink-800 bg-fun-surface-dark p-6">
                      <p className="mb-4 font-cabinet text-4xl font-extrabold text-accent-yellow">{String(index + 1).padStart(2, '0')}</p>
                      <p className="font-dm text-lg font-extrabold text-surface-white">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <figure className="mt-14 overflow-hidden rounded-lg border border-ink-800 bg-fun-surface-dark">
              <Image
                src="/images/case-studies/sat-lms/pace-skip-visible.webp"
                alt="PACE skipped activities remain visible with explanation"
                width={1600}
                height={813}
                sizes="100vw"
                className="h-auto w-full"
              />
            </figure>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="mb-4 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">Reinforcement</p>
                <h2 className="font-cabinet text-4xl font-extrabold leading-tight text-ink-950 md:text-6xl">
                  PACE chooses the path. Remedials and revision keep it from breaking.
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3 lg:col-span-7">
                {reinforcementItems.map((item) => (
                  <div key={item.title} className="border border-ink-100 bg-surface-light p-6">
                    <h3 className="font-cabinet text-2xl font-extrabold text-ink-950">{item.title}</h3>
                    <p className="mt-4 font-dm text-lg leading-relaxed text-ink-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <figure className="mt-12 overflow-hidden rounded-lg border border-ink-100 bg-surface-white shadow-lg">
              <Image
                src="/images/case-studies/sat-lms/next-activity-recovery.webp"
                alt="Next activity recovery panel"
                width={1600}
                height={844}
                sizes="100vw"
                className="h-auto w-full"
              />
            </figure>
          </div>
        </section>

        <section id="ux" className="border-y border-ink-100 bg-surface-light px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-center font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">UX System</p>
            <h2 className="mx-auto max-w-4xl text-center font-cabinet text-4xl font-extrabold leading-tight text-ink-950 md:text-6xl">
              Good learning behavior was not left to willpower.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-center font-dm text-xl leading-relaxed text-ink-700">
              The interface was shaped around habit design: make the required path obvious, make the next action easy, and make drift feel unnecessary.
            </p>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {uxPrinciples.map((principle) => (
                <article key={principle.title} className="border border-ink-100 bg-surface-white">
                  <div className="p-6">
                    <h3 className="font-cabinet text-3xl font-extrabold text-ink-950">{principle.title}</h3>
                    <p className="mt-4 font-dm text-lg leading-relaxed text-ink-700">{principle.text}</p>
                  </div>
                  <Image
                    src={principle.image}
                    alt={`${principle.title} screen evidence`}
                    width={principle.width}
                    height={principle.height}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-auto w-full border-t border-ink-100"
                  />
                </article>
              ))}
            </div>
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

        <section id="process" className="bg-ink-950 px-6 py-20 text-surface-white md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="mb-4 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-300">DesignForge</p>
                <h2 className="font-cabinet text-4xl font-extrabold leading-tight text-surface-white md:text-6xl">
                  The process made product logic visible before UI decisions hardened.
                </h2>
                <p className="mt-8 font-dm text-xl leading-relaxed text-ink-100">
                  Later features like PACE, Remedials, and Forums moved through a stricter process: map journeys, create a sandbox, rough-build the system, expose gaps, request multiple design options, curate the best direction, integrate, then migrate.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="grid gap-4">
                  {designForgeSteps.map((step, index) => (
                    <div key={step} className="grid grid-cols-12 items-center gap-4 border border-ink-800 bg-fun-surface-dark p-5">
                      <p className="col-span-3 font-cabinet text-3xl font-extrabold text-accent-yellow">{String(index + 1).padStart(2, '0')}</p>
                      <p className="col-span-9 font-dm text-xl font-extrabold text-surface-white">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-accent-yellow p-6 text-ink-950">
                  <p className="font-cabinet text-3xl font-extrabold leading-tight">Spotlight: rough build plus design iteration.</p>
                  <p className="mt-4 font-dm text-xl leading-relaxed">
                    The value was not asking AI to draw faster screens. It was building a working skeleton early enough to find UX holes, then using multiple design options to choose the strongest interface direction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
