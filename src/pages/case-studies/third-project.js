import Link from 'next/link';
import Navigation from '../../components/sections/Navigation/Navigation';

export default function ThirdProjectCaseStudy() {
  return (
    <>
      <Navigation />
      <main style={{ minHeight: '100vh', padding: '4rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
        <p className="font-dm text-xs font-extrabold uppercase tracking-widest text-ink-500 mb-4">
          Case Study
        </p>
        <h1 className="font-cabinet font-extrabold text-ink-950 text-h1 leading-none mb-4">
          SPARK
        </h1>
        <p className="font-dm font-normal text-body text-ink-700 leading-relaxed mb-8" style={{ maxWidth: '600px' }}>
          Third project slot — SPARK or website v3. Decision and content will be added in a later session.
        </p>
        <div className="flex gap-3 flex-wrap mb-12">
          {['Presentation', 'Content Design'].map(tag => (
            <span key={tag} className="font-dm text-xs font-extrabold bg-surface-light text-ink-700 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="bg-surface-light border border-ink-100 rounded-lg flex items-center justify-center" style={{ height: '400px' }}>
          <p className="font-dm text-ink-300">Case study content placeholder</p>
        </div>
        <div className="mt-12">
          <Link href="/" className="font-dm font-extrabold text-sm text-accent-orange hover:underline">
            ← Back to portfolio
          </Link>
        </div>
      </main>
    </>
  );
}
