import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowForwardLineIcon,
  DesignForgeArrowRightIcon,
  DesignForgeStarMark,
  DesignForgeWarningMark,
  DocumentLogicIcon,
  EyeRevealIcon,
  JourneyFlowIcon,
} from '../../icons/icons';
import styles from './DesignForge.module.css';

const steps = [
  {
    number: '00',
    sticker: 'The Start',
    title: 'Logical Priming',
    note: 'Make UX gaps visible early',
    annotation: 'Write rules, states, and flows before code',
    body: 'Before build, I wrote down the business rules, screens, journeys, component behavior, wireframes, screen flow, backend contracts, and success criteria. That made missing states and unclear handoffs visible before code could hide them.',
    prevented: 'AI inventing product logic mid-build.',
    icon: 'file',
    artifactType: 'input',
  },
  {
    number: '01',
    sticker: 'Experience First',
    title: 'Journey Planning',
    note: 'The flow carries the product',
    annotation: 'Judge the work as a sequence, not a screen',
    body: 'I converted the specification into a student journey and component dependency map, so the feature could be judged as a flow instead of isolated screens.',
    prevented: 'Screens that looked right alone but failed in sequence.',
    icon: 'route',
    artifactType: 'journey',
  },
  {
    number: '02',
    sticker: 'Experience First',
    title: 'Sandbox Creation',
    note: 'Real systems stay protected',
    annotation: 'Create a safe place to break the idea',
    body: 'I set up a disconnected sandbox with mock data and clean constraints so the product could be assembled, broken, tested, and improved away from production pressure.',
    prevented: 'Production constraints deciding the UX too early.',
    icon: 'box',
    artifactType: 'sandbox',
  },
  {
    number: '03',
    sticker: 'Experience First',
    title: 'System Rough Build',
    note: 'Do not polish the wrong product',
    annotation: 'Find the missing states before visual craft',
    body: 'Inside the sandbox, I used a rough working build to find missing states, unclear interactions, weak hierarchy, and backend gaps before any visual polish started.',
    prevented: 'Polishing while core data contracts were still unclear.',
    icon: 'hammer',
    artifactType: 'gaps',
  },
  {
    number: '04',
    sticker: 'Interface Next',
    title: 'Design Iteration',
    note: 'Three directions before one bet',
    annotation: 'Make the interface answer the behavior',
    body: 'Once the rough build exposed the real UX behavior, I moved into interface design and documented hierarchy, states, and treatment through distinct design options.',
    prevented: 'Pretty UI detached from behavior.',
    icon: 'pen',
    artifactType: 'interface',
  },
  {
    number: '05',
    sticker: 'Interface Next',
    title: 'Sandbox Integration',
    note: 'Polish meets system reality',
    annotation: 'Test components together, not in isolation',
    body: 'I dropped the polished components back into the sandbox and tested them as one complete flow, so polish had to survive the journey end to end.',
    prevented: 'Polished components that failed together.',
    icon: 'plug',
    artifactType: 'integration',
  },
  {
    number: '06',
    sticker: 'Production Last',
    title: 'Production Migration',
    note: 'Production only after proof',
    annotation: 'Move intent into the real system',
    body: 'With the full flow validated, I moved to production with migration notes, system checks, backend contracts, and token-deviation reports, so intent did not get flattened in handoff.',
    prevented: 'Product logic and design intent getting lost in production migration.',
    icon: 'rocket',
    artifactType: 'production',
  },
];

const proofItems = ['4 products in 6 months', 'Same designer', 'Spec to shipped'];

const productCards = [
  { name: 'SAT LMS', subtitle: 'Adaptive learning app', href: '/case-studies/sat-lms' },
  { name: 'S.P.A.R.K. Presenter', subtitle: 'Scalable learning content stack', href: '/case-studies/spark-presenter' },
  { name: 'e-GMAT Website', subtitle: 'Public marketing site', href: '#featured-projects' },
  { name: 'NEURON', subtitle: 'GMAT practice platform', href: '#featured-projects' },
];

