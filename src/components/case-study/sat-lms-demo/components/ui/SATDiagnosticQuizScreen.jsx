import { useEffect, useMemo, useState } from 'react';
import styles from '../../styles/diagnosticQuizScreen.module.css';
import QuizSubmissionModal from './QuizSubmissionModal';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClockIcon,
  DiagnosticIcon,
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

export default function SATDiagnosticQuizScreen({
  questions,
  quizTitle,
  onSubmit,
  section = 'MATH',
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

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const currentAnswer = answers[currentQuestion.id] || null;
  const totalQuestions = questions.length;
  const questionElapsedSeconds = useMemo(
    () => Math.max(0, Math.floor((Date.now() - questionStartedAt) / 1000)),
    [elapsedSeconds, questionStartedAt]
  );

  useEffect(() => {
    setQuestionStartedAt(Date.now());
  }, [currentIndex]);

  const goNext = () => {
    if (!currentAnswer) return;

    if (currentIndex === totalQuestions - 1) {
      setShowSubmissionModal(true);
      return;
    }

    setCurrentIndex((value) => value + 1);
  };

  const goBack = () => {
    if (currentIndex === 0) return;
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
              <p className={styles.subtitle}>Adaptive diagnostic in progress</p>
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
                <DiagnosticIcon size={20} />
                <h2 className={styles.sidebarTitle}>Diagnostic Toolkit</h2>
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
                <div className={styles.toolItem}>
                  <GridIcon size={16} />
                  <span>Question-by-question flow</span>
                </div>
                <div className={styles.toolItem}>
                  <LightningBoltOutlineIcon size={16} />
                  <span>Adaptive difficulty routing</span>
                </div>
                <div className={styles.toolItem}>
                  <ListBulletIcon size={16} />
                  <span>Reference tools available in the live product</span>
                </div>
              </div>
            </div>

            <div className={styles.tipCard}>
              <span className={styles.tipEyebrow}>How to answer</span>
              <p className={styles.tipText}>
                Choose the best answer honestly. The diagnostic uses these responses to decide
                what can be skipped and what needs reinforcement.
              </p>
            </div>
          </aside>

          <section className={styles.questionPanel}>
            <div className={styles.questionCard}>
              <div className={styles.questionMeta}>
                <span className={styles.questionNumber}>Question {currentIndex + 1}</span>
                <span className={styles.questionTopic}>{currentQuestion.topic}</span>
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
                onClick={goBack}
                disabled={currentIndex === 0}
              >
                <ArrowLeftIcon size={16} />
                Back
              </button>

              <button
                type="button"
                id={currentIndex === totalQuestions - 1 ? 'demo-quiz-submit' : undefined}
                className={styles.primaryButton}
                onClick={goNext}
                disabled={!currentAnswer}
              >
                {currentIndex === totalQuestions - 1 ? 'Submit Quiz' : 'Next Question'}
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </section>
        </div>
      </div>

      <QuizSubmissionModal
        isOpen={showSubmissionModal}
        onNext={() => {
          setShowSubmissionModal(false);
          onSubmit?.(answers);
        }}
        quizTitle={quizTitle}
      />
    </>
  );
}
