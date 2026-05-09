export default function CaseStudyOutcome({
  id,
  className,
  innerClassName,
  reveal,
  children,
}) {
  return (
    <section id={id} className={className}>
      <div className={innerClassName}>
        {reveal ? reveal(children) : children}
      </div>
    </section>
  );
}
