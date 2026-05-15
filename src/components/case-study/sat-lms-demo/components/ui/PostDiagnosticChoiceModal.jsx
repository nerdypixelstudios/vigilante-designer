import { useEffect, useCallback } from 'react';
import {
  LightningBoltIcon, CloseIcon, BookOpenIcon,
  ChevronRightIcon, GridIcon, PlayIcon,
} from '../icons/DemoIcons';
import styles from '../../styles/modal.module.css';

export default function PostDiagnosticChoiceModal({
  isOpen,
  onClose,
  onStartLearning,
  onViewCourse,
  hoursSaved = 12,
  activitiesSkipped = 14,
  totalActivities = 48,
  firstActivity,
  viewCourseId,
}) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) onClose?.();
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className={styles.card} role="dialog" aria-modal="true">
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <CloseIcon size={14} />
        </button>

        {/* Header */}
        <div className={styles.choiceHeader}>
          <div className={styles.choicePaceBadge}>
            <LightningBoltIcon size={10} gradientId="choice-badge-grad" />
            PACE — Personalized Learning
          </div>
          <h2 className={styles.choiceTitle}>Your path is ready.</h2>
          <p className={styles.choiceSubtitle}>
            Based on your diagnostic, we've personalized your course — skipping what you already know.
          </p>
        </div>

        {/* Stats */}
        <div className={styles.choiceStats}>
          <div className={styles.choiceStat}>
            <span className={styles.choiceStatValue}>{hoursSaved}h</span>
            <span className={styles.choiceStatLabel}>Study time saved</span>
          </div>
          <div className={styles.choiceStat}>
            <span className={styles.choiceStatValue}>{activitiesSkipped}</span>
            <span className={styles.choiceStatLabel}>Activities you can skip</span>
          </div>
          <div className={styles.choiceStat}>
            <span className={styles.choiceStatValue}>{totalActivities - activitiesSkipped}</span>
            <span className={styles.choiceStatLabel}>Activities remaining</span>
          </div>
        </div>

        {/* First activity preview */}
        {firstActivity && (
          <div className={styles.choiceFirstActivity}>
            <div className={styles.choiceFirstActivityLabel}>Start with</div>
            <div className={styles.choiceFirstActivityRow}>
              <BookOpenIcon size={13} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <span className={styles.choiceFirstActivityName}>{firstActivity.name}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', flexShrink: 0 }}>
                {firstActivity.duration}m
              </span>
              <ChevronRightIcon size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={styles.choiceActions}>
          <button className={styles.choiceBtnPrimary} onClick={onStartLearning}>
            <PlayIcon size={13} />
            Start Learning
          </button>
          <button
            id={viewCourseId}
            className={styles.choiceBtnSecondary}
            onClick={onViewCourse}
          >
            <GridIcon size={13} />
            View Course
          </button>
        </div>
      </div>
    </div>
  );
}
