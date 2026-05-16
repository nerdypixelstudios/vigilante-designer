import { CheckIcon, InProgressIcon } from '../icons/DemoIcons';

const STAGE_DISPLAY = {
  'diagnostic': 'Diagnostic',
  'learning': 'Learning',
  'cementing': 'Cementing',
};

const JourneyChips = ({
  stages = [],
  currentStageIndex = 0,
  isCourseCompleted = false,
}) => {
  return (
    <div className={`journey-chips-container ${isCourseCompleted ? 'all-completed' : ''}`}>
      <div className="journey-chips-row">
        {stages.map((stage, stageIdx) => {
          const dots = stage.dots || [];
          const totalCount = dots.length;
          const completedCount = dots.filter(d => d.status === 'COMPLETED').length;
          const isCompleted = completedCount === totalCount && totalCount > 0;
          const isCurrent = stageIdx === currentStageIndex && !isCompleted;

          const tooltipText = dots.map(d => d.name).filter(Boolean).join(', ');
          const displayName = STAGE_DISPLAY[stage.name] || stage.label;

          if (isCompleted) {
            return (
              <span key={stage.name} className="journey-chip completed" title={tooltipText}>
                <CheckIcon size={12} />
                {displayName}
              </span>
            );
          }

          if (isCurrent) {
            return (
              <span key={stage.name} className="journey-chip current" title={tooltipText}>
                <InProgressIcon size={12} />
                {displayName}
                <span className="journey-chip-count">{completedCount}/{totalCount}</span>
              </span>
            );
          }

          return (
            <span key={stage.name} className="journey-chip not-started" title={tooltipText}>
              <span className="journey-chip-dot" />
              {displayName}
              <span className="journey-chip-count">0/{totalCount}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyChips;
