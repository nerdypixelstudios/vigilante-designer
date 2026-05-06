import React from 'react';

// Supporting portfolio graphic only. This preserves the shared design-iteration artifact
// and is not the production LMS component.

// ============================================
// ICON PLACEHOLDERS
// ============================================
const IconPlaceholder = ({ type, size = 16, style = {} }) => {
  const colors = {
    concept: '#006FEE',
    skill: '#D97706',
    uqe: '#16A34A',
    remedial: '#EF4444',
    clock: '#94A3B8',
    questions: '#94A3B8',
  };

  const baseStyle = {
    width: size,
    height: size,
    borderRadius: type === 'remedial' ? '50%' : 4,
    background: colors[type] || '#94A3B8',
    flexShrink: 0,
    ...style,
  };

  return <div style={baseStyle} />;
};

const StatusIcon = ({ status }) => {
  const styles = {
    base: { width: 14, height: 14, borderRadius: '50%', flexShrink: 0 },
    complete: { background: '#22C55E' },
    'complete-amber': { background: '#F59E0B' },
    progress: { background: '#006FEE' },
    empty: { background: 'transparent', border: '2px solid #CBD5E1' },
  };

  return <div style={{ ...styles.base, ...styles[status] }} />;
};

const GradeIcon = ({ grade }) => {
  const colors = { A: '#22C55E', B: '#F5A524', C: '#DC2626' };
  return (
    <div style={{ width: 20, height: 24, background: colors[grade], borderRadius: 4, flexShrink: 0 }} />
  );
};

// ============================================
// BADGES
// ============================================
const TimeBadge = ({ time }) => (
  <span className="time-badge">
    <IconPlaceholder type="clock" size={10} style={{ borderRadius: '50%' }} />
    {time}
  </span>
);

const QuestionsBadge = ({ count }) => (
  <span className="questions-badge">
    <IconPlaceholder type="questions" size={10} style={{ borderRadius: 2 }} />
    {count} Qs
  </span>
);

const RemedialBadge = ({ completed }) => (
  <span className={`remedial-badge ${completed ? 'completed' : ''}`}>REM.</span>
);

// ============================================
// ACTIVITY ROW
// ============================================
const ActivityRow = ({ 
  type, 
  number, 
  name, 
  time, 
  score, 
  grade, 
  timeSpent, 
  status = 'completed',
  style = {}
}) => {
  const isNotStarted = status === 'not-started';
  
  return (
    <div className={`activity-line-item ${status}`} style={style}>
      <IconPlaceholder type={type} style={isNotStarted ? { opacity: 0.5 } : {}} />
      <div className="activity-line-name-wrapper">
        <span className="activity-line-number">{number}</span>
        <div className="activity-line-name-content">
          <span className="activity-line-name">{name}</span>
          <span className="activity-line-dot-separator">·</span>
          <TimeBadge time={time} />
        </div>
      </div>
      <div className="activity-line-right-content">
        <span className="activity-line-score">{score}</span>
        {grade ? <GradeIcon grade={grade} /> : <div style={{ width: 20, height: 24 }} />}
        <span className="activity-line-time">{timeSpent}</span>
        <StatusIcon status={status === 'completed' ? 'complete' : status === 'in-progress' ? 'progress' : 'empty'} />
      </div>
    </div>
  );
};

// ============================================
// REMEDIAL ROW
// ============================================
const RemedialRow = ({ 
  name, 
  questions, 
  time, 
  status = 'not-started', // not-started | in-progress | completed
  score, 
  grade, 
  timeSpent 
}) => {
  const isComplete = status === 'completed';
  const statusIcon = isComplete ? (score === '100%' ? 'complete' : 'complete-amber') : 
                     status === 'in-progress' ? 'progress' : 'empty';

  return (
    <div className={`activity-line-item remedial-row ${status}`}>
      <IconPlaceholder type="remedial" />
      <div className="activity-line-name-wrapper">
        <RemedialBadge completed={isComplete} />
        <div className="activity-line-name-content">
          <span className="activity-line-name">{name}</span>
          <span className="activity-line-dot-separator">·</span>
          <QuestionsBadge count={questions} />
          <span className="activity-line-dot-separator">·</span>
          <TimeBadge time={time} />
        </div>
      </div>
      <div className="activity-line-right-content">
        <span className="activity-line-score">{score}</span>
        {grade ? <GradeIcon grade={grade} /> : <div style={{ width: 20, height: 24 }} />}
        <span className="activity-line-time">{timeSpent}</span>
        <StatusIcon status={statusIcon} />
      </div>
    </div>
  );
};

