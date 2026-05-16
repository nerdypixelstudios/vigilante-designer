import { useState, useEffect, useRef } from 'react';
import {
  PlusCircleIcon,
  MinusCircleIcon,
  DiagnosticIcon,
  FullViewIcon,
  CementingIcon,
  CourseMockIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  CourseCompleteBadgeIcon,
  LightningBoltIcon,
  ClockIcon
} from '../icons/DemoIcons';

const PaceLogoWhite = ({ width = 40 }) => (
  <svg
    width={width}
    height={width * 0.3}
    viewBox="0 0 3570 1071"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3251.23 29.6953C3455.39 29.6953 3601.65 172.914 3563.56 389.265C3560.52 409.071 3554.42 434.972 3545.28 470.015H3024.21C3033.35 538.577 3086.68 581.238 3172 581.238C3239.04 581.238 3310.65 550.766 3362.45 508.105L3453.86 654.37C3370.07 730.55 3240.56 777.782 3121.72 777.782C2896.23 777.782 2763.67 622.375 2803.29 406.024C2842.9 174.437 3047.06 29.6953 3251.23 29.6953ZM3047.06 337.462H3347.21C3357.88 267.377 3303.03 220.145 3222.28 220.145C3155.24 220.145 3085.15 252.141 3047.06 337.462Z" fill="white"/>
    <path d="M2340.72 777.782C2133.51 777.782 1973.53 626.946 2013.15 401.453C2052.76 175.961 2264.54 29.6953 2471.75 29.6953C2608.88 29.6953 2701.81 96.7337 2753.62 197.291L2560.12 306.99C2538.79 264.329 2486.99 238.428 2436.71 238.428C2333.1 238.428 2259.97 313.085 2243.21 401.453C2227.98 491.346 2275.21 569.049 2377.29 569.049C2427.57 569.049 2490.03 543.148 2525.08 500.487L2680.48 610.186C2595.16 710.744 2477.85 777.782 2340.72 777.782Z" fill="white"/>
    <path d="M1689.86 133.3L1703.57 47.9785H1929.06L1804.13 759.499H1578.64L1593.87 668.083C1534.45 735.121 1439.99 777.782 1350.1 777.782C1150.51 777.782 1036.24 626.946 1075.85 404.5C1115.46 180.532 1281.54 29.6953 1484.17 29.6953C1571.02 29.6953 1651.77 67.7853 1689.86 133.3ZM1439.99 569.049C1532.93 569.049 1618.25 491.346 1633.49 404.5C1650.25 311.561 1589.3 238.428 1499.41 238.428C1403.42 238.428 1321.15 313.085 1305.91 404.5C1290.68 491.346 1344 569.049 1439.99 569.049Z" fill="white"/>
    <path d="M607.5 0C807.703 1.39164e-05 970 162.297 970 362.5C970 562.703 807.703 725 607.5 725H285L218 1071H0L87.4844 583H503.545C508.019 583.135 512.528 583.134 517.064 583H532.72C601.706 583 662.932 549.779 701.275 498.464C768.902 427.723 788.275 330.048 742.05 259.684C710.348 211.427 654.606 186.39 593.104 186.379C579.952 183.511 566.293 182 552.28 182H159.372L192 0H607.5Z" fill="white"/>
    <path d="M417.285 241.036C515.408 176.574 637.22 188.656 689.359 268.022C741.499 347.388 704.222 463.984 606.099 528.446L603.794 529.943C506.076 592.715 385.754 580.205 334.022 501.459L333.417 500.528C282.177 421.184 319.545 305.246 417.285 241.036ZM655.928 289.985C620.041 235.359 525.882 217.554 439.248 274.467C352.614 331.381 331.568 424.87 367.454 479.497C403.341 534.123 497.502 551.928 584.136 495.014C670.769 438.1 691.814 344.611 655.928 289.985ZM272 446.001C280.284 446.001 287 452.717 287 461.001C287 469.286 280.284 476.001 272 476.001H46C37.7158 476.001 31.0001 469.286 31 461.001C31 452.717 37.7157 446.001 46 446.001H272ZM507.551 384.615L589.198 393.898L499.244 396.987C498.533 397.196 497.776 397.296 496.994 397.265C496.574 397.248 496.164 397.193 495.768 397.106L495.248 397.124L495.254 396.976C492.268 396.08 490.147 393.254 490.275 389.995C490.307 389.184 490.476 388.411 490.758 387.698C490.805 387.456 490.863 387.216 490.937 386.978L490.811 386.9L491.114 386.478C491.263 386.1 491.446 385.729 491.666 385.372C492.076 384.705 492.58 384.132 493.149 383.658L545.816 310.667L507.551 384.615ZM242 354.001C250.284 354.001 257 360.717 257 369.001C257 377.286 250.284 384.001 242 384.001H16C7.71578 384.001 1.00009 377.286 1 369.001C1 360.717 7.71573 354.001 16 354.001H242ZM322 261.001C330.284 261.001 337 267.717 337 276.001C337 284.286 330.284 291.001 322 291.001H96C87.7158 291.001 81.0001 284.286 81 276.001C81 267.717 87.7157 261.001 96 261.001H322Z" fill="rgba(255,255,255,0.9)"/>
  </svg>
);

