import CourseHomePage from './CourseHomePage';
import RemedialCompletionResult from '../ui/RemedialCompletionResult';
import {
  getCourseDataForDemoState,
  REMEDIAL_ACTIVITY,
  REMEDIAL_RESULTS,
} from '../../data/mockCourse';

export default function Step10RemedialRetry({ onReturnToCourse }) {
  return (
    <div>
      <CourseHomePage
        courseData={getCourseDataForDemoState('reinforcement_retry')}
        onActivityClick={(activity) => onReturnToCourse?.(activity?.contentId || activity)}
        isPaceOn={true}
        persistentLastVisitedId={REMEDIAL_ACTIVITY.id}
      />

      <RemedialCompletionResult
        isOpen={true}
        score={REMEDIAL_RESULTS.retry.score}
        title={REMEDIAL_RESULTS.retry.title}
        message={REMEDIAL_RESULTS.retry.message}
        motherActivityName={REMEDIAL_ACTIVITY.motherActivityName}
        mistakeCount={REMEDIAL_ACTIVITY.mistakeCount}
        isPerfect={false}
        onPrimary={() => onReturnToCourse?.(REMEDIAL_ACTIVITY.id)}
        onSecondary={() => onReturnToCourse?.(REMEDIAL_ACTIVITY.id)}
      />
    </div>
  );
}
