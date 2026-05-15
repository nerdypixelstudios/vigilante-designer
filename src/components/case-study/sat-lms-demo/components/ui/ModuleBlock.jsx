import { useState } from 'react';
import { ChevronDownIcon } from '../icons/DemoIcons';
import ActivityRow from './ActivityRow';
import styles from '../../styles/demo.module.css';

export default function ModuleBlock({ module, onActivityClick, highlightId, defaultExpanded = false, paceOn = true }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={styles.moduleBlock}>
      <div
        className={styles.moduleHeader}
        onClick={() => setExpanded((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded((v) => !v)}
      >
        <span className={`${styles.moduleHeaderIcon} ${expanded ? styles.expanded : ''}`}>
          <ChevronDownIcon size={16} />
        </span>
        <span className={styles.moduleHeaderTitle}>{module.name}</span>
        <span className={styles.moduleHeaderCount}>
          {module.activities.length} {module.activities.length === 1 ? 'activity' : 'activities'}
        </span>
      </div>

      {expanded && (
        <div className={styles.moduleActivities}>
          {module.activities.map((activity) => (
            <ActivityRow
              key={activity.id}
              activity={activity}
              onClick={onActivityClick}
              highlightId={highlightId}
              paceOn={paceOn}
            />
          ))}
        </div>
      )}
    </div>
  );
}
