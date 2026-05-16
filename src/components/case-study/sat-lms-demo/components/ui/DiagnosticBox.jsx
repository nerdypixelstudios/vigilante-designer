import {
  DocumentIcon,
  ClockIcon,
  AssessmentIcon,
  LightningBoltIcon,
  RefreshIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from '../icons/DemoIcons';

const formatTimeSpent = (totalSeconds) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const DiagnosticBox = ({
  status = 'not_attempted',
  diagnosticConfig = { estimated_duration_minutes: 25, question_count: 20 },
  progress = null,
  results = null,
  onTakeDiagnostic,
  onResumeDiagnostic,
  onViewResults,
}) => {
  const estimatedDuration = diagnosticConfig.estimated_duration_minutes || diagnosticConfig.estimated_duration || 25;

  if (status === 'not_attempted') {
    return (
      <div
        className="diagnostic-box diagnostic-box--not-attempted"
        onClick={onTakeDiagnostic}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onTakeDiagnostic?.()}
        aria-label="Take diagnostic to personalize your learning path"
      >
        <div className="diagnostic-box__content">
          <div className="diagnostic-box__left-group">
            <div className="diagnostic-box__icon-container">
              <LightningBoltIcon size={20} />
            </div>
            <div className="diagnostic-box__text-group">
              <h2 className="diagnostic-box__title">Personalize Your Path</h2>
              <p className="diagnostic-box__description">
                Take a quick diagnostic to discover what you already know.
                Students typically <strong className="diagnostic-box__emphasis">save up to 70%</strong> of study time.
              </p>
              <div className="diagnostic-box__meta">
                <span className="diagnostic-box__chip" title="This is a timed diagnostic quiz">
                  <ClockIcon size={11} />
                  {estimatedDuration} min
                </span>
                <span className="diagnostic-box__chip" title="Total number of questions in the diagnostic">
                  <DocumentIcon size={11} />
                  {diagnosticConfig.question_count} questions
                </span>
                <span className="diagnostic-box__chip" title="You only need to take this once per course">
                  <AssessmentIcon size={11} />
                  One-time assessment
                </span>
              </div>
            </div>
          </div>
          <button
            className="diagnostic-box__cta"
            onClick={(e) => { e.stopPropagation(); onTakeDiagnostic?.(); }}
            aria-label="Start diagnostic assessment"
          >
            Take Diagnostic
            <ArrowRightIcon size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (status === 'in_progress') {
    const progressPercent = progress
      ? Math.round((progress.questions_completed / progress.total_questions) * 100)
      : 0;

    return (
      <div
        className="diagnostic-box diagnostic-box--in-progress"
        onClick={onResumeDiagnostic}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onResumeDiagnostic?.()}
        aria-label="Resume diagnostic assessment"
      >
        <div className="diagnostic-box__content">
          <div className="diagnostic-box__left-group">
            <div className="diagnostic-box__icon-container">
              <RefreshIcon size={20} />
            </div>
            <div className="diagnostic-box__text-group">
              <h2 className="diagnostic-box__title diagnostic-box__title--amber">
                Diagnostic In Progress
              </h2>
              <p className="diagnostic-box__description">
                You started but didn&apos;t finish. <strong>Pick up where you left off</strong> to personalize your learning path.
              </p>
              <div className="diagnostic-box__progress-container">
                <div
                  className="diagnostic-box__progress-track"
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="diagnostic-box__progress-fill" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              <div className="diagnostic-box__meta">
                <span className="diagnostic-box__chip">
                  <ClockIcon size={11} />
                  {progress?.time_remaining_minutes} min left
                </span>
                <span className="diagnostic-box__chip">
                  <DocumentIcon size={11} />
                  {progress?.questions_completed}/{progress?.total_questions} completed
                </span>
              </div>
            </div>
          </div>
          <button
            className="diagnostic-box__cta diagnostic-box__cta--amber"
            onClick={(e) => { e.stopPropagation(); onResumeDiagnostic?.(); }}
          >
            Resume Diagnostic
            <ArrowRightIcon size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (status === 'completed') {
    return (
      <div
        className="diagnostic-box diagnostic-box--completed"
        onClick={onViewResults}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onViewResults?.()}
        aria-label="Review diagnostic results"
      >
        <div className="diagnostic-box__completed-row">
          <div className="diagnostic-box__completed-left">
            <div className="diagnostic-box__icon-container diagnostic-box__icon-container--completed">
              <CheckCircleIcon size={20} />
            </div>
            <span className="diagnostic-box__completed-title">Diagnostic Complete</span>
          </div>
          <div className="diagnostic-box__stats">
            <span className="diagnostic-box__stat">{results?.score || 0}%</span>
            {results?.grade && (
              <span className={`diagnostic-box__grade-badge diagnostic-box__grade-badge--${String(results.grade).toLowerCase()}`}>{results.grade}</span>
            )}
            <div className="diagnostic-box__stat-divider" />
            <span className="diagnostic-box__stat">
              {formatTimeSpent((results?.time_spent_minutes || 0) * 60)}
            </span>
            <div className="diagnostic-box__stat-divider" />
            <span className="diagnostic-box__view-results-label">View Results</span>
            <ChevronRightIcon size={16} className="diagnostic-box__completed-chevron" />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DiagnosticBox;
