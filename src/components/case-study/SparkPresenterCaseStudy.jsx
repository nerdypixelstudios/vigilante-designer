import { useEffect, useRef, useState } from 'react';
import {
  ExternalArrowIcon,
} from '../icons/icons';
import CaseStudyHero from './CaseStudyHero';
import CaseStudyMetricStrip from './CaseStudyMetricStrip';
import CaseStudyOutcome from './CaseStudyOutcome';
import CaseStudySectionHeader from './CaseStudySectionHeader';
import CaseStudyTemplate from './CaseStudyTemplate';
import CaseStudyVideoFrame from './CaseStudyVideoFrame';
import DecisionEvidenceSection from './DecisionEvidenceSection';
import NextCaseBridge from './NextCaseBridge';
import ProcessTrail from './ProcessTrail';
import Tooltip from '../shared/Tooltip';
import lmsStyles from './SatLmsCaseStudy.module.css';
import styles from './SparkPresenterCaseStudy.module.css';

const liveActivityUrl = '';

const caseStudyLinks = [
  { href: '#tldr', label: 'TL;DR' },
  { href: '#problem', label: 'Problem' },
  { href: '#solution', label: 'Approach' },
  { href: '#build', label: 'Build' },
  { href: '#outcome', label: 'Outcome' },
];

const metrics = [
  {
    label: 'Batch conversion',
    value: '100 files in ~2 hours',
    startValue: 0,
    endValue: 100,
    suffix: ' files in ~2 hours',
    detail: 'Batch conversion moved from activity-by-activity authoring to scaled production.',
    tooltip: [
      'Previously, one activity could take around 3 full days to convert, review, revise, export, and upload through the manual workflow.',
      'The metric refers to batch conversion speed for a representative production run.',
    ],
  },
  {
    label: 'Translation reliability',
    value: '95%+ automated accuracy',
    startValue: 45,
    endValue: 95,
    suffix: '%+ automated accuracy',
    detail: 'Translation reliability was supported by validation and correction checks.',
    tooltip: [
      'Reliability came from codifying SME intent, design judgment, component rules, schema expectations, and quality checks into the workflow.',
      'The remaining edge cases were handled through validator and corrector stages.',
    ],
  },
  {
    label: 'Update cycle',
    value: 'MIN to update',
    detail: 'Content changes could move from source correction to rendered activity without rebuilding a full package.',
    tooltip: [
      'Maintenance shifted from regenerate-and-reupload to update-source-and-render.',
      'The final activity became a render of structured content instead of a static third-party package.',
    ],
  },
];

const painPoints = [
  {
    actor: 'Designer / Instructional Designer',
    initials: 'ID',
    title: 'Conversion was manual',
    body: 'Each learning file had to be read, interpreted, broken into blocks, built into an activity, reviewed, revised, exported, and uploaded.',
  },
  {
    actor: 'SME / Course Architect',
    initials: 'SM',
    title: 'SME intent and design judgment lived separately',
    body: 'The SME understood the learning intent. The designer understood presentation. The activity builder had to bridge both, creating room for interpretation drift.',
  },
  {
    actor: 'SME / Course Architect',
    initials: 'RV',
    title: 'Review cycles became part of production',
    body: 'SME review was needed not only for correctness, but also to check whether the intended learning sequence survived conversion.',
  },
  {
    actor: 'Business / Operations',
    initials: 'OP',
    title: 'Maintenance stayed expensive',
    body: 'If a source file changed later, the activity could not simply update itself. The package had to be rebuilt, reviewed, exported, and uploaded again.',
  },
  {
    actor: 'Product / Engineering',
    initials: 'PE',
    title: 'Tracking was constrained',
    body: 'Because the presentation layer lived inside a third-party authoring workflow, custom product tracking was limited by what that layer allowed.',
  },
];

const approachMachines = [
  {
    number: '01',
    title: 'Intelligence',
    question: 'What should the learner understand here?',
    body: 'This machine had to preserve the instructional intent behind the source content: what matters, what comes first, what needs emphasis, and what the learner should take away.',
  },
  {
    number: '02',
    title: 'Design Decision Making',
    question: 'How should this moment be represented?',
    body: 'This machine had to decide whether a piece of content should become an explanation, example, takeaway, table, formula, checkpoint, practice item, assessment, or summary.',
  },
  {
    number: '03',
    title: 'Engineering Scalability',
    question: 'How does this become stable product input?',
    body: 'This machine had to turn the selected presentation decisions into structured, valid, renderable data that the backend and frontend could reliably use.',
  },
];