const inputRows = [
  '2-Remedials/',
  '|-- 00-README-remedials.md',
  '|-- 01-context-and-business-rules-remedials.md',
  '|-- 03-user-journey-map-remedials.md',
  '|-- 05-wireframes-remedials.md',
  '|-- 07-backend-specification-remedials.md',
  '`-- 08-frontend-success-criteria-remedials.md',
];

const journeyRows = [
  ['J1', 'CF Remedial', 'M1 -> R6 -> R1 -> R4 -> R3'],
  ['J2', 'Process Skill Remedial', 'Same path, different trigger'],
  ['J6', 'Skipped Remedial', 'R1 dismissed -> M2 pending'],
  ['J7', 'Course Return', 'M3 -> M4 -> M6'],
];

const sandboxFileStructureExcerpt = `---
## 8. Sandbox File Structure

pages/sandbox/remedials/
|-- PageHome.jsx                  # Copy, replace API with mock data
|-- PageHome.css                  # Copy
|-- ActivityPage.jsx              # Add remedial callback handling
|-- ActivityPage.css
|-- components/
|   |-- activity/
|   |   |-- ActivityPageShell.jsx
|   |   |-- ActivityPageShell.css
|   |   \`-- index.js
|   |-- course/
|   |   |-- ActivityLineItem.jsx
|   |   |-- ActivityLineItem.css
|   |   |-- UnitBlock.jsx
|   |   \`-- UnitBlock.css
\`-- mock-data/remedials.js`;

const gapOptionRows = [
  ['(A) ActivityPage wrapper', 'ActivityPage receives completion event, renders custom results wrapper with R6, then R1 modal'],
  ['(B) Overlay approach', 'Let spark-maximus show default results, then overlay R6/R1 on top'],
  ['(C) Callback injection', 'Pass a render callback to spark-maximus to inject R6 into results'],
];

const gapFieldRows = [
  ['contentId', 'number', 'Yes', 'Unique ID of the remedial', 'Navigation'],
  ['contentType', 'string', 'Yes', 'Must be REMEDIAL', 'Card styling'],
  ['contentName', 'string', 'Yes', 'Display name', 'Card title'],
  ['correlationId', 'string', 'Yes', 'UUID for Neuron iframe', 'Launching remedial'],
  ['estimatedDurationMinutes', 'number', 'Yes', 'Expected completion time', 'Time badge'],
  ['progressStatus', 'string', 'Yes', 'NOT_STARTED / INPROGRESS / COMPLETED', 'Status badge'],
  ['motherActivityName', 'string', 'Check', 'Parent activity name', 'Description copy'],
];

const interfaceRows = [
  ['A', 'Activity Sidebar', 'Queue clarity'],
  ['B', 'R2 Remedial Row', 'Hierarchy under mother activity'],
  ['C', 'R6 Notice', 'Dual placement'],
];

const integrationRows = [
  'Sandbox integration/',
  '|-- Task P3.1 - R2 integration.md',
  '|-- Task P3.2 - M2 UI update.md',
  '`-- Task P3.3 - R6 integration.md',
];

const productionRows = [
  ['R1', 'RemedialCreatedModal', 'src/components/remedials/'],
  ['R3', 'CompletionFeedback', 'src/components/remedials/'],
  ['R6', 'ResultsNotice', 'src/components/remedials/'],
  ['Audit', 'Token deviation report', 'release-ready'],
];

function clampStepIndex(value, maxIndex) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(maxIndex, Math.round(value)));
}

function getDialMarkerState(index, progress) {
  const relative = index - progress;
  const distance = Math.abs(relative);

  return {
    leftPercent: 50 + relative * 27,
    topPercent: 50 + distance * 16,
    opacity: Math.max(0, 1 - Math.max(0, distance - 0.12) * 0.55),
    scale: Math.max(0.48, 1 - distance * 0.24),
  };
}

