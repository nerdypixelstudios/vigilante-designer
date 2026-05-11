import { useEffect, useMemo, useRef } from 'react';
import WorkCard from './WorkCard';
import styles from './MoreFromDesk.module.css';

export default function MarqueeTrack({ lane, index, onOpenModal }) {
  const trackRef = useRef(null);
  const segmentRef = useRef(null);
  const pauseRef = useRef(false);
  const offsetRef = useRef(0);
  const initializedRef = useRef(false);
  const renderedSegments = useMemo(() => [0, 1, 2], []);

  useEffect(() => {
    const track = trackRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!track || prefersReducedMotion) return undefined;

    let rafId = 0;
    let lastTime = performance.now();
    const direction = index % 2 === 0 ? -1 : 1;
    const speed = index === 1 ? 78 : 88;

    const getLoopWidth = () => {
      const segmentWidth = segmentRef.current?.getBoundingClientRect().width || track.scrollWidth / 3;
      return Math.max(segmentWidth + 20, 1);
    };

    const animate = (time) => {
      const deltaSeconds = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const loopWidth = getLoopWidth();

      if (!initializedRef.current) {
        offsetRef.current = direction > 0 ? -loopWidth : 0;
        initializedRef.current = true;
      }

      if (!pauseRef.current) {
        offsetRef.current += direction * speed * deltaSeconds;

        if (direction < 0) {
          while (offsetRef.current <= -loopWidth) offsetRef.current += loopWidth;
        } else {
          while (offsetRef.current >= 0) offsetRef.current -= loopWidth;
        }

        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [index]);

  return (
    <div
      ref={trackRef}
      className={styles.marqueeTrack}
      onMouseEnter={() => {
        pauseRef.current = true;
      }}
      onMouseLeave={() => {
        pauseRef.current = false;
      }}
      onFocus={() => {
        pauseRef.current = true;
      }}
      onBlur={() => {
        pauseRef.current = false;
      }}
    >
      {renderedSegments.map((segmentIndex) => (
        <div
          key={`${lane.id}-segment-${segmentIndex}`}
          ref={segmentIndex === 0 ? segmentRef : null}
          className={styles.marqueeSegment}
        >
          {lane.cards.map((item, cardIndex) => (
            <WorkCard
              key={`${lane.id}-${segmentIndex}-${item.title}-${cardIndex}`}
              item={item}
              lane={lane}
              index={cardIndex + segmentIndex * lane.cards.length}
              onOpenModal={onOpenModal}
              tabIndex={segmentIndex === 0 ? 0 : -1}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
