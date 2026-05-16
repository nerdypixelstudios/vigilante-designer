import { useId } from 'react';
import styles from '../../styles/GaugeChart.module.css';

export default function GaugeChart({
  accuracy = 0,
  gradientConfig,
  showOverallLabel = false,
  percentageColor,
  compact = false,
  disabled = false,
}) {
  const uid = useId().replace(/:/g, '');
  const totalLength = 400;
  const displayAccuracy = disabled ? 0 : accuracy;
  const offset = totalLength - (totalLength * displayAccuracy) / 100;
  const radius = 127;
  const centerX = 147;
  const centerY = 141;
  const angle = Math.PI * (displayAccuracy / 100);
  const circleX = centerX - radius * Math.cos(angle);
  const circleY = centerY - radius * Math.sin(angle);

  const getGradientAndColor = (acc, config) => {
    if (disabled || !config || config.length === 0) {
      return { gradient: `url(#grayGradient${uid})`, color: '#cbd5e1' };
    }
    for (const range of config) {
      if (acc >= range.min && acc <= range.max) {
        const name = range.gradient.replace('url(#', '').replace(')', '');
        return { gradient: `url(#${name}${uid})`, color: range.color };
      }
    }
    const name = config[0].gradient.replace('url(#', '').replace(')', '');
    return { gradient: `url(#${name}${uid})`, color: config[0].color };
  };

  const { gradient, color } = getGradientAndColor(accuracy, gradientConfig);

  return (
    <div className={`${styles.container} ${compact ? styles.compact : ''}`}>
      <div className={styles.statsContainer}>
        <div className={`${styles.chartContainer} ${compact ? styles.compactChart : ''}`}>
          {!compact && <div className={styles.chartPlaceholder} />}
          <svg className={`${styles.chartSvg} ${compact ? styles.compactSvg : ''}`} viewBox="0 0 294 151">
            <defs>
              <linearGradient id={`greenGradient${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#12a150" />
                <stop offset="100%" stopColor="#17c964" />
              </linearGradient>
              <linearGradient id={`redGradient${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f31260" />
                <stop offset="100%" stopColor="#ff4757" />
              </linearGradient>
              <linearGradient id={`orangeGradient${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EE9500" />
                <stop offset="100%" stopColor="#FFA000" />
              </linearGradient>
              <linearGradient id={`grayGradient${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>
            <path
              className={styles.chartRingBackground}
              d="M 20 141 A 127 127 0 0 1 274 141"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
            />
            {displayAccuracy > 0 && (
              <path
                className={styles.chartRing}
                d="M 20 141 A 127 127 0 0 1 274 141"
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={totalLength}
                strokeDashoffset={offset}
                style={{ stroke: gradient }}
              />
            )}
            {!disabled && (
              <circle
                className={styles.progressCircle}
                cx={circleX}
                cy={circleY}
                r="12"
                style={{ fill: color }}
              />
            )}
          </svg>
          <div
            className={`${styles.percentageContainer} ${compact ? styles.compactPctContainer : ''}`}
          >
            <div
              className={`${styles.percentage} ${compact ? styles.compactPct : ''}`}
              style={percentageColor ? { color: percentageColor } : undefined}
            >
              {disabled ? '-' : `${accuracy}%`}
            </div>
            {showOverallLabel && <div className={styles.overallLabel}>Overall</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
