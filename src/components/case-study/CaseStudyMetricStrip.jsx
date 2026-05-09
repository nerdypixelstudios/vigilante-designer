export default function CaseStudyMetricStrip({
  metrics,
  className,
  renderValue,
  renderLabel,
  renderDetail,
}) {
  return (
    <div className={className}>
      {metrics.map((metric) => (
        <div key={metric.label}>
          {renderValue(metric)}
          {renderLabel(metric)}
          {renderDetail ? renderDetail(metric) : null}
        </div>
      ))}
    </div>
  );
}