const decisions = [
  {
    number: '01',
    title: 'Codify the manual workflow into system stages.',
    aim: 'Remove repeated human interpretation from the conversion path.',
    productDecision: 'I broke the manual workflow into extraction, navigation, validation, correction, final JSON creation, backend upload, and rendering.',
    support: 'Each stage took over one repeatable decision that previously sat with a human operator.',
    prevented: 'This prevented one giant black-box conversion where errors would be hard to trace.',
    visualTitle: 'Manual work becomes accountable stages',
    visualItems: ['Extract', 'Navigate', 'Validate', 'Correct', 'Render'],
  },
  {
    number: '02',
    title: 'Create a component grammar for learning content.',
    aim: 'Give the system a fixed language for presenting different learning moments.',
    productDecision: 'I defined approved learning blocks such as explanation, example, takeaway, table, formula, practice problem, assessment, result guide, and summary.',
    support: 'The translator could map learning intent to known blocks instead of creating inconsistent one-off layouts.',
    prevented: 'This prevented invented components, repeated layout rebuilds, and inconsistent student-facing presentation.',
    tradeoff: 'The first component set was too rich, so we simplified the library until the activity felt coherent instead of visually noisy.',
    visualTitle: 'One grammar, many lessons',
    visualItems: ['Explanation', 'Example', 'Takeaway', 'Practice', 'Result guide'],
  },
  {
    number: '03',
    title: 'Make JSON the contract between translation, backend, and renderer.',
    aim: 'Create one structure every system layer could trust.',
    productDecision: 'The translated output became structured JSON that the backend could store and the frontend renderer could read.',
    support: 'The learning experience became data-driven, component-led, and easier to update.',
    prevented: 'This prevented frontend/backend ambiguity, fragile manual exports, and rigid placeholder-like layouts.',
    tradeoff: 'The structure had to stay strict enough for production but flexible enough for real learning sequences.',
    visualTitle: 'A shared product contract',
    visualItems: ['sourceId', 'section', 'tabs', 'components[]', 'metadata'],
  },
  {
    number: '04',
    title: 'Build a custom component-led renderer.',
    aim: 'Make the presentation layer reusable instead of rebuilding activity screens manually.',
    productDecision: 'The renderer reads the JSON, identifies component names, passes the required content to matching JSX components, and renders the activity.',
    support: 'Students experience a learning interface that feels native to the e-GMAT ecosystem instead of a third-party embedded activity.',
    prevented: 'This prevented disconnected learning experiences, repeated page builds, and product behavior trapped outside our system.',
    visualTitle: 'JSON drives the interface',
    visualItems: ['componentName', 'props', 'render map', 'student UI'],
  },
  {
    number: '05',
    title: 'Add quality gates instead of relying on blind automation.',
    aim: 'Make speed safe enough for production.',
    productDecision: 'The pipeline includes validation and correction stages so structure, required fields, and output quality can be checked before final upload.',
    support: 'The system could move fast without letting malformed activities reach the learner.',
    prevented: 'This prevented silent translation errors, broken rendering, and avoidable review cycles.',
    visualTitle: 'Speed with a safety net',
    visualItems: ['Required fields', 'Allowed types', 'Numbering', 'Output check'],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Map the manual workflow',
    body: 'We documented how learning content was manually converted into presentable activities.',
    artifact: 'Workflow map',
    prevented: 'Automating the wrong thing or treating the problem as UI polish.',
  },
  {
    number: '02',
    title: 'Define the component grammar',
    body: 'I identified the recurring learning blocks needed to express e-GMAT learning content.',
    artifact: 'Component ledger',
    prevented: 'The translator inventing components or producing inconsistent presentation formats.',
  },
  {
    number: '03',
    title: 'Shape the JSON structure',
    body: 'We defined the output structure needed by the backend and frontend renderer.',
    artifact: 'Backend-ready JSON contract',
    prevented: 'Translation output that looked good in isolation but could not render reliably.',
  },
  {
    number: '04',
    title: 'Build the translation intelligence',
    body: 'I worked with the Principal Course Architect to encode SME intent and design decision-making into the conversion path.',
    artifact: 'Public-safe translation logic',
    prevented: 'A human designer repeatedly deciding how each piece of content should be represented.',
  },
  {
    number: '05',
    title: 'Build the component library and renderer',
    body: 'I designed and coded the frontend components and integrated the renderer that maps JSON to UI.',
    artifact: 'Component library + renderer',
    prevented: 'Rebuilding custom screens for every new lesson.',
  },
  {
    number: '06',
    title: 'Test with real learning files',
    body: 'We ran real Markdown files through the pipeline and reviewed the output as students would experience it.',
    artifact: 'Tested activity outputs',
    prevented: 'Technically correct output that felt cognitively overwhelming or fragmented.',
  },
  {
    number: '07',
    title: 'Add validation and correction checks',
    body: 'We added quality gates to catch malformed structures and edge cases.',
    artifact: 'Validator and corrector stages',
    prevented: 'Speed becoming risky when converting many files in batches.',
  },
];

