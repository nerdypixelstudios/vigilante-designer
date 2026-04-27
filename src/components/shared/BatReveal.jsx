import { useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeContext';
import { Bat } from '../icons/icons';
import styles from './BatReveal.module.css';

const BAT_COUNT = 80;
const TOTAL_DURATION_MS = 2800;

// Bats originate near the toggle (top-right) and fan outward across the
// entire viewport. Full 360° spread + wide distance variance so the swarm
// covers edge-to-edge rather than clustering in one quadrant.
function makeBats(seed) {
  return Array.from({ length: BAT_COUNT }, (_, i) => {
    const t = i / BAT_COUNT;
    const jitter = ((seed * (i + 7)) % 100) / 100 - 0.5;
    const angle = t * Math.PI * 2 + jitter * 0.45;
    const distance = 380 + ((seed * (i + 11)) % 1250);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance * 0.82;
    const startScale = 0.25 + ((seed * (i + 3)) % 45) / 100;
    const endScale = 0.7 + ((seed * (i + 5)) % 110) / 100;
    const rotateStart = (((seed * (i + 13)) % 80) - 40);
    const rotateEnd = rotateStart + (((seed * (i + 17)) % 540) - 270);
    const delay = ((seed * (i + 19)) % 380) / 1000;
    const duration = 1.4 + ((seed * (i + 23)) % 65) / 100;
    return { id: i, dx, dy, startScale, endScale, rotateStart, rotateEnd, delay, duration };
  });
}

export default function BatReveal() {
  const { revealEvent, dismissReveal } = useTheme();

  const bats = useMemo(
    () => (revealEvent ? makeBats(revealEvent.id) : []),
    [revealEvent],
  );

  useEffect(() => {
    if (!revealEvent) return;
    const timer = setTimeout(() => dismissReveal(), TOTAL_DURATION_MS);
    return () => clearTimeout(timer);
  }, [revealEvent, dismissReveal]);

  if (!revealEvent) return null;

  return (
    <div className={styles.overlay} aria-hidden="true">
      {/* Blackout wash — covers the entire page (including nav). Fades in
          almost instantly, holds while the swarm peaks, then fades out to
          reveal the fun-mode page underneath. */}
      <motion.div
        key={`blackout-${revealEvent.id}`}
        className={styles.blackout}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2.6,
          // 0–10%: rapid fade-in (~260ms — covers the toggle before the
          // mode flip fires at 280ms).
          // 10–62%: full black hold while bats peak.
          // 62–100%: slow fade-out reveals the new (fun-mode) page.
          times: [0, 0.10, 0.62, 1],
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* Red wash — single layer behind the bats. Backlit silhouette effect. */}
      <motion.div
        key={`glow-${revealEvent.id}`}
        className={styles.glow}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.55, 0] }}
        transition={{ duration: 2.5, times: [0, 0.16, 0.6, 1], ease: 'easeOut' }}
      />

      <div className={styles.swarmOrigin}>
        {bats.map(bat => (
          <motion.div
            key={`${revealEvent.id}-${bat.id}`}
            className={styles.batWrap}
            initial={{
              x: 0,
              y: 0,
              scale: bat.startScale,
              rotate: bat.rotateStart,
              opacity: 0,
            }}
            animate={{
              x: bat.dx,
              y: bat.dy,
              scale: bat.endScale,
              rotate: bat.rotateEnd,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              x:       { duration: bat.duration, delay: bat.delay, ease: [0.22, 1, 0.36, 1] },
              y:       { duration: bat.duration, delay: bat.delay, ease: [0.22, 1, 0.36, 1] },
              scale:   { duration: bat.duration, delay: bat.delay, ease: 'easeOut' },
              rotate:  { duration: bat.duration, delay: bat.delay, ease: 'linear' },
              opacity: {
                duration: bat.duration,
                delay: bat.delay,
                times: [0, 0.18, 0.7, 1],
                ease: 'easeOut',
              },
            }}
          >
            <motion.div
              className={styles.flap}
              animate={{ scaleY: [1, 0.55, 1, 0.55, 1] }}
              transition={{ duration: 0.42, repeat: Math.ceil(bat.duration / 0.42), ease: 'easeInOut' }}
            >
              <Bat size={64} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
