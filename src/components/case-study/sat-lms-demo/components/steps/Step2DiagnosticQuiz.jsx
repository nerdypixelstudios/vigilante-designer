import SATDiagnosticQuizScreen from '../ui/SATDiagnosticQuizScreen';
import { DIAGNOSTIC_QUESTIONS } from '../../data/mockDiagnosticQuiz';
import mockCourse from '../../data/mockCourse';

export default function Step2DiagnosticQuiz({ onNext }) {
  return (
    <SATDiagnosticQuizScreen
      questions={DIAGNOSTIC_QUESTIONS}
      quizTitle={`${mockCourse.pageName} - Diagnostic`}
      onSubmit={onNext}
      section="DESIGN"
    />
  );
}
