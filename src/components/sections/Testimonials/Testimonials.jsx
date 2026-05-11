import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { SharedLinkedInIcon } from '../../icons/icons';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 'atul',
    name: 'Atul Kumar',
    role: 'Chief Product Architect, Career Launcher',
    relation: 'Former COO, e-GMAT · Mentor',
    badge: 'Relentless Builder',
    headlinePrefix: 'He is a',
    quote:
      'Lohith was relentless in the best way. I watched him grow from someone I hired and mentored into the face of design at eGMAT. Once he sets his sights on something, he does not rest until it is finished.',
    linkedin: 'https://www.linkedin.com/in/atulkumar4/',
    avatar: '/images/testimonials/testimonial-atul-portrait.png',
    accentClass: styles.accentGreen,
  },
  {
    id: 'sundeep',
    name: 'Sundeep Eddu',
    role: 'Head of Marketing & Sales, e-GMAT',
    relation: 'Public website redesign partner',
    badge: 'End-to-End Owner',
    headlinePrefix: 'He is an',
    quote:
      'Lohith did not just design the public website — he owned the content, structure, and production end to end. We shipped faster and cleaner than any project of that scale, and his decisions still show in every section.',
    linkedin: 'https://www.linkedin.com/in/eddu-sundeep/',
    avatar: '/images/testimonials/testimonial-sundeep-portrait.png',
    accentClass: styles.accentYellow,
  },
  {
    id: 'sanchari',
    name: 'Sanchari Shome',
    role: 'Technical Lead, e-GMAT',
    relation: 'SAT product suite collaborator',
    badge: 'Spec Architect',
    headlinePrefix: 'She calls him a',
    quote:
      "Lohith speaks engineering's language. His specs come with edge cases, data structures, and test cases already mapped. The SAT product suite moved in weeks because nothing about the build was ambiguous.",
    linkedin: 'https://www.linkedin.com/in/shomesanchari/',
    avatar: '/images/testimonials/testimonial-sanchari-portrait.png',
    accentClass: styles.accentOrange,
  },
];

function splitBadge(badge) {
  const [firstWord, ...rest] = badge.split(' ');

  return {
    firstWord,
    rest: rest.join(' '),
  };
}

function getPairIndex(scrollValue, total) {
  const raw = scrollValue * (total - 1);

  return Math.min(total - 2, Math.max(0, Math.floor(raw)));
}

function getLocalFlipProgress(scrollValue, total) {
  const raw = scrollValue * (total - 1);
  const pairIndex = getPairIndex(scrollValue, total);

  return Math.min(1, Math.max(0, raw - pairIndex));
}

function LinkedInIconLink({ href, name }) {
  return (
    <a
      className={styles.linkedin}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${name}'s LinkedIn profile`}
      onClick={(event) => event.stopPropagation()}
    >
      <SharedLinkedInIcon className={styles.linkedinIcon} />
    </a>
  );
}

function TestimonialFace({ item, side, opacity }) {
  const { firstWord, rest } = splitBadge(item.badge);

  return (
    <motion.article className={`${styles.face} ${side === 'front' ? styles.faceFront : styles.faceBack}`} style={{ opacity }}>
      <div className={styles.stage}>
        <div className={styles.personWrap}>
          <div className={`${styles.personHalo} ${item.accentClass}`} />
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            className={styles.person}
            sizes="(min-width: 1120px) 300px, 278px"
            unoptimized
            priority={item.id === 'atul'}
          />
        </div>

        <div className={`${styles.card} ${styles.identityCard}`}>
          <div className={styles.nameRow}>
            <h3 className={styles.cardTitle}>{item.name}</h3>
            <LinkedInIconLink href={item.linkedin} name={item.name} />
          </div>
          <p className={styles.meta}>{item.role}</p>
          <p className={`${styles.meta} ${styles.metaSubtle}`}>{item.relation}</p>
        </div>

        <div className={`${styles.card} ${styles.headlineCard}`}>
          <h3 className={`${styles.cardTitle} ${styles.headlineTitle}`}>
            - {item.headlinePrefix}{' '}
            <span className={`${styles.scriptHighlight} ${item.accentClass}`}>
              {firstWord}
            </span>{' '}
            {rest}
          </h3>
        </div>

        <div className={`${styles.card} ${styles.quoteCard}`}>
          <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
        </div>
      </div>
    </motion.article>
  );
}

