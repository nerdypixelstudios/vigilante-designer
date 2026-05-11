import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../shared/ThemeContext';
import { SharedLinkedInIcon } from '../../icons/icons';
import styles from './FeaturedProjects.module.css';

const projects = [
  {
    id: 'sat-lms',
    slug: 'sat-lms',
    name: 'SAT LMS',
    funName: 'SAT LMS',
    headline: 'How I made a learning platform behave like a personalized tutor',
    summary: 'I used diagnostic-first UX, prescribed paths, and next-action UI to turn scattered course material into a guided learning journey.',
    tags: [
      { label: 'End-to-end product design' },
      { label: 'Live', tone: 'active' },
    ],
    metrics: [
      {
        value: '2.8x',
        label: 'higher continuation',
      },
      {
        value: '1.4x',
        label: 'deeper learning progress',
      },
    ],
    quote: {
      text: 'I had not thought about UX at this level before. The minute decisions Lohith made made the flow surprisingly easy to follow.',
      person: 'Sanchari',
      role: 'Technical Lead, e-GMAT',
      image: '/images/testimonials/testimonial-sanchari-portrait.webp',
    },
    funSticker: 'The path finds the student.',
    media: {
      poster: '/images/work/work-sat-lms-preview-thumbnail.png',
      mp4: '/videos/work/work-sat-lms-preview.mp4',
    },
  },
  {
    id: 'spark-presenter',
    slug: 'spark-presenter',
    name: 'S.P.A.R.K. Presenter',
    funName: 'S.P.A.R.K. Presenter',
    headline: 'How I built a modular presenter system to scale lesson production',
    tags: [
      { label: 'Learning tool' },
      { label: 'Live', tone: 'active' },
    ],
    metrics: [
      {
        value: '1.0x',
        label: 'structure for many lessons',
      },
      {
        value: '95.0x',
        label: 'automated accuracy target',
      },
    ],
    summary: 'I turned structured learning content into reusable presentation files, so one lesson system could produce many modules without rebuilding each one.',
    quote: {
      text: 'A reusable system that turns structured lesson content into presentation-ready modules without rebuilding the same format again and again.',
      person: 'System proof',
      role: 'Content production workflow',
      image: null,
    },
    funSticker: 'One system. Many lessons.',
    media: null,
  },
  {
    id: 'egmat-website',
    slug: '#featured-projects',
    name: 'e-GMAT Website',
    funName: 'e-GMAT Website',
    headline: 'How I rebuilt the website to make product value easier to trust',
    tags: [
      { label: 'Marketing site' },
      { label: 'Case study soon', tone: 'progress' },
    ],
    metrics: [
      {
        value: '1.0x',
        label: 'messaging system rebuilt',
      },
      {
        value: '1.0x',
        label: 'public trust path clarified',
      },
    ],
    summary: 'I reorganized messaging, proof, and action paths so visitors could understand the offering faster and move forward with more confidence.',
    quote: {
      text: 'The redesign made the offering easier to understand, easier to trust, and easier to act on from the public website.',
      person: 'Launch proof',
      role: 'Public website redesign',
      image: null,
    },
    funSticker: 'The front door got serious.',
    media: null,
  },
  {
    id: 'neuron',
    slug: '#featured-projects',
    name: 'Neuron',
    funName: 'Neuron',
    headline: 'How I turned scattered GMAT practice into guided learner momentum',
    tags: [
      { label: 'GMAT practice' },
      { label: 'Archived', tone: 'archived' },
    ],
    metrics: [
      {
        value: '1.0x',
        label: 'guided practice flow',
      },
      {
        value: '1.0x',
        label: 'learner momentum system',
      },
    ],
    summary: 'I reworked entry points, practice flow, and next-step cues so learners spent less time searching and more time practicing.',
    quote: {
      text: 'A practice experience reframed around clear entry points, guided flow, and cues that keep learners moving instead of searching.',
      person: 'Product proof',
      role: 'Archived learning platform',
      image: null,
    },
    funSticker: 'No more wandering around.',
    media: null,
  },
];

function AnimatedMetric({ value, isActive }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const target = Number.parseFloat(value);

    if (!isActive || Number.isNaN(target)) {
      setDisplayValue(value);
      return undefined;
    }

    let frameId;
    const duration = 900;
    const startTime = performance.now();

    const tick = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - ((1 - progress) ** 3);
      setDisplayValue(`${(target * eased).toFixed(1)}x`);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    setDisplayValue('0.0x');
    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isActive, value]);

  return <>{displayValue}</>;
}

