export default function DecisionEvidenceSection({
  id,
  labelledBy,
  className,
  innerClassName,
  header,
  decisions,
  renderDecision,
  summary,
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={className}>
      <div className={innerClassName}>
        {header}
        {decisions?.length > 0 && (
          <div className="mt-12 space-y-16 md:mt-16 md:space-y-20">
            {decisions.map((decision) => renderDecision(decision))}
          </div>
        )}
        {summary}
      </div>
    </section>
  );
}
