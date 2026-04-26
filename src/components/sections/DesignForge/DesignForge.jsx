import { useTheme } from '../../shared/ThemeContext';
import styles from './DesignForge.module.css';

const phases = [
  { num: '0', name: 'Journey Planning', desc: 'Map the feature — user journeys, component inventory, and what to prioritise first.' },
  { num: '1', name: 'Sandbox Creation', desc: 'Set up the isolated build environment with mock data before writing a single line of production code.' },
  { num: '2', name: 'System Rough Build', desc: 'Build the complete rough system without production constraints. Front-load the gap discovery.' },
  { num: '3', name: 'Design Iteration', desc: 'Explore three distinct design directions freely, separate from production, before committing to one.' },
  { num: '4', name: 'Sandbox Integration', desc: 'Implement the chosen design with the full design system and token constraints applied.' },
  { num: '5', name: 'Prod Migration', desc: 'Audit frontend and backend, generate a Token Deviation Report, migrate to production.' },
];

const proofApps = [
  { name: 'Neuron', metric: '3× quiz completions, 10× question attempts' },
  { name: 'PACE', metric: 'Complete rebuild done in days instead of months' },
  { name: 'SPARK', metric: 'One day of manual build → feed a JSON' },
  { name: 'Website v3', metric: 'Ranks on previously unranked keywords' },
];

