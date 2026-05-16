import { DIAGNOSTIC_RESULTS_MOCK } from '../../data/mockDiagnosticQuiz';
import GaugeChart from '../ui/GaugeChart';
import GradeMedal from '../ui/GradeMedal';
import { ArrowRightIcon, LightningBoltIcon } from '../icons/DemoIcons';
import styles from '../../styles/diagnosticResults.module.css';

export default function Step3DiagnosticResults({ onNext }) {
  const results = DIAGNOSTIC_RESULTS_MOCK;
  const completedDate = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  const metricGradient = (grade) => {
    if (grade?.startsWith('A')) {
      return [{ min: 0, max: 100, gradient: 'url(#greenGradient)', color: '#13a552' }];
    }
    if (grade?.startsWith('B')) {
      return [{ min: 0, max: 100, gradient: 'url(#orangeGradient)', color: '#EE9500' }];
    }
    return [{ min: 0, max: 100, gradient: 'url(#redGradient)', color: '#f31260' }];
  };

  return (
    <div className={styles.screen}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.pageEyebrow}>Timed Quiz Results</p>
          <h1 className={styles.pageTitle}>PACE Diagnostic</h1>
          <p className={styles.pageSubtitle}>Completed on {completedDate}</p>
        </div>
        <div className={styles.pageGrade}>
          <GradeMedal grade={results.grade} size="lg" />
        </div>
      </header>

      <section className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Accuracy</div>
          <div className={styles.metricGauge}>
            <GaugeChart
              accuracy={results.accuracyPercentage}
              gradientConfig={metricGradient(results.grade)}
              percentageColor="#EE9500"
              compact
            />
          </div>
          <div className={styles.metricSubtext}>Solid baseline across core skills</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Pacing</div>
          <div className={styles.metricGauge}>
            <GaugeChart
              accuracy={results.pacingPercentage}
              gradientConfig={[{ min: 0, max: 100, gradient: 'url(#greenGradient)', color: '#13a552' }]}
              percentageColor="#13a552"
              compact
            />
          </div>
          <div className={styles.metricSubtext}>You moved with healthy speed</div>
        </div>

        <div className={styles.summaryCard}>
          <span className={styles.summaryBadge}>Personalized Path Ready</span>
          <div className={styles.summaryHeadline}>You can likely recover {results.hoursSaved} hours of study time.</div>
          <div className={styles.summaryBody}>
            {results.summary}
          </div>
        </div>
      </section>

      <section className={styles.impactGrid}>
        <article className={styles.impactCard}>
          <span className={styles.impactLabel}>Overall score</span>
          <strong className={styles.impactValue}>{results.score}%</strong>
        </article>
        <article className={styles.impactCard}>
          <span className={styles.impactLabel}>Hours saved</span>
          <strong className={styles.impactValue}>{results.hoursSaved}</strong>
        </article>
        <article className={styles.impactCard}>
          <span className={styles.impactLabel}>Activities skipped</span>
          <strong className={styles.impactValue}>{results.activitiesSkipped}</strong>
        </article>
      </section>

      <section className={styles.bucketGrid}>
        <article className={styles.bucketCard}>
          <div className={styles.bucketHeader}>
            <div>
              <p className={styles.bucketEyebrow}>P1. What to Work On</p>
              <h2 className={styles.bucketTitle}>Leaks to Plug</h2>
            </div>
            <span className={styles.bucketCount}>{results.leaksToPlug.length} questions</span>
          </div>
          <div className={styles.bucketList}>
            {results.leaksToPlug.map((item) => (
              <article key={`leak-${item.questionNumber}`} className={styles.bucketItem}>
                <span className={styles.itemTag}>Q{item.questionNumber}</span>
                <div>
                  <strong className={styles.itemTopic}>{item.topic}</strong>
                  <p className={styles.itemNote}>{item.note}</p>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className={styles.bucketCard}>
          <div className={styles.bucketHeader}>
            <div>
              <p className={styles.bucketEyebrow}>P2. What Went Well</p>
              <h2 className={styles.bucketTitle}>Wins to Repeat</h2>
            </div>
            <span className={styles.bucketCount}>{results.winsToRepeat.length} questions</span>
          </div>
          <div className={styles.bucketList}>
            {results.winsToRepeat.map((item) => (
              <article key={`win-${item.questionNumber}`} className={styles.bucketItem}>
                <span className={styles.itemTagSuccess}>Q{item.questionNumber}</span>
                <div>
                  <strong className={styles.itemTopic}>{item.topic}</strong>
                  <p className={styles.itemNote}>{item.note}</p>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.actionCard}>
        <div>
          <h3 className={styles.actionTitle}>PACE has prepared your next steps.</h3>
          <p className={styles.actionText}>
            Continue into the personalized course view to see the skipped lessons, immediate next activities, and the recommended learning path.
          </p>
        </div>
        <div id="demo-results-cta" className={styles.ctaWrap}>
          <button type="button" onClick={onNext} className={styles.cta}>
            <LightningBoltIcon size={16} gradientId="results-cta-grad" />
            View Your Personalized Path
            <ArrowRightIcon size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
