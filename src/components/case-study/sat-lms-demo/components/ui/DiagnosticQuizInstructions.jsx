import {
  CloseIcon,
} from "../icons/DemoIcons";
import styles from "../../styles/DiagnosticQuizInstructions.module.css";

/**
 * DiagnosticQuizInstructions — Pre-quiz instruction screen for DIAGNOSTIC
 * quizzes served via the Neuron (spark-vanilla) flow.
 *
 * Mirrors the layout of LearningQuizInstructions but with diagnostic-specific
 * content: "What is this?", "What to expect" checklist, and an honest-answer tip.
 *
 * Supports two modes:
 *  - Full-page (default) — rendered inside a route page with action buttons
 *  - Dropdown (isDropdown=true) — rendered inline inside the quiz question screen
 */

/* ─── Simple inline SVG icons (Neuron style) ─── */
const ArrowLeftIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ArrowRightIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M18.33 10a8.33 8.33 0 1 1-16.67 0 8.33 8.33 0 0 1 16.67 0Z" fill="#338EF7" />
    <path fillRule="evenodd" clipRule="evenodd" d="M10 6.04c.35 0 .63.28.63.63v3.07l1.9 1.9a.63.63 0 0 1-.89.89l-2.08-2.08a.63.63 0 0 1-.18-.44V6.67c0-.35.28-.63.63-.63Z" fill="white" />
  </svg>
);

const WifiIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#17C964" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);

const NoBrowserNavIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E94444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);

const CalculatorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 24" fill="none">
    <path
      d="M17.25 0H2.75C1.233 0 0 1.233 0 2.75V21.25C0 22.767 1.233 24 2.75 24H17.25C18.767 24 20 22.767 20 21.25V2.75C20 1.233 18.767 0 17.25 0ZM7.78 18.72C8.073 19.013 8.073 19.488 7.78 19.781C7.634 19.927 7.442 20 7.25 20C7.058 20 6.866 19.927 6.72 19.78L6 19.061L5.28 19.781C5.134 19.927 4.942 20 4.75 20C4.558 20 4.366 19.927 4.22 19.78C3.927 19.487 3.927 19.012 4.22 18.719L4.939 18L4.219 17.28C3.926 16.987 3.926 16.512 4.219 16.219C4.512 15.926 4.987 15.926 5.28 16.219L6 16.939L6.72 16.219C7.013 15.926 7.488 15.926 7.781 16.219C8.074 16.512 8.074 16.987 7.781 17.28L7.061 18L7.78 18.72ZM7.25 12.75H6.75V13.25C6.75 13.664 6.414 14 6 14C5.586 14 5.25 13.664 5.25 13.25V12.75H4.75C4.336 12.75 4 12.414 4 12C4 11.586 4.336 11.25 4.75 11.25H5.25V10.75C5.25 10.336 5.586 10 6 10C6.414 10 6.75 10.336 6.75 10.75V11.25H7.25C7.664 11.25 8 11.586 8 12C8 12.414 7.664 12.75 7.25 12.75ZM15.25 20H12.75C12.336 20 12 19.664 12 19.25C12 18.836 12.336 18.5 12.75 18.5H15.25C15.664 18.5 16 18.836 16 19.25C16 19.664 15.664 20 15.25 20ZM15.25 17.5H12.75C12.336 17.5 12 17.164 12 16.75C12 16.336 12.336 16 12.75 16H15.25C15.664 16 16 16.336 16 16.75C16 17.164 15.664 17.5 15.25 17.5ZM15.25 13H12.75C12.336 13 12 12.664 12 12.25C12 11.836 12.336 11.5 12.75 11.5H15.25C15.664 11.5 16 11.836 16 12.25C16 12.664 15.664 13 15.25 13ZM17 6.25C17 7.215 16.215 8 15.25 8H4.75C3.785 8 3 7.215 3 6.25V4.75C3 3.785 3.785 3 4.75 3H15.25C16.215 3 17 3.785 17 4.75V6.25Z"
      fill="#338EF7"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M18.33 10a8.33 8.33 0 1 1-16.67 0 8.33 8.33 0 0 1 16.67 0Z" fill="#17C964" />
    <path d="M6.67 10l2.22 2.22 4.44-4.44" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LightbulbIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 0-4 12.73V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.27A7 7 0 0 0 12 2Z" fill="#F5A524" />
    <path d="M9 21h6M10 17v1M14 17v1" stroke="#F5A524" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DiagnosticQuizInstructions = ({
  // Quiz metadata
  quizName = "PACE Diagnostic",
  subtitle = "Let's see what you already know",
  questionCount,
  estimatedDuration,

  // Action handlers
  onStart,
  onGoBack,
  onClose,

  // State
  isCreatingQuiz = false,
  quizCreationError = null,

  // Display mode
  isDropdown = false,

  // Quiz interface options
  showTimer = true,

  // Section type — controls which interface tools are shown
  // "MATH" → shows Desmos Calculator
  // "READING-WRITING" → shows Notes & Highlight
  // "BOTH" → shows both
  section,
}) => {
  const isBoth = section === "BOTH";
  const isMathSection = section === "MATH" || isBoth;
  const isReadingWritingSection = section === "READING-WRITING" || isBoth;

  /* ─── Shared inner content (used by both modes) ─── */
  const renderContent = () => (
    <>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.badge}>{quizName}</div>
        <h2 className={styles.title}>Before You Begin</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Questions</span>
            <h3 className={styles.statValue}>
              {questionCount ? `~${questionCount}` : <span className={styles.statSkeleton} />}
            </h3>
            <span className={styles.statHint}>Adaptive</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Duration</span>
            <h3 className={styles.statValue}>
              {estimatedDuration ? `${estimatedDuration} Min` : <span className={styles.statSkeleton} />}
            </h3>
          </div>
        </div>
      </div>

      {/* What is this? — simple heading + text */}
      <div className={styles.instructionsSection}>
        <h3 className={styles.sectionTitle}>What is this?</h3>
        <p className={styles.whatIsThisText}>
          This diagnostic quiz helps us understand what you already know.
          Based on your results, we&apos;ll personalize your learning path —
          so you can skip what you&apos;ve already mastered and focus on
          what matters most.
        </p>
      </div>

      {/* What to expect — checklist */}
      <div className={styles.instructionsSection}>
        <h3 className={styles.sectionTitle}>What to expect</h3>
        <ul className={styles.instructionsList}>
          <li className={styles.instructionItem}>
            <span className={styles.checkIcon}>
              <CheckCircleIcon />
            </span>
            <span className={styles.instructionText}>
              ~{questionCount || "20"} adaptive questions — the quiz adjusts based on your answers
            </span>
          </li>
          <li className={styles.instructionItem}>
            <span className={styles.checkIcon}>
              <CheckCircleIcon />
            </span>
            <span className={styles.instructionText}>
              {estimatedDuration || "10"} minutes to complete
            </span>
          </li>
          <li className={styles.instructionItem}>
            <span className={styles.checkIcon}>
              <CheckCircleIcon />
            </span>
            <span className={styles.instructionText}>
              You cannot go back to previous questions once submitted
            </span>
          </li>
          <li className={styles.instructionItem}>
            <span className={styles.checkIcon}>
              <CheckCircleIcon />
            </span>
            <span className={styles.instructionText}>
              No penalty for wrong answers
            </span>
          </li>
        </ul>
      </div>

      {/* Tip */}
      <div className={styles.tipSection}>
        <span className={styles.tipIconWrap}>
          <LightbulbIcon />
        </span>
        <p className={styles.tipText}>
          <strong>Answer honestly!</strong> This helps us identify what you can
          skip, potentially saving you hours of study time.
        </p>
      </div>

      {/* Interface Instructions — flat list with icons */}
      <div className={styles.instructionsSection}>
        <h3 className={styles.sectionTitle}>Interface Instructions</h3>
        <ul className={styles.instructionsList}>
          {showTimer && (
            <li className={styles.instructionItem}>
              <span className={styles.tipIcon}>
                <ClockIcon />
              </span>
              <span className={styles.instructionText}>
                <strong>Quiz Timer:</strong> NEURON will display 2 timers — one
                for the overall quiz and one for each question.
              </span>
            </li>
          )}
          {isMathSection && (
            <li className={styles.instructionItem}>
              <span className={styles.tipIcon}>
                <CalculatorIcon />
              </span>
              <span className={styles.instructionText}>
                <strong>Desmos Calculator:</strong> A built-in graphing calculator
                is available during the quiz. Use it to solve equations and plot
                graphs.
              </span>
            </li>
          )}
          <li className={styles.instructionItem}>
            <span className={styles.tipIcon}>
              <span className={styles.strikethroughText}>ABC</span>
            </span>
            <span className={styles.instructionText}>
              <strong>Cross out choices:</strong> Eliminate incorrect or unwanted
              answer options to help you focus on the remaining choices.
            </span>
          </li>
        </ul>
      </div>

      {/* Important Guidelines — flat list with icons */}
      <div className={styles.instructionsSection}>
        <h3 className={styles.sectionTitle}>Important Guidelines</h3>
        <ul className={styles.instructionsList}>
          <li className={styles.instructionItem}>
            <span className={styles.tipIcon}>
              <WifiIcon />
            </span>
            <span className={styles.instructionText}>
              Ensure you have a <strong>stable internet connection.</strong>
            </span>
          </li>
          <li className={styles.instructionItem}>
            <span className={styles.tipIcon}>
              <NoBrowserNavIcon />
            </span>
            <span className={styles.instructionText}>
              DO NOT use the <strong>browser navigation buttons.</strong>
            </span>
          </li>
        </ul>
      </div>

      {/* Error */}
      {quizCreationError && (
        <div className={styles.errorMessage}>
          <div className={styles.errorText}>Error: {quizCreationError}</div>
        </div>
      )}
    </>
  );

  /* ─── Dropdown mode ─── */
  if (isDropdown) {
    return (
      <div className={styles.dropdownWrapper} onClick={onClose}>
        <div
          className={styles.dropdownContainer}
          onClick={(e) => e.stopPropagation()}
        >
          {renderContent()}

          {onClose && (
            <div className={styles.dropdownFooter}>
              <button className={styles.closeBtn} onClick={onClose}>
                <CloseIcon size={16} />
                <span>Close</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ─── Full-page mode ─── */
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {renderContent()}

        {/* Footer CTA */}
        <div className={styles.footer}>
          <div className={styles.btnRow}>
            {onGoBack && (
              <button
                className={styles.backBtn}
                onClick={onGoBack}
                disabled={isCreatingQuiz}
              >
                <ArrowLeftIcon size={16} />
                <span>Go Back</span>
              </button>
            )}
            <button
              id="demo-diagnostic-start"
              className={styles.startBtn}
              onClick={onStart}
              disabled={isCreatingQuiz}
            >
              <span>
                {isCreatingQuiz ? "Starting..." : "Start Diagnostic"}
              </span>
              <ArrowRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticQuizInstructions;
