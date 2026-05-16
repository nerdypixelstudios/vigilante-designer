import { COURSE, QUIZ_RESULTS, REMEDIAL_ACTIVITY, PACE } from '../../data/mockCourse';
import CourseHeader from '../ui/CourseHeader';
import { RemedialIcon } from '../icons/DemoIcons';
import styles from '../../styles/results.module.css';

export default function Step7bLowResults({ onNext, onReturnToCourse }) {
  const { low } = QUIZ_RESULTS;

  return (
    <div>
      <CourseHeader
        courseName={COURSE.name}
        category={COURSE.category}
        onBack={() => onReturnToCourse?.(PACE.firstActivity.id)}
      />
      <div id="demo-low-results" className={styles.wrapper}>

        {/* Score card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={`${styles.scoreCircle} ${styles.low}`}>
              <span className={styles.scoreValue}>{low.score}%</span>
              <span className={styles.scoreLabel}>Score</span>
            </div>
            <h2 className={styles.resultHeadline}>
              Grade {low.grade} — Below threshold.
            </h2>
            <p className={styles.resultMessage}>{low.message}</p>
          </div>

          <div className={styles.cardStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{low.correct}/{low.total}</span>
              <span className={styles.statLabel}>Questions correct</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue} style={{ color: 'var(--color-red-500)' }}>
                <RemedialIcon size={20} />
              </span>
              <span className={styles.statLabel}>Remedial created</span>
            </div>
          </div>
        </div>

        {/* Remedial notice */}
        <div className={styles.remedialNotice}>
          <div className={styles.remedialNoticeIcon}>
            <RemedialIcon size={16} />
          </div>
          <div className={styles.remedialNoticeText}>
            <div className={styles.remedialNoticeTitle}>Targeted practice session created</div>
            <p className={styles.remedialNoticeBody}>
              Based on your mistakes in <strong>{REMEDIAL_ACTIVITY.motherActivityName}</strong> — {REMEDIAL_ACTIVITY.questionCount} questions focused on your exact gaps.
            </p>
          </div>
          <button id="demo-low-results-remedial" className={styles.remedialNoticeBtn} onClick={onNext}>
            View Remedial
          </button>
        </div>

      </div>
    </div>
  );
}
