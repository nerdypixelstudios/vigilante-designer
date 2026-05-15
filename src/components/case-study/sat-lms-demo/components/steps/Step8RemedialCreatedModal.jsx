import { useState } from 'react';
import CourseHeader from '../ui/CourseHeader';
import DiagnosticCard from '../ui/DiagnosticCard';
import ModuleBlock from '../ui/ModuleBlock';
import RemedialCreatedModal from '../ui/RemedialCreatedModal';
import { COURSE, DIAGNOSTIC, MODULES, REMEDIAL_ACTIVITY } from '../../data/mockCourse';
import styles from '../../styles/demo.module.css';

export default function Step8RemedialCreatedModal({ onNext }) {
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
            defaultExpanded={idx === 1}
            paceOn={true}
            onActivityClick={() => {}}
          />
        ))}
      </div>

      <RemedialCreatedModal
        id="demo-remedial-modal"
        isOpen={modalOpen}
        motherActivityName={REMEDIAL_ACTIVITY.motherActivityName}
        mistakeCount={REMEDIAL_ACTIVITY.mistakeCount}
        questionCount={REMEDIAL_ACTIVITY.questionCount}
        estimatedTimeMinutes={REMEDIAL_ACTIVITY.estimatedTimeMinutes}
        onStartRemedial={onNext}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
