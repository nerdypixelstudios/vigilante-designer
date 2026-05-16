import CourseHomePage from './CourseHomePage';
import { useState } from 'react';
import { getCourseDataForDemoState } from '../../data/mockCourse';

export default function Step5PersonalizedPath({
  goTo,
  onOpenActivity,
  lastVisitedActivityId,
  courseState = 'post',
}) {
  const [isPaceOn, setIsPaceOn] = useState(true);

  return (
    <CourseHomePage
      courseData={getCourseDataForDemoState(courseState)}
      onActivityClick={onOpenActivity}
      isPaceOn={isPaceOn}
      onPaceToggle={setIsPaceOn}
      persistentLastVisitedId={lastVisitedActivityId}
      onDiagnosticClick={() => goTo?.('diagnostic_results')}
    />
  );
}
