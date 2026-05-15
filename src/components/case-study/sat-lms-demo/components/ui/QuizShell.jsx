import { useState } from 'react';
import QuizQuestion from './QuizQuestion';
import { ArrowRightIcon } from '../icons/DemoIcons';
import styles from '../../styles/quiz.module.css';

export default function QuizShell({ title, questions, onSubmit, submitId }) {
  const [answers, setAnswers] = useState({});

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const progress = (answered / questions.length) * 100;

  function handleSelect(questionId, choiceId) {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  }

  return (
    <div className={styles.shell}>
      <div className={styles.quizHeader}>
        <span className={styles.quizTitle}>{title}</span>
        <span className={styles.quizProgress}>{answered} / {questions.length} answered</span>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      {questions.map((q) => (
        <QuizQuestion
          key={q.id}
          question={q}
          selected={answers[q.id] || null}
          onSelect={(choiceId) => handleSelect(q.id, choiceId)}
        />
      ))}

      <div className={styles.submitArea}>
        <button
          id={submitId}
          className={styles.submitBtn}
          disabled={!allAnswered}
          onClick={() => onSubmit(answers)}
        >
          Submit
          <ArrowRightIcon size={16} />
        </button>
      </div>
    </div>
  );
}
