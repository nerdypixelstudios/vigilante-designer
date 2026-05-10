import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../shared/ThemeContext';
import { PaperPlane } from '../../icons/icons';
import styles from './FeaturedProjects.module.css';

const projects = [
  {
    id: 'sat-lms',
    slug: 'sat-lms',
    name: 'SAT LMS: How I made a dump of learning content behave like a personalized tutor',
    funName: 'SAT LMS (aka The Next-Step Engine)',
    tags: [
      { label: 'In progress', tone: 'progress' },
      { label: 'Case study live' },
      { label: 'Adaptive Learning' },
      { label: 'UX System' },
    ],
    ribbon: '3x quiz completions / 10x attempts',
    summary: 'I used diagnostic-first UX, prescribed paths, and next-action UI to turn scattered course material into a guided learning journey.',
    funSticker: 'The path finds the student.',
    previewClass: 'previewSat',
    media: {
      poster: '/images/work/work-sat-lms-preview-thumbnail.png',
      mp4: '/videos/work/work-sat-lms-preview.mp4',
      overlay: '/images/work/work-cover-overlay.png',
    },
  },
  {
    id: 'spark-presenter',
    slug: 'spark-presenter',
    name: 'S.P.A.R.K. Presenter: How I built a modular presenter system to scale lesson production',
    funName: 'S.P.A.R.K. Presenter (aka The Content Cannon)',
    tags: [
      { label: 'Active product', tone: 'active' },
      { label: 'Case study live' },
      { label: 'Learning Tool' },
      { label: 'Content System' },
    ],
    ribbon: '1 structure / many lessons',
    summary: 'I turned structured learning content into reusable presentation files, so one lesson system could produce many modules without rebuilding each one.',
    funSticker: 'One system. Many lessons.',
    previewClass: 'previewSpark',
    media: null,
  },
  {
    id: 'egmat-website',
    slug: '#featured-projects',
    name: 'e-GMAT Website: How I rebuilt the website to make product value easier to trust',
    funName: 'e-GMAT Website (aka The Public Front)',
    tags: [
      { label: 'Active product', tone: 'active' },
      { label: 'Case study coming soon' },
      { label: 'Marketing Site' },
      { label: 'End-to-End Ownership' },
    ],
    ribbon: 'Ranked on new keywords',
    summary: 'I reorganized messaging, proof, and action paths so visitors could understand the offering faster and move forward with more confidence.',
    funSticker: 'The front door got serious.',
    previewClass: 'previewEgmat',
    media: null,
  },
  {
    id: 'neuron',
    slug: '#featured-projects',
    name: 'Neuron: How I turned scattered GMAT practice into guided learner momentum',
    funName: 'Neuron (aka The Practice Grinder)',
    tags: [
      { label: 'Archived product', tone: 'archived' },
      { label: 'Case study being written' },
      { label: 'Web App' },
      { label: 'GMAT Practice' },
    ],
    ribbon: 'Guided practice from day one',
    summary: 'I reworked entry points, practice flow, and next-step cues so learners spent less time searching and more time practicing.',
    funSticker: 'No more wandering around.',
    previewClass: 'previewNeuron',
    media: null,
  },
];

