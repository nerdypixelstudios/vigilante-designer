import { useState } from 'react';
import CourseHomePage from './CourseHomePage';
import PostDiagnosticChoiceModal from '../ui/PostDiagnosticChoiceModal';
import { PACE, POST_DIAGNOSTIC_COURSE } from '../../data/mockCourse';

export default function Step4PostDiagnosticChoice({ onOpenActivity, goTo, lastVisitedActivityId }) {
  const [modalOpen, setModalOpen] = useState(true);
  const [isPaceOn, setIsPaceOn] = useState(true);

  return (
    <div>
      <CourseHomePage
        courseData={POST_DIAGNOSTIC_COURSE}
        onActivityClick={onOpenActivity}
        isPaceOn={isPaceOn}
        onPaceToggle={setIsPaceOn}
        persistentLastVisitedId={lastVisitedActivityId}
        onDiagnosticClick={() => {
          setModalOpen(false);
          goTo?.('diagnostic_results');
        }}
      />

      <PostDiagnosticChoiceModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onStartLearning={() => {
          setModalOpen(false);
          onOpenActivity?.(PACE.firstActivity.id);
        }}
        onViewCourse={() => {
          setModalOpen(false);
          goTo?.('personalized_path');
        }}
        hoursSaved={PACE.hoursSaved}
        activitiesSkipped={PACE.activitiesSkipped}
        totalActivities={PACE.totalActivities}
        firstActivity={PACE.firstActivity}
      />
    </div>
  );
}
