import { ChevronLeftIcon } from '../icons/DemoIcons';
import styles from '../../styles/demo.module.css';

export default function CourseHeader({ courseName, category, onBack }) {
  return (
    <div className={styles.courseHeader}>
      {onBack && (
        <>
          <button className={styles.courseHeaderBack} onClick={onBack}>
            <ChevronLeftIcon size={14} />
            Back to Course
          </button>
          <div className={styles.courseHeaderDivider} />
        </>
      )}
      <span className={styles.courseHeaderTitle}>{courseName}</span>
      {category && (
        <span className={styles.courseHeaderCategory}>{category}</span>
      )}
    </div>
  );
}
