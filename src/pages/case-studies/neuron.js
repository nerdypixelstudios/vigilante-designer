import { useEffect, useRef } from 'react';
import Image from 'next/image';
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
    detail: 'up from 32%',
    tooltip: [
      'Measures how often students start the next recommended activity immediately after completing one.',
      'This improved by making the next step explicit, removing alternate paths, and keeping the user in a continuous flow instead of returning them to a menu.',
    ],
  },
  {
    label: 'Progress depth',
    value: '72%',
    detail: 'up from 52%',
    tooltip: [
      'Measures how much of the system-recommended path a student completes before dropping off.',
      'This increased by structuring the course into guided, adaptive paths, ensuring students only see what they need and do not get lost in the full syllabus.',
    ],
  },
  {
    label: 'Time to first meaningful action',
    value: '45 sec',
    detail: 'down from 1 min 52 sec',
    tooltip: [
      'Measures how long it takes for a student to start their first learning activity after opening the app.',
      'Reduced by removing setup decisions and surfacing a single, immediate next action, so users can start learning without figuring out where to begin.',
    ],
  },
];

const redditCards = [
  {
    quote: "I don't feel like I'm learning anything useful... my score dropped.",
    source: 'r/digitalSATs',
    meta: 'reactive prep frustration',
    href: 'https://www.reddit.com/r/digitalSATs/comments/1gh5y4p',
  },
  {
    quote: "The explanations... don't teach the concepts involved.",
    source: 'r/Sat',
    meta: 'explanations without teaching',
    href: 'https://www.reddit.com/r/Sat/comments/14lpzv9',
  },
  {
    quote: 'I fundamentally do not know... never learned how to set up equations.',
    source: 'r/Sat',
    meta: 'foundation gap',
    href: 'https://www.reddit.com/r/Sat/comments/1sd5pgn/review_course_was_a_bust/',
  },
  {
    quote: 'I need a path that tells me exactly what to fix.',
    source: 'r/satprep',
    meta: 'path uncertainty',
    href: 'https://www.reddit.com/r/satprep/comments/1lqvbql',
  },
];

