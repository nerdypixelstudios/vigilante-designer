import { useEffect, useRef, useState } from 'react';
import {
  ExternalArrowIcon,
  MotifCurlyArrow,
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
const highlightClassName = 'box-decoration-clone bg-accent-green px-1 text-ink-950';

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
    actor: 'ID · Instructional Designer',
    initials: 'ID',
    title: 'Conversion was manual',
    body: 'I opened every file, read and understood the complete lesson, and interpreted it to build manually in [Articulate Rise](https://rise.com). One file. Three days.',
  },
  {
    actor: 'SM · Course Architect',
    initials: 'SM',
    title: 'Intent lived in separate rooms',
    body: 'I wrote the content knowing exactly how it should flow. By the time it came back built in Rise, the sequence had shifted. We reviewed and realigned — every time.',
  },
  {
    actor: 'RV · Course Architect',
    initials: 'RV',
    title: 'Review became production',
    body: 'I reviewed every activity not just for accuracy, but to check whether my intended learning sequence survived the conversion. That review round was baked into every production cycle.',
  },
  {
    actor: 'OP · Operations',
    initials: 'OP',
    title: 'Every update was a rebuild',
    body: 'When a source file changed, I updated it in Rise, exported it as an HTML package, replaced the production file manually, and re-added all tracking IDs by hand. Every time.',
  },
  {
    actor: 'PE · Product & Engineering',
    initials: 'PE',
    title: 'Tracking was locked out',
    body: 'I needed custom tracking on specific learner actions. Rise didn\'t support it. The presentation layer lived inside Rise — and we were limited to what Rise let us measure.',
  },
];

const approachMachines = [
  {
    number: '01',
    title: 'The SME lens',
    question: 'What should the learner understand here?',
    body: 'This machine had to preserve instructional intent — what matters, what comes first, what needs emphasis. The content already carried this intelligence. The system needed to read it.',
  },
  {
    number: '02',
    title: 'The designer\'s eye',
    question: 'How should this moment be presented?',
    body: 'This machine had to decide: is this an explanation, an example, a takeaway, a practice problem? The same call a designer makes manually — made automatically.',
  },
  {
    number: '03',
    title: 'The engineer\'s spine',
    question: 'How does this become stable product input?',
    body: 'This machine had to turn presentation decisions into structured, valid, renderable data — something the backend could store and the frontend could reliably render.',
  },
];

