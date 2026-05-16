import { ClockIcon } from '../icons/DemoIcons';

export const formatEstimatedTime = (minutes) => {
  if (!minutes || minutes <= 0) return null;
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
};

export const calculateTotalMinutes = (activities) => {
  if (!activities || !Array.isArray(activities)) return 0;
  return activities.reduce((sum, a) => sum + (a.estimatedMinutes || a.estimatedDurationMinutes || 0), 0);
};

const TimeBadge = ({ time, minutes, size = 'sm', tooltip, customIcon, customTheme }) => {
  const displayTime = time || formatEstimatedTime(minutes);
  if (!displayTime) return null;
  const tooltipText = tooltip || `Estimated time: ${displayTime}`;
  const IconComponent = customIcon || <ClockIcon size={size === 'xs' ? 10 : size === 'sm' ? 12 : 14} />;
  return (
    <span
      className={`time-badge time-badge-${size} ${customTheme ? `time-badge-${customTheme}` : ''}`}
      title={tooltipText}
      role="img"
      aria-label={tooltipText}
    >
      {IconComponent}
      <span className="time-badge-text">{displayTime}</span>
    </span>
  );
};

export default TimeBadge;
