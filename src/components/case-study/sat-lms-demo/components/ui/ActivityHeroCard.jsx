import { ClockIcon, BookOpenIcon, RemedialIcon } from '../icons/DemoIcons';
import styles from '../../styles/activity.module.css';

export default function ActivityHeroCard({ title, badge, durationMinutes, isRemedial }) {
  const BadgeIcon = isRemedial ? RemedialIcon : BookOpenIcon;

  return (
    <div className={`${styles.hero} ${isRemedial ? styles.heroRemedial : ''}`}>
      <div className={`${styles.heroBadge} ${isRemedial ? styles.remedial : ''}`}>
        <BadgeIcon size={10} />
        {badge}
      </div>
      <h2 className={styles.heroTitle}>{title}</h2>
      {durationMinutes && (
        <div className={styles.heroMeta}>
          <span className={styles.heroMetaItem}>
            <ClockIcon size={12} />
            {durationMinutes} min
          </span>
        </div>
      )}
    </div>
  );
}