export default function DesignForge() {
  const { isFunMode } = useTheme();

  const sectionBg = isFunMode ? 'bg-fun-surface-dark' : 'bg-surface-lilac';
  const headlineColor = isFunMode ? 'text-fun-ink-50' : 'text-ink-950';
  const bodyColor = isFunMode ? 'text-fun-ink-300' : 'text-ink-700';
  const cardBg = isFunMode ? 'bg-fun-surface-black' : 'bg-surface-white';
  const cardBorder = isFunMode ? 'border-fun-ink-900' : 'border-ink-100';
  const labelColor = isFunMode ? 'text-fun-ink-500' : 'text-ink-500';

  return (
    <section id="designforge" className={`${sectionBg} ${styles.section}`}>
      <div className={styles.inner}>

        {/* ── Zone 1: Framing ── */}
        <div className={styles.framing}>
          <div className={styles.framingText}>
            {isFunMode && (
              <p className="font-caveat text-fun-accent-yellow text-xl mb-1">The Babel Protocol</p>
            )}
            <h2 className={isFunMode
              ? `font-rock-salt ${headlineColor} leading-rock-salt ${styles.h2Fun}`
              : `font-cabinet font-extrabold ${headlineColor} ${styles.h2Normal}`
            }>
              DesignForge
            </h2>
            <p className={`font-dm font-normal text-sm ${labelColor} mt-1`}>
              A 6-phase spec-to-ship AI-human methodology. Delivery time: months → weeks.
            </p>
            <p className={`font-dm font-normal text-body ${bodyColor} mt-4 leading-relaxed ${styles.lead}`}>
              Most AI-assisted builds start fast and end slow — the speed gains get eaten by rework. DesignForge is how I prevent that. A 6-phase spec-to-ship framework: gap analysis upfront, three distinct design directions per component, and a deviation rule that makes every meaningful drift from spec a formal decision. AI generates. I curate. Nothing gets delegated silently.
            </p>
          </div>
          <div className={`${styles.metricCard} ${cardBg} border ${cardBorder}`}>
            <p className={`font-dm text-xs font-extrabold uppercase tracking-widest ${labelColor} mb-2`}>
              Delivery time
            </p>
            <p className={`font-cabinet font-extrabold ${styles.metric} ${isFunMode ? 'text-fun-ink-500' : 'text-ink-500'}`}>
              1–3 months
            </p>
            <p className={`font-dm font-extrabold text-h4 ${isFunMode ? 'text-fun-accent-yellow' : 'text-accent-orange'} my-1`}>↓</p>
            <p className={`font-cabinet font-extrabold ${styles.metric} ${isFunMode ? 'text-fun-accent-yellow' : 'text-accent-green'}`}>
              1–2 weeks
            </p>
          </div>
        </div>

        {/* ── Zone 2: 6-phase diagram ── */}
        <div>
          <p className={`font-dm font-extrabold text-sm uppercase tracking-widest ${labelColor} mb-4`}>
            The 6-phase process
          </p>
          <div className={styles.phaseFlow}>
            {phases.map((phase, i) => (
              <div key={phase.num} className={styles.phaseWrap}>
                <div className={`${styles.phaseCard} ${cardBg} border ${cardBorder}`}>
                  <span className={`font-cabinet font-extrabold ${styles.phaseNum} ${isFunMode ? 'text-fun-accent-yellow' : 'text-accent-orange'}`}>
                    {phase.num}
                  </span>
                  <p className={`font-dm font-extrabold text-sm ${headlineColor} mt-1`}>
                    {phase.name}
                  </p>
                  <p className={`font-dm font-normal text-xs ${bodyColor} mt-1 leading-relaxed`}>
                    {phase.desc}
                  </p>
                </div>
                {i < phases.length - 1 && (
                  <span className={`${styles.phaseArrow} ${labelColor}`}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Zone 3: Two rules ── */}
        <div className={styles.rulesGrid}>
          <div className={`${styles.ruleCard} ${cardBg} border ${cardBorder}`}>
            <p className={`font-cabinet font-extrabold text-h3 ${isFunMode ? 'text-fun-accent-yellow' : 'text-accent-orange'} leading-none`}>
              3-option
            </p>
            <p className={`font-dm font-extrabold text-h4 ${headlineColor} mt-1`}>
              Exploration rule
            </p>
            <p className={`font-dm font-normal text-sm ${bodyColor} mt-3 leading-relaxed`}>
              Every component of any significance goes through three genuinely distinct design directions before one is chosen. Not three variations of the same direction — three different approaches. The choice is the curation. This is where designer judgment does its job.
            </p>
            <div className={styles.ruleIllustration}>
              {[1,2,3].map(n => (
                <div key={n} className={`${styles.ruleThumb} ${n === 2
                  ? (isFunMode ? 'border-fun-accent-yellow bg-fun-surface-dark' : 'border-accent-orange bg-surface-peach')
                  : (isFunMode ? 'border-fun-ink-700 bg-fun-surface-black' : 'border-ink-100 bg-surface-light')
                } border-2`}>
                  <span className={`font-dm text-xs ${isFunMode ? 'text-fun-ink-500' : 'text-ink-300'}`}>{n === 2 ? '✓' : n}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.ruleCard} ${cardBg} border ${cardBorder}`}>
            <p className={`font-cabinet font-extrabold text-h3 ${isFunMode ? 'text-fun-accent-yellow' : 'text-accent-lavender'} leading-none`}>
              ±20%
            </p>
            <p className={`font-dm font-extrabold text-h4 ${headlineColor} mt-1`}>
              Token deviation rule
            </p>
            <p className={`font-dm font-normal text-sm ${bodyColor} mt-3 leading-relaxed`}>
              When AI output diverges more than 20% from the spec's expected scope, a formal Token Deviation Report is triggered. The designer either accepts the deviation with a stated reason, or course-corrects. No change gets absorbed silently. Every meaningful departure from intent is a documented decision.
            </p>
            <div className={styles.tokenIllustration}>
              <div className={`${styles.tokenBox} ${isFunMode ? 'border-fun-ink-700 bg-fun-surface-black' : 'border-ink-100 bg-surface-light'} border`}>
                <span className={`font-dm text-xs ${isFunMode ? 'text-fun-accent-yellow' : 'text-accent-orange'}`}>token</span>
              </div>
              <div className={styles.tokenBand}>
                <div className={`${styles.bandFill} ${isFunMode ? 'bg-fun-accent-yellow' : 'bg-accent-green'}`} />
              </div>
              <span className={`font-dm text-xs ${labelColor}`}>±20%</span>
            </div>
          </div>
        </div>

        {/* ── Zone 4: Proof grid ── */}
        <div>
          <p className={`font-dm font-extrabold text-sm uppercase tracking-widest ${labelColor} mb-4`}>
            4 production apps. 6 months. Same designer, spec to shipped.
          </p>
          <div className={styles.proofGrid}>
            {proofApps.map(app => (
              <div key={app.name} className={`${styles.proofCard} ${cardBg} border ${cardBorder}`}>
                <div className={`${styles.proofThumb} ${isFunMode ? 'bg-fun-surface-dark' : 'bg-surface-light'}`} />
                <p className={`font-dm font-extrabold text-sm ${headlineColor} mt-2`}>{app.name}</p>
                <p className={`font-dm font-normal text-xs ${isFunMode ? 'text-fun-accent-yellow' : 'text-accent-green'} mt-0.5 leading-snug`}>
                  {app.metric}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
