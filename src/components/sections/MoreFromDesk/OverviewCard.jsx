import { getLaneStyle } from './moreWorksUtils';
import styles from './MoreFromDesk.module.css';

export default function OverviewCard({ lane, index, morphOut }) {
  const baseTilt = index === 0 ? -1.5 : index === 1 ? 1 : -0.5;
  const spreadDirection = index - 1;
  const translateX = spreadDirection * morphOut * 44;
  const translateY = morphOut * (index === 1 ? -18 : 22);
  const scale = 1 - morphOut * 0.1;
  const opacity = morphOut > 0.82 ? 0 : 1 - morphOut * 0.96;
  const blur = morphOut * 2.5;

  return (
    <article
      className={`${styles.overviewCard} ${styles[`overviewCard${index}`]}`}
      style={{
        ...getLaneStyle(lane),
        transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotate(${baseTilt * (1 - morphOut)}deg)`,
        opacity,
        filter: `blur(${blur}px)`,
        visibility: morphOut > 0.94 ? 'hidden' : 'visible',
      }}
    >
      <span className={styles.overviewGlow} aria-hidden="true" />
      <span className={styles.overviewContent}>
        <span>
          <span className={styles.overviewEyebrow}>{lane.eyebrow}</span>
          <span className={styles.overviewTitle}>{lane.title}</span>
        </span>
        <span>
          <span className={styles.overviewMetric}>{lane.metric}</span>
          <span className={styles.overviewDescription}>{lane.description}</span>
        </span>
      </span>
    </article>
  );
}
