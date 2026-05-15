import CourseHeader from '../ui/CourseHeader';
import ActivityHeroCard from '../ui/ActivityHeroCard';
import ConceptBlock from '../ui/ConceptBlock';
import QuizShell from '../ui/QuizShell';
import { COURSE, DEMO_ACTIVITY } from '../../data/mockCourse';
import { ACTIVITY_QUESTIONS } from '../../data/mockActivityQuiz';

export default function Step6ActivityPage({ onNext }) {
  return (
    <div>
      <CourseHeader courseName={COURSE.name} category={COURSE.category} showBack />

      <ActivityHeroCard
        title={DEMO_ACTIVITY.heroTitle}
        badge={DEMO_ACTIVITY.heroBadge}
        durationMinutes={DEMO_ACTIVITY.durationMinutes}
        isRemedial={false}
      />

      <ConceptBlock
        label="Key Concept"
        text={DEMO_ACTIVITY.conceptSummary}
        formula="ax + b = c"
      />

      <QuizShell
        title="Practice Quiz"
        questions={ACTIVITY_QUESTIONS}
        submitId="demo-quiz-submit"
        onSubmit={() => {}}
      />
    </div>
  );
}