// ============================================
// ACTIVITY WITH REMEDIAL (includes connector)
// ============================================
const ActivityWithRemedial = ({ activity, remedial }) => (
  <div className="activity-with-remedial">
    <ActivityRow {...activity} />
    <div className="remedial-connector" />
    <RemedialRow {...remedial} />
  </div>
);

// ============================================
// ASSESSMENT UNIT (Module Mock)
// ============================================
const AssessmentUnit = ({ name, time, score, grade, status = 'attempted' }) => (
  <div className="assessment-unit">
    <div className="unit-header">
      <div className="unit-header-left">
        <div className="assessment-icon-circle" />
        <span className="unit-assessment-badge">Assessment</span>
        <div className="unit-info">
          <span className="unit-title">{name}</span>
          <span className="unit-dot-separator">·</span>
          <TimeBadge time={time} />
        </div>
      </div>
      <div className="unit-header-right">
        <span className="activity-line-score">{score}</span>
        {grade && <GradeIcon grade={grade} />}
        <span className={`unit-assessment-status ${status}`}>
          {status === 'attempted' ? 'Attempted' : 'Unattempted'}
        </span>
      </div>
    </div>
  </div>
);

// ============================================
// ASSESSMENT WITH REMEDIAL (outside yellow block)
// ============================================
const AssessmentWithRemedial = ({ assessment, remedial }) => (
  <div className="assessment-with-remedial">
    <AssessmentUnit {...assessment} />
    <div className="assessment-remedial-wrapper">
      <div className="assessment-remedial-connector" />
      <RemedialRow {...remedial} />
    </div>
  </div>
);

// ============================================
// UNIT HEADER
// ============================================
const UnitHeader = ({ number, title, time, completed, total }) => (
  <div className="unit-header">
    <div className="unit-header-left">
      <div className="unit-marker" />
      <span className="unit-number-chip">Unit {number}</span>
      <div className="unit-info">
        <span className="unit-title">{title}</span>
        <span className="unit-dot-separator">·</span>
        <TimeBadge time={time} />
      </div>
    </div>
    <div className="unit-header-right">
      <div className="unit-progress-container">
        <div className="unit-progress-donut" />
        <span className="unit-progress">
          <span className="unit-progress-completed">{completed}</span>/{total}
        </span>
      </div>
      <div className="unit-chevron" />
    </div>
  </div>
);

// ============================================
// SECTION WRAPPER
// ============================================
const Section = ({ title, subtitle, children }) => (
  <div className="demo-section">
    <div className="section-title">{title}</div>
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
    {children}
  </div>
);

