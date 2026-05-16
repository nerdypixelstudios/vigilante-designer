import CourseHomePage from './CourseHomePage';
import RemedialCompletionResult from '../ui/RemedialCompletionResult';
import {
  getCourseDataForDemoState,
  REMEDIAL_ACTIVITY,
  REMEDIAL_RESULTS,
  PACE,
} from '../../data/mockCourse';

export default function Step10RemedialSuccess({ onReturnToCourse }) {
  return (
    <div>
      <CourseHomePage
        courseData={getCourseDataForDemoState('reinforcement_success')}
        onActivityClick={(activity) => onReturnToCourse?.(activity?.contentId || activity)}
        isPaceOn={true}
        persistentLastVisitedId={PACE.nextActivity.id}
      />

      <RemedialCompletionResult
        isOpen={true}
        score={REMEDIAL_RESULTS.success.score}
        title={REMEDIAL_RESULTS.success.title}
        message={REMEDIAL_RESULTS.success.message}
        motherActivityName={REMEDIAL_ACTIVITY.motherActivityName}
        mistakeCount={REMEDIAL_ACTIVITY.mistakeCount}
        isPerfect={true}
        onPrimary={() => onReturnToCourse?.(PACE.nextActivity.id)}
        onSecondary={() => onReturnToCourse?.(PACE.nextActivity.id)}
      />
    </div>
  );
}
