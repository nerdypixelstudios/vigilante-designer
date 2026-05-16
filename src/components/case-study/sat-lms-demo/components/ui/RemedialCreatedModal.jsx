import { useEffect, useCallback, useRef } from 'react';
import {
  CloseIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  CheckIcon,
  RemedialIcon,
  ArrowRightIcon,
} from '../icons/DemoIcons';

const RemedialCreatedModal = ({
  isOpen,
  motherActivityName,
  mistakeCount,
  questionCount,
  estimatedTimeMinutes,
  remedialActivityId,
  onStartRemedial,
  onClose,
}) => {
  const modalRef = useRef(null);
  const startButtonRef = useRef(null);

  const formatMistakes = (count) => {
    if (count === 1) return '1 mistake';
    return `${count} mistakes`;
  };

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape' && isOpen) onClose?.();
  }, [isOpen, onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose?.();
  };

  const handleStartRemedial = () => {
    onStartRemedial?.(remedialActivityId);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => { startButtonRef.current?.focus(); }, 100);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="remedial-created-modal-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="remedial-created-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="remedial-created-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="remedial-created-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon size={18} />
        </button>

        <div className="remedial-created-modal-header">
          <div className="remedial-created-modal-badge">
            <span className="remedial-created-modal-badge-dot" />
            Remedial Activity Created
          </div>
          <h2 id="remedial-created-modal-title" className="remedial-created-modal-title">
            Plug your gaps before moving on
          </h2>
        </div>

        <div className="remedial-created-modal-content">
          <p className="remedial-created-modal-description">
            Based on your{' '}
            <strong className="remedial-created-modal-highlight">
              {formatMistakes(mistakeCount)}
            </strong>{' '}
            in this quiz, we&apos;ve prepared a targeted practice to fix these gaps right away.
          </p>

          <div className="remedial-created-modal-activity-preview">
            <div className="remedial-created-modal-activity-preview__info">
              <span className="remedial-created-modal-rem-badge">
                <RemedialIcon size={12} />
                <span>REM.</span>
              </span>
              <span className="remedial-created-modal-activity-preview__name">
                {motherActivityName}
              </span>
            </div>
            <div className="remedial-created-modal-activity-preview__meta">
              <span className="remedial-created-modal-activity-preview__stat">
                <ClipboardDocumentListIcon size={14} />
                {questionCount} Qs
              </span>
              <span className="remedial-created-modal-activity-preview__stat">
                <ClockIcon size={14} />
                {estimatedTimeMinutes} min
              </span>
            </div>
          </div>

          <div className="remedial-created-modal-benefits">
            <div className="remedial-created-modal-benefit-item">
              <span className="remedial-created-modal-benefit-check">
                <CheckIcon size={12} />
              </span>
              <span>Targeted practice</span>
            </div>
            <div className="remedial-created-modal-benefit-item">
              <span className="remedial-created-modal-benefit-check">
                <CheckIcon size={12} />
              </span>
              <span>Fresh in memory</span>
            </div>
          </div>

          <button
            ref={startButtonRef}
            className="remedial-created-modal-button"
            onClick={handleStartRemedial}
          >
            <span className="remedial-created-modal-button-text">Start Remedial</span>
            <ArrowRightIcon size={20} className="remedial-created-modal-button-arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemedialCreatedModal;