const decisions = [
  {
    number: '01',
    title: 'Decision 01',
    choice: 'We built a modular system, not a single monolith.',
    situation: 'Every lesson had to move from raw prose to a structured output format the rendering engine could read — reliably, at scale, without manual oversight at every step.',
    reasoning: [
      'A single monolith is simpler: one input, one output, fewer parts to build. But when it fails, you can\'t tell where.',
      'A modular system has more stages. Each depends on the previous — more to build, more to test. But each stage does exactly one thing. When it fails, you know which stage to fix. And when the system needs to grow, you add a stage without touching the ones that already work.',
    ],
    result: [
      'We started with three stages: extract, store, render. Stages two and three worked. Stage one didn\'t — so we debugged it in isolation, split it into two, and added a Validator and Corrector around it. Three stages became six. None of the working stages changed.',
      '<mark>That\'s the proof.</mark>',
    ],
  },
  {
    number: '02',
    title: 'Decision 02',
    choice: 'A fixed component vocabulary, not open-ended interpretation.',
    situation: 'The system needed to decide how to present every moment in a lesson — whether a piece of content was an explanation, an example, a practice problem, a takeaway. Until now, a designer made that call manually for every lesson.',
    reasoning: [
      'If the system could invent any presentation approach, output would be unpredictable and impossible to test comprehensively. A fixed vocabulary means the system works within a defined set. Every lesson speaks the same visual language. Testing becomes finite.',
      'We closed the vocabulary.',
    ],
    result: [
      'The first version had 25 components — too many. Reviewing the output as learners, the switching felt overwhelming. We simplified the library. Because the vocabulary was fixed, removing a component was plug-and-play.',
      '<mark>The fixed vocabulary became a lever: update one component, and every lesson that uses it updates with it. Automatically.</mark>',
    ],
  },
  {
    number: '03',
    title: 'Decision 03',
    choice: 'JSON as the contract between the pipeline and the backend — not HTML.',
    situation: 'The pipeline needed to hand its output to the backend for storage, and the backend to the renderer for display. HTML was the path of least resistance — it would have worked.',
    reasoning: [
      'HTML is a single chunk — no named parts, nothing addressable, nothing trackable. Store it, display it, and that\'s all you get.',
      'JSON names everything. Every component, every field — addressable and trackable. And when both the pipeline and backend share the same expected format, the handoff becomes a contract.',
      'We chose JSON.',
    ],
    result: [
      'The backend stored structured data, not an HTML export. Every component was named, every learner interaction trackable — and the pipeline and backend held the same contract at every conversion.',
      '<mark>HTML would have stored the lesson. JSON stored every moment inside it.</mark>',
    ],
  },
  {
    number: '04',
    title: 'Decision 04',
    choice: 'Structured fields where the component decides the sequence. Free-flow HTML where the learning content does.',
    situation: 'For most components, the component\'s own structure defined the layout — a heading, a body, a visual. But some learning blocks contained mixed content where the author\'s sequence was the layout: text, then image, then more text — not because of component design, but because that was the order the learning demanded.',
    reasoning: [
      'Structured fields organise content by type — the component decides what goes where. When the learning sequence is more specific than the component\'s structure, typed fields break it. Images land in the image field, text in the text field — regardless of the order the author intended.',
      'Free-flow HTML lets content define its own order. The trade-off: it can\'t be addressed field by field. For components where the author\'s sequence is the layout, that\'s the right trade.',
      'The schema became a hybrid.',
    ],
    result: [
      'Learning blocks that mixed text and images now rendered in the order the content was written, not the order the data model preferred.',
      '<mark>The schema served the learning sequence, not data convenience.</mark>',
    ],
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
  { id: 'expertise', label: 'Subject matter expertise — domain knowledge resists systematisation', initialVotes: 18 },
  { id: 'judgment', label: 'Design judgment — presentation decisions depend on too many variables', initialVotes: 41 },
  { id: 'contract', label: 'Neither — the hard part is the contract between them', initialVotes: 27 },
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

function renderInlineContent(text) {
  if (!text) return null;

  const pattern = /<mark>(.*?)<\/mark>|\[([^\]]+)\]\(([^)]+)\)/g;
  const fragments = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      fragments.push(text.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      fragments.push(
        <mark key={`mark-${match.index}`} className={highlightClassName}>
          {match[1]}
        </mark>,
      );
    } else {
      fragments.push(
        <a
          key={`link-${match.index}`}
          href={match[3]}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-1 underline-offset-4"
        >
          {match[2]}
        </a>,
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    fragments.push(text.slice(lastIndex));
  }

  return fragments;
}

function RichText({ as: Tag = 'p', text, className = '', ...props }) {
  return (
    <Tag className={className} {...props}>
      {renderInlineContent(text)}
    </Tag>
  );
}

function RichParagraphGroup({ paragraphs, className = '', paragraphClassName = '' }) {
  return (
    <div className={className}>
      {paragraphs.map((paragraph) => (
        <RichText
          key={paragraph}
          text={paragraph}
          className={paragraphClassName}
        />
      ))}
    </div>
  );
}

function renderDecisionInlineContent(text) {
  if (!text) return null;

  const pattern = /<mark>(.*?)<\/mark>/g;
  const fragments = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      fragments.push(text.slice(lastIndex, match.index));
    }

    fragments.push(
      <strong key={`decision-mark-${match.index}`} className={styles.decisionStrong}>
        {match[1]}
      </strong>,
    );

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    fragments.push(text.slice(lastIndex));
  }

  return fragments;
}

function DecisionRichText({ as: Tag = 'p', text, className = '' }) {
  return (
    <Tag className={className}>
      {renderDecisionInlineContent(text)}
    </Tag>
  );
}

