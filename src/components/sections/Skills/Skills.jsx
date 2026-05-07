import { useState } from 'react';
import { useTheme } from '../../shared/ThemeContext';
import arcData from '../../../content/skills-arcs.json';
import styles from './Skills.module.css';

// ── Normal mode clusters ──────────────────────────────────────────────────────

const clusters = [
  {
    id: 'product-ux',
    label: 'Product &\nUX/UI Design',
    tone: 'productUx',
    size: 'hero',
    x: '29%',
    y: '38%',
    tools: [
      { name: 'Figma', level: 'expert' },
      { name: 'Adobe XD', level: 'expert' },
      { name: 'Front-end engineering', level: 'expert' },
      { name: 'Python', level: 'expert' },
      { name: 'Selenium', level: 'expert' },
      { name: 'Product development', level: 'expert' },
      { name: 'SQL', level: 'learning' },
      { name: 'API Integration', level: 'learning' },
    ],
  },
  {
    id: 'web-dev',
    label: 'Web Design &\nDevelopment',
    tone: 'webDev',
    size: 'medium',
    x: '68%',
    y: '33%',
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
    tone: 'aiStack',
    size: 'large',
    x: '56%',
    y: '72%',
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
    tone: 'marketing',
    size: 'small',
    x: '24%',
    y: '76%',
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
    tone: 'instructional',
    size: 'tiny',
    x: '82%',
    y: '73%',
    tools: [
      { name: 'Storyline 360', level: 'expert' },
      { name: 'Rise 360', level: 'expert' },
    ],
  },
];

const toolPositions = {
  Figma: { x: '15%', y: '28%' },
  'Adobe XD': { x: '15%', y: '43%', label: 'XD' },
  'Front-end engineering': { x: '11%', y: '57%' },
  Python: { x: '24%', y: '63%' },
  Selenium: { x: '34%', y: '15%' },
  'Product development': { x: '51%', y: '26%' },
  SQL: { x: '43%', y: '38%' },
  'API Integration': { x: '51%', y: '49%' },
  Photoshop: { x: '38%', y: '61%' },
  'Figma AI': { x: '44%', y: '72%' },
  Replit: { x: '44%', y: '84%' },
  Lovable: { x: '49%', y: '94%' },
  'Claude Code': { x: '70%', y: '88%' },
  'Claude.ai': { x: '72%', y: '73%' },
  'HTML/CSS': { x: '60%', y: '17%' },
  Webflow: { x: '79%', y: '20%' },
  Framer: { x: '80%', y: '35%' },
  React: { x: '76%', y: '49%' },
  Illustrator: { x: '16%', y: '75%' },
  'Premiere Pro': { x: '34%', y: '75%' },
  Canva: { x: '18%', y: '86%' },
  Camtasia: { x: '29%', y: '86%' },
  'Storyline 360': { x: '88%', y: '62%' },
  'Rise 360': { x: '88%', y: '85%' },
};

const extraToolRelationships = {
  Photoshop: ['product-ux', 'marketing', 'web-dev'],
  'Figma AI': ['product-ux', 'ai-stack'],
  Lovable: ['product-ux', 'ai-stack'],
  Replit: ['product-ux', 'ai-stack'],
};

const toolToneClasses = {
  'product-ux': styles.toolActiveProductUx,
  'web-dev': styles.toolActiveWebDev,
  'ai-stack': styles.toolActiveAiStack,
  marketing: styles.toolActiveMarketing,
  instructional: styles.toolActiveInstructional,
};

const uniqueTools = clusters.reduce((tools, cluster) => {
  cluster.tools.forEach(tool => {
    if (!tools[tool.name]) {
      tools[tool.name] = {
        ...tool,
        clusters: [],
      };
    }

    tools[tool.name].clusters.push(cluster.id);

    if (tool.level === 'expert') {
      tools[tool.name].level = 'expert';
    }
  });

  return tools;
}, {});

Object.entries(extraToolRelationships).forEach(([toolName, clusterIds]) => {
  if (!uniqueTools[toolName]) return;

  uniqueTools[toolName].clusters = [
    ...clusterIds,
    ...uniqueTools[toolName].clusters.filter(clusterId => !clusterIds.includes(clusterId)),
  ];
});

const tools = Object.entries(uniqueTools).map(([name, tool]) => ({
  name,
  ...tool,
  ...(toolPositions[name] || {}),
}));

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

function ToolPill({ tool, activeSkill }) {
  const isActive = Boolean(activeSkill && tool.clusters.includes(activeSkill));
  const isDimmed = Boolean(activeSkill && !isActive);
  const activeClass = isActive ? toolToneClasses[activeSkill] : '';
  const label = tool.label || tool.name;
  const displayName = `${label}${tool.level === 'learning' ? '*' : ''}`;

  return (
    <button
      type="button"
      className={`${styles.toolPill} ${activeClass} ${isActive ? styles.toolPillActive : ''} ${isDimmed ? styles.toolPillDimmed : ''}`}
      style={{ '--tool-x': tool.x, '--tool-y': tool.y }}
      aria-label={`${label}, ${tool.level === 'expert' ? 'expert' : 'learning'}`}
    >
      <span className={styles.toolName}>{displayName}</span>
    </button>
  );
}

function MindMap() {
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <div
      className={`${styles.mindMap} ${activeSkill ? styles.mindMapActive : ''}`}
      onMouseLeave={() => setActiveSkill(null)}
    >
      <div className={styles.skillLayer} aria-label="Skill categories">
        {clusters.map(cluster => {
          const isActive = activeSkill === cluster.id;
          const isDimmed = Boolean(activeSkill && !isActive);

          return (
            <button
              key={cluster.id}
              type="button"
              className={`${styles.clusterBubble} ${styles[cluster.tone]} ${styles[cluster.size]} ${isActive ? styles.clusterBubbleActive : ''} ${isDimmed ? styles.clusterBubbleDimmed : ''}`}
              style={{ '--skill-x': cluster.x, '--skill-y': cluster.y }}
              onMouseEnter={() => setActiveSkill(cluster.id)}
              onFocus={() => setActiveSkill(cluster.id)}
              onClick={() => setActiveSkill(cluster.id)}
              aria-pressed={isActive}
            >
              <span className={styles.clusterLabel}>
                {cluster.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.toolLayer} aria-label="Tools">
        {tools.map(tool => (
          <ToolPill
            key={tool.name}
            tool={tool}
            activeSkill={activeSkill}
          />
        ))}
      </div>

      <div className={styles.mobileClusterStack}>
      {clusters.map(cluster => (
        <article key={cluster.id} className={styles.mobileClusterCard}>
          <div className={`${styles.mobileClusterBubble} ${styles[cluster.tone]}`}>
            <span className={styles.mobileClusterLabel}>
              {cluster.label}
            </span>
          </div>
          <div className={styles.mobileToolList}>
            {cluster.tools.map(tool => (
              <span key={tool.name} className={styles.mobileToolPill}>
                <span>{toolPositions[tool.name]?.label || tool.name}{tool.level === 'learning' ? '*' : ''}</span>
              </span>
            ))}
          </div>
        </article>
      ))}
      </div>
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
    <section id="skills" className={`${sectionBg} ${styles.section} ${!isFunMode ? styles.normalSection : ''}`}>
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
                The Full Toolkit!
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
                * Learning
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
