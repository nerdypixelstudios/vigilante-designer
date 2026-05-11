import MarqueeTrack from './MarqueeTrack';
import { clamp, getLaneStyle, smoothstep } from './moreWorksUtils';
import styles from './MoreFromDesk.module.css';

export default function Lane({ lane, index, reveal, onOpenModal }) {
  const laneReveal = smoothstep(clamp((reveal - index * 0.08) / 0.78));

  return (
    <section
      className={styles.laneRow}
      style={{
        ...getLaneStyle(lane),
        opacity: 0.1 + laneReveal * 0.9,
        transform: `translate3d(0, ${(1 - laneReveal) * 34}px, 0)`,
      }}
      aria-label={lane.title}
    >
      <span className={styles.laneDivider} aria-hidden="true" />
      <div className={styles.laneGrid}>
        <div className={styles.laneCopy}>
          <p className={styles.laneEyebrow}>{lane.eyebrow}</p>
          <h3 className={styles.laneTitle}>{lane.title}</h3>
          <p className={styles.laneMetric}>{lane.metric}</p>
          <p className={styles.laneDescription}>{lane.description}</p>
        </div>
        <div className={styles.marqueeViewport}>
          <span className={`${styles.marqueeFade} ${styles.marqueeFadeLeft}`} aria-hidden="true" />
          <span className={`${styles.marqueeFade} ${styles.marqueeFadeRight}`} aria-hidden="true" />
          <MarqueeTrack lane={lane} index={index} onOpenModal={onOpenModal} />
        </div>
      </div>
    </section>
  );
}
