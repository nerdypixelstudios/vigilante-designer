import Image from 'next/image';

export default function CaseStudyHero({
  className = '',
  eyebrow,
  title,
  punchline,
  summary,
  metaItems,
  disclaimer,
  media,
  contentWrapper,
  children,
}) {
  const content = children ? children : (
    <>
      <p className="mb-6 font-dm text-xs font-extrabold uppercase tracking-[0.2em] text-ink-500">{eyebrow}</p>
      <h1 className="mx-auto mb-8 max-w-4xl font-cabinet text-5xl font-extrabold leading-[1.05] tracking-tight text-ink-950 md:text-7xl">
        {title}
      </h1>

      {punchline && (
        <p className="mb-10 font-cabinet text-3xl font-extrabold leading-tight text-ink-950">
          {punchline}
        </p>
      )}

      {summary && (
        <p className="mx-auto mb-10 max-w-4xl font-dm text-body leading-relaxed text-ink-800">
          {summary}
        </p>
      )}

      {metaItems?.length > 0 && (
        <div className="mb-3 flex flex-wrap justify-center gap-4 font-dm text-sm text-ink-700">
          {metaItems.map((item) => {
            const content = (
              <>
                {item.logo && (
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt}
                    width={item.logo.width}
                    height={item.logo.height}
                    className="h-5 w-5 object-contain"
                  />
                )}
                <span>{item.label}</span>
              </>
            );

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-surface-light px-4 py-2 text-ink-700 no-underline"
              >
                {content}
              </a>
            ) : (
              <span key={item.label} className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-surface-light px-4 py-2">
                {content}
              </span>
            );
          })}
        </div>
      )}

      {disclaimer && (
        <p className="mb-16 font-dm text-xs italic leading-relaxed text-ink-500">
          {disclaimer}
        </p>
      )}

      {media}
    </>
  );

  return (
    <section className={`${className} px-6 pb-24 pt-32 text-center md:pt-36`}>
      <div className="mx-auto max-w-[1100px]">
        {contentWrapper ? contentWrapper(content) : content}
      </div>
    </section>
  );
}
