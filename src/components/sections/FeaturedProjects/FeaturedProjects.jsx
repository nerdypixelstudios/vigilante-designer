import Link from 'next/link';
import { useTheme } from '../../shared/ThemeContext';
import { PaperPlane, PlayIcon } from '../../icons/icons';
import styles from './FeaturedProjects.module.css';

const projects = [
  {
    id: 'neuron',
    slug: 'neuron',
    name: 'Neuron',
    funName: 'Neuron (aka The Practice Grinder)',
    tags: ['Web App', 'UI/UX Design'],
    summary: 'Scholaranium had driven enrollment for five years — but it was built for a different era. Students got results without guidance: quiz complete, score shown, next step unknown. Neuron rethought the interaction model. A fresh user sees a guided dashboard, not an empty one. After every quiz, the next step surfaces automatically. Result: 3× quiz completions, 10× question attempts on the same platform and same student base.',
    funSticker: '10× attempts. No excuses.',
    borderColor: 'border-accent-orange',
    funBorderColor: 'border-fun-accent-red',
  },
  {
    id: 'designforge',
    slug: 'designforge',
    name: 'DesignForge Methodology',
    funName: 'DesignForge Methodology (aka The Blueprint Vault)',
    tags: ['AI Methodology', 'Process Design'],
    summary: 'AI tools are fast. They also drift. Without a methodology holding the output accountable, an AI-assisted build produces fast output that doesn\'t cohere — and the speed gains get eaten by rework. DesignForge is the 6-phase spec-to-ship framework that prevents that. Build time: months → weeks.',
    funSticker: 'Built the playbook. Used it.',
    borderColor: 'border-accent-green',
    funBorderColor: 'border-fun-accent-forest',
  },
  {
    id: 'spark',
    slug: 'third-project',
    name: 'SPARK',
    funName: 'SPARK (aka The Content Cannon)',
    tags: ['Web App', 'Content System'],
    summary: 'The SAT content team had a bottleneck: converting learning material into presentable, interactive modules required engineering support. One module: one day of build time. SPARK eliminated that permanently. A JSON-driven content system — feed a structured file, the presenter handles the rest. No manual build. No engineering cycle.',
    funSticker: 'One JSON. Infinite modules.',
    borderColor: 'border-accent-sky',
    funBorderColor: 'border-fun-accent-blue',
  },
  {
    id: 'website-v3',
    slug: 'third-project',
    name: 'Website v3',
    funName: 'Website v3 (aka The Public Front)',
    tags: ['Web Design', 'End-to-End Ownership'],
    summary: 'The public website redesign — full ownership of design, content, and development in collaboration with the CMO and CTO. Not a handoff: one person owned all three surfaces and shipped them together. The new site ranks on keywords it had never ranked on before, holds visitors longer, and moves more of them deeper into the product.',
    funSticker: 'Designed it. Wrote it. Shipped it.',
    borderColor: 'border-accent-lavender',
    funBorderColor: 'border-fun-accent-pink',
  },
];

function ProjectCard({ project, isFunMode }) {
  const headlineColor = isFunMode ? 'text-fun-ink-50' : 'text-ink-950';
  const bodyColor = isFunMode ? 'text-fun-ink-300' : 'text-ink-700';
  const cardBg = isFunMode ? 'bg-fun-surface-black' : 'bg-surface-white';
  const tagBg = isFunMode ? 'bg-fun-surface-dark text-fun-ink-100' : 'bg-surface-light text-ink-700';
  const linkColor = isFunMode ? 'text-fun-accent-yellow' : 'text-accent-orange';
  const borderColor = isFunMode ? project.funBorderColor : project.borderColor;

  return (
    <div className={`${styles.card} ${cardBg} border-2 ${borderColor}`}>
      <div className={`${styles.cardMedia} ${isFunMode ? 'bg-fun-surface-dark' : 'bg-surface-light'}`}>
        <div className={styles.mediaFrame} />
        <PlayIcon className={styles.playIcon} />
        {isFunMode && (
          <span className={`${styles.funSticker} font-caveat font-bold text-fun-ink-50`}>
            {project.funSticker}
          </span>
        )}
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.tagRow}>
          {project.tags.map(tag => (
            <span key={tag} className={`${styles.tag} ${tagBg} font-dm text-xs font-extrabold`}>
              {tag}
            </span>
          ))}
        </div>
        <h3 className={isFunMode
          ? `font-caveat font-bold text-fun-h4 ${headlineColor} mt-3`
          : `font-dm font-extrabold text-h4 ${headlineColor} mt-3`
        }>
          {isFunMode ? project.funName : project.name}
        </h3>
        <p className={`font-dm font-normal text-sm ${bodyColor} mt-3 leading-relaxed`}>
          {project.summary}
        </p>
        <Link
          href={`/case-studies/${project.slug}`}
          className={`${styles.viewLink} ${linkColor} font-dm font-extrabold text-sm mt-4 inline-flex items-center gap-1 hover:underline`}
        >
          View in detail →
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const { isFunMode } = useTheme();
  const headlineColor = isFunMode ? 'text-fun-ink-50' : 'text-ink-950';

  return (
    <section id="featured-projects" className={`${isFunMode ? 'bg-fun-surface-dark' : 'bg-surface-white'} ${styles.section}`}>
      <div className={styles.inner}>

        <div className={styles.headline}>
          <p className={`font-caveat font-bold ${isFunMode ? 'text-fun-accent-yellow' : 'text-fun-accent-red'} text-xl`}>
            {isFunMode ? "The vigilante's best work." : 'Designs with purpose!'}
          </p>
          <div className={styles.headlineLine}>
            <h2 className={isFunMode
              ? `font-rock-salt ${headlineColor} leading-rock-salt ${styles.h2Fun}`
              : `font-cabinet font-extrabold ${headlineColor} ${styles.h2Normal}`
            }>
              {isFunMode ? 'Missions Completed!!' : 'Work That Speaks!!'}
            </h2>
            <PaperPlane className={styles.paperPlane} />
          </div>
        </div>

        <div className={styles.grid}>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} isFunMode={isFunMode} />
          ))}
        </div>

      </div>
    </section>
  );
}
