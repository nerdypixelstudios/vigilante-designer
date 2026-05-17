import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
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
      { name: 'Lovable', level: 'expert' },
      { name: 'Unbounce', level: 'expert' },
      { name: 'Figma', level: 'expert' },
      { name: 'Adobe XD', level: 'expert' },
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
      { name: 'OpenAI Codex', level: 'expert' },
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
      { name: 'Figma', level: 'expert' },
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
      { name: 'PowerPoint', level: 'expert' },
      { name: 'Adobe Connect', level: 'expert' },
    ],
  },
];

const toolPositions = {
  Figma: { x: '15%', y: '28%' },
  'Adobe XD': { x: '15%', y: '43%', label: 'XD' },
  'Front-end engineering': { x: '11%', y: '57%' },
  Python: { x: '24%', y: '63%' },
  Selenium: { x: '34%', y: '15%' },
  SQL: { x: '43%', y: '38%' },
  'API Integration': { x: '51%', y: '49%' },
  Photoshop: { x: '38%', y: '61%' },
  'Figma AI': { x: '44%', y: '72%' },
  Replit: { x: '44%', y: '84%' },
  Lovable: { x: '49%', y: '94%' },
  'Claude Code': { x: '70%', y: '88%' },
  'Claude.ai': { x: '72%', y: '73%' },
  'OpenAI Codex': { x: '63%', y: '82%' },
  'HTML/CSS': { x: '60%', y: '17%' },
  Webflow: { x: '79%', y: '20%' },
  Unbounce: { x: '82%', y: '44%' },
  React: { x: '76%', y: '49%' },
  Illustrator: { x: '16%', y: '75%' },
  'Premiere Pro': { x: '34%', y: '75%' },
  Canva: { x: '18%', y: '86%' },
  Camtasia: { x: '29%', y: '86%' },
  'Storyline 360': { x: '88%', y: '62%' },
  'Rise 360': { x: '88%', y: '74%' },
  PowerPoint: { x: '94%', y: '80%' },
  'Adobe Connect': { x: '94%', y: '90%' },
};

const extraToolRelationships = {
  Photoshop: ['product-ux', 'marketing', 'web-dev'],
  'Figma AI': ['product-ux', 'ai-stack'],
  Lovable: ['product-ux', 'ai-stack', 'web-dev'],
  Replit: ['product-ux', 'ai-stack'],
  Figma: ['product-ux', 'web-dev', 'marketing'],
  'Adobe XD': ['product-ux', 'web-dev'],
};

const toolToneClasses = {
  'product-ux': styles.toolActiveProductUx,
  'web-dev': styles.toolActiveWebDev,
  'ai-stack': styles.toolActiveAiStack,
  marketing: styles.toolActiveMarketing,
  instructional: styles.toolActiveInstructional,
};

