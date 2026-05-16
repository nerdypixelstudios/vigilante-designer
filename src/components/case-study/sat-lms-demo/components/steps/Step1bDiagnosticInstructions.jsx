import DiagnosticQuizInstructions from '../ui/DiagnosticQuizInstructions';
import mockCourse from '../../data/mockCourse';

export default function Step1bDiagnosticInstructions({ onNext, onBack }) {
  const diagnostic = mockCourse.diagnostic;

  return (
    <DiagnosticQuizInstructions
      questionCount={diagnostic?.question_count || 5}
      estimatedDuration={diagnostic?.estimated_duration_minutes || 10}
      onStart={onNext}
      onGoBack={onBack}
      showTimer={true}
      section="DESIGN"
    />
  );
}
