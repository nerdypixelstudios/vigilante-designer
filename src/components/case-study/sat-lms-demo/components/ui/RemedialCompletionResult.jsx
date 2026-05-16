import { useEffect, useRef } from 'react';
import { CheckCircleIcon, InfoCircleIcon, RemedialIcon } from '../icons/DemoIcons';
import styles from '../../styles/remedialCompletion.module.css';

export default function RemedialCompletionResult({
  isOpen,
  score,
  title,
  message,
  motherActivityName,
  mistakeCount,
  isPerfect,
  onPrimary,
  onSecondary,
}) {
  const primaryButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => primaryButtonRef.current?.focus(), 100);
    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div
        id={isPerfect ? 'demo-remedial-success' : 'demo-remedial-retry'}
        className={`${styles.modal} ${isPerfect ? styles.success : styles.retry}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="remedial-result-title"
      >
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            {isPerfect ? <CheckCircleIcon size={34} /> : <InfoCircleIcon size={34} />}
          </div>
          <div className={styles.headerCopy}>
            <span className={styles.badge}>
              <RemedialIcon size={12} />
              Remedial complete
            </span>
            <h2 id="remedial-result-title" className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{message}</p>
          </div>
        </div>

        <div className={styles.scoreRow}>
          <div className={styles.scoreCard}>
            <span className={styles.scoreLabel}>Score</span>
            <strong className={styles.scoreValue}>{score}%</strong>
          </div>
          <div className={styles.detailCard}>
            <span className={styles.detailLabel}>Reviewed</span>
            <strong className={styles.detailValue}>
              {mistakeCount} {mistakeCount === 1 ? 'mistake' : 'mistakes'}
            </strong>
            <span className={styles.detailContext}>from {motherActivityName}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            ref={primaryButtonRef}
            type="button"
            className={styles.primaryButton}
            onClick={onPrimary}
          >
            {isPerfect ? 'Continue in course' : 'Review the course'}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onSecondary}
          >
            Back to course
          </button>
        </div>
      </div>
    </div>
  );
}
