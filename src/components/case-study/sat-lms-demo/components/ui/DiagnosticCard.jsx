import {
  DocumentIcon, ClockIcon, AssessmentIcon,
  LightningBoltIcon, CheckCircleIcon, ArrowRightIcon,
} from '../icons/DemoIcons';
import styles from '../../styles/pace.module.css';

function NotAttempted({ config, onTakeDiagnostic }) {
  return (
    <div className={styles.diagnosticNotAttempted}>
      <div className={styles.diagnosticBadge}>
        <LightningBoltIcon size={10} gradientId="diag-badge-grad" />
        Personalized Learning
      </div>

      <h3 className={styles.diagnosticTitle}>Take the Diagnostic Quiz</h3>
      <p className={styles.diagnosticSubtitle}>
        Find out exactly which topics you already know — so you only study what you actually need.
      </p>

      <div className={styles.diagnosticMeta}>
        <span className={styles.diagnosticMetaItem}>
          <DocumentIcon size={12} />
          {config.question_count} questions
        </span>
        <span className={styles.diagnosticMetaItem}>
          <ClockIcon size={12} />
          ~{config.estimated_duration_minutes} min
        </span>
        <span className={styles.diagnosticMetaItem}>
          <AssessmentIcon size={12} />
          One-time assessment
        </span>
      </div>

      <button className={styles.diagnosticCTA} onClick={onTakeDiagnostic}>
        Start Diagnostic
        <ArrowRightIcon size={16} />
      </button>
    </div>
  );
}

function Completed({ results }) {
  return (
    <div className={styles.diagnosticCompleted}>
      <div className={styles.diagnosticCompletedGrade}>
        <CheckCircleIcon size={28} style={{ color: 'var(--color-success-dark)' }} />
      </div>
      <div className={styles.diagnosticCompletedInfo}>
        <div className={styles.diagnosticCompletedLabel}>Diagnostic Complete</div>
        <div className={styles.diagnosticCompletedScore}>
          Score: {results.score}% &mdash; Grade {results.grade}
        </div>
      </div>
      <div className={styles.diagnosticCompletedSaved}>
        <LightningBoltIcon size={12} gradientId="diag-saved-grad" />
        {results.hours_saved}h saved
      </div>
    </div>
  );
}

export default function DiagnosticCard({ status, config, results, onTakeDiagnostic, id }) {
  return (
    <div id={id} className={styles.diagnosticCard}>
      {status === 'completed'
        ? <Completed results={results} />
        : <NotAttempted config={config} onTakeDiagnostic={onTakeDiagnostic} />
      }
    </div>
  );
}