const toolLogos = {
  Figma: { sources: ['/images/skills/skills-figma.svg'] },
  'Adobe XD': { sources: ['/images/skills/skills-adobe-xd.svg'] },
  'Front-end engineering': { sources: ['/images/skills/skills-frontend-engineering.svg'] },
  Python: { sources: ['/images/skills/skills-python.svg'] },
  Selenium: { sources: ['/images/skills/skills-selenium.svg'] },
  SQL: { sources: ['/images/skills/skills-sql.svg'] },
  'API Integration': { sources: ['/images/skills/skills-api-integration.svg'] },
  Webflow: { sources: ['/images/skills/skills-webflow.svg'] },
  Lovable: { sources: ['/images/skills/skills-lovable.svg'] },
  Unbounce: { sources: ['/images/skills/skills-unbounce.svg'] },
  'HTML/CSS': {
    sources: [
      '/images/skills/skills-html5.svg',
      '/images/skills/skills-css3.svg',
    ],
    plateClassName: styles.toolLogoPlateDual,
    boxClassName: styles.toolLogoBoxDual,
    imageClassName: styles.toolLogoImageDual,
  },
  React: { sources: ['/images/skills/skills-react.svg'] },
  'Claude Code': { sources: ['/images/skills/skills-claude-code.svg'] },
  'Claude.ai': { sources: ['/images/skills/skills-claude-ai.svg'] },
  'Figma AI': { sources: ['/images/skills/skills-figma-ai.svg'] },
  'OpenAI Codex': { sources: ['/images/skills/skills-openai-codex.svg'] },
  Replit: { sources: ['/images/skills/skills-replit.svg'] },
  Photoshop: { sources: ['/images/skills/skills-photoshop.svg'] },
  Illustrator: { sources: ['/images/skills/skills-illustrator.svg'] },
  Canva: { sources: ['/images/skills/skills-canva.svg'] },
  'Premiere Pro': { sources: ['/images/skills/skills-premiere-pro.svg'] },
  Camtasia: { sources: ['/images/skills/skills-camtasia.png'] },
  'Storyline 360': { sources: ['/images/skills/skills-storyline-360.png'] },
  'Rise 360': { sources: ['/images/skills/skills-rise-360.png'] },
  PowerPoint: { sources: ['/images/skills/skills-microsoft-powerpoint.svg'] },
  'Adobe Connect': { sources: ['/images/skills/skills-adobe-connect.png'] },
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

function ToolLogo({ toolName }) {
  const config = toolLogos[toolName];
  if (!config) return null;

  const plateClassName = config.plateClassName || '';
  const boxClassName = config.boxClassName || '';
  const imageClassName = config.imageClassName || '';

  return (
    <span className={`${styles.toolLogoPlate} ${plateClassName}`} aria-hidden="true">
      <span className={`${styles.toolLogoBox} ${boxClassName}`}>
        {config.sources.map((src, index) => (
          <span key={`${toolName}-${src}`} className={styles.toolLogoImageWrap}>
            <Image
              src={src}
              alt=""
              fill
              unoptimized
              sizes={config.sources.length > 1 ? '14px' : '24px'}
              className={`${styles.toolLogoImage} ${imageClassName} ${index > 0 ? styles.toolLogoImageSecondary : ''}`}
            />
          </span>
        ))}
      </span>
    </span>
  );
}

// Owning cluster for each tool — used to anchor its resting pile under the
// skill circle it primarily belongs to, regardless of extra hover relationships.
const toolOwner = clusters.reduce((map, cluster) => {
  cluster.tools.forEach(t => {
    if (!map[t.name]) map[t.name] = cluster.id;
  });
  return map;
}, {});

const clusterById = clusters.reduce((map, cluster) => {
  map[cluster.id] = cluster;
  return map;
}, {});

// Exponential ease-in-out — slow start, accelerating through the middle,
// soft landing at the very end. Used for release-to-floor.
function easeInOutExpo(t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2;
}

// Back-out — accelerates through the middle and overshoots ~6% past the
// target before settling, giving the magnet arrival a subtle elastic snap.
function easeOutBack(t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const c1 = 1.2;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

const MAGNET_DUR = 0.55; // seconds, attract animation
const RELEASE_DUR = 0.75; // seconds, return-to-floor animation

// ── Magnet physics ───────────────────────────────────────────────────────────
// rAF simulator. Two modes per pill:
//   gravity  — falls/sits at a resting pile under its owning skill; mouse cursor
//              repels nearby tiles like a soft barrier.
//   magnet   — eased tween into an orbit slot around the active skill, then
//              continuous orbit.
// Mode flips snapshot current pos/time so motion always eases from where the
// pill actually is, not where it was expected to be.
function useMagnetPhysics({ containerRef, pillRefs, skillRefs, activeSkillRef, cursorRef, enabled }) {
  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return undefined;

    const pctToPx = (pct, total) => (parseFloat(pct) / 100) * total;

    const state = {};
    tools.forEach((tool, i) => {
      const r = container.getBoundingClientRect();
      const x0 = pctToPx(tool.x, r.width);
      const y0 = pctToPx(tool.y, r.height);
      state[tool.name] = {
        x: x0,
        y: y0,
        vx: 0,
        vy: 0,
        rot: 0,
        vrot: (Math.random() - 0.5) * 8,
        scale: 1,
        isMagnet: false,
        // Negative so the first frame's "release" phase has already elapsed →
        // pills go straight into free-fall gravity on enable.
        modeStartT: -10,
        modeStartX: x0,
        modeStartY: y0,
        modeStartRot: 0,
        // Small per-pill stagger so the swarm doesn't move in lockstep.
        stagger: (i % 6) * 0.025,
      };
    });

    function computeRestTargets() {
      const r = container.getBoundingClientRect();
      const groups = {};
      tools.forEach(tool => {
        const owner = toolOwner[tool.name];
        if (!owner) return;
        if (!groups[owner]) groups[owner] = [];
        groups[owner].push(tool);
      });

      const targets = {};
      Object.entries(groups).forEach(([clusterId, list]) => {
        const cluster = clusterById[clusterId];
        if (!cluster) return;
        const cx = pctToPx(cluster.x, r.width);
        const floorY = r.height - 24;
        const perRow = Math.min(3, list.length);
        const rowGap = 40;
        const colGap = 96;
        list.forEach((tool, i) => {
          const row = Math.floor(i / perRow);
          const colsInRow = Math.min(perRow, list.length - row * perRow);
          const col = i % perRow;
          const xOffset = (col - (colsInRow - 1) / 2) * colGap;
          // Clamp inside container so corner clusters don't push pills off-screen.
          const clampedCx = Math.max(60, Math.min(r.width - 60, cx + xOffset));
          targets[tool.name] = {
            x: clampedCx,
            y: floorY - row * rowGap,
          };
        });
      });
      return targets;
    }

    let targets = computeRestTargets();

    const onResize = () => {
      targets = computeRestTargets();
    };
    window.addEventListener('resize', onResize);

    let raf = 0;
    let lastT = performance.now();
    const t0 = lastT;

    function step(now) {
      const dt = Math.min(0.032, (now - lastT) / 1000);
      lastT = now;
      const nowS = now / 1000;
      const elapsed = nowS - t0 / 1000;
      const active = activeSkillRef.current;
      const cursor = cursorRef.current;

      let skillCenter = null;
      let attractedList = null;
      if (active && skillRefs.current[active]) {
        const skillEl = skillRefs.current[active];
        const skillRect = skillEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        skillCenter = {
          x: skillRect.left + skillRect.width / 2 - containerRect.left,
          y: skillRect.top + skillRect.height / 2 - containerRect.top,
          r: skillRect.width / 2,
        };
        attractedList = tools.filter(t => t.clusters.includes(active));
      }

      tools.forEach(tool => {
        const s = state[tool.name];
        const wantMagnet = Boolean(attractedList && tool.clusters.includes(active));

        if (wantMagnet !== s.isMagnet) {
          s.isMagnet = wantMagnet;
          s.modeStartT = nowS + s.stagger;
          s.modeStartX = s.x;
          s.modeStartY = s.y;
          s.modeStartRot = s.rot;
          s.vx = 0;
          s.vy = 0;
        }

        const dur = wantMagnet ? MAGNET_DUR : RELEASE_DUR;
        const progress = Math.max(0, Math.min(1, (nowS - s.modeStartT) / dur));

        if (wantMagnet) {
          const myIdx = attractedList.findIndex(t => t.name === tool.name);
          const n = attractedList.length;
          const orbitR = skillCenter.r + 38;
          const angle = (myIdx / n) * Math.PI * 2 + elapsed * 0.7;
          const tx = skillCenter.x + Math.cos(angle) * orbitR;
          const ty = skillCenter.y + Math.sin(angle) * orbitR;
          // Pill stays upright (rotation = 0) so text always reads left-to-right.
          // We lerp from snapshot rotation so transitions are smooth.
          const easedPos = easeOutBack(progress);
          const easedRot = easeInOutExpo(progress);
          // Brief scale pulse mid-flight — peaks at progress 0.5, settles to 1.
          const pulse = 1 + 0.07 * Math.sin(progress * Math.PI);

          if (progress < 1) {
            s.x = s.modeStartX + (tx - s.modeStartX) * easedPos;
            s.y = s.modeStartY + (ty - s.modeStartY) * easedPos;
            s.rot = s.modeStartRot + (0 - s.modeStartRot) * easedRot;
            s.scale = pulse;
          } else {
            s.x = tx;
            s.y = ty;
            // Damp any residual rotation toward upright so motion never drifts.
            s.rot += (0 - s.rot) * Math.min(1, 12 * dt);
            s.scale += (1 - s.scale) * Math.min(1, 12 * dt);
          }
        } else {
          const target = targets[tool.name];
          if (!target) return;

          if (progress < 1) {
            // Eased return from snapshot to floor — applies on release AND
            // on initial fall, since modeStartT is seeded in the past so this
            // branch is skipped on enable.
            const easedPos = easeInOutExpo(progress);
            s.x = s.modeStartX + (target.x - s.modeStartX) * easedPos;
            s.y = s.modeStartY + (target.y - s.modeStartY) * easedPos;
            s.rot = s.modeStartRot + (0 - s.modeStartRot) * easedPos;
            s.scale += (1 - s.scale) * Math.min(1, 10 * dt);
            s.vx = 0;
            s.vy = 0;
          } else {
            // Free physics at rest: gravity + spring to pile + cursor repulsion.
            s.vy += 1200 * dt;
            s.vx += (target.x - s.x) * 11 * dt;
            s.vy += (target.y - s.y) * 11 * dt;

            if (cursor) {
              const dx = s.x - cursor.x;
              const dy = s.y - cursor.y;
              const distSq = dx * dx + dy * dy;
              const radius = 120;
              if (distSq < radius * radius && distSq > 1) {
                const dist = Math.sqrt(distSq);
                const falloff = 1 - dist / radius;
                const push = falloff * falloff * 2400;
                s.vx += (dx / dist) * push * dt;
                s.vy += (dy / dist) * push * dt;
                s.vrot += (dx / dist) * falloff * 1.2;
              }
            }

            s.vx *= 0.84;
            s.vy *= 0.84;
            s.x += s.vx * dt;
            s.y += s.vy * dt;

            const containerH = container.getBoundingClientRect().height;
            if (s.y > containerH - 14) {
              s.y = containerH - 14;
              s.vy *= -0.22;
            }

            s.vrot *= 0.93;
            s.rot += s.vrot * dt * 60;
            if (Math.abs(s.vrot) < 0.04) s.vrot = 0;
            s.scale += (1 - s.scale) * Math.min(1, 10 * dt);
          }
        }

        const el = pillRefs.current[tool.name];
        if (el) {
          el.style.left = '0';
          el.style.top = '0';
          el.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%, -50%) rotate(${s.rot}deg) scale(${s.scale})`;
        }
      });

      // Skill wobble while pulling.
      clusters.forEach(cluster => {
        const el = skillRefs.current[cluster.id];
        if (!el) return;
        let dx = 0;
        let dy = 0;
        if (cluster.id === active) {
          dx = Math.sin(elapsed * 6.5) * 4;
          dy = Math.cos(elapsed * 5.7) * 3;
        }
        el.style.setProperty('--wobble-x', `${dx}px`);
        el.style.setProperty('--wobble-y', `${dy}px`);
      });

      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      tools.forEach(tool => {
        const el = pillRefs.current[tool.name];
        if (el) {
          el.style.left = '';
          el.style.top = '';
          el.style.transform = '';
        }
      });
      clusters.forEach(cluster => {
        const el = skillRefs.current[cluster.id];
        if (!el) return;
        el.style.removeProperty('--wobble-x');
        el.style.removeProperty('--wobble-y');
      });
    };
  }, [enabled, containerRef, pillRefs, skillRefs, activeSkillRef]);
}

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

const ToolPill = function ToolPill({ tool, activeSkill, pillRef }) {
  const isActive = Boolean(activeSkill && tool.clusters.includes(activeSkill));
  const isDimmed = Boolean(activeSkill && !isActive);
  const activeClass = isActive ? toolToneClasses[activeSkill] : '';
  const label = tool.label || tool.name;
  const displayName = `${label}${tool.level === 'learning' ? '*' : ''}`;

  return (
    <button
      ref={pillRef}
      type="button"
      className={`${styles.toolPill} ${activeClass} ${isActive ? styles.toolPillActive : ''} ${isDimmed ? styles.toolPillDimmed : ''}`}
      style={{ '--tool-x': tool.x, '--tool-y': tool.y }}
      aria-label={`${label}, ${tool.level === 'expert' ? 'expert' : 'learning'}`}
    >
      <ToolLogo toolName={tool.name} />
      <span className={styles.toolName}>{displayName}</span>
    </button>
  );
};

function MindMap() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [physicsOn, setPhysicsOn] = useState(false);

  const containerRef = useRef(null);
  const pillRefs = useRef({});
  const skillRefs = useRef({});
  const activeSkillRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    activeSkillRef.current = activeSkill;
  }, [activeSkill]);

  // Enable physics only on desktop, with motion allowed, once section is in view.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (reducedMotion || !isDesktop) return undefined;

    const el = containerRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setPhysicsOn(true);
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useMagnetPhysics({ containerRef, pillRefs, skillRefs, activeSkillRef, cursorRef, enabled: physicsOn });

  const handleSkillEnter = (id) => {
    setActiveSkill(id);
  };

  const handleMouseMove = (e) => {
    if (!physicsOn || !containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    cursorRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const handleMouseLeave = () => {
    setActiveSkill(null);
    cursorRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.mindMap} ${activeSkill ? styles.mindMapActive : ''} ${physicsOn ? styles.mindMapPhysics : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.skillLayer} aria-label="Skill categories">
        {clusters.map(cluster => {
          const isActive = activeSkill === cluster.id;
          const isDimmed = Boolean(activeSkill && !isActive);

          return (
            <button
              key={cluster.id}
              ref={el => { skillRefs.current[cluster.id] = el; }}
              type="button"
              className={`${styles.clusterBubble} ${styles[cluster.tone]} ${styles[cluster.size]} ${isActive ? styles.clusterBubbleActive : ''} ${isDimmed ? styles.clusterBubbleDimmed : ''}`}
              style={{ '--skill-x': cluster.x, '--skill-y': cluster.y }}
              onMouseEnter={() => handleSkillEnter(cluster.id)}
              onFocus={() => handleSkillEnter(cluster.id)}
              onClick={() => handleSkillEnter(cluster.id)}
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
            pillRef={el => { pillRefs.current[tool.name] = el; }}
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
                <ToolLogo toolName={tool.name} />
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
                The Full <span className={styles.scriptKeyword}>Toolkit!</span>
              </h2>
              <p className={`font-dm text-body text-ink-700 ${styles.headlineDesc}`}>
                Five disciplines I work across, and the kit that earns its place under each. Hover a circle — the rest will follow.
              </p>
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
