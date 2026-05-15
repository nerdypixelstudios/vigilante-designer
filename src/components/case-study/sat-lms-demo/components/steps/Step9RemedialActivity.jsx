import CourseHeader from '../ui/CourseHeader';
import ActivityHeroCard from '../ui/ActivityHeroCard';
import ConceptBlock from '../ui/ConceptBlock';
import QuizShell from '../ui/QuizShell';
import { COURSE, REMEDIAL_ACTIVITY } from '../../data/mockCourse';
import { ACTIVITY_QUESTIONS } from '../../data/mockActivityQuiz';

export default function Step9RemedialActivity({ onDemoComplete }) {
  return (
    <div id="demo-remedial-activity">
      <CourseHeader courseName={COURSE.name} category={COURSE.category} showBack />

      <ActivityHeroCard
        title={REMEDIAL_ACTIVITY.heroTitle}
        badge={REMEDIAL_ACTIVITY.heroBadge}
        durationMinutes={REMEDIAL_ACTIVITY.estimatedTimeMinutes}
        isRemedial={true}
      />

      <ConceptBlock
        label="Focus Area"
        text={REMEDIAL_ACTIVITY.conceptSummary}
        isRemedial={true}
        onStartQuiz={() => onDemoComplete?.('low')}
      />

      <QuizShell
        title="Targeted Practice"
        questions={ACTIVITY_QUESTIONS.slice(0, 3)}
        submitId="demo-remedial-submit"
        onSubmit={() => onDemoComplete?.('low')}
      />
    </div>
  );
}
