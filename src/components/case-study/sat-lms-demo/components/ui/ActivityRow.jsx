import {
  CompleteIcon, InProgressIcon, CircleIcon, SkippedCheckmarkIcon,
  BookOpenIcon, PencilSquareIcon, UQEIcon, TrophyOutlineIcon,
  CementingQuizIcon, RemedialIcon, ClockIcon,
} from '../icons/DemoIcons';
import styles from '../../styles/demo.module.css';

function getTypeIcon(type) {
  switch ((type || '').toLowerCase()) {
    case 'concept':      return <BookOpenIcon size={13} />;
    case 'skill':
    case 'process_skill': return <PencilSquareIcon size={13} />;
    case 'uqe':          return <UQEIcon size={13} />;
    case 'module_mock':  return <TrophyOutlineIcon size={13} />;
    case 'cementing':    return <CementingQuizIcon size={13} />;
    case 'remedial':     return <RemedialIcon size={13} />;
    default:             return <BookOpenIcon size={13} />;
  }
}

function getTypeIconClass(type) {
  switch ((type || '').toLowerCase()) {
    case 'concept':      return styles.iconConcept;
    case 'skill':
    case 'process_skill': return styles.iconSkill;
    case 'uqe':          return styles.iconUQE;
    case 'module_mock':  return styles.iconMock;
    case 'cementing':    return styles.iconCement;
    case 'remedial':     return styles.iconRemedial;
    default:             return styles.iconConcept;
  }
}

function StatusIcon({ status, shaded }) {
  if (shaded) return <SkippedCheckmarkIcon size={14} />;
  switch (status) {
    case 'COMPLETED':   return <CompleteIcon size={14} />;
    case 'INPROGRESS':  return <InProgressIcon size={14} />;
    default:            return <CircleIcon size={12} style={{ color: 'var(--color-slate-300)' }} />;
  }
}

function gradeClass(grade) {
  if (!grade) return '';
  if (grade === 'A') return styles.gradeA;
  if (grade === 'B') return styles.gradeB;
  if (grade === 'C') return styles.gradeC;
  return styles.gradeD;
}

export default function ActivityRow({ activity, onClick, onShadedClick, highlightId, paceOn = true }) {
  const effectivelyShaded = paceOn && activity.shaded;

  const rowClass = [
    styles.activityRow,
    effectivelyShaded ? styles.shaded : '',
    activity.isCurrent ? styles.current : '',
  ].filter(Boolean).join(' ');

  const id = activity.id === highlightId ? highlightId : undefined;

  const handleClick = (e) => {
    if (effectivelyShaded) {
      onShadedClick?.(e.currentTarget);
    } else {
      onClick?.(activity);
    }
  };

  return (
    <div
      id={id}
      className={rowClass}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
    >
      <div className={styles.activityStatusIcon}>
        <StatusIcon status={activity.status} shaded={effectivelyShaded} />
      </div>

      <div className={`${styles.activityTypeIcon} ${getTypeIconClass(activity.type)}`}>
        {getTypeIcon(activity.type)}
      </div>

      <div className={styles.activityInfo}>
        {activity.number && (
          <div className={styles.activityNumber}>{activity.number}</div>
        )}
        <div className={styles.activityName}>{activity.name}</div>
      </div>

      <div className={styles.activityMeta}>
        {activity.durationMinutes && (
          <span className={styles.activityDuration}>
            <ClockIcon size={11} />
            {activity.durationMinutes}m
          </span>
        )}

        {activity.grade && (
          <span className={`${styles.activityGrade} ${gradeClass(activity.grade)}`}>
            {activity.grade}
          </span>
        )}

        {effectivelyShaded && (
          <span className={styles.shadedBadge}>Skipped</span>
        )}

        {activity.isCurrent && !effectivelyShaded && (
          <button className={styles.startBtn} onClick={(e) => { e.stopPropagation(); onClick?.(activity); }}>
            Start
          </button>
        )}
      </div>
    </div>
  );
}