function MobileCard({ item }) {
  const { firstWord, rest } = splitBadge(item.badge);

  return (
    <article className={styles.mobileCard}>
      <div className={styles.mobileTop}>
        <div className={styles.mobilePersonWrap}>
          <div className={`${styles.mobilePersonHalo} ${item.accentClass}`} />
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            className={styles.mobilePerson}
            sizes="120px"
            unoptimized
          />
        </div>

        <div className={styles.mobileIdentity}>
          <div className={styles.nameRow}>
            <h3 className={styles.cardTitle}>{item.name}</h3>
            <LinkedInIconLink href={item.linkedin} name={item.name} />
          </div>
          <p className={styles.meta}>{item.role}</p>
          <p className={`${styles.meta} ${styles.metaSubtle}`}>{item.relation}</p>
        </div>
      </div>

      <h3 className={`${styles.cardTitle} ${styles.headlineTitle} ${styles.mobileHeadline}`}>
        - {item.headlinePrefix}{' '}
        <span className={`${styles.scriptHighlight} ${item.accentClass}`}>
          {firstWord}
        </span>{' '}
        {rest}
      </h3>

      <p className={`${styles.quote} ${styles.mobileQuote}`}>&ldquo;{item.quote}&rdquo;</p>
    </article>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const total = testimonials.length;
  const pairCount = total - 1;
  const [pairIndex, setPairIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionHeight = useMemo(() => `calc(${total * 115}vh + 18rem)`, [total]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const localFlipProgress = useTransform(scrollYProgress, (value) => getLocalFlipProgress(value, total));
  const flipRotation = useTransform(localFlipProgress, [0, 1], [0, -180]);
  const frontOpacity = useTransform(localFlipProgress, [0, 0.485, 0.5, 1], [1, 1, 0, 0]);
  const backOpacity = useTransform(localFlipProgress, [0, 0.5, 0.515, 1], [0, 0, 1, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -18]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const nextPairIndex = getPairIndex(value, total);
    const rawIndex = value * pairCount;
    const nextActiveIndex = Math.min(total - 1, Math.max(0, Math.round(rawIndex)));

    setPairIndex(nextPairIndex);
    setActiveIndex(nextActiveIndex);
  });

  const jumpToSlide = (index) => {
    const section = sectionRef.current;
    if (!section) return;

    const maxScrollableDistance = Math.max(0, section.offsetHeight - window.innerHeight);
    const targetProgress = total === 1 ? 0 : index / (total - 1);
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const targetY = sectionTop + maxScrollableDistance * targetProgress;

    setActiveIndex(index);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const frontItem = testimonials[pairIndex];
  const backItem = testimonials[pairIndex + 1];

  return (
    <section ref={sectionRef} id="testimonials" className={styles.section} style={{ height: sectionHeight }}>
      <div className={styles.sticky}>
        <motion.header className={styles.header} style={{ y: headerY }}>
          <p className={styles.kicker}>What they say?</p>
          <h2 className={styles.heading}>
            Echoes of <span className={styles.scriptWord}>Impact!</span>
          </h2>
          <p className={styles.subcopy}>
            Design is collaborative. From mentors to teammates, words that remind me — <strong>&quot;I&apos;ve made an impact!&quot;</strong>
          </p>
        </motion.header>

        <div className={styles.viewport}>
          <motion.div className={styles.flipper} style={{ rotateY: flipRotation }}>
            <TestimonialFace item={frontItem} side="front" opacity={frontOpacity} />
            <TestimonialFace item={backItem} side="back" opacity={backOpacity} />
          </motion.div>
        </div>

        <div className={styles.dots} aria-label="Choose testimonial slide">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.dotButton} ${activeIndex === index ? styles.dotButtonActive : ''}`}
              aria-label={`Go to testimonial ${index + 1}: ${item.name}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              onClick={() => jumpToSlide(index)}
            />
          ))}
        </div>

        <div className={styles.mobileList}>
          {testimonials.map((item) => (
            <MobileCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
