export default function CaseStudySectionHeader({
  eyebrow,
  eyebrowClassName,
  headingId,
  headingClassName,
  renderHeading,
  heading,
  copy,
  copyClassName,
}) {
  return (
    <div>
      {eyebrow && <p className={eyebrowClassName}>{eyebrow}</p>}
      {renderHeading ? (
        renderHeading()
      ) : heading ? (
        <h2 id={headingId} className={headingClassName}>{heading}</h2>
      ) : null}
      {copy && <p className={copyClassName}>{copy}</p>}
    </div>
  );
}