function DecisionParagraphGroup({ paragraphs, className = '', paragraphClassName = '' }) {
  return (
    <div className={className}>
      {paragraphs.map((paragraph) => (
        <DecisionRichText
          key={paragraph}
          text={paragraph}
          className={paragraphClassName}
        />
      ))}
    </div>
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
    <div className={styles.sparkCenterGraphic} aria-label="S.P.A.R.K. combines a custom component grammar and an assembly pipeline to convert raw learning prose into production-ready activities">
      <div className={styles.sparkInputColumn}>
        {['Raw learning prose', 'Custom component grammar', 'Assembly pipeline'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className={styles.sparkCore}>
        <span>Center system</span>
        <strong>S.P.A.R.K. Content Presenter</strong>
        <p>Converts raw learning prose into production-ready activities.</p>
      </div>
      <div className={styles.sparkOutputColumn}>
        {['Production-ready activities', 'Output consistency', 'Updates in minutes'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <p className={styles.sparkGraphicCaption}>A custom component grammar and an assembly pipeline turned raw learning prose into production-ready activities.</p>
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
          <span>{renderInlineContent(point.body)}</span>
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

function SparkDecisionVideoFrame() {
  return (
    <CaseStudyVideoFrame
      frameClassName={`${lmsStyles.decisionBrowser} ${lmsStyles.decisionVideoBrowser} ${styles.sparkDecisionVideoFrame}`}
      mediaClassName={styles.sparkDecisionVideoReveal}
      videoClassName={lmsStyles.decisionVideo}
      ariaLabel="Placeholder for supporting decision video"
      autoPlay={false}
      loop
      muted
      playsInline
      sources={[]}
    />
  );
}

function SparkDecision({ decision }) {
  return (
    <article className={lmsStyles.tutorDecision}>
      <div className="grid gap-6 md:grid-cols-12 md:items-start">
        <p className={`${lmsStyles.decisionNumber} font-cabinet text-5xl font-extrabold leading-none md:col-span-1`}>{decision.number}</p>
        <div className="md:col-span-11">
          <h3 className={`${lmsStyles.decisionTitle} font-cabinet text-3xl font-extrabold leading-tight md:text-4xl`}>
            {decision.choice}
          </h3>

          <div className={lmsStyles.decisionEvidenceTable}>
            <div className={lmsStyles.decisionEvidenceRow}>
              <p className={lmsStyles.decisionEvidenceLabel}>The choice</p>
              <p className={lmsStyles.decisionEvidenceCopy}>{decision.choice}</p>
            </div>
            <div className={lmsStyles.decisionEvidenceRow}>
              <p className={lmsStyles.decisionEvidenceLabel}>Situation</p>
              <p className={lmsStyles.decisionEvidenceCopy}>{decision.situation}</p>
            </div>
            <div className={lmsStyles.decisionEvidenceRow}>
              <p className={lmsStyles.decisionEvidenceLabel}>Reasoning</p>
              <DecisionParagraphGroup
                paragraphs={decision.reasoning}
                className={`${lmsStyles.decisionEvidenceCopy} space-y-4`}
                paragraphClassName="m-0"
              />
            </div>
            <div className={lmsStyles.decisionEvidenceRow}>
              <p className={lmsStyles.decisionEvidenceLabel}>Result</p>
              <DecisionParagraphGroup
                paragraphs={decision.result}
                className={`${lmsStyles.decisionEvidenceCopy} space-y-4`}
                paragraphClassName="m-0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <SparkDecisionVideoFrame />
      </div>
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
          <h3 id="spark-poll-title">When automating a creative workflow, what&apos;s harder to encode — subject matter expertise or design judgment?</h3>
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
            Raw content to learning experience.
            {' '}
            <span className="inline-block -rotate-1 bg-accent-yellow px-1">Hours, not days.</span>
          </>
        )}
        punchline="No rebuilding. No review cycles. Just scale."
        summary={renderInlineContent('The system reads learning content as prose, decides how each moment should be presented, and outputs a production-ready activity — no manual authoring required.')}
        metaItems={[
          { label: 'Principal Product Architect & Frontend Developer' },
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
            <RichText
              as="h2"
              text="I architected a scalable content processing system: <mark>a custom component grammar and an assembly pipeline</mark> that converts raw learning prose into production-ready activities."
              className="font-cabinet text-case-study-statement font-extrabold leading-tight text-ink-950"
            />

            <div className="mt-12">
              <SparkCenterGraphic />
            </div>

            <div className="mt-16 pt-4">
              <RichText
                as="h3"
                text="The shift was immediate: <mark>one file in three days becomes 100 files in two hours</mark>, output consistency was built into the system, and updates that once required full rebuilds now took minutes."
                className="font-cabinet text-case-study-statement font-extrabold leading-tight text-ink-950"
              />
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
              eyebrow="Problem"
              eyebrowClassName={`${lmsStyles.caseStudyBrow} ${lmsStyles.caseStudyBrowOrange} mb-6`}
              renderHeading={() => (
                <StaggeredText
                  id="problem-heading"
                  className="font-cabinet text-5xl font-extrabold leading-tight text-ink-950 md:text-6xl"
                  segments={[
                    { text: 'Content creation scaled fast.', breakAfter: true },
                    { text: 'Content processing didn\'t.', className: styles.problemHeadingAccent },
                  ]}
                />
              )}
              copy="AI made content creation fast. Converting that content into a presentable, review-ready activity still took days — and it still depended entirely on a third-party tool that wasn’t built for this."
              copyClassName="mt-10 max-w-3xl font-dm text-body leading-relaxed text-ink-800"
            />

            <PainPointGrid />

            <div className={styles.problemBridge}>
              <p className={styles.approachCloser}>
                The bottleneck wasn&apos;t content. It was that{' '}
                <span className={styles.problemCloserHighlight}>every presentation decision was made by hand.</span>{' '}
                That needed to become a system.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="solution" aria-labelledby="approach-heading" className={`${styles.approachSection} ${lmsStyles.caseStudySection} px-6`}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className={lmsStyles.approachThinkingRow}>
              <p className={`${lmsStyles.caseStudyBrow} ${lmsStyles.caseStudyBrowGreen}`}>My approach</p>
              <div className={lmsStyles.approachCopyColumn}>
                <h2 id="approach-heading" className={lmsStyles.approachHeading}>How I approached the problem</h2>
                <p className={lmsStyles.approachQuestion}>
                  Once the problem was clear, I asked:
                  <br />
                  if every presentation decision is already being made by hand,
                  <br />
                  <strong className={lmsStyles.approachQuestionHighlight}>what would it take to make those decisions automatic?</strong>
                </p>
              </div>
            </div>
            <p className="mt-10 max-w-3xl font-dm text-body leading-relaxed text-ink-800">
              We mapped the manual workflow step by step. For each step, we wrote three things: the intent behind it, the success criteria, and the thinking that drove it. Then we turned those three into system intelligence.
            </p>
            <div className={styles.approachMachineGrid}>
              {approachMachines.map((machine) => (
                <ApproachMachine key={machine.title} machine={machine} />
              ))}
            </div>
            <div className={lmsStyles.approachConclusionWrap}>
              <div className={`${lmsStyles.approachConclusionArrow} ${lmsStyles.approachConclusionArrowTop}`} aria-hidden="true">
                <MotifCurlyArrow />
              </div>
              <p className={lmsStyles.wordplayStatement}>
                <span>We didn&apos;t need </span>
                <span className={`${lmsStyles.wordplayRejected} ${styles.approachRejectedStatic}`}>another design tool.</span>
                <span> We needed an assembly line with the intelligence of an SME, the judgment of a designer, and the thinking of an engineer.</span>
              </p>
              <div className={`${lmsStyles.approachConclusionArrow} ${lmsStyles.approachConclusionArrowBottom}`} aria-hidden="true">
                <MotifCurlyArrow />
              </div>
            </div>
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
              eyebrow="With the assembly-line lens on,"
              eyebrowClassName={`${lmsStyles.decisionKicker} ${lmsStyles.caseStudyBrow} ${lmsStyles.caseStudyBrowGreen} mb-5`}
              renderHeading={() => (
                <StaggeredText
                  id="decisions-heading"
                  className={`${lmsStyles.decisionHeading} max-w-4xl font-cabinet text-4xl font-extrabold leading-tight md:text-6xl`}
                  segments={[
                    { text: 'I made 4 decisions', breakAfter: true },
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
              <h2>Scalability at pace without manual cost.</h2>
              <p>
                The shift was immediate:{' '}
                <strong className="font-extrabold text-ink-950">one file in three days becomes 100 files in two hours</strong>
                , output consistency was built into the system, and updates that once required full rebuilds now took minutes.
              </p>
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



