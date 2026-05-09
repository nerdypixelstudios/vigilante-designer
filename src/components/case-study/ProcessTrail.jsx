export default function ProcessTrail({
  id,
  labelledBy,
  className,
  children,
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={className}>
      {children}
    </section>
  );
}
