import { useState } from 'react';
import { useTheme } from '../../shared/ThemeContext';
import { ChevronLeft, ChevronRight } from '../../icons/icons';
import styles from './Testimonials.module.css';

const normalSlides = [
  {
    id: 1,
    person: 'Sundeep Eddu',
    role: 'Head of Marketing and Sales, e-GMAT',
    quote: "Working with Lohith on the public website redesign changed what I thought was possible from a single person. He didn't just design — he owned the content, the structure, and the production, end to end. We shipped faster and cleaner than I've seen on any project of that scale. When I look at the current site, I see his decisions in every section.",
  },
  {
    id: 2,
    person: 'Atul Kumar',
    role: 'Former COO, e-GMAT · Chief Product Architect, Career Launcher',
    quote: "Lohith was the most quietly unstoppable person I've worked with. He never waited to be told what the problem was — he'd spot it, propose a solution, and ship it while others were still in the discussion. The Quant course transformation, the shift toward individual product creators, DesignForge — Lohith was at the front of every one of those, not because he was asked to be, but because that's how he's built.",
  },
  {
    id: 3,
    person: 'Sanchari',
    role: 'Technical Lead, e-GMAT',
    quote: "I've worked with a lot of designers. Lohith is the one who actually speaks the same language as engineering. He comes in with specs that have already accounted for the edge cases, with data structures mapped, with test cases written. The SAT product suite didn't take months to coordinate — it took weeks, because there was nothing ambiguous about what we were building.",
  },
];

const funSlides = [
  {
    id: 1,
    source: 'Laptop',
    role: 'Scene 47 · Silent Witness',
    emoji: '💻',
    quote: 'He treats me gently, even when rendering!',
    frameLabel: "</Laptop's field report>",
  },
  {
    id: 2,
    source: 'Coffee Mug',
    role: 'Morning Debrief · Witness',
    emoji: '☕',
    quote: 'He never lets me go cold.',
    frameLabel: "</Mug's field report>",
  },
  {
    id: 3,
    source: 'The Whiteboard',
    role: 'Planning Room · Silent Witness',
    emoji: '🗒',
    quote: 'Every idea I held got shipped. Some twice.',
    frameLabel: "</Whiteboard's field report>",
  },
];

export default function Testimonials() {
  const { isFunMode } = useTheme();
  const [current, setCurrent] = useState(0);

  const slides = isFunMode ? funSlides : normalSlides;
  const slide = slides[current];
  const total = slides.length;

  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);

  const sectionBg = isFunMode ? 'bg-fun-surface-dark' : 'bg-surface-mint';
  const headlineColor = isFunMode ? 'text-fun-ink-50' : 'text-ink-950';
  const bodyColor = isFunMode ? 'text-fun-ink-100' : 'text-ink-800';
  const arrowColor = isFunMode ? '#EEEFEB' : '#000000';

  return (
    <section id="testimonials" className={`${sectionBg} ${styles.section}`}>
      <div className={styles.inner}>

        {/* ── Headline ── */}
        <div className={styles.headline}>
          <p className={`font-caveat font-bold ${isFunMode ? 'text-fun-accent-yellow' : 'text-fun-accent-red'} text-xl mb-1`}>
            What they say?
          </p>
          <h2 className={isFunMode
            ? `font-rock-salt ${headlineColor} leading-rock-salt ${styles.h2Fun}`
            : `font-cabinet font-extrabold ${headlineColor} ${styles.h2Normal}`
          }>
            {isFunMode ? 'Witness Statements!!' : 'Echoes of Impact!'}
          </h2>
          <p className={`font-dm font-normal text-body ${isFunMode ? 'text-fun-ink-300' : 'text-ink-700'} mt-3 ${styles.framingSentence}`}>
            {isFunMode
              ? 'Everyone who works with me eventually has something to say. Including the furniture.'
              : "Design is collaborative. From mentors to teammates, words that remind me — \"I've made an impact!\""}
          </p>
        </div>

        {/* ── Carousel ── */}
        <div className={`${styles.testimonialCard} ${isFunMode ? 'bg-fun-surface-black border-fun-ink-700' : 'bg-surface-white border-ink-100'} border`}>
          {isFunMode ? (
            <div className={styles.centreContent}>
              <span className={styles.emoji}>{slide.emoji}</span>
              <blockquote className={`font-caveat font-bold text-fun-h3 ${headlineColor} mt-4 leading-snug`}>
                "{slide.quote}"
              </blockquote>
              <p className="font-caveat font-bold text-fun-accent-yellow text-xl mt-3">
                — {slide.source}
              </p>
              <p className="font-caveat text-fun-ink-500 text-base mt-0.5">
                {slide.role}
              </p>
            </div>
          ) : (
            <div className={styles.centreContent}>
              <div className={styles.personAvatar}>
                <span className="font-dm font-extrabold text-ink-500 text-lg">
                  {slide.person.charAt(0)}
                </span>
              </div>
              <blockquote className={`font-dm font-normal text-body ${bodyColor} mt-4 leading-relaxed italic ${styles.quoteText}`}>
                "{slide.quote}"
              </blockquote>
              <p className={`font-dm font-extrabold text-sm text-ink-950 mt-4`}>
                {slide.person}
              </p>
              <p className="font-dm font-normal text-sm text-ink-500">
                {slide.role}
              </p>
            </div>
          )}
        </div>

        {/* ── Navigation ── */}
        <div className={styles.carouselNav}>
          <button onClick={prev} className={styles.arrowBtn} aria-label="Previous testimonial">
            <ChevronLeft color={arrowColor} />
          </button>

          <div className={styles.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`${styles.dot} ${i === current
                  ? (isFunMode ? 'bg-fun-accent-yellow' : 'bg-ink-950')
                  : (isFunMode ? 'bg-fun-ink-700' : 'bg-ink-300')
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button onClick={next} className={styles.arrowBtn} aria-label="Next testimonial">
            <ChevronRight color={arrowColor} />
          </button>
        </div>

      </div>
    </section>
  );
}