function ProjectCard({ project, isFunMode }) {
  const videoRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [playsByDefault, setPlaysByDefault] = useState(false);
  const href = project.slug.startsWith('#') ? project.slug : `/case-studies/${project.slug}`;
  const hasVideo = Boolean(project.media?.mp4);
  const shouldPlayVideo = hasVideo && (isActive || playsByDefault);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const syncPlayMode = () => setPlaysByDefault(mediaQuery.matches);

    syncPlayMode();
    mediaQuery.addEventListener('change', syncPlayMode);

    return () => mediaQuery.removeEventListener('change', syncPlayMode);
  }, []);

  useEffect(() => {
    if (!videoRef.current || !shouldPlayVideo) return;

    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  }, [shouldPlayVideo]);

  const handlePointerMove = event => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--cursor-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--cursor-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <Link
      href={href}
      className={`${styles.card} ${isFunMode ? styles.cardFun : styles.cardNormal}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onMouseMove={handlePointerMove}
    >
      <div className={styles.mediaFrame}>
        <span className={`${styles.ribbon} font-dm font-extrabold`} aria-hidden="true">
          {project.ribbon}
        </span>

        <div className={styles.mediaSurface}>
          {shouldPlayVideo ? (
            <video
              ref={videoRef}
              className={styles.previewVideo}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
            >
              <source src={project.media.mp4} type="video/mp4" />
            </video>
          ) : hasVideo ? (
            <Image
              src={project.media.poster}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 767px) calc(100vw - 3rem), min(100vw - 6rem, 1200px)"
              className={styles.posterImage}
            />
          ) : (
            <div className={`${styles.placeholderPreview} ${styles[project.previewClass]}`} aria-hidden="true">
              <span className={styles.previewRail} />
              <span className={styles.previewPanel} />
              <span className={styles.previewPanelSmall} />
              <span className={styles.previewLineLong} />
              <span className={styles.previewLineShort} />
            </div>
          )}
          {project.media?.overlay && (
            <Image
              src={project.media.overlay}
              alt=""
              fill
              sizes="(max-width: 767px) calc(100vw - 3rem), min(100vw - 6rem, 1200px)"
              className={styles.coverOverlay}
            />
          )}
        </div>

        {isFunMode && (
          <span className={`${styles.funSticker} font-caveat font-bold text-fun-ink-50`}>
            {project.funSticker}
          </span>
        )}
      </div>

      <div className={styles.cardInfo}>
        <div className={styles.tagRow}>
          {project.tags.map(tag => (
            <span key={tag.label} className={`${styles.tag} ${tag.tone ? styles[tag.tone] : ''} font-dm`}>
              {tag.tone && <span className={styles.tagDot} aria-hidden="true" />}
              {tag.label}
            </span>
          ))}
        </div>

        <h3 className={`${styles.cardTitle} ${isFunMode ? 'font-caveat font-bold text-fun-ink-50' : 'font-dm font-extrabold text-ink-950'}`}>
          {isFunMode ? project.funName : project.name}
        </h3>

        <p className={`${styles.summary} font-dm ${isFunMode ? 'text-fun-ink-300' : 'text-ink-700'}`}>
          {project.summary}
        </p>
      </div>

      <span className={`${styles.hoverCue} font-dm font-extrabold`} aria-hidden="true">
        View in detail <span>{'👀'}</span>
      </span>
    </Link>
  );
}

export default function FeaturedProjects() {
  const { isFunMode } = useTheme();

  return (
    <section id="featured-projects" className={`${isFunMode ? 'bg-fun-surface-dark' : 'bg-surface-white'} ${styles.section}`}>
      <div className={styles.inner}>
        <div className={styles.headline}>
          <p className={`${styles.eyebrow} font-caveat font-bold ${isFunMode ? 'text-fun-accent-yellow' : 'text-fun-accent-red'}`}>
            {isFunMode ? "The vigilante's best work." : 'Shipped. Not just designed.'}
          </p>
          <div className={styles.headlineLine}>
            <h2 className={isFunMode
              ? `font-rock-salt text-fun-ink-50 leading-rock-salt ${styles.h2Fun}`
              : `font-cabinet font-extrabold text-ink-950 ${styles.h2Normal}`
            }>
              {isFunMode ? 'Missions Completed!' : 'Work That Speaks!'}
            </h2>
            <PaperPlane className={styles.paperPlane} />
          </div>
        </div>

        <div className={styles.stack}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={styles.stackItem}
              style={{ '--stack-index': index, zIndex: index + 1 }}
            >
              <ProjectCard project={project} isFunMode={isFunMode} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
