import { useEffect, useState } from 'react';
import styles from '../../styles/QuizSubmissionModal.module.css';
import { CheckCircleIcon, CompleteIcon } from '../icons/DemoIcons';

export default function QuizSubmissionModal({
  isOpen,
  onNext,
  quizTitle = 'PACE Diagnostic',
}) {
  const [showCompleted, setShowCompleted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const loadingSteps = [
    'Calculating accuracy scores',
    'Plotting timing data',
    'Analyzing attempt patterns',
    'Generating personalized insights',
  ];

  useEffect(() => {
    if (!isOpen) return undefined;

    setShowCompleted(false);
    setCountdown(3);

    const completeTimer = setTimeout(() => {
      setShowCompleted(true);
    }, 1600);

    return () => clearTimeout(completeTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !showCompleted) return undefined;
    if (countdown === 0) {
      onNext?.();
      return undefined;
    }

    const timer = setTimeout(() => {
      setCountdown((value) => value - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isOpen, onNext, showCompleted]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.headerSection}>
          <div className={styles.contentContainer}>
            <CheckCircleIcon size={72} className={styles.headerCheck} />
            <h1 className={styles.title}>Quiz Submitted</h1>
            <p className={styles.subtitle}>{quizTitle}</p>
          </div>
        </div>

        {!showCompleted ? (
          <div className={styles.bodySection}>
            <div className={styles.messageContainer}>
              <h2 className={styles.buildingTitle}>Building results screen</h2>
              <p className={styles.buildingSubtitle}>
                This usually takes a few seconds
              </p>
            </div>

            <div className={styles.loadingContainer}>
              <div className={styles.loadingPlaceholder}>
                {loadingSteps.map((step, index) => (
                  <div
                    key={step}
                    className={styles.loadingItem}
                    style={{ animationDelay: `${index}s` }}
                  >
                    <div className={styles.loadingIndicator}>
                      <div
                        className={styles.greyCircle}
                        style={{
                          animationDelay: `${index}s, ${index + 0.3}s, ${index + 0.7}s`,
                        }}
                      />
                      <div
                        className={styles.checkIcon}
                        style={{ animationDelay: `${index + 1}s` }}
                      >
                        <CompleteIcon size={20} />
                      </div>
                    </div>
                    <span className={styles.loadingText}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.spacer} />
          </div>
        ) : (
          <div className={styles.completedBodySection}>
            <div className={styles.completedMessage}>
              <div className={styles.completedTitle}>
                <span className={styles.targetEmoji}>Target locked</span>
                <br />
                <span className={styles.completedTitleText}>
                  Your personalized insights
                  <br />
                  are ready!
                </span>
              </div>
              <div className={styles.redirectMessage}>
                <span className={styles.redirectText}>Redirecting in </span>
                <span className={styles.countdown}>{countdown}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
