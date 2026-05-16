import { useEffect, useMemo, useState } from 'react';
import styles from '../../styles/diagnosticQuizScreen.module.css';
import QuizSubmissionModal from './QuizSubmissionModal';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClockIcon,
  GridIcon,
  InfoCircleIcon,
  LightningBoltOutlineIcon,
  ListBulletIcon,
} from '../icons/DemoIcons';

const LETTERS = ['A', 'B', 'C', 'D'];

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function SequentialQuizScreen({
  questions,
  quizTitle,
  section = 'DESIGN',
  subtitle = 'Quiz in progress',
  sidebarTitle = 'Practice Toolkit',
  sidebarItems = [],
  helperLabel = 'How to answer',
  helperText,
  onBack,
  onSubmit,
  submitActions = null,
  submitId,
  useSubmissionModal = false,
  submissionTitle,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [questionStartedAt, setQuestionStartedAt] = useState(Date.now());
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((value) => value + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setQuestionStartedAt(Date.now());
  }, [currentIndex]);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const currentAnswer = answers[currentQuestion.id] || null;
  const totalQuestions = questions.length;
  const questionElapsedSeconds = useMemo(
    () => Math.max(0, Math.floor((Date.now() - questionStartedAt) / 1000)),
    [elapsedSeconds, questionStartedAt]
  );
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleNext = () => {
    if (!currentAnswer) return;
    if (isLastQuestion) {
      if (submitActions?.length) return;
      if (useSubmissionModal) {
        setShowSubmissionModal(true);
        return;
      }
      onSubmit?.(answers);
      return;
    }
    setCurrentIndex((value) => value + 1);
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      onBack?.();
      return;
    }
    setCurrentIndex((value) => value - 1);
  };

  return (
    <>
      <div className={styles.screen}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.badge}>{section}</span>
            <div>
              <h1 className={styles.title}>{quizTitle}</h1>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.timerCard}>
              <ClockIcon size={18} />
              <div>
                <span className={styles.timerLabel}>Quiz Timer</span>
                <strong className={styles.timerValue}>{formatTime(elapsedSeconds)}</strong>
              </div>
            </div>
            <div className={styles.timerCard}>
              <InfoCircleIcon size={18} />
              <div>
                <span className={styles.timerLabel}>This Question</span>
                <strong className={styles.timerValue}>{formatTime(questionElapsedSeconds)}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarTitleRow}>
                <GridIcon size={20} />
                <h2 className={styles.sidebarTitle}>{sidebarTitle}</h2>
              </div>

              <div className={styles.metricGrid}>
                <div className={styles.metricCard}>
                  <span className={styles.metricLabel}>Question</span>
                  <strong className={styles.metricValue}>{currentIndex + 1} / {totalQuestions}</strong>
                </div>
                <div className={styles.metricCard}>
                  <span className={styles.metricLabel}>Answered</span>
                  <strong className={styles.metricValue}>{answeredCount}</strong>
                </div>
              </div>

              <div className={styles.toolList}>
                {sidebarItems.map((item) => (
                  <div key={item.label} className={styles.toolItem}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.tipCard}>
              <span className={styles.tipEyebrow}>{helperLabel}</span>
              <p className={styles.tipText}>{helperText}</p>
            </div>
          </aside>

          <section className={styles.questionPanel}>
            <div className={styles.questionCard}>
              <div className={styles.questionMeta}>
                <span className={styles.questionNumber}>Question {currentIndex + 1}</span>
                <span className={styles.questionTopic}>{currentQuestion.topic || 'Applied concept'}</span>
              </div>

              <p className={styles.questionText}>{currentQuestion.text}</p>

              <div className={styles.choiceList}>
                {currentQuestion.choices.map((choice, index) => {
                  const selected = currentAnswer === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      className={`${styles.choiceButton}${selected ? ` ${styles.choiceButtonSelected}` : ''}`}
                      onClick={() => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: choice.id }))}
                    >
                      <span className={styles.choiceLetter}>{LETTERS[index]}</span>
                      <span className={styles.choiceText}>{choice.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.footer}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={handlePrev}
              >
                <ArrowLeftIcon size={16} />
                {currentIndex === 0 ? 'Back to Course' : 'Back'}
              </button>

              {isLastQuestion && submitActions?.length ? (
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {submitActions.map((action, index) => (
                    <button
                      key={action.label}
                      type="button"
                      id={index === 0 ? submitId : undefined}
                      className={index === 0 ? styles.primaryButton : styles.secondaryButton}
                      onClick={() => action.onClick?.(answers)}
                      disabled={!currentAnswer}
                    >
                      {action.label}
                      <ArrowRightIcon size={16} />
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  type="button"
                  id={isLastQuestion ? submitId : undefined}
                  className={styles.primaryButton}
                  onClick={handleNext}
                  disabled={!currentAnswer}
                >
                  {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
                  <ArrowRightIcon size={16} />
                </button>
              )}
            </div>
          </section>
        </div>
      </div>

      {useSubmissionModal ? (
        <QuizSubmissionModal
          isOpen={showSubmissionModal}
          onNext={() => {
            setShowSubmissionModal(false);
            onSubmit?.(answers);
          }}
          quizTitle={submissionTitle || quizTitle}
        />
      ) : null}
    </>
  );
}

export const DEFAULT_PRACTICE_SIDEBAR = [
  { icon: <GridIcon size={16} />, label: 'Question-by-question flow' },
  { icon: <LightningBoltOutlineIcon size={16} />, label: 'Immediate mastery check' },
  { icon: <ListBulletIcon size={16} />, label: 'Course state updates after submit' },
];
