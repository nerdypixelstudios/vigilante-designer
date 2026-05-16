import { useEffect, useState, useRef, useMemo } from 'react';
import {
  LightningBoltIcon,
  CloseIcon,
  BookOpenIcon,
  ChevronRightIcon,
  GridIcon,
  PlayIcon,
  PencilSquareIcon,
  UQEIcon,
  TrophyOutlineIcon,
  CementingQuizIcon,
  RemedialIcon,
  RevisionActivityIcon,
} from '../icons/DemoIcons';

const getActivityIcon = (type, subType) => {
  const normalizedType = (type || '').toLowerCase();
  const normalizedSubType = (subType || '').toLowerCase();

  if (normalizedSubType === 'concept' || normalizedType === 'concept') {
    return <BookOpenIcon size={14} />;
  }
  if (normalizedSubType === 'process_skill' || normalizedSubType === 'skill' || normalizedType === 'skill') {
    return <PencilSquareIcon size={14} />;
  }

  switch (normalizedType) {
    case 'uqe': return <UQEIcon size={14} />;
    case 'module_mock': return <TrophyOutlineIcon size={14} />;
    case 'cementing': return <CementingQuizIcon size={14} />;
    case 'remedial': return <RemedialIcon size={14} />;
    case 'revision': return <RevisionActivityIcon size={14} />;
    default: return <BookOpenIcon size={14} />;
  }
};

const CONFETTI_COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

const ConfettiParticle = ({ delay, left, color, size, rotation }) => (
  <div
    className="pc7-confetti-particle"
    style={{
      '--delay': `${delay}ms`,
      '--left': `${left}%`,
      '--color': color,
      '--size': `${size}px`,
      '--rotation': `${rotation}deg`,
    }}
  />
);

const PostDiagnosticChoiceModal = ({
  isOpen,
  onClose,
  onStartLearning,
  onViewCourse,
  hoursSaved = 12.5,
  activitiesSkipped = 24,
  totalActivities = 48,
  firstActivity = null,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTriggered = useRef(false);

  const confettiParticles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      delay: Math.random() * 300,
      left: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 6 + Math.random() * 6,
      rotation: Math.random() * 360,
    })),
  []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setIsVisible(true));
      if (!confettiTriggered.current) {
        setShowConfetti(true);
        confettiTriggered.current = true;
        setTimeout(() => setShowConfetti(false), 2000);
      }
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className={`pc7-backdrop ${isVisible ? 'pc7-backdrop--visible' : ''}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pc7-title"
    >
      {showConfetti && (
        <div className="pc7-confetti-container" aria-hidden="true">
          {confettiParticles.map((particle) => (
            <ConfettiParticle key={particle.id} {...particle} />
          ))}
        </div>
      )}

      <div className="pc7-badge">
        <LightningBoltIcon size={16} />
        <span>P.A.C.E NOW AVAILABLE</span>
      </div>

      <div className="pc7-modal">
        <button className="pc7-close" onClick={onClose} aria-label="Close modal">
          <CloseIcon size={18} />
        </button>

        <div className="pc7-header">
          <h2 id="pc7-title" className="pc7-title">Your Personalized Path is Ready!</h2>
          <p className="pc7-subtitle">What would you like to do?</p>
        </div>

        <div className="pc7-choices">
          {firstActivity && (
            <>
              <button className="pc7-choice pc7-choice--primary" onClick={onStartLearning}>
                <div className="pc7-choice__main">
                  <div className="pc7-choice__icon-box pc7-choice__icon-box--primary">
                    <PlayIcon size={24} />
                  </div>
                  <div className="pc7-choice__content">
                    <span className="pc7-choice__title">Dive into your first recommended activity</span>
                    <div className="pc7-activity-row">
                      <div className="pc7-activity-row__info">
                        <span className="pc7-activity-row__icon">
                          {getActivityIcon(firstActivity.type, firstActivity.subType)}
                        </span>
                        {firstActivity.number && (
                          <span className="pc7-activity-row__number">{firstActivity.number}</span>
                        )}
                        <span className="pc7-activity-row__name">{firstActivity.name}</span>
                      </div>
                      <span className="pc7-activity-row__duration">~{firstActivity.duration}m</span>
                    </div>
                  </div>
                </div>
                <div className="pc7-choice__chevron pc7-choice__chevron--primary">
                  <ChevronRightIcon size={20} />
                </div>
              </button>

              <div className="pc7-separator"><span>or</span></div>
            </>
          )}

          <button
            id="demo-choice-view-course"
            className="pc7-choice pc7-choice--secondary"
            onClick={onViewCourse}
          >
            <div className="pc7-choice__main">
              <div className="pc7-choice__icon-box pc7-choice__icon-box--secondary">
                <GridIcon size={22} />
              </div>
              <div className="pc7-choice__content">
                <span className="pc7-choice__title">View your personalized course</span>
                <span className="pc7-choice__desc">See your course structure with shaded activities</span>
                <div className="pc7-stats">
                  <div className="pc7-stats__item">
                    <LightningBoltIcon size={14} className="pc7-stats__icon" />
                    <span className="pc7-stats__value">{activitiesSkipped}</span>
                    <span className="pc7-stats__label">
                      <span className="pc7-stats__label-detail">/{totalActivities} can be </span>skipped
                    </span>
                  </div>
                  <span className="pc7-stats__divider">•</span>
                  <div className="pc7-stats__item">
                    <span className="pc7-stats__value">{hoursSaved}h</span>
                    <span className="pc7-stats__label">time saving</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pc7-choice__chevron pc7-choice__chevron--secondary">
              <ChevronRightIcon size={18} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDiagnosticChoiceModal;