function ProjectCard({ project, isFunMode }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
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

  useEffect(() => {
    if (!cardRef.current) return undefined;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  const handlePointerMove = event => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--cursor-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--cursor-y', `${event.clientY - bounds.top}px`);
  };

  const mediaContent = (
    <>
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
          {project.media?.webm && <source src={project.media.webm} type="video/webm" />}
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
        <div className={styles.placeholderPreview} aria-hidden="true" />
      )}
    </>
  );

  return (
    <Link
      ref={cardRef}
      href={href}
      className={`${styles.card} ${isFunMode ? styles.cardEditorialFun : styles.cardEditorialNormal}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onMouseMove={handlePointerMove}
    >
      <div className={styles.editorialGrid}>
        <div className={styles.editorialMediaPanel}>
          <div className={styles.editorialMediaSurface}>
            {mediaContent}
          </div>

          {isFunMode && (
            <span className={`${styles.funSticker} font-caveat font-bold text-fun-ink-50`}>
              {project.funSticker}
            </span>
          )}
        </div>

        <div className={styles.editorialContent}>
          <header className={styles.editorialHeader}>
            <h3 className={`${styles.editorialProjectName} ${isFunMode ? 'font-caveat font-bold text-fun-ink-50' : 'font-cabinet font-extrabold text-accent-orange'}`}>
              {isFunMode ? project.funName : project.name}
            </h3>
            <div className={styles.editorialTagRow}>
              {project.tags.map(tag => (
                <span key={tag.label} className={`${styles.editorialTag} ${tag.tone ? styles[tag.tone] : ''} font-dm`}>
                  {tag.tone && <span className={styles.tagDot} aria-hidden="true" />}
                  {tag.label}
                </span>
              ))}
            </div>
          </header>

          <div className={styles.editorialBody}>
            <div className={styles.editorialMainCopy}>
              <h4 className={`${styles.editorialTitle} ${isFunMode ? 'font-caveat font-bold text-fun-ink-50' : 'font-cabinet font-extrabold text-ink-950'}`}>
                {project.headline}
              </h4>
              <p className={`${styles.editorialSummary} font-dm ${isFunMode ? 'text-fun-ink-300' : 'text-ink-700'}`}>
                {project.summary}
              </p>
              <div className={styles.editorialMetrics}>
                {project.metrics.map(metric => (
                  <span key={metric.label} className={styles.editorialMetric}>
                    <strong className="font-cabinet font-extrabold">
                      <AnimatedMetric value={metric.value} isActive={hasEntered} />
                    </strong>
                    <span className="font-dm">{metric.label}</span>
                  </span>
                ))}
              </div>
            </div>

            <aside className={styles.editorialProof} aria-label={`Proof from ${project.quote.person}`}>
              <p className={`${styles.editorialQuote} font-dm ${isFunMode ? 'text-fun-ink-200' : 'text-ink-700'}`}>
                "{project.quote.text}"
              </p>
              <span className={styles.editorialPerson}>
                {project.quote.image && (
                  <span className={styles.editorialAvatarFrame}>
                    <Image
                      src={project.quote.image}
                      alt={`${project.quote.person} portrait`}
                      width={320}
                      height={320}
                      sizes="56px"
                      className={styles.editorialAvatar}
                    />
                  </span>
                )}
                <span className={styles.editorialPersonDetails}>
                  <SharedLinkedInIcon className={styles.editorialLinkedInIcon} />
                  <strong className="font-cabinet font-extrabold">{project.quote.person}</strong>
                  <small className="font-dm">{project.quote.role}</small>
                </span>
              </span>
            </aside>
          </div>
        </div>
      </div>

      <span className={`${styles.hoverCue} font-dm font-extrabold`} aria-hidden="true">
        View in detail <span>👀</span>
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
          <p className={`${styles.eyebrow} font-caveat font-bold ${isFunMode ? 'text-fun-accent-yellow' : 'text-accent-orange'}`}>
            {isFunMode ? "The vigilante's best work." : 'Shipped. Not just designed.'}
          </p>
          <div className={styles.headlineLine}>
            <h2 className={isFunMode
              ? `font-rock-salt text-fun-ink-50 leading-rock-salt ${styles.h2Fun}`
              : `font-cabinet font-extrabold text-ink-950 ${styles.h2Normal}`
            }>
              {isFunMode ? 'Missions Completed!' : <>Work That <span className={styles.speaksWord}>Speaks!</span></>}
            </h2>
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
