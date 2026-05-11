import Link from 'next/link';
import { ExternalArrowIcon } from '../../icons/icons';
import MiniMock from './MiniMock';
import styles from './MoreFromDesk.module.css';

export default function WorkCard({ item, lane, index, onOpenModal, tabIndex = 0 }) {
  const cardContent = (
    <>
      <MiniMock laneId={lane.id} index={index} />
      <span className={styles.cardBody}>
        <span className={styles.cardTopline}>
          <span>
            <span className={styles.cardTag}>{item.tag}</span>
            <span className={styles.cardTitle}>{item.title}</span>
          </span>
          <span className={styles.cardIcon} aria-hidden="true">
            <ExternalArrowIcon />
          </span>
        </span>
        <span className={styles.cardNote}>{item.note}</span>
      </span>
    </>
  );

  if (item.actionType === 'internal-route') {
    return (
      <Link
        href={`/more-works/${item.slug}`}
        className={styles.workCard}
        aria-label={`Open ${item.title}`}
        tabIndex={tabIndex}
      >
        {cardContent}
      </Link>
    );
  }

  if (item.actionType === 'image-modal' || item.actionType === 'video-modal') {
    return (
      <button
        type="button"
        className={styles.workCard}
        aria-label={`Open ${item.title}`}
        tabIndex={tabIndex}
        onClick={() => onOpenModal(item, lane)}
      >
        {cardContent}
      </button>
    );
  }

  if (item.actionType === 'external-link' && item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.workCard}
        aria-label={`Open ${item.title}`}
        tabIndex={tabIndex}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.workCard} ${styles.workCardDisabled}`}
      aria-label={`${item.title} details coming soon`}
      disabled
    >
      {cardContent}
    </button>
  );
}
