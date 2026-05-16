import CourseHeader from '../ui/CourseHeader';
import SequentialQuizScreen, { DEFAULT_PRACTICE_SIDEBAR } from '../ui/SequentialQuizScreen';
import { COURSE, REMEDIAL_ACTIVITY } from '../../data/mockCourse';
import { ACTIVITY_QUESTIONS } from '../../data/mockActivityQuiz';

export default function Step9RemedialActivity({
  onReturnToCourse,
  onRemedialPerfect,
  onRemedialRetry,
}) {
  return (
    <div id="demo-remedial-activity">
      <CourseHeader
        courseName={COURSE.name}
        category={COURSE.category}
        onBack={() => onReturnToCourse?.(REMEDIAL_ACTIVITY.id)}
      />

      <SequentialQuizScreen
        questions={ACTIVITY_QUESTIONS}
        quizTitle={REMEDIAL_ACTIVITY.name}
        section="REM"
        subtitle="Targeted remedial quiz"
        sidebarTitle="Remedial Practice"
        sidebarItems={DEFAULT_PRACTICE_SIDEBAR}
        helperLabel="Why this exists"
        helperText="This remedial focuses only on the mistakes made in the mother activity, one question at a time."
        onBack={() => onReturnToCourse?.(REMEDIAL_ACTIVITY.id)}
        submitActions={[
          {
            label: 'Submit (100%)',
            onClick: onRemedialPerfect,
          },
          {
            label: 'Submit (<100%)',
            onClick: onRemedialRetry,
          },
        ]}
        submitId="demo-remedial-submit-perfect"
      />
    </div>
  );
}
