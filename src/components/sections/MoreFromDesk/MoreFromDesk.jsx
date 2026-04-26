import { useTheme } from '../../shared/ThemeContext';
import styles from './MoreFromDesk.module.css';

const categories = [
  {
    id: 'product-design',
    label: 'Product Design',
    funLabel: 'Product Design',
    funAnnotation: '(aka: The Field Lab)',
    desc: 'End-to-end web apps — from first user journey to production.',
    thumbCount: 4,
    accentBg: 'bg-surface-lilac',
    funAccentBg: 'bg-fun-surface-dark',
    borderColor: 'border-accent-lavender',
    funBorderColor: 'border-fun-accent-pink',
    priority: 'high',
  },
  {
    id: 'web-ai-build',
    label: 'Web & AI Build',
    funLabel: 'Web & AI Build',
    funAnnotation: '(aka: The Launch Pad)',
    desc: 'Landing pages, marketing sites, and AI-assisted builds — volume at quality.',
    thumbCount: 4,
    accentBg: 'bg-surface-peach',
    funAccentBg: 'bg-fun-surface-dark',
    borderColor: 'border-accent-orange',
    funBorderColor: 'border-fun-accent-red',
    priority: 'high',
  },
  {
    id: 'instructional-branding',
    label: 'Instructional & Branding',
    funLabel: 'Instructional & Branding',
    funAnnotation: '(aka: The Signal Corps)',
    desc: 'Learning systems, visual identity, and content that teaches.',
    thumbCount: 3,
    accentBg: 'bg-surface-mint',
    funAccentBg: 'bg-fun-surface-dark',
    borderColor: 'border-accent-green',
    funBorderColor: 'border-fun-accent-forest',
    priority: 'lower',
  },
];

function ThumbGrid({ count, isFunMode }) {
  const thumbBg = isFunMode ? 'bg-fun-surface-black border-fun-ink-900' : 'bg-surface-white border-ink-100';
  return (
    <div className={`${styles.thumbGrid} ${count === 3 ? styles.thumbGrid3 : styles.thumbGrid4}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${styles.thumb} ${thumbBg} border`} />
      ))}
    </div>
  );
}

export default function MoreFromDesk() {
  const { isFunMode } = useTheme();

  const sectionBg = isFunMode ? 'bg-fun-surface-black' : 'bg-surface-light';
  const headlineColor = isFunMode ? 'text-fun-ink-50' : 'text-ink-950';
  const descColor = isFunMode ? 'text-fun-ink-300' : 'text-ink-500';
  const linkColor = isFunMode ? 'text-fun-accent-yellow' : 'text-accent-orange';

  return (
    <section id="more-from-desk" className={`${sectionBg} ${styles.section}`}>
      <div className={styles.inner}>

        <div className={styles.headline}>
          <h2 className={isFunMode
            ? `font-rock-salt ${headlineColor} leading-rock-salt ${styles.h2Fun}`
            : `font-cabinet font-extrabold ${headlineColor} ${styles.h2Normal}`
          }>
            {isFunMode ? 'The Full Dossier!' : 'More from the Desk!'}
          </h2>
          <p className={`font-dm font-normal ${descColor} text-body mt-2`}>
            {isFunMode
              ? 'Every mission has a story. Here are the breadcrumbs.'
              : 'A look at the range — not just the highlights.'}
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map(cat => (
            <div
              key={cat.id}
              className={`
                ${styles.tile}
                ${cat.priority === 'lower' ? styles.tileLower : ''}
                ${isFunMode ? cat.funAccentBg : cat.accentBg}
                ${isFunMode ? cat.funBorderColor : cat.borderColor}
                border-2
              `}
            >
              <div className={styles.tileContent}>
                <div>
                  <h3 className={isFunMode
                    ? `font-caveat font-bold text-fun-h4 ${headlineColor}`
                    : `font-dm font-extrabold text-h4 ${headlineColor}`
                  }>
                    {isFunMode ? cat.funLabel : cat.label}
                  </h3>
                  {isFunMode && (
                    <span className="font-caveat text-fun-accent-yellow text-base block mt-0.5">
                      {cat.funAnnotation}
                    </span>
                  )}
                  <p className={`font-dm font-normal text-sm ${descColor} mt-1`}>
                    {cat.desc}
                  </p>
                </div>

                <ThumbGrid count={cat.thumbCount} isFunMode={isFunMode} />

                <a
                  href="#"
                  className={`${styles.tileLink} ${linkColor} font-dm font-extrabold text-sm hover:underline`}
                >
                  View curated work →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