const PaceLogoGreen = ({ width = 80 }) => (
  <svg
    width={width}
    height={width * 0.3}
    viewBox="0 0 3570 1071"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3251.23 29.6953C3455.39 29.6953 3601.65 172.914 3563.56 389.265C3560.52 409.071 3554.42 434.972 3545.28 470.015H3024.21C3033.35 538.577 3086.68 581.238 3172 581.238C3239.04 581.238 3310.65 550.766 3362.45 508.105L3453.86 654.37C3370.07 730.55 3240.56 777.782 3121.72 777.782C2896.23 777.782 2763.67 622.375 2803.29 406.024C2842.9 174.437 3047.06 29.6953 3251.23 29.6953ZM3047.06 337.462H3347.21C3357.88 267.377 3303.03 220.145 3222.28 220.145C3155.24 220.145 3085.15 252.141 3047.06 337.462Z" fill="#16a34a"/>
    <path d="M2340.72 777.782C2133.51 777.782 1973.53 626.946 2013.15 401.453C2052.76 175.961 2264.54 29.6953 2471.75 29.6953C2608.88 29.6953 2701.81 96.7337 2753.62 197.291L2560.12 306.99C2538.79 264.329 2486.99 238.428 2436.71 238.428C2333.1 238.428 2259.97 313.085 2243.21 401.453C2227.98 491.346 2275.21 569.049 2377.29 569.049C2427.57 569.049 2490.03 543.148 2525.08 500.487L2680.48 610.186C2595.16 710.744 2477.85 777.782 2340.72 777.782Z" fill="#16a34a"/>
    <path d="M1689.86 133.3L1703.57 47.9785H1929.06L1804.13 759.499H1578.64L1593.87 668.083C1534.45 735.121 1439.99 777.782 1350.1 777.782C1150.51 777.782 1036.24 626.946 1075.85 404.5C1115.46 180.532 1281.54 29.6953 1484.17 29.6953C1571.02 29.6953 1651.77 67.7853 1689.86 133.3ZM1439.99 569.049C1532.93 569.049 1618.25 491.346 1633.49 404.5C1650.25 311.561 1589.3 238.428 1499.41 238.428C1403.42 238.428 1321.15 313.085 1305.91 404.5C1290.68 491.346 1344 569.049 1439.99 569.049Z" fill="#16a34a"/>
    <path d="M607.5 0C807.703 1.39164e-05 970 162.297 970 362.5C970 562.703 807.703 725 607.5 725H285L218 1071H0L87.4844 583H503.545C508.019 583.135 512.528 583.134 517.064 583H532.72C601.706 583 662.932 549.779 701.275 498.464C768.902 427.723 788.275 330.048 742.05 259.684C710.348 211.427 654.606 186.39 593.104 186.379C579.952 183.511 566.293 182 552.28 182H159.372L192 0H607.5Z" fill="#16a34a"/>
    <path d="M417.285 241.036C515.408 176.574 637.22 188.656 689.359 268.022C741.499 347.388 704.222 463.984 606.099 528.446L603.794 529.943C506.076 592.715 385.754 580.205 334.022 501.459L333.417 500.528C282.177 421.184 319.545 305.246 417.285 241.036ZM655.928 289.985C620.041 235.359 525.882 217.554 439.248 274.467C352.614 331.381 331.568 424.87 367.454 479.497C403.341 534.123 497.502 551.928 584.136 495.014C670.769 438.1 691.814 344.611 655.928 289.985ZM272 446.001C280.284 446.001 287 452.717 287 461.001C287 469.286 280.284 476.001 272 476.001H46C37.7158 476.001 31.0001 469.286 31 461.001C31 452.717 37.7157 446.001 46 446.001H272ZM507.551 384.615L589.198 393.898L499.244 396.987C498.533 397.196 497.776 397.296 496.994 397.265C496.574 397.248 496.164 397.193 495.768 397.106L495.248 397.124L495.254 396.976C492.268 396.08 490.147 393.254 490.275 389.995C490.307 389.184 490.476 388.411 490.758 387.698C490.805 387.456 490.863 387.216 490.937 386.978L490.811 386.9L491.114 386.478C491.263 386.1 491.446 385.729 491.666 385.372C492.076 384.705 492.58 384.132 493.149 383.658L545.816 310.667L507.551 384.615ZM242 354.001C250.284 354.001 257 360.717 257 369.001C257 377.286 250.284 384.001 242 384.001H16C7.71578 384.001 1.00009 377.286 1 369.001C1 360.717 7.71573 354.001 16 354.001H242ZM322 261.001C330.284 261.001 337 267.717 337 276.001C337 284.286 330.284 291.001 322 291.001H96C87.7158 291.001 81.0001 284.286 81 276.001C81 267.717 87.7157 261.001 96 261.001H322Z" fill="rgba(22, 163, 74, 0.7)"/>
  </svg>
);

