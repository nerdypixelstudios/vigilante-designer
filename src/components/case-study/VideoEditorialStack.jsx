export default function VideoEditorialStack({
  className,
  intro,
  rows,
  rowListClassName,
  renderRow,
  conclusion,
  children,
}) {
  if (children) {
    return <div className={className}>{children}</div>;
  }

  const rowContent = rows?.length > 0 ? rows.map((row, index) => renderRow(row, index)) : null;

  return (
    <div className={className}>
      {intro}
      {rowListClassName ? (
        <div className={rowListClassName}>{rowContent}</div>
      ) : rowContent}
      {conclusion}
    </div>
  );
}
