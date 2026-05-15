import styles from '../../styles/quiz.module.css';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizQuestion({ question, selected, onSelect }) {
  return (
    <div className={styles.questionCard}>
      <p className={styles.questionText}>{question.text}</p>
      <div className={styles.choices}>
        {question.choices.map((choice, idx) => (
          <div
            key={choice.id}
            className={`${styles.choice} ${selected === choice.id ? styles.selected : ''}`}
            onClick={() => onSelect(choice.id)}
            role="radio"
            aria-checked={selected === choice.id}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(choice.id)}
          >
            <span className={styles.choiceLetter}>{LETTERS[idx]}</span>
            <span className={styles.choiceText}>{choice.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
