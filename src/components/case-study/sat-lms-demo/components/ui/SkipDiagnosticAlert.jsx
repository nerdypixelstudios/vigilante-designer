/**
 * SkipDiagnosticAlert (PC6)
 *
 * Modal shown when student clicks any activity before taking the diagnostic.
 * Encourages taking diagnostic but allows skipping.
 *
 * Trigger: diagnostic_status === 'not_attempted' && !skip_alert_shown && activity_clicked
 * Shows once per course only (skip_alert_shown persisted permanently)
 *
 * Architecture: Standalone presentational component (props in → UI out)
 * Shell pattern matches PC8 (PaceOnboardingOverlay)
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Called when modal is dismissed
 * @param {Function} props.onLaunchDiagnostic - Called when "Launch Diagnostic" is clicked
 * @param {Function} props.onSkip - Called when "Skip for Now" is clicked
 * @param {number} [props.estimatedDuration=25] - Estimated diagnostic duration in minutes
 * @param {number} [props.hoursCouldSave=12] - Hours that could be saved with PACE
 */

import {
  LightningBoltIcon,
  WarningCircleFilledIcon,
  CheckmarkIcon,
  ArrowRightIcon,
  CloseIcon
} from '../icons/DemoIcons';

const SkipDiagnosticAlert = ({
  isOpen,
  onClose,
  onLaunchDiagnostic,
  onSkip,
  estimatedDuration = 25,
  hoursCouldSave = 12
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      id="demo-skip-diagnostic-alert"
      className="sda-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="sda-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sda-title"
      >
        {/* Close button - protruding style */}
        <button
          className="sda-close"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* Header */}
        <div className="sda-header">
          <div className="sda-icon-wrapper">
            <LightningBoltIcon size={36} />
          </div>
          <h2 id="sda-title" className="sda-title">Personalize Your Learning Path</h2>
          <p className="sda-subtitle">
            <WarningCircleFilledIcon />
            <span>You haven&apos;t taken the diagnostic for this course yet.</span>
          </p>

          {/* Chip positioned on header/content border */}
          <div className="sda-chip">
            Takes only {estimatedDuration} mins
          </div>
        </div>

        {/* Content */}
        <div className="sda-content">
          <div className="sda-content-inner">
            <p className="sda-context">
              Students who take the diagnostic save up to <strong>70% of study time</strong> by focusing only on what they need to learn.
            </p>

            <div className="sda-benefits">
              <div className="sda-benefits-label">What you&apos;ll get</div>
              <ul className="sda-benefits-list">
                <li className="sda-benefit">
                  <span className="sda-benefit-icon">
                    <CheckmarkIcon />
                  </span>
                  <span className="sda-benefit-text">Personalized learning path tailored to you</span>
                </li>
                <li className="sda-benefit">
                  <span className="sda-benefit-icon">
                    <CheckmarkIcon />
                  </span>
                  <span className="sda-benefit-text">Skip content you already know</span>
                </li>
                <li className="sda-benefit sda-benefit--highlight">
                  <span className="sda-benefit-icon">
                    <CheckmarkIcon />
                  </span>
                  <span className="sda-benefit-text">
                    Save up to {hoursCouldSave} hours of study time
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sda-actions">
          <div className="sda-actions-inner">
            <button
              className="sda-btn sda-btn--secondary"
              onClick={onSkip}
            >
              Skip for Now
            </button>
            <button
              className="sda-btn sda-btn--primary"
              onClick={onLaunchDiagnostic}
            >
              Launch Diagnostic
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipDiagnosticAlert;
