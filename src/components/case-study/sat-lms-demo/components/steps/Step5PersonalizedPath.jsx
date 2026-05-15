import { useState } from 'react';
import CourseHeader from '../ui/CourseHeader';
import DiagnosticCard from '../ui/DiagnosticCard';
import ModuleBlock from '../ui/ModuleBlock';
import PaceIsland from '../ui/PaceIsland';
import { COURSE, DIAGNOSTIC, MODULES } from '../../data/mockCourse';
import styles from '../../styles/demo.module.css';

export default function Step5PersonalizedPath({ onNext }) {
  const [paceOn, setPaceOn] = useState(true);
  const [viewMode, setViewMode] = useState('full');

  const modules = MODULES.filter((m) => m.activities.length > 0);

  return (
    <div>
      <CourseHeader courseName={COURSE.name} category={COURSE.category} />

      <PaceIsland
        id="demo-pace-island"
        isOn={paceOn}
        onToggle={setPaceOn}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

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
            paceOn={paceOn}
            onActivityClick={(act) => {
              if (act.isCurrent) onNext();
            }}
          />
        ))}
      </div>
    </div>
  );
}