// ============================================
// MAIN APP
// ============================================
export default function R2RemedialRowDesign() {
  return (
    <div className="r2-remedial-artifact app">
      <style>{`
        @scope (.r2-remedial-artifact) {
        .r2-remedial-artifact, .r2-remedial-artifact * { margin: 0; padding: 0; box-sizing: border-box; }
        
        .app {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #F8FAFC;
          padding: 40px;
          color: #334155;
        }

        h1 { color: #0F172A; margin-bottom: 8px; font-size: 24px; }
        p.subtitle { color: #64748B; margin-bottom: 32px; font-size: 14px; }

        .demo-section {
          background: white;
          border-radius: 12px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 24px;
          padding-bottom: 8px;
          border-bottom: 1px solid #E2E8F0;
        }

        .section-subtitle {
          font-size: 14px;
          color: #64748B;
          margin-bottom: 16px;
          font-weight: 500;
        }

        /* Unit Header */
        .unit-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
        }

        .unit-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        .unit-header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .unit-marker {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #006FEE;
          box-shadow: 0 0 0 3px rgba(0, 111, 238, 0.2);
        }

        .unit-number-chip {
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 600;
          background: rgba(0, 111, 238, 0.1);
          color: #006FEE;
        }

        .unit-title {
          font-size: 18px;
          font-weight: 600;
          color: #0F172A;
        }

        .unit-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .unit-dot-separator { color: #CBD5E1; }

        .unit-progress-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .unit-progress-donut {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid #E2E8F0;
          border-top-color: #006FEE;
        }

        .unit-progress {
          font-size: 14px;
          font-weight: 600;
          color: #94A3B8;
        }

        .unit-progress-completed { color: #006FEE; }

        .unit-chevron {
          width: 20px;
          height: 20px;
          background: #E2E8F0;
          border-radius: 4px;
        }

        .unit-activities {
          margin-left: 30px;
          padding-left: 16px;
        }

        /* Activity Line Item */
        .activity-line-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          color: #475569;
        }

        .activity-line-item:hover { background: #f1f6fe; }
        .activity-line-item.completed { color: #334155; }
        .activity-line-item.not-started { color: #94A3B8; }
        .activity-line-item.not-started .activity-line-name { color: #94A3B8; }

        .activity-line-name-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .activity-line-name-content {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .activity-line-number {
          min-width: 36px;
          color: #94A3B8;
        }

        .activity-line-name { color: #0F172A; }
        .activity-line-dot-separator { color: #CBD5E1; }

        .activity-line-right-content {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
          min-width: 180px;
          justify-content: flex-end;
        }

        .activity-line-score {
          min-width: 40px;
          text-align: right;
          color: #94A3B8;
        }

        .activity-line-time {
          min-width: 45px;
          text-align: right;
          color: #94A3B8;
        }

        /* Badges */
        .time-badge, .questions-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 1px 6px;
          background: #F1F5F9;
          color: #64748B;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 500;
        }

        .remedial-badge {
          padding: 2px 6px;
          background: #DC2626;
          color: white;
          font-size: 9px;
          font-weight: 700;
          border-radius: 3px;
          flex-shrink: 0;
        }

        .remedial-badge.completed { background: #94A3B8; }

        /* Remedial Row */
        .activity-with-remedial { position: relative; }

        .remedial-connector {
          position: absolute;
          left: 24px;
          top: 24px;
          height: 32px;
          width: 2px;
          background: #F87171;
        }

        .remedial-connector::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 20px;
          height: 2px;
          background: #FCA5A5;
        }

        .activity-line-item.remedial-row {
          padding-left: 48px;
        }

        .activity-line-item.remedial-row.not-started,
        .activity-line-item.remedial-row.in-progress {
          background: linear-gradient(135deg, #FEF2F2 0%, rgba(254, 242, 242, 0.5) 100%);
        }

        .activity-line-item.remedial-row.not-started:hover,
        .activity-line-item.remedial-row.in-progress:hover {
          background: linear-gradient(135deg, #FEE2E2 0%, #FEF2F2 100%);
        }

        .activity-line-item.remedial-row.not-started .activity-line-name,
        .activity-line-item.remedial-row.in-progress .activity-line-name {
          color: #334155;
        }

        .activity-line-item.remedial-row.completed { background: transparent; }
        .activity-line-item.remedial-row.completed:hover { background: #f1f6fe; }
        .activity-line-item.remedial-row.completed .activity-line-name { color: #0F172A; }

        /* Assessment Unit */
        .assessment-unit {
          padding: 16px 17px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(251, 191, 36, 0.05) 100%);
          border: 1px dashed rgba(245, 158, 11, 0.3);
          border-radius: 12px;
          margin-bottom: 8px;
        }

        .assessment-unit .unit-header { padding: 8px 0; }

        .assessment-icon-circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);
        }

        .unit-assessment-badge {
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 600;
          background: rgba(245, 158, 11, 0.12);
          color: #B45309;
        }

        .unit-assessment-status {
          font-size: 14px;
          font-weight: 500;
        }

        .unit-assessment-status.unattempted { color: #94A3B8; }
        .unit-assessment-status.attempted { color: #16A34A; }

        /* Assessment Remedial (outside) */
        .assessment-remedial-wrapper {
          position: relative;
          margin-left: 17px;
        }

        .assessment-remedial-connector {
          position: absolute;
          left: 9px;
          top: -8px;
          height: calc(50% + 8px);
          width: 2px;
          background: #F87171;
        }

        .assessment-remedial-connector::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 20px;
          height: 2px;
          background: #FCA5A5;
        }

        .assessment-remedial-wrapper .activity-line-item.remedial-row {
          margin-left: 24px;
          padding-left: 16px;
        }

        /* States Legend */
        .states-legend {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #E2E8F0;
        }

        .state-item {
          text-align: center;
          padding: 16px;
          background: #F8FAFC;
          border-radius: 8px;
        }

        .state-item-label {
          font-size: 11px;
          font-weight: 600;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .state-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .state-item-desc {
          font-size: 10px;
          color: #94A3B8;
        }
        }
      `}</style>

      <h1>R2: Remedial Activity Row - React Version</h1>
      <p className="subtitle">Converted to React components for easier iteration.</p>

      {/* Section 1: Full Unit Context */}
      <Section 
        title="1. Full Unit Context - Multiple Activities with Remedials"
        subtitle="Showing remedials within a complete unit listing with varying states."
      >
        <div className="unit-block">
          <UnitHeader number="1.1" title="Introduction to Algebra" time="45 min" completed={3} total={5} />
          
          <div className="unit-activities">
            {/* Activity 1: Completed, no remedial */}
            <ActivityRow 
              type="concept" 
              number="1.1.1" 
              name="Understanding Variables" 
              time="10 min"
              score="95%"
              grade="A"
              timeSpent="08:32"
              status="completed"
            />

            {/* Activity 2 + Remedial (Not Started) */}
            <ActivityWithRemedial
              activity={{
                type: "concept",
                number: "1.1.2",
                name: "Algebraic Expressions",
                time: "15 min",
                score: "70%",
                grade: "B",
                timeSpent: "12:18",
                status: "completed"
              }}
              remedial={{
                name: "Algebraic Expressions",
                questions: 6,
                time: "12 min",
                status: "not-started"
              }}
            />

            {/* Activity 3 + Remedial (Completed) */}
            <ActivityWithRemedial
              activity={{
                type: "skill",
                number: "1.1.3",
                name: "Practice: Solving Equations",
                time: "20 min",
                score: "75%",
                grade: "B",
                timeSpent: "16:42",
                status: "completed"
              }}
              remedial={{
                name: "Practice: Solving Equations",
                questions: 4,
                time: "8 min",
                status: "completed",
                score: "100%",
                grade: "B",
                timeSpent: "06:18"
              }}
            />

            {/* Activity 4: Not Started */}
            <ActivityRow 
              type="concept" 
              number="1.1.4" 
              name="Word Problems in Algebra" 
              time="15 min"
              status="not-started"
            />
          </div>
        </div>
      </Section>

      {/* Section 2: In Progress Remedial */}
      <Section 
        title="2. Remedial In Progress (Red Theme)"
        subtitle="Remedial with red accent until completion (both not-started and in-progress states)."
      >
        <ActivityWithRemedial
          activity={{
            type: "skill",
            number: "2.1.1",
            name: "Quadratic Equations Practice",
            time: "25 min",
            score: "68%",
            grade: "B",
            timeSpent: "22:15",
            status: "completed"
          }}
          remedial={{
            name: "Quadratic Equations Practice",
            questions: 8,
            time: "16 min",
            status: "in-progress",
            timeSpent: "04:22"
          }}
        />
      </Section>

      {/* Section 3: Module Mock with Completed Remedial */}
      <Section 
        title="3. Module Mock → Remedial (Outside Yellow Block)"
        subtitle="Remedial row is positioned OUTSIDE the assessment yellow container."
      >
        <AssessmentWithRemedial
          assessment={{
            name: "Module 2 Mock Test",
            time: "45 min",
            score: "65%",
            grade: "C",
            status: "attempted"
          }}
          remedial={{
            name: "Module 2 Mock Test",
            questions: 8,
            time: "16 min",
            status: "completed",
            score: "50%",
            grade: "C",
            timeSpent: "14:28"
          }}
        />
      </Section>

      {/* Section 4: Module Mock with Not Started Remedial */}
      <Section 
        title="4. Module Mock → Remedial (Not Started)"
        subtitle="Module mock completed, remedial not yet attempted (red accent)."
      >
        <AssessmentWithRemedial
          assessment={{
            name: "Module 3 Mock Test",
            time: "60 min",
            score: "72%",
            grade: "B",
            status: "attempted"
          }}
          remedial={{
            name: "Module 3 Mock Test",
            questions: 6,
            time: "12 min",
            status: "not-started"
          }}
        />
      </Section>

      {/* States Legend */}
      <Section title="R2 State Reference">
        <div className="states-legend">
          <div className="state-item">
            <div className="state-item-label">R2-S1: Not Started</div>
            <div className="state-item-icon"><StatusIcon status="empty" /></div>
            <div className="state-item-desc">Red accent, red badge</div>
          </div>
          <div className="state-item">
            <div className="state-item-label">R2-S2: In Progress</div>
            <div className="state-item-icon"><StatusIcon status="progress" /></div>
            <div className="state-item-desc">Red accent, red badge</div>
          </div>
          <div className="state-item">
            <div className="state-item-label">R2-S3: Completed (Pass)</div>
            <div className="state-item-icon"><StatusIcon status="complete" /></div>
            <div className="state-item-desc">No accent, grey badge, 100%</div>
          </div>
          <div className="state-item">
            <div className="state-item-label">R2-S4: Completed (Fail)</div>
            <div className="state-item-icon"><StatusIcon status="complete-amber" /></div>
            <div className="state-item-desc">No accent, grey badge, &lt;100%</div>
          </div>
        </div>
      </Section>
    </div>
  );
}
