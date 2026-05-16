import CourseHeader from '../ui/CourseHeader';
import SequentialQuizScreen, { DEFAULT_PRACTICE_SIDEBAR } from '../ui/SequentialQuizScreen';
import { COURSE, DEMO_ACTIVITY } from '../../data/mockCourse';
import { ACTIVITY_QUESTIONS } from '../../data/mockActivityQuiz';

export default function Step6ActivityPage({
  selectedActivity,
  onNext,
  onReturnToCourse,
}) {
  const activity = selectedActivity || DEMO_ACTIVITY;
  const activityId = activity?.contentId || activity?.id || DEMO_ACTIVITY.id;

  return (
    <div>
      <CourseHeader
        courseName={COURSE.name}
        category={COURSE.category}
        onBack={() => onReturnToCourse?.(activityId)}
      />

      <SequentialQuizScreen
        questions={ACTIVITY_QUESTIONS}
        quizTitle={activity?.contentName || activity?.name || DEMO_ACTIVITY.name}
        section="PACE"
        subtitle="Personalized activity quiz"
        sidebarTitle="Mastery Check"
        sidebarItems={DEFAULT_PRACTICE_SIDEBAR}
        helperLabel="How this works"
        helperText="This quiz checks whether the learner can continue forward or needs targeted reinforcement."
        onBack={() => onReturnToCourse?.(activityId)}
        onSubmit={onNext}
        submitId="demo-activity-quiz-submit"
      />
    </div>
  );
}
