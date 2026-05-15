import styles from '../../styles/activity.module.css';

export default function ConceptBlock({ label, text, formula, onStartQuiz, isRemedial }) {
  return (
    <div className={styles.conceptBlock}>
      <div className={styles.conceptBlockCard}>
        <div className={styles.conceptBlockLabel}>{label || 'Key Concept'}</div>
        <p className={styles.conceptBlockText}>{text}</p>
        {formula && (
          <div className={styles.conceptFormula}>{formula}</div>
        )}
      </div>

      <button
        className={`${styles.startQuizBtn} ${isRemedial ? styles.remedial : ''}`}
        onClick={onStartQuiz}
      >
        {isRemedial ? 'Start Targeted Practice' : 'Start Practice Quiz'}
      </button>
    </div>
  );
}