const outcomePollOptions = [
  { id: 'creation', label: 'Content creation is harder.', initialVotes: 18 },
  { id: 'presentation', label: 'Content presentation is harder.', initialVotes: 41 },
  { id: 'system', label: 'Both break unless the system is designed well.', initialVotes: 27 },
];

function useInViewOnce({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold, rootMargin });

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, rootMargin, threshold]);

  return { ref, isVisible };
}

function Reveal({ children, className = '' }) {
  const { ref, isVisible } = useInViewOnce();

  return (
    <div ref={ref} className={`${lmsStyles.reveal} ${isVisible ? lmsStyles.revealVisible : ''} ${className}`}>
      {children}
    </div>
  );
}

function StaggeredText({ as: Tag = 'h2', segments, text, id, className = '' }) {
  const { ref, isVisible } = useInViewOnce();
  const textSegments = segments || [{ text }];
  const ariaLabel = textSegments.map((segment) => segment.text).join(' ');
  let globalIndex = 0;

  return (
    <Tag
      id={id}
      ref={ref}
      className={`${lmsStyles.staggerText} ${isVisible ? lmsStyles.staggerTextVisible : ''} ${className}`}
      aria-label={ariaLabel}
    >
      {textSegments.map((segment, segmentIndex) => (
        <span key={`${segment.text}-${segmentIndex}`} className={segment.className || ''} aria-hidden="true">
          {segment.text.split(' ').map((word, wordIndex) => {
            const currentIndex = globalIndex;
            globalIndex += 1;

            return (
              <span
                key={`${word}-${segmentIndex}-${wordIndex}`}
                className={lmsStyles.staggerWord}
                style={{ '--word-index': currentIndex }}
              >
                {word}
              </span>
            );
          })}
          {segment.breakAfter ? <br aria-hidden="true" /> : ' '}
        </span>
      ))}
    </Tag>
  );
}

function AnimatedMetricValue({ metric }) {
  const { ref, isVisible } = useInViewOnce();
  const [displayValue, setDisplayValue] = useState(metric.startValue ?? metric.value);
  const shouldAnimate = typeof metric.startValue === 'number' && typeof metric.endValue === 'number';

  useEffect(() => {
    if (!isVisible || !shouldAnimate) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(metric.endValue);
      return undefined;
    }

    let frameId;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1400, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(metric.startValue + ((metric.endValue - metric.startValue) * easedProgress));
      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [isVisible, metric.endValue, metric.startValue, shouldAnimate]);

  return (
    <p ref={ref} className="font-cabinet text-5xl font-extrabold leading-none text-accent-green md:text-6xl">
      {shouldAnimate ? `${displayValue}${metric.suffix || ''}` : metric.value}
    </p>
  );
}

function MetricLabel({ metric }) {
  return (
    <p className="mt-5 flex items-center justify-center gap-2 font-dm text-base font-extrabold leading-tight text-ink-950">
      <span>{metric.label}</span>
      <Tooltip
        content={(
          <span className="block space-y-3">
            {metric.tooltip.map((item) => (
              <span key={item} className="block">{item}</span>
            ))}
          </span>
        )}
        panelClassName={lmsStyles.metricTooltipPanel}
      >
        <span className={styles.metricTip}>?</span>
      </Tooltip>
    </p>
  );
}

function HeroVideo() {
  return (
    <CaseStudyVideoFrame
      frameClassName={`${lmsStyles.heroImage} ${styles.heroVideoFrame} shadow-2xl`}
      mediaClassName={styles.heroVideoMedia}
      videoClassName="block h-auto w-full"
      ariaLabel="S.P.A.R.K. Content Presenter product demo placeholder"
      autoPlay={false}
      loop
      muted
      playsInline
      sources={[]}
    />
  );
}

