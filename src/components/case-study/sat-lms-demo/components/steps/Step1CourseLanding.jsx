import CourseHomePage from './CourseHomePage';
import { PRE_DIAGNOSTIC_COURSE } from '../../data/mockCourse';

export default function Step1CourseLanding({ onNext, onSkipDiagnosticPromptChange }) {
  return (
    <CourseHomePage
      courseData={PRE_DIAGNOSTIC_COURSE}
      onActivityClick={() => {}}
      isPaceOn={false}
      onDiagnosticClick={onNext}
      onSkipDiagnosticPromptChange={onSkipDiagnosticPromptChange}
    />
  );
}
