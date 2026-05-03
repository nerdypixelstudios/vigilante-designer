import { useEffect, useRef } from 'react';
import Navigation from '../../components/sections/Navigation/Navigation';
import styles from './neuron.module.css';

const caseStudyLinks = [
  { href: '#tldr', label: 'TLDR' },
  { href: '#problem', label: 'Problem' },
  { href: '#solution', label: 'Solution' },
  { href: '#outcome', label: 'Outcome' },
];

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealVisible);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`${styles.reveal} ${className}`}>
      {children}
    </div>
  );
}

function BrowserChrome() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-surface-white border-b border-ink-100 rounded-t-xl">
      <div className="w-3 h-3 rounded-full bg-ink-200"></div>
      <div className="w-3 h-3 rounded-full bg-ink-200"></div>
      <div className="w-3 h-3 rounded-full bg-ink-200"></div>
    </div>
  );
}

function CroppedScreen({ src, alt, caption, bgColor = 'bg-surface-ice' }) {
  return (
    <figure className="w-full relative">
      <div className={`${bgColor} rounded-2xl p-8 md:p-12 pb-0 overflow-hidden relative shadow-inner`}>
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(var(--color-ink-950) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
        
        <div className="relative rounded-t-xl overflow-hidden shadow-2xl border-t border-x border-ink-100 translate-y-4 hover:translate-y-2 transition-transform duration-500 ease-out">
          <BrowserChrome />
          <img src={src} alt={alt} className="w-full h-auto block object-cover object-top" style={{ maxHeight: '420px', objectPosition: 'top' }} loading="lazy" />
        </div>
      </div>
      {caption && (
        <figcaption className="font-dm text-small text-ink-500 mt-4 leading-snug px-2 text-center">{caption}</figcaption>
      )}
    </figure>
  );
}

function FullScreen({ src, alt, caption }) {
  return (
    <figure className="w-full">
      <div className="bg-surface-white rounded-xl overflow-hidden border border-ink-100 shadow-sm">
        <BrowserChrome />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
      </div>
      {caption && (
        <figcaption className="font-dm text-small text-ink-500 mt-3 leading-snug px-2">{caption}</figcaption>
      )}
    </figure>
  );
}

export default function NeuronCaseStudy() {
  return (
    <div className="bg-surface-white min-h-screen">
      <Navigation
        links={caseStudyLinks}
        showToggle={false}
        backHref="/"
        backLabel="Back"
      />

      <main className="pt-32 pb-32">
        {/* HERO */}
        <section className="max-w-[1100px] mx-auto px-6 mb-24 text-center">
          <Reveal>
            <p className="font-dm text-xs font-extrabold uppercase tracking-[0.2em] text-ink-500 mb-6">SAT LMS</p>
            <h1 className="font-cabinet font-extrabold text-ink-950 leading-[1.05] mb-8 text-5xl md:text-7xl max-w-4xl mx-auto tracking-tight">
              An SAT LMS that decides the next step <span className="bg-accent-yellow px-1 inline-block transform -rotate-1">so the student doesn't have to.</span>
            </h1>
            
            {/* Meta tags */}
            <div className="flex flex-wrap justify-center gap-4 mb-16 font-dm text-sm text-ink-700">
              <span className="bg-surface-light px-4 py-2 rounded-full border border-ink-100">Principal Product Designer</span>
              <span className="bg-surface-light px-4 py-2 rounded-full border border-ink-100">Dec 2025 - Mar 2026</span>
              <span className="bg-surface-light px-4 py-2 rounded-full border border-ink-100">e-GMAT</span>
            </div>

            <div className={styles.heroImage}>
              <BrowserChrome />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/case-studies/sat-lms/04-course-focus-pace0on.png" alt="SAT LMS Course Page" className="w-full h-auto block" />
            </div>
          </Reveal>
        </section>

        {/* TL;DR */}
        <section id="tldr" className="max-w-[800px] mx-auto px-6 mb-32">
          <Reveal>
            <div className="bg-surface-light rounded-2xl p-8 md:p-12 border border-ink-100">
              <p className="font-dm text-xs font-extrabold uppercase tracking-[0.2em] text-ink-500 mb-8">TL;DR</p>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                  <p className="font-dm text-xs font-extrabold uppercase tracking-widest text-ink-400 mt-1">Problem</p>
                  <p className="md:col-span-3 font-dm text-body text-ink-950">SAT practice is fragmented; students drop off because they don't know what to study next.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                  <p className="font-dm text-xs font-extrabold uppercase tracking-widest text-ink-400 mt-1">Role</p>
                  <p className="md:col-span-3 font-dm text-body text-ink-950">Principal designer & frontend builder.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                  <p className="font-dm text-xs font-extrabold uppercase tracking-widest text-ink-400 mt-1">Outcome</p>
                  <p className="md:col-span-3 font-dm text-body text-ink-950">89% of students automatically continue to the next recommended activity.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                  <p className="font-dm text-xs font-extrabold uppercase tracking-widest text-ink-400 mt-1">Key call</p>
                  <p className="md:col-span-3 font-dm text-body text-ink-950">Force focus mode; hide the 800-page course syllabus by default.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                  <p className="font-dm text-xs font-extrabold uppercase tracking-widest text-ink-400 mt-1">Build</p>
                  <p className="md:col-span-3 font-dm text-body text-ink-950">Compressed weeks of frontend build time into days using DesignForge.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* METRICS */}
        <section className="bg-surface-peach py-24 mb-32 relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-yellow/20 rounded-full blur-3xl"></div>
          
          <Reveal className="max-w-[1100px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <p className="font-dm text-xs font-extrabold uppercase tracking-widest text-ink-700 mb-4">Time to first action</p>
                <p className="font-cabinet font-extrabold text-accent-orange leading-none text-7xl md:text-8xl mb-3">2.5×</p>
                <p className="font-dm text-body text-ink-800 leading-snug">Faster from app-open to first learning action vs. baseline.</p>
              </div>
              <div>
                <p className="font-dm text-xs font-extrabold uppercase tracking-widest text-ink-700 mb-4">Next-step continuation</p>
                <p className="font-cabinet font-extrabold text-ink-950 leading-none text-6xl md:text-7xl mb-3">
                  89% <span className="text-3xl text-ink-300 align-middle">vs 32%</span>
                </p>
                <p className="font-dm text-body text-ink-800 leading-snug">Students starting the next recommended activity automatically.</p>
              </div>
              <div>
                <p className="font-dm text-xs font-extrabold uppercase tracking-widest text-ink-700 mb-4">Build velocity</p>
                <p className="font-cabinet font-extrabold text-accent-orange leading-none text-7xl md:text-8xl mb-3">6×</p>
                <p className="font-dm text-body text-ink-800 leading-snug">Faster build for follow-on features using DesignForge methodology.</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* PROBLEM */}
        <section id="problem" className="max-w-[1100px] mx-auto px-6 mb-24">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="font-dm text-xs font-extrabold uppercase tracking-[0.2em] text-ink-500 mb-4">The Problem</p>
                <h2 className="font-cabinet font-extrabold text-ink-950 leading-tight text-4xl mb-6">
                  Practice without a system doesn't compound.
                </h2>
                <p className="font-dm text-body text-ink-700 leading-relaxed mb-8">
                  The breakage point isn't the work. It's the choice. On a typical course page, students land on a long list of activity items with no signal of what to do next. Every day starts with a decision.
                </p>
                <figure className="border-l-4 border-accent-orange pl-6 my-8 bg-surface-light p-6 rounded-r-xl">
                  <blockquote className="font-cabinet font-extrabold text-ink-950 text-2xl">
                    "I fundamentally don’t know… never learned how to set up equations."
                  </blockquote>
                  <figcaption className="font-dm text-small text-ink-500 mt-3">— Anonymous student, r/Sat</figcaption>
                </figure>
              </div>
              <div>
                <CroppedScreen 
                  src="/images/case-studies/sat-lms/01-course-focus.png" 
                  alt="Pre-diagnostic landing" 
                  caption="Before PACE: A long list of activities with no clear next step."
                  bgColor="bg-surface-mint" 
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* CHALLENGES */}
        <section className="max-w-[1100px] mx-auto px-6 mb-32">
          <Reveal>
            <div className="bg-ink-950 rounded-2xl p-8 md:p-12 text-surface-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2L2 22h20L12 2z"/></svg>
              </div>
              
              <p className="font-dm text-xs font-extrabold uppercase tracking-[0.2em] text-ink-400 mb-8">Challenges</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div>
                  <h3 className="font-cabinet font-extrabold text-2xl mb-3">1. Frontend was a single role.</h3>
                  <p className="font-dm text-body text-ink-300 leading-relaxed">
                    I owned design and shipped the frontend code. Every spec ambiguity surfaced as a build problem. Spec, design, and implementation converged in the same head, in real time.
                  </p>
                </div>
                <div>
                  <h3 className="font-cabinet font-extrabold text-2xl mb-3">2. No existing user cohort.</h3>
                  <p className="font-dm text-body text-ink-300 leading-relaxed">
                    Personas built retroactively would have been fiction. I designed against open-community signal plus stated assumptions, and built validation into the product itself.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* INSIGHTS */}
        <section id="solution" className="max-w-[1100px] mx-auto px-6 mb-32 space-y-32">
          <Reveal>
            <div className="text-center mb-16">
              <p className="font-dm text-xs font-extrabold uppercase tracking-[0.2em] text-ink-500 mb-4">Insights to UX</p>
              <h2 className="font-cabinet font-extrabold text-ink-950 leading-tight text-4xl">Behavior-first principles.</h2>
            </div>
          </Reveal>

          {/* Insight 1 */}
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                {/* Decorative blob behind image */}
                <div className="absolute -inset-4 bg-surface-peach rounded-3xl transform -rotate-3 -z-10"></div>
                <FullScreen 
                  src="/images/case-studies/sat-lms/03-diagnostic-quiz-results.png" 
                  alt="Diagnostic quiz results" 
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className={styles.principleTag}>
                  <span className="font-cabinet font-bold text-ink-400">01</span>
                  <span className="font-dm text-sm font-bold text-ink-950">Continuous Flow</span>
                </div>
                <h3 className="font-cabinet font-extrabold text-ink-950 text-3xl mt-6 mb-4">Every action hands off to the next.</h3>
                <p className="font-dm text-body text-ink-700 leading-relaxed">
                  No "you're done" screens. Diagnostic maps gaps to the concept tree — every remedial activity is drawn from this structure. The system is the connective tissue.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Insight 2 */}
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className={styles.principleTag}>
                  <span className="font-cabinet font-bold text-ink-400">02</span>
                  <span className="font-dm text-sm font-bold text-ink-950">Default Action</span>
                </div>
                <h3 className="font-cabinet font-extrabold text-ink-950 text-3xl mt-6 mb-4">The decision tax kills momentum.</h3>
                <p className="font-dm text-body text-ink-700 leading-relaxed">
                  PACE shades concepts the student already knows. The course page defaults to focus mode — a single immediate next action, with everything else hidden.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-surface-ice rounded-3xl transform rotate-2 -z-10"></div>
                <FullScreen 
                  src="/images/case-studies/sat-lms/04-course-focus-pace0on.png" 
                  alt="Course focus mode" 
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* KEY DECISIONS */}
        <section id="decisions" className="bg-surface-light py-24 mb-32 border-y border-ink-100">
          <Reveal className="max-w-[1100px] mx-auto px-6">
            <p className="font-dm text-xs font-extrabold uppercase tracking-[0.2em] text-ink-500 mb-4 text-center">Key Decisions</p>
            <h2 className="font-cabinet font-extrabold text-ink-950 leading-tight text-4xl mb-16 text-center">Forks in the road.</h2>

            <div className="space-y-16">
              {/* Decision 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-surface-white p-8 rounded-2xl border border-ink-100 shadow-sm">
                <div>
                  <h3 className="font-cabinet font-extrabold text-ink-950 text-2xl mb-6">Hide skipped lessons vs. Explain why they were skipped.</h3>
                  <div className="space-y-4 font-dm text-sm">
                    <p><span className="font-extrabold text-ink-950">Options weighed:</span> Remove them from the UI entirely vs. Keep them visible but disabled.</p>
                    <p><span className="font-extrabold text-accent-orange">What I chose:</span> Compact skip indicators with hover tooltips.</p>
                    <p className="text-ink-700 mt-4 leading-relaxed border-l-2 border-ink-200 pl-4">
                      "Friction without explanation reads as punishment. The spec implied hiding skipped activities. But hidden activities give no signal about what was skipped or why. The tooltip ensures PACE’s logic stays visible."
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <CroppedScreen 
                    src="/images/case-studies/sat-lms/04-pace-island-skipped.png" 
                    alt="Skip indicator tooltips" 
                    bgColor="bg-surface-light"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FULL BLEED BREAK */}
        <section className={`w-full mb-32 ${styles.fullBleed}`}>
          <div className="max-w-[1600px] mx-auto px-6 py-16 relative">
            <div className="absolute inset-0 bg-surface-ice transform -skew-y-2 z-0"></div>
            <Reveal className="relative z-10">
              <BrowserChrome />
              <img src="/images/case-studies/sat-lms/04-course-full-pace0on.png" alt="Full course view with PACE active" className="w-full h-auto block rounded-b-xl shadow-2xl border-x border-b border-ink-100" loading="lazy" />
            </Reveal>
          </div>
        </section>

        {/* SHIPPED (MARQUEE) */}
        <section id="shipped" className="bg-surface-light py-24 mb-32 overflow-hidden border-y border-ink-100 relative">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-ink-950) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          
          <Reveal className="max-w-[1100px] mx-auto px-6 mb-12 relative z-10">
            <p className="font-dm text-xs font-extrabold uppercase tracking-[0.2em] text-ink-500 mb-4">Shipped</p>
            <h2 className="font-cabinet font-extrabold text-ink-950 leading-tight text-4xl">The final flow.</h2>
          </Reveal>
          
          <div className="w-full relative z-10">
            <div className={styles.marqueeTrack}>
              {[
                { src: '/images/case-studies/sat-lms/01-course-focus.png', alt: '01' },
                { src: '/images/case-studies/sat-lms/03-diagnostic-quiz-question.png', alt: '02' },
                { src: '/images/case-studies/sat-lms/03-diagnostic-quiz-results.png', alt: '03' },
                { src: '/images/case-studies/sat-lms/04-pace-choice-modal.png', alt: '04' },
                { src: '/images/case-studies/sat-lms/04-course-focus-pace0on.png', alt: '05' },
                { src: '/images/case-studies/sat-lms/05-auto-scroll.png', alt: '06' },
                // Duplicate for infinite scroll
                { src: '/images/case-studies/sat-lms/01-course-focus.png', alt: '01' },
                { src: '/images/case-studies/sat-lms/03-diagnostic-quiz-question.png', alt: '02' },
                { src: '/images/case-studies/sat-lms/03-diagnostic-quiz-results.png', alt: '03' },
                { src: '/images/case-studies/sat-lms/04-pace-choice-modal.png', alt: '04' },
                { src: '/images/case-studies/sat-lms/04-course-focus-pace0on.png', alt: '05' },
                { src: '/images/case-studies/sat-lms/05-auto-scroll.png', alt: '06' },
              ].map((img, i) => (
                <div key={i} className="w-[800px] max-w-[80vw] flex-shrink-0">
                  <div className="bg-surface-white rounded-xl p-2 border border-ink-100 shadow-md">
                    <BrowserChrome />
                    <img src={img.src} alt={img.alt} className="w-full h-auto rounded-b-lg" loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGNFORGE / PROCESS */}
        <section id="designforge" className="bg-ink-950 text-surface-white py-24 mb-32 relative overflow-hidden">
          {/* Subtle noise/grid on dark bg */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <Reveal className="max-w-[1100px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="font-dm text-xs font-extrabold uppercase tracking-[0.2em] text-ink-300 mb-4">Process</p>
                <h2 className="font-cabinet font-extrabold text-surface-white leading-tight text-4xl mb-6">
                  Built with DesignForge.
                </h2>
                <p className="font-dm text-body text-ink-100 leading-relaxed mb-8">
                  As a solo designer-builder, I used the DesignForge methodology to compress feature delivery from months to days. I don't write generic "build me a UI" prompts. I inject structural logic and business rules into the context window.
                </p>
                
                <div className="bg-ink-900 border border-ink-800 rounded-xl p-6 mt-12 relative shadow-2xl">
                  {/* Fake "Terminal" dots */}
                  <div className="flex gap-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-ink-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-ink-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-ink-700"></div>
                  </div>
                  <p className="font-dm text-xs font-extrabold uppercase tracking-widest text-ink-400 mb-4">The Prompt Pattern</p>
                  <p className="font-dm text-small text-accent-yellow font-mono leading-relaxed">
                    "I want to build a feature called PACE. The logic: Take the diagnostic exam output [JSON]. Compare against the course mastery requirements. If standard_met = true, mark module as 'skipped'. Provide the Next.js component with Tailwind. Output only the modified code blocks."
                  </p>
                </div>
              </div>
              
              <div>
                <div className="h-full flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="border-l-2 border-ink-800 pl-6 py-2">
                      <p className="font-dm text-xs font-bold text-ink-400 mb-1 uppercase tracking-widest">Feature 1: Course Page (Sequential)</p>
                      <p className="font-cabinet font-extrabold text-3xl text-ink-300">~1 week</p>
                    </div>
                    <div className="border-l-2 border-accent-orange pl-6 py-2 relative">
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-accent-orange rounded-full blur-sm"></div>
                      <p className="font-dm text-xs font-bold text-ink-400 mb-1 uppercase tracking-widest">Feature 2: PACE (DesignForge)</p>
                      <p className="font-cabinet font-extrabold text-3xl text-accent-orange">~2 days</p>
                    </div>
                    <div className="border-l-2 border-accent-orange pl-6 py-2 relative">
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-accent-orange rounded-full blur-sm"></div>
                      <p className="font-dm text-xs font-bold text-ink-400 mb-1 uppercase tracking-widest">Feature 3: Remedials (DesignForge)</p>
                      <p className="font-cabinet font-extrabold text-3xl text-accent-orange">~2 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* OUTCOME / REFLECTION */}
        <section id="outcome" className="max-w-[1100px] mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="bg-surface-mint p-10 rounded-2xl border border-ink-100 shadow-sm relative">
                {/* Decorative quote mark icon */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-surface-white rounded-full flex items-center justify-center shadow-lg border border-ink-100 text-2xl font-cabinet font-extrabold text-accent-orange">"</div>
                <h3 className="font-cabinet font-extrabold text-ink-950 text-3xl mb-4">The Outcome</h3>
                <p className="font-dm text-body text-ink-800 leading-relaxed mb-8">
                  The behavioral system proved effective. Students achieved a <strong className="text-ink-950">72% progress depth</strong> before dropping off, compared to 52% on the benchmarked LMS.
                </p>
                <figure className="border-l-4 border-ink-950 pl-6 mt-8">
                  <blockquote className="font-cabinet font-extrabold text-ink-950 text-xl leading-snug">
                    "It’s the first product I’ve seen that decides for the student instead of asking them to decide. The diagnostic alone justifies the build."
                  </blockquote>
                  <figcaption className="font-dm text-small text-ink-700 mt-4 font-bold">— Internal stakeholder, e-GMAT</figcaption>
                </figure>
              </div>

              <div className="py-4">
                <h3 className="font-cabinet font-extrabold text-ink-950 text-3xl mb-6">Looking Back</h3>
                <div className="space-y-8 font-dm text-body text-ink-700 leading-relaxed">
                  <div>
                    <strong className="text-ink-950 block mb-2 font-bold text-lg">On components.</strong> 
                    I went into this without a robust component system. If I’d extracted a shared library after feature one, PACE and Remedials would have been hours faster, not days. The methodology is only as good as the substrate it’s pulling from.
                  </div>
                  <div>
                    <strong className="text-ink-950 block mb-2 font-bold text-lg">On UX.</strong> 
                    The system surfaces the next action, but the student still has to click it. Suggestive isn’t the same as inevitable. v2 closes that gap with auto-progression.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

      </main>
    </div>
  );
}
