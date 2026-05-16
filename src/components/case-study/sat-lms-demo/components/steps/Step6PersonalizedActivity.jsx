import CourseHeader from '../ui/CourseHeader';
import ActivityHeroCard from '../ui/ActivityHeroCard';
import ConceptBlock from '../ui/ConceptBlock';
import { COURSE, DEMO_ACTIVITY } from '../../data/mockCourse';

export default function Step6PersonalizedActivity({
  selectedActivity,
  onReturnToCourse,
  goTo,
}) {
  const activity = selectedActivity || DEMO_ACTIVITY;
  const activityId = activity?.contentId || activity?.id || DEMO_ACTIVITY.id;

  return (
    <div id="demo-personalized-activity">
      <CourseHeader
        courseName={COURSE.name}
        category={COURSE.category}
        onBack={() => onReturnToCourse?.(activityId)}
      />

      <ActivityHeroCard
        title={activity?.contentName || activity?.name || DEMO_ACTIVITY.name}
        badge={activity?.contentType || activity?.type || DEMO_ACTIVITY.type}
        durationMinutes={activity?.estimatedDurationMinutes || activity?.durationMinutes || DEMO_ACTIVITY.durationMinutes}
      />

      <ConceptBlock
        label="Start here"
        text={DEMO_ACTIVITY.conceptSummary}
        onStartQuiz={() => goTo?.('activity_quiz')}
      />
    </div>
  );
}
