import { COURSE, QUIZ_RESULTS } from '../../data/mockCourse';
import CourseHeader from '../ui/CourseHeader';
import { CheckCircleIcon, ArrowRightIcon, ClockIcon } from '../icons/DemoIcons';
import styles from '../../styles/results.module.css';

export default function Step7aGoodResults({ onDemoComplete }) {
  const { good } = QUIZ_RESULTS;

  return (
    <div>
      <CourseHeader courseName={COURSE.name} category={COURSE.category} showBack />
      <div id="demo-good-results" className={styles.wrapper}>

        {/* Score card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={`${styles.scoreCircle} ${styles.good}`}>
              <span className={styles.scoreValue}>{good.score}%</span>
              <span className={styles.scoreLabel}>Score</span>
            </div>
            <h2 className={styles.resultHeadline}>
              Grade {good.grade} — Excellent work!
            </h2>
            <p className={styles.resultMessage}>{good.message}</p>
          </div>

          <div className={styles.cardStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{good.correct}/{good.total}</span>
              <span className={styles.statLabel}>Questions correct</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                <CheckCircleIcon size={20} style={{ color: 'var(--color-success)' }} />
              </span>
              <span className={styles.statLabel}>Threshold passed</span>
            </div>
          </div>
        </div>

        {/* Next activity */}
        {good.nextActivity && (
          <div className={styles.nextActivity}>
            <div className={styles.nextActivityInfo}>
              <div className={styles.nextActivityLabel}>Up next</div>
              <div className={styles.nextActivityName}>{good.nextActivity.name}</div>
              <div className={styles.nextActivityMeta}>
                <ClockIcon size={11} />
                {good.nextActivity.durationMinutes} min
              </div>
            </div>
            <button
              className={styles.nextActivityBtn}
              onClick={() => onDemoComplete?.('good')}
            >
              Start
              <ArrowRightIcon size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
