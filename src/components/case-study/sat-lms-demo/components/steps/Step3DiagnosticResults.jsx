import { DIAGNOSTIC, COURSE } from '../../data/mockCourse';
import CourseHeader from '../ui/CourseHeader';
import { LightningBoltIcon, ArrowRightIcon } from '../icons/DemoIcons';
import styles from '../../styles/results.module.css';

export default function Step3DiagnosticResults({ onNext }) {
  const { results } = DIAGNOSTIC;

  return (
    <div>
      <CourseHeader courseName={COURSE.name} category={COURSE.category} />
      <div id="demo-results-cta" className={styles.wrapper}>

        {/* Score card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={`${styles.scoreCircle} ${styles.good}`}>
              <span className={styles.scoreValue}>{results.score}%</span>
              <span className={styles.scoreLabel}>Score</span>
            </div>
            <h2 className={styles.resultHeadline}>
              Grade {results.grade} — Solid foundation.
            </h2>
            <p className={styles.resultMessage}>
              Your diagnostic is complete. We've personalized your learning path based on what you already know.
            </p>
          </div>

          <div className={styles.cardStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{results.hours_saved}h</span>
              <span className={styles.statLabel}>Study time saved</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{results.activities_skipped}</span>
              <span className={styles.statLabel}>Activities you can skip</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{results.total_activities - results.activities_skipped}</span>
              <span className={styles.statLabel}>Activities remaining</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onNext}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: 'var(--color-primary)',
            color: '#ffffff',
            fontFamily: 'var(--font-family-heading)',
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-bold)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <LightningBoltIcon size={16} gradientId="results-cta-grad" />
          View Your Personalized Path
          <ArrowRightIcon size={16} />
        </button>
      </div>
    </div>
  );
}