const gapItems = [
  {
    title: 'Reactive learning',
    text: 'A missed question creates a search task. The student has to decide which lesson, explanation, or practice set should come next.',
  },
  {
    title: 'Bulk structure',
    text: 'Long courses make advanced students repeat known material and make newer students hunt for the first missing foundation.',
  },
  {
    title: 'Foundation gaps',
    text: 'Some prep material starts too high. Students who need the basics feel lost before the course has really begun.',
  },
  {
    title: 'Explanation gaps',
    text: 'Answer explanations often clarify a question, but they do not always teach the underlying concept or process skill.',
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

export default function SatLmsCaseStudy() {
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

              <div className="mb-16 flex flex-wrap justify-center gap-4 font-dm text-sm text-ink-700">
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
              <h2 className="font-cabinet text-case-study-statement font-extrabold leading-tight text-ink-950">
                <span className="box-decoration-clone bg-accent-green px-1 text-ink-950">I redesigned the LMS experience</span> as a behavior-driven system, replacing user-led navigation with guided progression and removing decision points across the learning flow.
              </h2>

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
                  After my redesign, the LMS showed a clear shift in learning behavior: <span className="box-decoration-clone bg-accent-green px-1 text-ink-950">faster starts, deeper progression, and significantly higher continuation rates.</span>
                </h3>
                <div className="mx-auto mt-14 grid max-w-5xl gap-8 text-center md:grid-cols-3">
                  {metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="font-cabinet text-6xl font-extrabold leading-none text-accent-green md:text-7xl">{metric.value}</p>
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
                      <p className="mt-2 font-dm text-base leading-relaxed text-ink-700">{metric.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="problem" className="bg-ink-950 px-6 py-20 text-surface-white md:py-28">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-center font-dm text-xs font-extrabold uppercase tracking-widest text-ink-300">The Problem</p>
            <h2 className="mx-auto max-w-4xl text-center font-cabinet text-4xl font-extrabold leading-tight text-surface-white md:text-6xl">
              The practice is official. The learning path is not.
            </h2>

            <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-center">
              <div className="space-y-6">
                {redditCards.slice(0, 2).map((card) => (
                  <a
                    key={card.href}
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block border border-ink-800 bg-fun-surface-dark p-6 text-surface-white no-underline hover:border-accent-orange"
                  >
                    <div className="mb-4 flex items-center justify-between font-dm text-xs font-extrabold uppercase tracking-widest text-ink-300">
                      <span>{card.source}</span>
                      <span>{card.meta}</span>
                    </div>
                    <p className="font-cabinet text-2xl font-extrabold leading-tight">"{card.quote}"</p>
                  </a>
                ))}
              </div>

              <div className="border-4 border-accent-yellow bg-surface-white p-8 text-ink-950 md:p-10">
                <p className="font-cabinet text-3xl font-extrabold leading-tight md:text-4xl">
                  The student has to do the one thing the product should be doing:
                </p>
                <p className="mt-5 font-cabinet text-4xl font-extrabold leading-tight text-accent-orange md:text-5xl">
                  convert the mistake into the right learning path.
                </p>
                <p className="mt-8 font-dm text-xl leading-relaxed text-ink-700">
                  Bluebook gives official full-length practice tests, scored results, review, and targeted next-practice options. But the surrounding learning system still has to turn a miss into a concept lesson, a process-skill file, reinforcement, and the next required action.
                </p>
              </div>

              <div className="space-y-6">
                {redditCards.slice(2).map((card) => (
                  <a
                    key={card.href}
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block border border-ink-800 bg-fun-surface-dark p-6 text-surface-white no-underline hover:border-accent-orange"
                  >
                    <div className="mb-4 flex items-center justify-between font-dm text-xs font-extrabold uppercase tracking-widest text-ink-300">
                      <span>{card.source}</span>
                      <span>{card.meta}</span>
                    </div>
                    <p className="font-cabinet text-2xl font-extrabold leading-tight">"{card.quote}"</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="gap" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="mb-4 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">Market Gap</p>
                <h2 className="font-cabinet text-4xl font-extrabold leading-tight text-ink-950 md:text-6xl">
                  More SAT content does not mean a better SAT path.
                </h2>
                <p className="mt-8 font-dm text-xl leading-relaxed text-ink-700">
                  The gap was not only course length. It was structure, foundations, complete explanations, and personalization working together.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:col-span-7">
                {gapItems.map((gap) => (
                  <div key={gap.title} className="border border-ink-100 bg-surface-light p-6">
                    <h3 className="font-cabinet text-2xl font-extrabold text-ink-950">{gap.title}</h3>
                    <p className="mt-4 font-dm text-lg leading-relaxed text-ink-700">{gap.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2">
              <div className="bg-surface-mint p-8">
                <p className="mb-3 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">50th percentile student</p>
                <h3 className="font-cabinet text-3xl font-extrabold text-ink-950">Needs foundations first.</h3>
                <p className="mt-5 font-dm text-lg leading-relaxed text-ink-700">
                  The system should not pretend this student needs only practice. It should rebuild the basics, then teach the concept, then teach the process skill.
                </p>
              </div>
              <div className="bg-surface-ice p-8">
                <p className="mb-3 font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500">80th percentile student</p>
                <h3 className="font-cabinet text-3xl font-extrabold text-ink-950">Needs precision, not repetition.</h3>
                <p className="mt-5 font-dm text-lg leading-relaxed text-ink-700">
                  The system should let this student skip known foundations and spend time on process gaps that move them toward the 90th percentile.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="solution" className="border-y border-ink-100 bg-surface-light px-6 py-20 md:py-28">
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