function HeroIntro() {
  return (
    <div className={styles.heroIntro}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>Process: the engine behind the speed</p>
        <h2 className={styles.heroTitle}>
          Built with <strong>DesignForge</strong>
        </h2>
        <div className={styles.heroBody}>
          <p>
            <strong>I had already seen the trap:</strong> when product logic, UX flow, UI polish, code, data, and production constraints are solved together, the work gets noisy.
          </p>
          <p>
            So I split the build into layers: <strong>experience first, interface next, production last.</strong>
          </p>
        </div>
        <HeroProofStrip />
      </div>
      <MiniFlowCard />
    </div>
  );
}

function HeroProofStrip() {
  return (
    <ul className={styles.proofStrip} aria-label="DesignForge proof points">
      {proofItems.map((item) => (
        <li key={item}>
          <span aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function MiniFlowCard() {
  return (
    <aside className={styles.flowCard} aria-label="DesignForge layers graphic">
      <Image
        src="/images/designforge/designforge-steps.svg"
        alt=""
        width={322}
        height={429}
        unoptimized
        className={styles.flowCardImage}
      />
    </aside>
  );
}

function DialExperience() {
  const dialRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: dialRef, offset: ['start start', 'end end'] });
  const dialProgress = useTransform(scrollYProgress, [0.08, 0.92], [0, steps.length - 1]);

  useEffect(() => {
    const unsubscribe = dialProgress.on('change', (latest) => {
      setActiveStep(clampStepIndex(latest, steps.length - 1));
    });

    return () => unsubscribe();
  }, [dialProgress]);

  return (
    <>
      <section ref={dialRef} className={styles.dialSection} aria-label="DesignForge scroll-driven process">
        <div className={styles.dialSticky}>
          <div className={styles.dialInner}>
            <Dial activeIndex={activeStep} dialProgress={dialProgress} />
            <StepCard step={steps[activeStep]} />
          </div>
        </div>
      </section>
      <section className={styles.mobileSteps} aria-label="DesignForge process steps">
        {steps.map((step) => (
          <StepCard key={step.number} step={step} isMobile />
        ))}
      </section>
    </>
  );
}

function Dial({ activeIndex, dialProgress }) {
  return (
    <div className={styles.dial}>
      <div className={styles.arc} aria-hidden="true" />
      {steps.map((step, index) => (
        <DialMarker
          key={step.number}
          step={step}
          index={index}
          activeIndex={activeIndex}
          dialProgress={dialProgress}
        />
      ))}
    </div>
  );
}

function DialMarker({ step, index, activeIndex, dialProgress }) {
  const left = useTransform(dialProgress, (value) => `${getDialMarkerState(index, value).leftPercent}%`);
  const top = useTransform(dialProgress, (value) => `${getDialMarkerState(index, value).topPercent}%`);
  const opacity = useTransform(dialProgress, (value) => getDialMarkerState(index, value).opacity);
  const scale = useTransform(dialProgress, (value) => getDialMarkerState(index, value).scale);
  const isActive = index === activeIndex;

  return (
    <motion.div
      className={styles.marker}
      style={{
        left,
        top,
        opacity,
      }}
    >
      <div className={styles.markerAnchor}>
        <motion.div className={styles.markerInner} style={{ scale }}>
          {isActive ? <span className={styles.markerLabel}>Step</span> : null}
          <span className={`${styles.markerBubble} ${isActive ? styles.markerBubbleActive : ''}`}>
            {step.number}
          </span>
          {isActive ? (
            <motion.div
              className={styles.annotation}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.24 }}
            >
              <span>
                <strong>{step.note}</strong>
                <small>{step.annotation}</small>
              </span>
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </motion.div>
  );
}

function StepCard({ step, isMobile = false }) {
  const content = (
    <article className={`${styles.stepCard} ${isMobile ? styles.stepCardMobile : ''}`}>
      <span className={styles.stepSticker}>{step.sticker}</span>
      <ArtifactPreview type={step.artifactType} />
      <div className={styles.stepCopy}>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
        <p className={styles.prevented}>
          <strong>What this prevented:</strong> {step.prevented}
        </p>
      </div>
    </article>
  );

  if (isMobile) return content;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.number}
        initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}

function ArtifactPreview({ type }) {
  if (type === 'journey') return <JourneyArtifact />;
  if (type === 'sandbox') return <SandboxRequirementArtifact />;
  if (type === 'gaps') return <GapAnalysisArtifact />;
  if (type === 'interface') return <InterfaceArtifact />;
  if (type === 'integration') return <TextArtifact title="PR4 - Sandbox Integration.md" rows={integrationRows} accent="green" />;
  if (type === 'production') return <ProductionArtifact />;

  return <TextArtifact title="Input specification | Remedials" rows={inputRows} />;
}

function ArtifactShell({ title, children, className = '', bodyClassName = '' }) {
  const bodyClasses = bodyClassName ? `${styles.artifactBody} ${bodyClassName}` : styles.artifactBody;

  return (
    <div className={`${styles.artifactShell} ${className}`}>
      <div className={styles.artifactChrome}>
        <span className={styles.chromeDots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>{title}</span>
        <i aria-hidden="true" />
      </div>
      <div className={bodyClasses}>{children}</div>
    </div>
  );
}

function TextArtifact({ title, rows, accent = 'orange' }) {
  return (
    <ArtifactShell title={title} className={accent === 'green' ? styles.artifactGreen : ''}>
      <div className={styles.treeArtifact}>
        {rows.map((row) => (
          <span key={row}>{row}</span>
        ))}
      </div>
    </ArtifactShell>
  );
}

function JourneyArtifact() {
  return (
    <ArtifactShell title="Journey component mapping | Remedials">
      <table className={styles.journeyTable}>
        <thead>
          <tr>
            <th>Journey</th>
            <th>Component flow</th>
          </tr>
        </thead>
        <tbody>
          {journeyRows.map((row) => (
            <tr key={row[0]}>
              <td>
                <strong>{row[0]}</strong>
                <span>{row[1]}</span>
              </td>
              <td>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ArtifactShell>
  );
}

function SandboxRequirementArtifact() {
  return (
    <div className={styles.sandboxArtifactStage}>
      <ArtifactShell
        title="02-sandbox-requirement-remedials.md"
        className={styles.sandboxBaseWindow}
        bodyClassName={styles.sandboxArtifactBody}
      >
        <pre className={styles.sandboxTreeCode}>{sandboxFileStructureExcerpt}</pre>
      </ArtifactShell>

      <div className={styles.sandboxRoutingCard} aria-label="Routing setup artifact">
        <SandboxRoutingCode />
      </div>
    </div>
  );
}

function SandboxRoutingCode() {
  return (
    <pre className={styles.sandboxRoutingCode}>
      <span>## 9. Routing Setup</span>{'\n\n'}
      <span>Add to `App.jsx`:</span>{'\n\n'}
      <span>```</span>{'\n'}
      <span className={styles.inputSpecCodeComment}>{'// Course home sandbox'}</span>{'\n'}
      <span className={styles.inputSpecCodeMuted}>&lt;</span><span className={styles.inputSpecCodeKeyword}>Route</span><span> path=</span><span className={styles.inputSpecCodeString}>{'"/sandbox/remedials/:courseCode"'}</span><span> element=&#123;&#60;</span><span className={styles.inputSpecCodeType}>RemedialsSandboxHome</span>{'\n'}
      <span>/&#62;&#125; /&#62;</span>{'\n\n'}
      <span className={styles.inputSpecCodeComment}>{'// Activity page sandbox'}</span>{'\n'}
      <span className={styles.inputSpecCodeMuted}>&lt;</span><span className={styles.inputSpecCodeKeyword}>Route</span><span> path=</span><span className={styles.inputSpecCodeString}>{'"/sandbox/remedials/:courseCode/activity/:activityId"'}</span><span> element=</span>{'\n'}
      <span>&#123;&#60;</span><span className={styles.inputSpecCodeType}>RemedialsSandboxActivity</span><span> /&#62;&#125; /&#62;</span>
    </pre>
  );
}

function GapAnalysisArtifact() {
  return (
    <div className={styles.gapAnalysisStackStage}>
      <ArtifactShell
        title="gap-analysis-summary-remedials.md"
        className={styles.gapAnalysisBaseWindow}
        bodyClassName={styles.gapAnalysisBody}
      >
        <p className={styles.gapAnalysisHeading}>### Q4: How do R6 Notice and R1 Modal integrate with Activity Results?</p>
        <p className={styles.gapAnalysisMeta}>
          <strong>Affected Components:</strong> R6 Notice, R1 Modal, M1 Results Screen
        </p>
        <p className={styles.gapAnalysisSubheading}>The Issue:</p>
        <ul className={styles.gapAnalysisList}>
          <li>Spec shows R6 as a section within the results screen</li>
          <li>R1 modal appears after clicking Continue on results</li>
          <li>O0 decision says ActivityPage handles this via callback</li>
        </ul>
        <p className={styles.gapAnalysisSubheading}>Options:</p>
        <table className={styles.gapAnalysisTable}>
          <thead>
            <tr>
              <th>Option</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {gapOptionRows.map((row) => (
              <tr key={row[0]}>
                <td><strong>{row[0]}</strong></td>
                <td>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <span className={styles.artifactFocusVeil} aria-hidden="true" />
      </ArtifactShell>

      <ArtifactShell
        title="backend-gap-analysis-remedials.md"
        className={styles.gapAnalysisDetailWindow}
        bodyClassName={styles.gapAnalysisBody}
      >
        <p className={styles.gapAnalysisHeading}>### Fields Required in Remedial Children</p>
        <table className={`${styles.gapAnalysisTable} ${styles.gapAnalysisFieldTable}`}>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
              <th>Used For</th>
            </tr>
          </thead>
          <tbody>
            {gapFieldRows.map((row) => (
              <tr key={row[0]}>
                <td><code>{row[0]}</code></td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
                <td>{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.gapAnalysisSubheading}>How Frontend Uses This</p>
        <ol className={styles.gapAnalysisList}>
          <li>Extract remedials from `activity.children` in the Next Up block</li>
          <li>Flatten them into the `contentItems` array</li>
          <li>Render each remedial immediately after its parent activity</li>
        </ol>
      </ArtifactShell>
    </div>
  );
}

function InterfaceArtifact() {
  return (
    <ArtifactShell title="component-renders-design-specification">
      <div className={styles.interfaceArtifact}>
        {interfaceRows.map((row) => (
          <span key={row[0]}>
            <strong>{row[0]}</strong>
            <b>{row[1]}</b>
            <small>{row[2]}</small>
          </span>
        ))}
      </div>
    </ArtifactShell>
  );
}

function ProductionArtifact() {
  return (
    <ArtifactShell title="prod-migration-map.md" className={styles.artifactGreen}>
      <table className={styles.productionTable}>
        <tbody>
          {productionRows.map((row) => (
            <tr key={row[0]}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ArtifactShell>
  );
}

function ContrastToggle() {
  const [mode, setMode] = useState('with');
  const isWith = mode === 'with';

  return (
    <section className={styles.toggleSection} aria-labelledby="designforge-toggle-title">
      <h3 id="designforge-toggle-title" className={styles.srOnly}>
        DesignForge contrast
      </h3>
      <div className={styles.toggleControl} data-active={mode} role="group" aria-label="Compare build modes">
        <span className={styles.toggleIndicator} aria-hidden="true" />
        <button
          type="button"
          aria-pressed={!isWith}
          onClick={() => setMode('without')}
          className={!isWith ? styles.toggleButtonActive : ''}
        >
          without DesignForge
        </button>
        <button
          type="button"
          aria-pressed={isWith}
          onClick={() => setMode('with')}
          className={isWith ? styles.toggleButtonActive : ''}
        >
          With DesignForge
        </button>
      </div>
      <AnimatePresence mode="wait">
        {isWith ? (
          <motion.div
            key="with"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28 }}
          >
            <ProductProof />
          </motion.div>
        ) : (
          <motion.div
            key="without"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28 }}
          >
            <ChaosProof />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProductProof() {
  return (
    <div className={styles.productProof}>
      <span className={styles.successGlow} aria-hidden="true" />
      <Image
        src="/images/designforge/designforge-avatar-confident.png"
        alt=""
        width={360}
        height={520}
        unoptimized
        className={styles.confidentAvatar}
      />
      <DesignForgeStarMark className={styles.starMark} />
      <div className={styles.productCards}>
        {productCards.map((product, index) => (
          <Link key={product.name} href={product.href} className={`${styles.productCard} ${styles[`productCard${index}`]}`}>
            <span>
              <strong>{product.name}</strong>
              <small>{product.subtitle}</small>
            </span>
            <i aria-hidden="true">
              <DesignForgeArrowRightIcon />
            </i>
          </Link>
        ))}
      </div>
      <p>4 production apps. 6 months. Same designer, spec to shipped.</p>
    </div>
  );
}

function ChaosProof() {
  const chaosItems = ['Random prompt', 'Invented logic', 'UI variant v3', 'Try this direction?', 'Feature idea', 'Change copy', 'Rework', 'Backend stub', 'Edge case? Not sure', 'Design drift', 'Production risk', 'Final(?) build'];

  return (
    <div className={styles.chaosProof}>
      <div className={styles.chaosBackground} aria-hidden="true">
        {chaosItems.map((item, index) => (
          <span key={item} className={styles[`chaosItem${index}`]}>
            {item}
          </span>
        ))}
      </div>
      <Image
        src="/images/designforge/designforge-avatar-confused.png"
        alt=""
        width={330}
        height={500}
        unoptimized
        className={styles.confusedAvatar}
      />
      <DesignForgeWarningMark className={styles.warningMark} />
      <p>No clarity, confusion gets amplified, rework follows.</p>
    </div>
  );
}

function WhyItWorked() {
  const items = [
    { id: 'spec', label: 'The spec', rest: 'carried the logic.', Icon: DocumentLogicIcon },
    { id: 'journey', label: 'The journey', rest: 'carried the flow.', Icon: JourneyFlowIcon },
    { id: 'rough-build', label: 'The rough build', rest: 'exposed the UX.', Icon: EyeRevealIcon },
  ];

  return (
    <section className={styles.whySection} aria-labelledby="designforge-why-heading">
      <h2 id="designforge-why-heading">Why this framework worked?</h2>
      <div className={styles.whyRight}>
        <ul className={styles.whyList}>
          {items.map(({ Icon, ...item }) => (
            <li key={item.id}>
              <span className={styles.whyIconBadge} aria-hidden="true">
                <Icon />
              </span>
              <p>
                <strong>{item.label}</strong> {item.rest}
              </p>
            </li>
          ))}
        </ul>
        <div className={styles.finalWhy}>
          <span className={styles.whyArrowBadge} aria-hidden="true">
            <ArrowForwardLineIcon />
          </span>
          <strong>Each step narrowed the next one.</strong>
        </div>
      </div>
    </section>
  );
}

export default function DesignForge() {
  return (
    <section id="designforge" className={styles.section}>
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.inner}>
        <HeroIntro />
        <DialExperience />
        <ContrastToggle />
        <WhyItWorked />
      </div>
    </section>
  );
}
