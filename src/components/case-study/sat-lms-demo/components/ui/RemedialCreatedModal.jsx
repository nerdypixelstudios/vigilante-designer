import { useEffect, useCallback } from 'react';
import {
  CloseIcon, ClipboardDocumentListIcon, ClockIcon,
  CheckIcon, RemedialIcon, ArrowRightIcon,
} from '../icons/DemoIcons';
import styles from '../../styles/modal.module.css';

export default function RemedialCreatedModal({
  isOpen,
  motherActivityName,
  mistakeCount,
  questionCount,
  estimatedTimeMinutes,
  onStartRemedial,
  onClose,
  id,
}) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) onClose?.();
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  const mistakeText = mistakeCount === 1 ? '1 mistake' : `${mistakeCount} mistakes`;

  return (
    <div className={styles.backdrop} onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div id={id} className={styles.card} role="dialog" aria-modal="true">
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <CloseIcon size={14} />
        </button>

        {/* Header */}
        <div className={styles.remedialHeader}>
          <div className={styles.remedialBadge}>
            <RemedialIcon size={10} />
            Targeted Practice
          </div>
          <h2 className={styles.remedialTitle}>Plug your gaps before moving on</h2>
          <p className={styles.remedialDesc}>
            Based on your {mistakeText} in {motherActivityName}, we've created a focused practice session.
          </p>
        </div>

        {/* Activity row */}
        <div className={styles.remedialActivityRow}>
          <div style={{
            width: 36, height: 36, borderRadius: '8px',
            background: '#fef2f2', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'var(--color-red-500)', flexShrink: 0
          }}>
            <RemedialIcon size={16} />
          </div>
          <div className={styles.remedialActivityInfo}>
            <div className={styles.remedialActivityName}>{motherActivityName}</div>
            <div className={styles.remedialActivityMeta}>
              <span className={styles.remedialActivityMetaItem}>
                <ClipboardDocumentListIcon size={11} />
                {questionCount} questions
              </span>
              <span className={styles.remedialActivityMetaItem}>
                <ClockIcon size={11} />
                ~{estimatedTimeMinutes} min
              </span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className={styles.remedialBenefits}>
          <div className={styles.remedialBenefit}>
            <CheckIcon size={12} style={{ color: 'var(--color-red-dark)' }} />
            Targeted practice
          </div>
          <div className={styles.remedialBenefit}>
            <CheckIcon size={12} style={{ color: 'var(--color-red-dark)' }} />
            Fresh in memory
          </div>
        </div>

        {/* Actions */}
        <div className={styles.remedialActions}>
          <button className={styles.remedialStartBtn} onClick={onStartRemedial}>
            Start Remedial
            <ArrowRightIcon size={16} />
          </button>
          <button className={styles.remedialDismissBtn} onClick={onClose}>
            I'll do this later
          </button>
        </div>
      </div>
    </div>
  );
}
