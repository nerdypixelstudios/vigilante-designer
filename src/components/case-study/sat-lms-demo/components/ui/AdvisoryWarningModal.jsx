/**
 * AdvisoryWarningModal
 *
 * Generic "Heads Up" advisory modal used across the app.
 * Pure presentational — parent controls open/close and all actions.
 *
 * Replaces:
 *   - ModuleMockAdvisoryAlert (PC10)
 *   - CementingWarningModal (before_learning, hard_before_medium, skip_to_mock)
 *
 * Features:
 *   - Configurable title, subtitle, body (JSX), progress bar, buttons
 *   - Theme presets: amber (default), blue, green, red
 *   - Focus trap, escape key, backdrop click, body scroll lock
 *   - Responsive: desktop-first with mobile breakpoint
 *   - Reduced motion support
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Dismiss handler (close btn, backdrop, escape)
 * @param {string} [props.title="Heads Up"] - Modal title
 * @param {string} [props.subtitle] - Subtitle below title
 * @param {React.ReactNode} props.body - Main content area (JSX)
 * @param {Object} [props.progress] - Optional progress bar
 * @param {number} props.progress.current - Completed / passed count
 * @param {number} props.progress.total - Target / total count
 * @param {string} [props.progress.label="Your Progress"] - Bar label
 * @param {React.ReactNode} [props.progress.hint] - Hint below bar (JSX)
 * @param {string} props.primaryLabel - Primary (recommended) button text
 * @param {Function} props.onPrimary - Primary button callback
 * @param {string} props.secondaryLabel - Secondary (continue anyway) button text
 * @param {Function} props.onSecondary - Secondary button callback
 * @param {string} [props.theme="amber"] - Color theme: "amber" | "blue" | "green" | "red"
 */

import { useEffect, useCallback, useRef } from 'react';
import {
  ExclamationTriangleIcon,
  LightningBoltIcon,
  CloseIcon
} from '../icons/DemoIcons';

const AdvisoryWarningModal = ({
  isOpen,
  onClose,
  title = 'Heads Up',
  subtitle,
  body,
  progress,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  theme = 'amber'
}) => {
  const modalRef = useRef(null);
  const primaryButtonRef = useRef(null);

  // ── Escape key → dismiss ────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose?.();
      }
    },
    [isOpen, onClose]
  );

  // ── Focus trap: keep Tab cycling inside the modal ───────────────────────
  const handleFocusTrap = useCallback(
    (event) => {
      if (event.key !== 'Tab' || !isOpen || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    },
    [isOpen]
  );

  // ── Lifecycle: keyboard listeners, focus, scroll lock ───────────────────
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keydown', handleFocusTrap);

      // Focus the primary (recommended) button on open
      setTimeout(() => {
        primaryButtonRef.current?.focus();
      }, 100);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleFocusTrap);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown, handleFocusTrap]);

  // ── Backdrop click → dismiss ────────────────────────────────────────────
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  if (!isOpen) return null;

  // ── Progress calculations ───────────────────────────────────────────────
  const progressPct =
    progress && progress.total > 0
      ? Math.round((progress.current / progress.total) * 100)
      : 0;
  const isBelowTarget = progress ? progress.current < progress.total : false;

  // ── Theme class ─────────────────────────────────────────────────────────
  const themeClass = `awm--${theme}`;

  return (
    <div
      className="awm-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={`awm-modal ${themeClass}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="awm-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - protruding style */}
        <button
          className="awm-close"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon size={18} />
        </button>

        {/* Header */}
        <div className="awm-header">
          <div className="awm-icon-wrapper">
            <ExclamationTriangleIcon size={32} />
          </div>
          <h2 id="awm-title" className="awm-title">{title}</h2>
          {subtitle && <p className="awm-subtitle">{subtitle}</p>}
        </div>

        {/* Content */}
        <div className="awm-content">
          <div className="awm-content-inner">
            {/* Body (JSX from parent) */}
            {body && <div className="awm-body">{body}</div>}

            {/* Progress bar */}
            {progress && (
              <div className="awm-progress-card">
                <div className="awm-progress-header">
                  <span className="awm-progress-label">
                    {progress.label || 'Your Progress'}
                  </span>
                  <span
                    className={`awm-progress-count ${isBelowTarget ? 'awm-progress-count--danger' : ''}`}
                  >
                    {progress.current}/{progress.total}
                  </span>
                </div>
                <div className="awm-progress-bar">
                  <div
                    className={`awm-progress-fill ${isBelowTarget ? 'awm-progress-fill--danger' : ''}`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                {progress.hint && (
                  <div className="awm-progress-hint">
                    <LightningBoltIcon size={14} />
                    <span>{progress.hint}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="awm-actions">
          <div className="awm-actions-inner">
            <button
              ref={primaryButtonRef}
              className="awm-btn awm-btn--primary"
              onClick={onPrimary}
            >
              {primaryLabel}
            </button>
            <button
              className="awm-btn awm-btn--secondary"
              onClick={onSecondary}
            >
              {secondaryLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryWarningModal;