function SparkCenterGraphic() {
  return (
    <div className={styles.sparkCenterGraphic} aria-label="S.P.A.R.K. combines SME intent, design grammar, and engineering scale into structured product output">
      <div className={styles.sparkInputColumn}>
        {['SME intent', 'Design grammar', 'Engineering scale'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className={styles.sparkCore}>
        <span>Center system</span>
        <strong>S.P.A.R.K. Content Presenter</strong>
        <p>Codifies the conversion decisions that were previously manual.</p>
      </div>
      <div className={styles.sparkOutputColumn}>
        {['Structured JSON', 'Reusable components', 'Trackable product behavior'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <p className={styles.sparkGraphicCaption}>Before S.P.A.R.K., these lived in separate hands. After S.P.A.R.K., they became one repeatable production system.</p>
    </div>
  );
}

function BottleneckDiagram() {
  const steps = ['SME Markdown', 'Designer interpretation', 'Manual block picking', 'Rise activity build', 'SME review', 'Export + upload', 'Maintenance repeat'];

  return (
    <div className={styles.bottleneckDiagram} aria-label="Manual authoring bottleneck">
      {steps.map((step, index) => (
        <div className={`${styles.bottleneckStep} ${index >= 1 && index <= 3 ? styles.bottleneckStepHot : ''}`} key={step}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{step}</strong>
        </div>
      ))}
      <p>Presentation decisions are trapped here.</p>
    </div>
  );
}

function PainPointGrid() {
  return (
    <div className={styles.painPointGrid}>
      {painPoints.map((point) => (
        <article className={styles.painPointCard} key={point.title}>
          <span className={styles.painPointAvatar}>{point.initials}</span>
          <div>
            <p>{point.actor}</p>
            <h3>{point.title}</h3>
          </div>
          <span>{point.body}</span>
        </article>
      ))}
    </div>
  );
}

function ApproachMachine({ machine }) {
  return (
    <article className={styles.approachMachine}>
      <div>
        <p>{machine.number}</p>
        <h3>{machine.title}</h3>
        <strong>{machine.question}</strong>
      </div>
      <p>{machine.body}</p>
    </article>
  );
}

function DecisionVisual({ decision }) {
  return (
    <div className={styles.decisionVisual}>
      <div className={styles.decisionVisualChrome}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.decisionVisualBody}>
        <p>{decision.visualTitle}</p>
        <div className={styles.decisionVisualList}>
          {decision.visualItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SparkDecision({ decision }) {
  return (
    <article className={styles.sparkDecision}>
      <div>
        <p className={lmsStyles.decisionNumber}>Decision {decision.number}</p>
        <h3 className={`${lmsStyles.decisionTitle} font-cabinet text-3xl font-extrabold leading-tight md:text-5xl`}>
          {decision.title}
        </h3>

        <div className={lmsStyles.decisionEvidenceTable}>
          <div className={lmsStyles.decisionEvidenceRow}>
            <p className={lmsStyles.decisionEvidenceLabel}>Decision aim</p>
            <p className={lmsStyles.decisionEvidenceCopy}>{decision.aim}</p>
          </div>
          <div className={lmsStyles.decisionEvidenceRow}>
            <p className={lmsStyles.decisionEvidenceLabel}>Product decision</p>
            <p className={lmsStyles.decisionEvidenceCopy}>{decision.productDecision}</p>
          </div>
          <div className={lmsStyles.decisionEvidenceRow}>
            <p className={lmsStyles.decisionEvidenceLabel}>UX / system support</p>
            <p className={lmsStyles.decisionEvidenceCopy}>{decision.support}</p>
          </div>
          {decision.tradeoff && (
            <div className={lmsStyles.decisionEvidenceRow}>
              <p className={lmsStyles.decisionEvidenceLabel}>Tradeoff handled</p>
              <p className={lmsStyles.decisionEvidenceCopy}>{decision.tradeoff}</p>
            </div>
          )}
          <div className={lmsStyles.decisionEvidenceRow}>
            <p className={lmsStyles.decisionEvidenceLabel}>What this prevented</p>
            <p className={lmsStyles.decisionEvidenceCopy}>{decision.prevented}</p>
          </div>
        </div>
      </div>
      <DecisionVisual decision={decision} />
    </article>
  );
}

function PipelineGraphic({ variant = 'horizontal' }) {
  const steps = ['Source MD', 'Extractor', 'Navigator', 'Validator', 'Corrector', 'Final JSON', 'Renderer', 'Activity'];

  return (
    <div className={`${styles.pipelineGraphic} ${variant === 'vertical' ? styles.pipelineGraphicVertical : ''}`} aria-label="Public-safe S.P.A.R.K. pipeline">
      {steps.map((step) => (
        <span key={step}>{step}</span>
      ))}
    </div>
  );
}

function ProcessStep({ step }) {
  return (
    <article className={styles.processStep}>
      <div className={styles.processStepCopy}>
        <span>{step.number}</span>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
        <p><strong>Artifact:</strong> {step.artifact}</p>
        <p><strong>Prevented:</strong> {step.prevented}</p>
      </div>
    </article>
  );
}

function LiveProductCard() {
  const disabled = !liveActivityUrl;

  return (
    <article className={styles.liveProductCard}>
      <div className={styles.liveActivityPreview} aria-hidden="true">
        <div className={styles.livePreviewRail}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.livePreviewMain}>
          <span className={styles.livePreviewBadge}>Live product</span>
          <strong>Fraction Fluency</strong>
          <span className={styles.livePreviewLine} />
          <span className={styles.livePreviewLineShort} />
          <div className={styles.livePreviewCards}>
            <span>Example</span>
            <span>Practice</span>
            <span>Result guide</span>
          </div>
        </div>
      </div>
      <div className={styles.liveProductCopy}>
        <p className={`${lmsStyles.caseStudyBrow} ${lmsStyles.caseStudyBrowGreen}`}>Shipped Output</p>
        <h3>Try the live learning experience</h3>
        <p>Click through a few S.P.A.R.K.-rendered learning activities to see how structured learning content becomes a cohesive product experience.</p>
        <p className={styles.liveProductNote}>The converter is internal; this is the rendered student-facing output.</p>
        {disabled ? (
          <button className={styles.liveProductDisabled} type="button" disabled>Add live URL</button>
        ) : (
          <a className={styles.liveProductLink} href={liveActivityUrl} target="_blank" rel="noreferrer">
            Open live activity <ExternalArrowIcon className={styles.liveProductIcon} />
          </a>
        )}
      </div>
    </article>
  );
}

function OutcomePoll() {
  const [selectedOption, setSelectedOption] = useState(null);
  const totalVotes = outcomePollOptions.reduce((sum, option) => sum + option.initialVotes + (selectedOption === option.id ? 1 : 0), 0);
  const hasVoted = Boolean(selectedOption);

  return (
    <aside className={lmsStyles.outcomePoll} aria-labelledby="spark-poll-title">
      <div className={lmsStyles.outcomePollHeader}>
        <div>
          <h3 id="spark-poll-title">What do you think?</h3>
          <p>What do you think is harder to scale: content creation or content presentation?</p>
        </div>
      </div>

      <div className={lmsStyles.outcomePollOptions}>
        {outcomePollOptions.map((option) => {
          const isSelected = selectedOption === option.id;
          const voteCount = option.initialVotes + (isSelected ? 1 : 0);
          const percentage = Math.round((voteCount / totalVotes) * 100);

          return (
            <button
              key={option.id}
              className={`${lmsStyles.outcomePollOption} ${isSelected ? lmsStyles.outcomePollOptionSelected : ''}`}
              type="button"
              aria-pressed={isSelected}
              style={{ '--poll-option-fill': `${hasVoted ? percentage : 0}%` }}
              onClick={() => setSelectedOption(option.id)}
            >
              <span className={lmsStyles.outcomePollOptionText}>{option.label}</span>
              {hasVoted ? <span className={lmsStyles.outcomePollPercent}>{percentage}%</span> : null}
            </button>
          );
        })}
      </div>

      <p className={lmsStyles.outcomePollMeta}>
        {totalVotes} votes
        <span aria-hidden="true">/</span>
        {hasVoted ? 'Thanks for weighing in' : 'Add your take'}
      </p>
    </aside>
  );
}

function OutcomeMetric({ metric }) {
  return (
    <article className={lmsStyles.outcomeMetric}>
      <p className={lmsStyles.outcomeMetricValue}>{metric.value}</p>
      <p className={lmsStyles.outcomeMetricLabel}>
        <span>{metric.label}</span>
        <Tooltip
          content={(
            <span className="block space-y-3">
              {metric.tooltip.map((item) => (
                <span key={item} className="block">{item}</span>
              ))}
            </span>
          )}
          panelClassName={lmsStyles.metricTooltipPanel}
        >
          <span className={lmsStyles.outcomeMetricTip}>?</span>
        </Tooltip>
      </p>
      <p className={lmsStyles.outcomeMetricDelta}>{metric.detail}</p>
    </article>
  );
}

function NextCaseStudyPreview() {
  const handlePointerMove = event => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--next-cursor-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--next-cursor-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <a className={lmsStyles.nextCasePreview} href="/#featured-projects" onMouseMove={handlePointerMove}>
      <span className={lmsStyles.nextCaseMediaFrame}>
        <span className={lmsStyles.nextCaseRibbon} aria-hidden="true">
          Trust / SEO / conversion
        </span>
        <span className={styles.websitePreviewSurface} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
      </span>
      <span className={lmsStyles.nextCaseCopy}>
        <span className={lmsStyles.nextCaseTitle}>e-GMAT Website: How I rebuilt the website to make product value easier to trust</span>
        <span className={lmsStyles.nextCaseSummary}>
          S.P.A.R.K. solved internal content scale. The website revamp dealt with a public-facing surface: clarity, trust, SEO, performance, and conversion behavior.
        </span>
      </span>
      <span className={lmsStyles.nextCaseHoverCue} aria-hidden="true">
        View in detail
      </span>
    </a>
  );
}

export default function SparkPresenterCaseStudy() {
  return (
    <CaseStudyTemplate navigationLinks={caseStudyLinks}>
      <CaseStudyHero
        className={lmsStyles.heroGrid}
        eyebrow="S.P.A.R.K. Content Presenter"
        title={(
          <>
            Scale learning: <br />
            turn unstructured content into <br />
            structured, enjoyable learning experiences <br />
            <span className="inline-block -rotate-1 bg-accent-yellow px-1">in hours, not days.</span>
          </>
        )}
        punchline="Structured learning content converted at scale."
        summary="No manual authoring, no interpretation drift, just learning experiences ready to ship. SME learning content starts as a Markdown file. The system scans the source content and maps learning moments to actionable presentation blocks."
        metaItems={[
          { label: 'Principal Product Architect' },
          { label: 'Frontend + System Ownership' },
          { label: 'December 2025' },
          {
            label: 'e-GMAT',
            href: 'https://e-gmat.com/',
            logo: {
              src: '/images/case-studies/sat-lms/e-gmat.png',
              alt: 'e-GMAT logo',
              width: 889,
              height: 790,
            },
          },
        ]}
        disclaimer="Logos are properties of their respective companies."
        media={<HeroVideo />}
        contentWrapper={(content) => <Reveal>{content}</Reveal>}
      />

      <section id="tldr" className={`${lmsStyles.caseStudySection} bg-surface-white px-6`}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className={`${lmsStyles.caseStudyBrow} ${lmsStyles.caseStudyBrowGreen} mb-5`}>TL;DR</p>
            <StaggeredText
              className="font-cabinet text-case-study-statement font-extrabold leading-tight text-ink-950"
              segments={[
                { text: 'I architected S.P.A.R.K. Content Presenter', className: 'box-decoration-clone bg-accent-green px-1 text-ink-950' },
                { text: 'as a scalable content-presentation system: a custom component grammar and assembly-line pipeline that turns raw prose learning content into presentation-ready learning activities.' },
              ]}
            />

            <div className="mt-12">
              <SparkCenterGraphic />
            </div>

            <div className="mt-16 pt-4">
              <p className={`${lmsStyles.caseStudyBrow} ${lmsStyles.caseStudyBrowGreen} mb-8`}>My Impact</p>
              <h3 className="font-cabinet text-case-study-statement font-extrabold leading-tight text-ink-950">
                The shift was immediate: lesson conversion became dramatically faster, output structure became more consistent, updates became lighter, and production reliability crossed a level where scale was no longer blocked by manual authoring.
              </h3>
              <CaseStudyMetricStrip
                metrics={metrics}
                className="mx-auto mt-14 grid max-w-5xl gap-8 text-center md:grid-cols-3"
                renderValue={(metric) => <AnimatedMetricValue metric={metric} />}
                renderLabel={(metric) => <MetricLabel metric={metric} />}
                renderDetail={(metric) => (
                  <p className="font-dm text-base leading-relaxed text-ink-700">{metric.detail}</p>
                )}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="problem" aria-labelledby="problem-heading" className={`${lmsStyles.problemSection} ${lmsStyles.caseStudySection} px-6`}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <CaseStudySectionHeader
              eyebrow="The Problem"
              eyebrowClassName={`${lmsStyles.caseStudyBrow} ${lmsStyles.caseStudyBrowOrange} mb-6`}
              renderHeading={() => (
                <StaggeredText
                  id="problem-heading"
                  className="font-cabinet text-5xl font-extrabold leading-tight text-ink-950 md:text-6xl"
                  segments={[
                    { text: 'Content creation scaled multi-fold.', breakAfter: true },
                    { text: 'Learning-presentation conversion was still stuck in manual mode.', className: 'box-decoration-clone bg-surface-white px-1 text-ink-950' },
                  ]}
                />
              )}
              copy="AI made it possible to create learning content much faster. But turning that raw prose into a structured, presentable, review-ready activity still depended on manual authoring. The bottleneck was no longer content creation. It was the effort required to convert content into a learning experience."
              copyClassName="mt-10 max-w-3xl font-dm text-body leading-relaxed text-ink-800"
            />

            <PainPointGrid />

            <div className={styles.problemBridge}>
              <BottleneckDiagram />
              <p>
                The problem was not content. The problem was not UI polish. The problem was that learning-presentation decisions were still trapped inside a manual workflow.
              </p>
              <h3>The seed of the solution was clear: if the same presentation decisions were being made again and again, they should not stay trapped inside manual authoring. They needed to become a repeatable assembly line.</h3>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="solution" aria-labelledby="approach-heading" className={`${styles.approachSection} ${lmsStyles.caseStudySection} px-6`}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <CaseStudySectionHeader
              eyebrow="My Approach"
              eyebrowClassName={`${lmsStyles.caseStudyBrow} ${lmsStyles.caseStudyBrowGreen} mb-6`}
              renderHeading={() => (
                <StaggeredText
                  id="approach-heading"
                  className="font-cabinet text-5xl font-extrabold leading-tight text-ink-950 md:text-6xl"
                  segments={[
                    { text: 'How I approached', breakAfter: true },
                    { text: 'the problem', className: 'box-decoration-clone bg-accent-yellow px-1 text-ink-950' },
                  ]}
                />
              )}
              copy="Once the problem was clear, I looked at the manual workflow as a sequence of repeatable decisions."
              copyClassName="mt-10 max-w-3xl font-dm text-body leading-relaxed text-ink-800"
            />
            <p className={styles.approachQuestion}>
              Once the problem is clear I ask the question: if we were building an <span>assembly line for converting learning content into presentable activities</span>, what machines would it need?
            </p>
            <div className={styles.approachMachineGrid}>
              {approachMachines.map((machine) => (
                <ApproachMachine key={machine.title} machine={machine} />
              ))}
            </div>
            <p className={styles.approachProcessNote}>
              For each machine, we considered the intent, success criteria, and decision logic that had to be embedded as intelligence into that machine. That is how the manual workflow started turning into product intelligence.
            </p>
            <p className={styles.approachCloser}>
              We didn&apos;t need another design tool. We needed an assembly line with the intelligence of an SME, the judgment of a designer, and the thinking of an engineer.
            </p>
          </Reveal>
        </div>
      </section>

      <DecisionEvidenceSection
        id="decisions"
        labelledBy="decisions-heading"
        className={`${lmsStyles.decisionSection} ${lmsStyles.caseStudySection} px-6`}
        innerClassName="mx-auto max-w-5xl"
        header={(
          <Reveal>
            <CaseStudySectionHeader
              eyebrow="Key design decisions"
              eyebrowClassName={`${lmsStyles.decisionKicker} ${lmsStyles.caseStudyBrow} ${lmsStyles.caseStudyBrowGreen} mb-5`}
              renderHeading={() => (
                <StaggeredText
                  id="decisions-heading"
                  className={`${lmsStyles.decisionHeading} max-w-4xl font-cabinet text-4xl font-extrabold leading-tight md:text-6xl`}
                  segments={[
                    { text: 'I made', breakAfter: false },
                    { text: '5 decisions', className: lmsStyles.decisionHighlight },
                    { text: 'that turned manual conversion into a scalable product system.' },
                  ]}
                />
              )}
            />
          </Reveal>
        )}
        decisions={decisions}
        renderDecision={(decision) => (
          <Reveal key={decision.number}>
            <SparkDecision decision={decision} />
          </Reveal>
        )}
        summary={(
          <Reveal>
            <div className={lmsStyles.decisionSummary}>
              <p className={`${lmsStyles.decisionSummaryText} mx-auto max-w-4xl text-center font-cabinet text-3xl font-extrabold leading-tight md:text-case-study-statement`}>
                Together these decisions laid the foundations and made the <span className={lmsStyles.decisionHighlight}>scalable assembly line possible.</span>
              </p>
            </div>
          </Reveal>
        )}
      />

      <ProcessTrail id="build" labelledBy="build-heading" className={styles.buildProcessSection}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <CaseStudySectionHeader
              eyebrow="Build Process"
              eyebrowClassName={`${lmsStyles.caseStudyBrow} ${lmsStyles.caseStudyBrowGreen} mb-6`}
              renderHeading={() => (
                <StaggeredText
                  id="build-heading"
                  className="font-cabinet text-5xl font-extrabold leading-tight text-ink-950 md:text-6xl"
                  segments={[
                    { text: 'The build process produced', breakAfter: true },
                    { text: 'a system, not just a screen.', className: 'box-decoration-clone bg-accent-green px-1 text-ink-950' },
                  ]}
                />
              )}
              copy="The work was less about designing a single learning activity and more about building a reliable production path. Each stage produced an artifact that made the next stage possible."
              copyClassName="mt-10 max-w-3xl font-dm text-body leading-relaxed text-ink-800"
            />
            <div className={styles.buildProcessGrid}>
              <div className={styles.processStepList}>
                {processSteps.map((step) => (
                  <ProcessStep key={step.number} step={step} />
                ))}
              </div>
              <PipelineGraphic variant="vertical" />
            </div>
            <div className={styles.whyWorkedBlock}>
              <div>
                <p className={`${lmsStyles.caseStudyBrow} ${lmsStyles.caseStudyBrowGreen}`}>Why this worked</p>
                <h3>It did not depend on one giant leap from Markdown to UI.</h3>
              </div>
              <div className={styles.whyWorkedItems}>
                {[
                  'The component grammar constrained presentation choices.',
                  'The JSON contract made output renderable.',
                  'Validation and correction protected production quality.',
                  'Real-file testing exposed cognitive-load problems early.',
                  'The renderer made updates reusable across activities.',
                ].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </ProcessTrail>

      <section className={`${styles.shippedOutputSection} ${lmsStyles.caseStudySection} px-6`}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <CaseStudySectionHeader
              eyebrow="Shipped Output"
              eyebrowClassName={`${lmsStyles.caseStudyBrow} ${lmsStyles.caseStudyBrowOrange} mb-6`}
              renderHeading={() => (
                <StaggeredText
                  className="font-cabinet text-5xl font-extrabold leading-tight text-ink-950 md:text-6xl"
                  segments={[
                    { text: 'Student-facing', breakAfter: true },
                    { text: 'experience', className: 'box-decoration-clone bg-surface-white px-1 text-ink-950' },
                  ]}
                />
              )}
              copy="S.P.A.R.K.'s backend and translation logic stay invisible to the learner. What students experience is the final rendered activity: a cleaner learning flow that feels like part of the same e-GMAT ecosystem, not a third-party activity stitched onto the side."
              copyClassName="mt-10 max-w-3xl font-dm text-body leading-relaxed text-ink-800"
            />
            <LiveProductCard />
          </Reveal>
        </div>
      </section>

      <CaseStudyOutcome
        id="outcome"
        className={lmsStyles.finalOutcomeSection}
        innerClassName="mx-auto max-w-5xl"
        reveal={(content) => <Reveal>{content}</Reveal>}
      >
        <div className={lmsStyles.finalOutcomeStack}>
          <div className={lmsStyles.outcomeEditorial}>
            <div className={lmsStyles.outcomePanelCopy}>
              <p className={lmsStyles.outcomeEyebrow}>Outcome</p>
              <h2>Manual authoring stopped being the bottleneck. Scalable production became the new default.</h2>
              <p>S.P.A.R.K. changed how learning activities were produced, updated, and rendered. What used to depend on manual rebuilding could now move through a repeatable system with speed, consistency, and quality checks built in.</p>
            </div>

            <div className={lmsStyles.outcomeMetricsGrid}>
              {metrics.map((metric) => (
                <OutcomeMetric key={metric.label} metric={metric} />
              ))}
            </div>
          </div>

          <OutcomePoll />

          <NextCaseBridge
            styles={lmsStyles}
            prelude="That is how I built this one."
            heading="Next, a public-facing product surface with a different kind of complexity."
            pointer={{
              src: '/images/case-studies/sat-lms/next-case-pointer-clean.webp',
              width: 707,
              height: 1335,
              sizes: '(min-width: 1024px) 34vw, 70vw',
              unoptimized: true,
            }}
            preview={<NextCaseStudyPreview />}
          />
        </div>
      </CaseStudyOutcome>
    </CaseStudyTemplate>
  );
}
