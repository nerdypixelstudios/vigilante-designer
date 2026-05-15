import { useState } from 'react';
import CourseHeader from '../ui/CourseHeader';
import DiagnosticCard from '../ui/DiagnosticCard';
import ModuleBlock from '../ui/ModuleBlock';
import PostDiagnosticChoiceModal from '../ui/PostDiagnosticChoiceModal';
import { COURSE, DIAGNOSTIC, PACE, MODULES } from '../../data/mockCourse';
import styles from '../../styles/demo.module.css';

export default function Step4PostDiagnosticChoice({ onNext }) {
  const [modalOpen, setModalOpen] = useState(true);
  const modules = MODULES.filter((m) => m.activities.length > 0);

  return (
    <div>
      <CourseHeader courseName={COURSE.name} category={COURSE.category} />
      <div className={styles.courseBody}>
        <div className={styles.sectionLabel}>Your Learning Path</div>

        <DiagnosticCard
          status="completed"
          config={DIAGNOSTIC.config}
          results={DIAGNOSTIC.results}
          onTakeDiagnostic={() => {}}
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

      <PostDiagnosticChoiceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onStartLearning={onNext}
        onViewCourse={onNext}
        hoursSaved={PACE.hoursSaved}
        activitiesSkipped={PACE.activitiesSkipped}
        totalActivities={PACE.totalActivities}
        firstActivity={PACE.firstActivity}
        viewCourseId="demo-choice-view-course"
      />
    </div>
  );
}
