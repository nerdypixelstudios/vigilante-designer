import CourseHeader from '../ui/CourseHeader';
import QuizShell from '../ui/QuizShell';
import { COURSE } from '../../data/mockCourse';
import { DIAGNOSTIC_QUESTIONS } from '../../data/mockDiagnosticQuiz';

export default function Step2DiagnosticQuiz({ onNext }) {
  return (
    <div>
      <CourseHeader courseName={COURSE.name} category={COURSE.category} />
      <QuizShell
        title="Diagnostic Quiz"
        questions={DIAGNOSTIC_QUESTIONS}
        submitId="demo-quiz-submit"
        onSubmit={() => onNext()}
      />
    </div>
  );
}