const formatTimeSaved = (hours) => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

const useAnimatedCounter = (targetValue, isActive, duration = 600) => {
  const [displayValue, setDisplayValue] = useState(isActive ? targetValue : 0);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const currentValueRef = useRef(isActive ? targetValue : 0);

  useEffect(() => {
    const target = isActive ? targetValue : 0;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    const startValue = currentValueRef.current;
    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newValue = startValue + (target - startValue) * easeOut;
      currentValueRef.current = newValue;
      setDisplayValue(newValue);
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, isActive, duration]);

  return displayValue;
};

const CourseJourneyTrack = ({
  stages,
  currentStageIndex,
  currentDotIndex,
  currentBlockIndex = 0,
  isStatsExpanded,
  onStatsToggle,
  isCourseCompleted = false,
  paceEnabled = false,
  isPaceOn = true,
  onPaceToggle,
  hoursSaved = 0,
  activitiesSkipped = 0,
  paceAnimating = false,
  children
}) => {
  const animatedActivities = useAnimatedCounter(activitiesSkipped, isPaceOn);
  const animatedHours = useAnimatedCounter(hoursSaved, isPaceOn);
  const displayActivities = Math.round(animatedActivities);
  const displayTime = formatTimeSaved(animatedHours);

  if (!stages || stages.length === 0) {
    return null;
  }

  const safeStageIndex = Math.max(0, Math.min(currentStageIndex, stages.length - 1));

  const getStageIcon = (stageName) => {
    const iconSize = 22;
    const iconProps = { size: iconSize, className: 'mobile-stage-icon' };

    const lowerName = stageName.toLowerCase();
    if (lowerName.includes('diagnostic')) {
      return <DiagnosticIcon {...iconProps} />;
    } else if (lowerName.includes('learning') || lowerName.includes('module')) {
      return <FullViewIcon {...iconProps} />;
    } else if (lowerName.includes('cementing')) {
      return <CementingIcon {...iconProps} />;
    } else if (lowerName.includes('assessment') || lowerName.includes('mock')) {
      return <CourseMockIcon {...iconProps} />;
    }
    return <FullViewIcon {...iconProps} />;
  };

  let totalDots = 0;
  let completedDots = 0;

  stages.forEach((stage) => {
    if (!stage.dots) return;
    stage.dots.forEach((dot) => {
      totalDots++;
      if (dot.status === 'COMPLETED') {
        completedDots++;
      }
    });
  });

  const numStages = stages.length;
  const stageWidth = 100 / numStages;

  let fillToCurrentDot = 0;
  if (currentStageIndex >= 0 && currentStageIndex < stages.length) {
    const dotsInCurrentStage = stages[currentStageIndex]?.dots?.length || 1;
    const stageStart = currentStageIndex * stageWidth;
    const positionInStage = (currentDotIndex + 1) / dotsInCurrentStage;
    fillToCurrentDot = stageStart + (positionInStage * stageWidth);
  }

  let fillToLastCompleted = 0;
  let furthestStageIdx = -1;
  let furthestDotIdx = -1;

  stages.forEach((stage, stageIdx) => {
    stage.dots?.forEach((dot, dotIdx) => {
      if (dot.status === 'COMPLETED') {
        if (stageIdx > furthestStageIdx || (stageIdx === furthestStageIdx && dotIdx > furthestDotIdx)) {
          furthestStageIdx = stageIdx;
          furthestDotIdx = dotIdx;
        }
      }
    });
  });

  if (furthestStageIdx >= 0) {
    const dotsInFurthestStage = stages[furthestStageIdx]?.dots?.length || 1;
    const stageStart = furthestStageIdx * stageWidth;
    const positionInStage = (furthestDotIdx + 1) / dotsInFurthestStage;
    fillToLastCompleted = stageStart + (positionInStage * stageWidth);
  }

  const fillPercent = Math.max(fillToCurrentDot, fillToLastCompleted);
  const completionPercent = totalDots > 0 ? Math.round((completedDots / totalDots) * 100) : 0;

  const currentStageNameRaw = stages[safeStageIndex]?.label || '';
  const currentStageName = currentStageNameRaw.charAt(0).toUpperCase() + currentStageNameRaw.slice(1).toLowerCase();

  return (
    <div className={`course-journey-track ${isCourseCompleted ? 'completed' : ''}`}>
      {isCourseCompleted ? (
        <div className="journey-stats-row journey-stats-completed">
          <CourseCompleteBadgeIcon size={22} className="journey-complete-badge" />
          <span className="journey-completion-text">Course Complete</span>
          <span className="journey-dot-separator">·</span>
          <span className="journey-completion-modules">All {totalDots} modules done</span>
        </div>
      ) : (
        <div className="journey-stats-row">
          <span className="journey-percent">{completionPercent}%</span>
          <span className="journey-percent-label">complete</span>
          <span className="journey-dot-separator">·</span>
          <span className="journey-module-count">
            <span className="journey-completed-count">{completedDots}</span>
            <span className="journey-total-count">/{totalDots}</span>
            <span className="journey-modules-label">modules</span>
          </span>
          <span className="journey-dot-separator">·</span>
          <div className="journey-current-stage-pill">
            <span className="journey-pulse-dot" />
            <span className="journey-stage-text">{currentStageName}</span>
          </div>
        </div>
      )}

      <div className="journey-stage-labels journey-desktop-only">
        {stages.map((stage, stageIdx) => {
          const isCompleted = stageIdx < safeStageIndex;
          const isCurrent = stageIdx === safeStageIndex;

          return (
            <div key={stage.name} className="journey-stage-label-container">
              <span className={`journey-stage-label ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="journey-track-container journey-desktop-only">
        <div className="journey-track-bg" />
        <div
          className="journey-track-fill"
          style={{ width: `calc(${fillPercent}%)` }}
        />
        <div className="journey-dots-row">
          {stages.map((stage, stageIdx) => {
            const isCurrent = stageIdx === safeStageIndex;

            return (
              <div key={stage.name} className="journey-stage-dots">
                {stage.dots?.map((dot, dotIdx) => {
                  const dotCompleted = dot.status === 'COMPLETED';
                  const dotCurrent = isCurrent && dotIdx === currentDotIndex;
                  const dotSkipped = dot.status === 'NOT_STARTED' &&
                    dot.blockIndex !== undefined &&
                    dot.blockIndex < currentBlockIndex;

                  return (
                    <div
                      key={dot.id || dotIdx}
                      className={`journey-dot ${dotCompleted ? 'completed' : ''} ${dotCurrent ? 'current' : ''} ${dotSkipped ? 'skipped' : ''}`}
                      title={dotSkipped ? `${dot.name}: Skipped - you jumped ahead without completing this module` : dot.name}
                    >
                      {dotSkipped && (
                        <ExclamationTriangleIcon size={8} className="journey-dot-warning-icon" />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="journey-mobile-track">
        {stages.map((stage, stageIdx) => {
          const isCompleted = stageIdx < safeStageIndex;
          const isCurrent = stageIdx === safeStageIndex;
          const isLast = stageIdx === stages.length - 1;
          const stageLabel = stage.label.charAt(0).toUpperCase() + stage.label.slice(1).toLowerCase();

          return (
            <div key={stage.name} className="mobile-journey-stage-container">
              <div className="mobile-stage-wrapper">
                <div className={`mobile-stage-circle ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                  {getStageIcon(stage.name)}
                </div>
                <div className="mobile-stage-label">{stageLabel}</div>
              </div>
              {!isLast && (
                <div className={`mobile-stage-connector ${isCompleted ? 'filled' : ''}`} />
              )}
            </div>
          );
        })}
      </div>

      {paceEnabled && (
        <div className={`journey-pace-row ${isPaceOn ? 'pace-on' : 'pace-off'} ${paceAnimating ? 'pace-whoosh' : ''}`}>
          <div className="journey-pace-desktop">
            <div className="journey-pace-left">
              <span className="journey-pace-lightning">
                <LightningBoltIcon size={20} />
              </span>
              <span className="journey-pace-title">Personalized Path</span>
              <span className="journey-pace-dot">·</span>
              <span className="journey-pace-metrics">
                <span className="journey-pace-metric">
                  <span className="journey-pace-value journey-pace-value--blue">{displayActivities}</span>
                  <span className="journey-pace-label">activities skipped</span>
                </span>
                <span className="journey-pace-dot">·</span>
                <span className="journey-pace-metric">
                  <span className="journey-pace-value journey-pace-value--green">{displayTime}</span>
                  <span className="journey-pace-label">saved</span>
                </span>
              </span>
            </div>
            <button
              className={`journey-pace-toggle ${isPaceOn ? 'journey-pace-toggle--on' : ''}`}
              onClick={() => onPaceToggle?.(!isPaceOn)}
              aria-pressed={isPaceOn}
              aria-label={`PACE is ${isPaceOn ? 'on' : 'off'}. Click to turn ${isPaceOn ? 'off' : 'on'}.`}
            >
              <PaceLogoWhite width={56} />
              <div className="journey-pace-toggle-switch">
                <div className="journey-pace-toggle-knob" />
              </div>
            </button>
          </div>

          <div className="journey-pace-mobile">
            <div className="journey-pace-mobile-logo">
              <PaceLogoGreen width={80} />
            </div>
            <div className="journey-pace-mobile-separator" />
            <div className="journey-pace-mobile-time">
              <ClockIcon size={18} />
              <span className="journey-pace-mobile-time-value">{displayTime}</span>
              <span className="journey-pace-mobile-time-label">saved</span>
            </div>
            <button
              className={`journey-pace-mobile-toggle ${isPaceOn ? 'journey-pace-mobile-toggle--on' : ''}`}
              onClick={() => onPaceToggle?.(!isPaceOn)}
              aria-pressed={isPaceOn}
              aria-label={`PACE is ${isPaceOn ? 'on' : 'off'}. Click to turn ${isPaceOn ? 'off' : 'on'}.`}
            >
              <div className="journey-pace-mobile-toggle-knob" />
            </button>
          </div>
        </div>
      )}

      {onStatsToggle && (
        <button
          className={`journey-stats-toggle ${isStatsExpanded ? 'expanded' : ''}`}
          onClick={onStatsToggle}
        >
          {isStatsExpanded ? <MinusCircleIcon size={16} /> : <PlusCircleIcon size={16} />}
          <span>{isStatsExpanded ? 'Hide Course Stats' : 'View Course Stats'}</span>
        </button>
      )}

      {children && (
        <div className={`journey-stats-panel ${isStatsExpanded ? 'expanded' : ''}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default CourseJourneyTrack;
