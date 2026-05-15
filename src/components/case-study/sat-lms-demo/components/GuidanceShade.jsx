import styles from '../styles/guidance.module.css';

function HighlightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function GuidanceShade({
  stepNumber,
  totalSteps,
  stepLabel,
  action,
  why,
  targetId,
  onHighlight,
  isBranch,
  onGoodPath,
  onLowPath,
}) {
  return (
    <div className={styles.shade} role="complementary" aria-label="Demo guidance">
      <div className={styles.left}>
        <div className={styles.stepLabel}>
          Step {stepNumber} of {totalSteps} &nbsp;·&nbsp; {stepLabel}
        </div>
        <div className={styles.action}>{action}</div>
        <div className={styles.why}>{why}</div>
      </div>

      <div className={styles.right}>
        <button
          className={styles.highlightBtn}
          onClick={() => onHighlight(targetId)}
          title="Scroll to and highlight the relevant element"
        >
          <HighlightIcon />
          Highlight this element
        </button>

        {isBranch && (
          <>
            <div className={styles.divider} />
            <div className={styles.branchGroup}>
              <span className={styles.branchLabel}>Choose an outcome</span>
              <div className={styles.branchButtons}>
                <button className={styles.btnGood} onClick={onGoodPath}>
                  High-score path
                </button>
                <button className={styles.btnLow} onClick={onLowPath}>
                  Low-score path
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
