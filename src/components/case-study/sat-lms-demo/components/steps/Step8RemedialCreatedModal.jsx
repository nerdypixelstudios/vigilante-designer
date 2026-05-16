import { useState } from 'react';
import CourseHomePage from './CourseHomePage';
import RemedialCreatedModal from '../ui/RemedialCreatedModal';
import { getCourseDataForDemoState, REMEDIAL_ACTIVITY } from '../../data/mockCourse';

export default function Step8RemedialCreatedModal({ onNext, onReturnToCourse }) {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div id="demo-remedial-modal">
      <CourseHomePage
        courseData={getCourseDataForDemoState('reinforcement_remedial')}
        onActivityClick={(activity) => onReturnToCourse?.(activity?.contentId || activity)}
        isPaceOn={true}
        persistentLastVisitedId={REMEDIAL_ACTIVITY.id}
      />

      <RemedialCreatedModal
        isOpen={modalOpen}
        motherActivityName={REMEDIAL_ACTIVITY.motherActivityName}
        mistakeCount={REMEDIAL_ACTIVITY.mistakeCount}
        questionCount={REMEDIAL_ACTIVITY.questionCount}
        estimatedTimeMinutes={REMEDIAL_ACTIVITY.estimatedTimeMinutes}
        remedialActivityId={REMEDIAL_ACTIVITY.id}
        onStartRemedial={onNext}
        onClose={() => {
          setModalOpen(false);
          onReturnToCourse?.(REMEDIAL_ACTIVITY.id);
        }}
      />
    </div>
  );
}
