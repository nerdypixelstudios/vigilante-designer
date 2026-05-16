import "@/styles/globals.css";
import '../components/case-study/sat-lms-demo/styles/tokens.css';
import '../components/case-study/sat-lms-demo/styles/ActivityCard.css';
import '../components/case-study/sat-lms-demo/styles/ActivityLineItem.css';
import '../components/case-study/sat-lms-demo/styles/AdvisoryWarningModal.css';
import '../components/case-study/sat-lms-demo/styles/CourseJourneyTrack.css';
import '../components/case-study/sat-lms-demo/styles/CurrentModuleCard.css';
import '../components/case-study/sat-lms-demo/styles/DemoAppHeader.css';
import '../components/case-study/sat-lms-demo/styles/DiagnosticBox.css';
import '../components/case-study/sat-lms-demo/styles/DimmedActivityTooltip.css';
import '../components/case-study/sat-lms-demo/styles/HeroPaceIsland.css';
import '../components/case-study/sat-lms-demo/styles/JourneyChips.css';
import '../components/case-study/sat-lms-demo/styles/NextUpSection.css';
import '../components/case-study/sat-lms-demo/styles/PaceIsland.css';
import '../components/case-study/sat-lms-demo/styles/PaceOnboardingOverlay.css';
import '../components/case-study/sat-lms-demo/styles/PageHome.css';
import '../components/case-study/sat-lms-demo/styles/PostDiagnosticChoiceModal.css';
import '../components/case-study/sat-lms-demo/styles/RemedialCreatedModal.css';
import '../components/case-study/sat-lms-demo/styles/SkipDiagnosticAlert.css';
import '../components/case-study/sat-lms-demo/styles/SkipIndicator.css';
import '../components/case-study/sat-lms-demo/styles/TimeBadge.css';
import '../components/case-study/sat-lms-demo/styles/UnitBlock.css';
import '../components/case-study/sat-lms-demo/components/ui/GradeMedal.css';
import { ThemeProvider } from '../components/shared/ThemeContext';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
