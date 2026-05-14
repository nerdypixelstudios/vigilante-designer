import { useEffect, useRef, useState } from 'react';
import Lane from './Lane';
import OverviewCard from './OverviewCard';
import { clamp, smoothstep } from './moreWorksUtils';
import styles from './MoreFromDesk.module.css';

function useStickyStageProgress(ref, triggerOffset = 96, morphDistance = 780) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const node = ref.current;
      if (!node || typeof window === 'undefined') return;

      const rect = node.getBoundingClientRect();
      const nextProgress = clamp((triggerOffset - rect.top) / morphDistance);
      setProgress(nextProgress);
    };

    const requestUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [ref, triggerOffset, morphDistance]);

  return progress;
}

function useIsPhoneLayout(breakpoint = '(max-width: 39.999rem)') {
  const [isPhoneLayout, setIsPhoneLayout] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia(breakpoint);
    const update = () => setIsPhoneLayout(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);

    return () => mediaQuery.removeEventListener('change', update);
  }, [breakpoint]);

  return isPhoneLayout;
}

export default function RangeMorphStage({ lanes, onOpenModal }) {
  const stageRef = useRef(null);
  const isPhoneLayout = useIsPhoneLayout();
  const rawProgress = useStickyStageProgress(stageRef, 96, 780);
  const morphOut = isPhoneLayout ? 1 : smoothstep(clamp((rawProgress - 0.1) / 0.38));
  const lanesIn = isPhoneLayout ? 1 : smoothstep(clamp((rawProgress - 0.28) / 0.5));

  return (
    <section ref={stageRef} className={styles.stage}>
      <div className={styles.stickyStage}>
        <span
          className={`${styles.stageGlow} ${styles.stageGlowOrange}`}
          style={{ transform: `translate3d(${rawProgress * -24}px, ${rawProgress * 18}px, 0)` }}
          aria-hidden="true"
        />
        <span
          className={`${styles.stageGlow} ${styles.stageGlowLavender}`}
          style={{ transform: `translate3d(${rawProgress * 20}px, ${rawProgress * -20}px, 0)` }}
          aria-hidden="true"
        />

        <div
          className={styles.overviewLayer}
          style={{ pointerEvents: morphOut > 0.65 ? 'none' : 'auto' }}
        >
          {lanes.map((lane, index) => (
            <OverviewCard key={lane.id} lane={lane} index={index} morphOut={morphOut} />
          ))}
        </div>

        <div
          className={styles.lanesLayer}
          style={{
            opacity: lanesIn,
            transform: `translate3d(0, ${(1 - lanesIn) * 72}px, 0)`,
            pointerEvents: lanesIn > 0.35 ? 'auto' : 'none',
          }}
        >
          {lanes.map((lane, index) => (
            <Lane key={lane.id} lane={lane} index={index} reveal={lanesIn} onOpenModal={onOpenModal} />
          ))}
        </div>
      </div>
    </section>
  );
}
