import CourseHeader from '../ui/CourseHeader';
import DiagnosticCard from '../ui/DiagnosticCard';
import ModuleBlock from '../ui/ModuleBlock';
import { COURSE, DIAGNOSTIC, MODULES } from '../../data/mockCourse';
import styles from '../../styles/demo.module.css';

export default function Step1CourseLanding({ onNext }) {
  const modules = MODULES.filter((m) => m.activities.length > 0);

  return (
    <div>
      <CourseHeader courseName={COURSE.name} category={COURSE.category} />
      <div className={styles.courseBody}>
        <div className={styles.sectionLabel}>Your Learning Path</div>

        <DiagnosticCard
          id="demo-diagnostic-card"
          status={DIAGNOSTIC.status}
          config={DIAGNOSTIC.config}
          results={null}
          onTakeDiagnostic={onNext}
        />

        {modules.map((mod, idx) => (
          <ModuleBlock
            key={mod.id}
            module={mod}
            defaultExpanded={idx === 0}
            onActivityClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
