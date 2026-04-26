import { useState } from 'react';
import { useTheme } from '../../shared/ThemeContext';
import { LightningIcon, BulbIcon } from '../../icons/icons';
import arcData from '../../../content/skills-arcs.json';
import styles from './Skills.module.css';

// ── Normal mode clusters ──────────────────────────────────────────────────────

const clusters = [
  {
    id: 'product-ux',
    label: 'Product &\nUX/UI Design',
    color: 'bg-accent-lavender',
    textColor: 'text-ink-950',
    tools: [
      { name: 'Figma', level: 'expert' },
      { name: 'Adobe XD', level: 'expert' },
    ],
  },
  {
    id: 'web-dev',
    label: 'Web Design &\nDevelopment',
    color: 'bg-accent-orange',
    textColor: 'text-fun-ink-50',
    tools: [
      { name: 'Webflow', level: 'expert' },
      { name: 'Framer', level: 'expert' },
      { name: 'HTML/CSS', level: 'expert' },
      { name: 'React', level: 'learning' },
    ],
  },
  {
    id: 'ai-stack',
    label: 'AI Stack',
    color: 'bg-fun-accent-red',
    textColor: 'text-fun-ink-50',
    tools: [
      { name: 'Claude Code', level: 'expert' },
      { name: 'Claude.ai', level: 'expert' },
      { name: 'Figma AI', level: 'expert' },
      { name: 'Lovable', level: 'learning' },
      { name: 'Replit', level: 'learning' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing &\nBranding',
    color: 'bg-accent-green',
    textColor: 'text-ink-950',
    tools: [
      { name: 'Photoshop', level: 'expert' },
      { name: 'Illustrator', level: 'expert' },
      { name: 'Canva', level: 'expert' },
      { name: 'Premiere Pro', level: 'learning' },
      { name: 'Camtasia', level: 'expert' },
    ],
  },
  {
    id: 'instructional',
    label: 'Instructional\nDesign',
    color: 'bg-accent-sky',
    textColor: 'text-ink-950',
    tools: [
      { name: 'Storyline 360', level: 'expert' },
      { name: 'Rise 360', level: 'expert' },
    ],
  },
  {
    id: 'technical',
    label: 'Technical',
    color: 'bg-ink-300',
    textColor: 'text-ink-950',
    tools: [
      { name: 'Python + Selenium', level: 'expert' },
      { name: 'Prompt Engineering', level: 'expert' },
      { name: 'SQL', level: 'learning' },
      { name: 'API Integration', level: 'learning' },
    ],
  },
];

// ── Fun mode hats ─────────────────────────────────────────────────────────────

const hats = [
  {
    id: 'instructional-ops',
    label: 'Instructional Ops',
    role: 'Instructional Designer, 2018–2019',
    priority: 'lower',
    opener: 'Where I stopped presenting information — and started engineering how it\'s absorbed.',
    desc: 'e-GMAT\'s Quant content was strong. The SMEs had written everything students needed. What was missing was the experience of doing it rather than reading it. I converted dense prose into visual learning flows, built interactive mini-apps inside Articulate Storyline for concepts students had to practise — not just read — and taught myself JavaScript to push the tool beyond what it was designed to do. Course completions went from below 80% to 90+%.',
  },
  {
    id: 'visual-arsonist',
    label: 'Visual Arsonist',
    role: 'Marketing Designer, 2019–2020',
    priority: 'lower',
    opener: 'Where I burned down the old marketing workflow — and replaced it with one I built myself.',
    desc: 'Every piece of customer-facing output passed through me: social ads, newsletters, video, landing pages. When Photoshop→dev→QA for a landing page took too long, I found Unbounce. When Unbounce hit its limits, I moved to Webflow. 10–12 landing pages total became 150+. The brand guidelines I wrote here defined every visual the company produced for years after.',
  },
  {
    id: 'interface-oracle',
    label: 'Interface Oracle',
    role: 'UI/UX Designer, 2020–2022',
    priority: 'normal',
    opener: 'Where I stopped waiting for engineering to make things real — and started making them real myself.',
    desc: 'No external agency. No existing template. The first in-house web apps at e-GMAT — Personalised Study Planner, SIGma-X mock test platform, Scholaranium revamp — each more complex than anything the company had built internally before. Scholaranium shipped 5× more complex than previous apps, in half the time. It is still the primary enrollment driver — five years later.',
  },
  {
    id: 'command-tower',
    label: 'Command Tower',
    role: 'Head of Design, 2022–2024',
    priority: 'normal',
    opener: 'Where I stopped being the person who designed — and became the person who built the system that designed.',
    desc: 'Built the design team from scratch: three designers trained from complete beginners, processes and standards that let three people produce what previously needed eight. Then ChatGPT arrived. Built the Prism feedback system\'s entire frontend in Replit, without a single engineering cycle. By the end of this chapter, every person on the team owned the full loop: research, design, build, ship.',
  },
  {
    id: 'the-architect',
    label: 'The Architect',
    role: 'AI-Enabled Product Designer, 2024–present',
    priority: 'featured',
    opener: 'Where I stopped waiting for anyone — and started shipping the whole thing myself.',
    desc: 'Four production apps in six months. Designed, built, and shipped end to end — Claude Code and Figma as the daily stack, no handoff at any stage. Built DesignForge to keep the AI output accountable: gap analysis before a line of code is written, three design directions before one is chosen, a ±20% deviation rule so nothing gets absorbed silently. The AI does the fast work. I do the right work. Build time: months → weeks.',
  },
];

// ── Arc expansion sub-components ─────────────────────────────────────────────

function ArcExpansion({ hatId, isFunMode, onClose }) {
  const arc = arcData[hatId];
  if (!arc) return null;

  const bodyColor = isFunMode ? 'text-fun-ink-100' : 'text-ink-700';
  const headingColor = isFunMode ? 'text-fun-ink-50' : 'text-ink-950';
  const chipBg = isFunMode ? 'bg-fun-surface-black border-fun-ink-700 text-fun-ink-100' : 'bg-surface-light border-ink-100 text-ink-700';

  return (
    <div className={`${styles.arcExpansion} ${isFunMode ? 'bg-fun-surface-black border-fun-ink-700' : 'bg-surface-white border-ink-100'} border-t-2`}>

      {/* Defining pull-quote */}
      <p className={`font-caveat font-bold text-fun-h3 ${isFunMode ? 'text-fun-accent-yellow' : 'text-accent-orange'} italic leading-snug ${styles.arcPullQuote}`}>
        "{arc.pullQuote}"
      </p>

      {/* Sub-sections */}
      <div className={styles.arcSections}>
        {arc.sections.map((section, i) => (
          <div key={i} className={styles.arcSection}>
            <h4 className={`font-cabinet font-extrabold text-h4 ${headingColor}`}>
              {section.heading}
            </h4>
            <p className={`font-caveat font-bold text-xl ${isFunMode ? 'text-fun-accent-yellow' : 'text-accent-orange'} italic mt-1`}>
              {section.sectionPullQuote}
            </p>
            <p
              className={`font-dm font-normal text-sm ${bodyColor} mt-3 leading-relaxed ${styles.arcBody}`}
              dangerouslySetInnerHTML={{ __html: section.body.replace(/\n\n/g, '<br/><br/>') }}
            />
          </div>
        ))}
      </div>

      {/* Tools panel */}
      <div className={styles.arcPanel}>
        <p className={`font-dm font-extrabold text-xs uppercase tracking-widest ${isFunMode ? 'text-fun-ink-500' : 'text-ink-500'} mb-3`}>
          What made it possible
        </p>
        <div className={styles.chipRow}>
          {arc.tools.map(tool => (
            <span key={tool} className={`${styles.chip} ${chipBg} font-dm text-xs font-extrabold border`}>
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Projects panel */}
      <div className={styles.arcPanel}>
        <p className={`font-dm font-extrabold text-xs uppercase tracking-widest ${isFunMode ? 'text-fun-ink-500' : 'text-ink-500'} mb-3`}>
          Named outputs
        </p>
        <div className={styles.chipRow}>
          {arc.projects.map(proj => (
            <span key={proj} className={`${styles.chip} ${chipBg} font-dm text-xs font-extrabold border`}>
              {proj}
            </span>
          ))}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className={`${styles.closeBtn} ${isFunMode ? 'border-fun-ink-700 text-fun-ink-300 hover:text-fun-ink-50' : 'border-ink-100 text-ink-500 hover:text-ink-950'} border font-dm font-extrabold text-sm`}
      >
        Close ×
      </button>
    </div>
  );
}

// ── MindMap (normal mode) ─────────────────────────────────────────────────────

function ToolPill({ name, level }) {
  return (
    <div className={styles.toolPill}>
      <div className={`${styles.toolDot} ${level === 'expert' ? 'bg-accent-orange' : 'bg-accent-sky'}`} />
      <span className="font-dm text-sm text-ink-800 font-normal">{name}</span>
      {level === 'expert' ? <LightningIcon /> : <BulbIcon />}
    </div>
  );
}

function MindMap() {
  return (
    <div className={styles.mindMap}>
      {clusters.map(cluster => (
        <div key={cluster.id} className={styles.clusterGroup}>
          <div className={`${styles.clusterBubble} ${cluster.color}`}>
            <span className={`font-dm font-extrabold text-xs ${cluster.textColor} text-center`}
              style={{ whiteSpace: 'pre-line' }}>
              {cluster.label}
            </span>
          </div>
          <div className={styles.toolPills}>
            {cluster.tools.map(tool => (
              <ToolPill key={tool.name} name={tool.name} level={tool.level} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── HatSelector (fun mode) ────────────────────────────────────────────────────

function HatSelector({ isFunMode }) {
  const [activeHat, setActiveHat] = useState('the-architect');
  const [expandedArc, setExpandedArc] = useState(null);
  const active = hats.find(h => h.id === activeHat);

  function handleHatClick(hatId) {
    setActiveHat(hatId);
    setExpandedArc(null);
  }

  return (
    <>
      <div className={styles.hatSelector}>
        {/* Left: hat list */}
        <ul className={styles.hatList}>
          {hats.map(hat => (
            <li key={hat.id}>
              <button
                className={`${styles.hatItem} ${activeHat === hat.id ? styles.hatItemActive : styles.hatItemInactive}`}
                onClick={() => handleHatClick(hat.id)}
              >
                <span className={`font-caveat font-bold text-fun-h4 ${activeHat === hat.id ? 'text-fun-accent-yellow' : 'text-fun-ink-300'} ${hat.priority === 'lower' ? 'opacity-60' : ''}`}>
                  {hat.label}
                </span>
                <span className={`font-caveat text-base ${activeHat === hat.id ? 'text-fun-ink-300' : 'text-fun-ink-500'} ${hat.priority === 'lower' ? 'opacity-60' : ''} block`}>
                  {hat.role}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Centre: character placeholder */}
        <div className={styles.hatCharacter}>
          <div className={styles.sprayGlowFun} />
          <div className={styles.characterPlaceholder}>
            <span className="font-caveat text-fun-ink-500 text-sm">Character</span>
            <span className={`font-caveat font-bold text-fun-accent-yellow text-base mt-1 text-center px-2`}>{active.label}</span>
          </div>
        </div>

        {/* Right: description */}
        <div className={styles.hatDesc}>
          <p className="font-caveat text-fun-accent-yellow text-lg italic mb-2">{active.role}</p>
          <p className="font-dm font-extrabold text-h4 text-fun-ink-50 leading-snug">
            {active.opener}
          </p>
          <p className="font-dm font-normal text-body text-fun-ink-300 mt-4 leading-relaxed">
            {active.desc}
          </p>
          <button
            onClick={() => setExpandedArc(expandedArc === activeHat ? null : activeHat)}
            className="font-dm font-extrabold text-sm text-fun-accent-yellow mt-5 inline-block hover:underline"
          >
            {expandedArc === activeHat ? 'Close arc ×' : 'Read full arc →'}
          </button>
        </div>
      </div>

      {/* Arc expansion */}
      {expandedArc === activeHat && (
        <ArcExpansion
          hatId={activeHat}
          isFunMode={isFunMode}
          onClose={() => setExpandedArc(null)}
        />
      )}
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Skills() {
  const { isFunMode } = useTheme();

  const sectionBg = isFunMode ? 'bg-fun-surface-black' : 'bg-surface-white';
  const headlineColor = isFunMode ? 'text-fun-ink-50' : 'text-ink-950';

  return (
    <section id="skills" className={`${sectionBg} ${styles.section}`}>
      <div className={styles.inner}>

        {/* ── Section headline ── */}
        <div className={styles.headline}>
          {isFunMode ? (
            <>
              <p className="font-caveat text-fun-accent-yellow text-xl mb-1">Every hat — An arc</p>
              <h2 className={`font-rock-salt ${headlineColor} leading-rock-salt ${styles.h2Fun}`}>
                Various Hats I Donned!
              </h2>
            </>
          ) : (
            <>
              <p className="font-caveat font-bold text-fun-accent-red text-xl mb-1">
                Precision and Creativity
              </p>
              <h2 className={`font-cabinet font-extrabold ${headlineColor} ${styles.h2Normal}`}>
                Skills that I bring to table
              </h2>
            </>
          )}
        </div>

        {isFunMode ? <HatSelector isFunMode={isFunMode} /> : <MindMap />}

        {/* Legend — normal mode only */}
        {!isFunMode && (
          <div className={styles.legend}>
            <span className="font-dm text-xs text-ink-500">*Logos are properties of respective companies</span>
            <div className={styles.legendKeys}>
              <span className="font-dm text-xs text-ink-500 flex items-center gap-1">
                <LightningIcon /> Expert
              </span>
              <span className="font-dm text-xs text-ink-500 flex items-center gap-1">
                <BulbIcon /> Learning
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
