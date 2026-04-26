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
    summary: 'Rethought the interaction model: guided dashboard from day one, next step after every quiz surfaced automatically. Result: 3× quiz completions, 10× question attempts.',
    funSticker: '10× attempts. No excuses.',
  },
  {
    id: 'designforge',
    slug: 'designforge',
    name: 'DesignForge Methodology',
    funName: 'DesignForge Methodology (aka The Blueprint Vault)',
    tags: ['AI Methodology', 'Process Design'],
    summary: 'The 6-phase spec-to-ship framework that keeps AI output from drifting. AI generates. I curate. Build time: months → weeks.',
    funSticker: 'Built the playbook. Used it.',
  },
  {
    id: 'spark',
    slug: 'third-project',
    name: 'SPARK',
    funName: 'SPARK (aka The Content Cannon)',
    tags: ['Web App', 'Content System'],
    summary: 'A JSON-driven content system — feed a structured file, the presenter handles the rest. Cut one module build from one day to zero engineering cycles.',
    funSticker: 'One JSON. Infinite modules.',
  },
  {
    id: 'website-v3',
    slug: 'third-project',
    name: 'Website v3',
    funName: 'Website v3 (aka The Public Front)',
    tags: ['Web Design', 'End-to-End Ownership'],
    summary: 'One person owned design, content, and code — no handoff. The redesigned site ranks on keywords it had never ranked on before and holds visitors deeper into the product.',
    funSticker: 'Designed it. Wrote it. Shipped it.',
  },
];

function ProjectCard({ project, isFunMode }) {
  const headlineColor = isFunMode ? 'text-fun-ink-50' : 'text-ink-950';
  const bodyColor = isFunMode ? 'text-fun-ink-300' : 'text-ink-700';
  const cardBg = isFunMode ? 'bg-fun-surface-dark' : 'bg-surface-white';
  const tagBg = isFunMode ? 'bg-fun-surface-black text-fun-ink-100' : 'bg-surface-light text-ink-700';
  const linkColor = isFunMode ? 'text-fun-accent-yellow' : 'text-accent-orange';
  const mediaBg = isFunMode ? 'bg-fun-surface-black' : 'bg-ink-100';

  return (
    <div className={`${styles.card} ${cardBg}`}>
      <div className={`${styles.cardMedia} ${mediaBg}`}>
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
    <section id="featured-projects" className={`${isFunMode ? 'bg-fun-surface-dark' : 'bg-surface-light'} ${styles.section}`}>
      <div className={styles.inner}>

        <div className={styles.headline}>
          <p className={`font-caveat font-bold ${isFunMode ? 'text-fun-accent-yellow' : 'text-fun-accent-red'} text-xl`}>
            {isFunMode ? "The vigilante's best work." : 'Shipped. Not just designed.'}
          </p>
          <div className={styles.headlineLine}>
            <h2 className={isFunMode
              ? `font-rock-salt ${headlineColor} leading-rock-salt ${styles.h2Fun}`
              : `font-cabinet font-extrabold ${headlineColor} ${styles.h2Normal}`
            }>
              {isFunMode ? 'Missions Completed!' : 'Work That Speaks!'}
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
