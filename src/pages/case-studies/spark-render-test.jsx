import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#tldr", label: "TL;DR" },
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#outcome", label: "Outcome" },
];

const liveActivityUrl = "";

const metrics = [
  {
    label: "Batch conversion speed",
    value: "100 files",
    detail: "in ~2 hours",
    explanation: "A batch of 100 learning files could be converted into final presentable production files in roughly 2 hours.",
    tooltip: "Previously, one activity could take around 3 full days to convert, review, revise, export, and upload through the manual workflow.",
  },
  {
    label: "Translation reliability",
    value: "95%+",
    detail: "automated accuracy",
    explanation: "The pipeline reached above 95% automated accuracy, with validators and correction checks handling the remaining edge cases.",
    tooltip: "Reliability came from codifying SME intent, design judgment, component rules, schema expectations, and validation checks.",
  },
  {
    label: "Maintenance speed",
    value: "Minutes",
    detail: "to update",
    explanation: "Content changes could be corrected at the source, reconverted, uploaded, and reflected without rebuilding an entire third-party package.",
    tooltip: "Maintenance shifted from regenerate-and-reupload to update-source-and-render.",
  },
];

const evidenceCards = [
  {
    role: "SME / Course Architect",
    title: "The content owner had the intent, not the production layer.",
    quote: "I can write the learning content, but I still need someone to translate that intent into a presentable experience.",
    interpretation: "The SME owns the content depth, but not necessarily the visual system or production mechanics.",
  },
  {
    role: "Designer / Converter",
    title: "The designer had the presentation lens, not always the SME lens.",
    quote: "I can make the content presentable, but I may not fully understand the instructional intent behind every decision.",
    interpretation: "Manual conversion created interpretation drift because content judgment and design judgment lived with different people.",
  },
  {
    role: "Product / Engineering",
    title: "The product needed more control than a third-party authoring layer allowed.",
    quote: "Even after the activity is built, maintenance and tracking are constrained by the authoring layer.",
    interpretation: "Custom tracking, faster updates, and native product behavior were difficult when the activity lived as an exported package.",
  },
];

const approachMachines = [
  {
    label: "Machine 01",
    title: "SME Intelligence",
    question: "What should the learner understand here, and what instructional intent must be preserved?",
    intent: "Preserve the subject-matter logic of the source content.",
    criteria: "The translated activity must retain sequence, emphasis, and conceptual priority.",
    logic: "Identify whether a segment is an explanation, example, warning, takeaway, practice task, assessment, or result cue.",
  },
  {
    label: "Machine 02",
    title: "Design Intelligence",
    question: "How should this learning moment be represented so the student can absorb it easily?",
    intent: "Convert learning moments into the right presentation patterns.",
    criteria: "The output should feel clear, coherent, readable, and not visually overwhelming.",
    logic: "Match content intent to approved learning blocks instead of inventing one-off layouts.",
  },
  {
    label: "Machine 03",
    title: "Engineering Intelligence",
    question: "How do we make the output scalable, maintainable, trackable, and production-ready?",
    intent: "Turn translated content into a stable product input.",
    criteria: "The final file should be structured, valid, uploadable, renderable, and easy to update later.",
    logic: "Use a predictable JSON contract, validation checks, reusable components, and a renderer that maps data to UI.",
  },
];

const decisions = [
  {
    number: "01",
    title: "I codified the manual workflow into system stages.",
    aim: "Remove repeated human interpretation from the conversion path.",
    product: "Break the manual workflow into extraction, navigation, validation, correction, final JSON creation, backend upload, and rendering.",
    support: "Each stage took over one repeatable decision that previously sat with a human operator.",
    prevented: "This prevented one giant black-box conversion where errors would be hard to trace.",
  },
  {
    number: "02",
    title: "I created a component grammar for learning content.",
    aim: "Give the system a fixed language for presenting different types of learning moments.",
    product: "Define approved blocks such as explanation, example, takeaway, table, formula, practice problem, assessment, result guide, and summary.",
    support: "The translator could map learning intent to known blocks instead of creating inconsistent one-off layouts.",
    prevented: "This prevented invented components, repeated layout rebuilding, and inconsistent student-facing presentation patterns.",
    tradeoff: "Tradeoff handled: the first component set was too rich and visually noisy, so the system was simplified to preserve coherence.",
  },
  {
    number: "03",
    title: "I made JSON the contract between translation, backend, and renderer.",
    aim: "Create one structure that every system layer could trust.",
    product: "The translated output became structured JSON that the backend could store and the frontend renderer could read.",
    support: "The final learning experience became data-driven, component-led, and easier to update.",
    prevented: "This prevented frontend/backend ambiguity, fragile exports, and rigid placeholder-like layouts.",
    tradeoff: "Tradeoff handled: the schema had to be strict enough for production but flexible enough for real learning sequences.",
  },
  {
    number: "04",
    title: "I built a custom component-led renderer.",
    aim: "Make the presentation layer reusable instead of rebuilding activity screens manually.",
    product: "The renderer reads the JSON, identifies the component names, passes content to the matching JSX components, and renders the activity.",
    support: "Students experience an interface that feels native to the e-GMAT ecosystem instead of a third-party embedded activity.",
    prevented: "This prevented Frankenstein-like learning experiences, repeated page builds, and disconnected product behavior.",
  },
  {
    number: "05",
    title: "I added quality gates instead of relying on blind automation.",
    aim: "Make speed safe enough for production.",
    product: "The pipeline includes validation and correction stages so structure, required fields, and output quality can be checked before final upload.",
    support: "The system could move fast without letting malformed activities reach the learner.",
    prevented: "This prevented silent translation errors, broken rendering, and review cycles caused by avoidable structure issues.",
  },
];

const processSteps = [
  {
    title: "Map the manual workflow",
    happened: "We documented how learning content was manually converted into presentable activities.",
    artifact: "Workflow map showing where SME judgment, design judgment, review, export, and upload occurred.",
    prevented: "Automating the wrong thing or treating the problem as UI polish.",
  },
  {
    title: "Define the component grammar",
    happened: "I identified the recurring learning blocks needed to express e-GMAT’s learning content.",
    artifact: "Component ledger / learning-block grammar.",
    prevented: "The translator inventing components or producing inconsistent presentation formats.",
  },
  {
    title: "Shape the JSON structure",
    happened: "We defined the output structure needed by the backend and frontend renderer.",
    artifact: "Backend-ready JSON contract.",
    prevented: "Translation output that looked good in isolation but could not render reliably in production.",
  },
  {
    title: "Build the translation intelligence",
    happened: "I worked with the Principal Course Architect to encode SME intent and design decision-making into the translation pipeline.",
    artifact: "Proprietary translation logic and prompt system, shown publicly only as a derived artifact.",
    prevented: "A human designer repeatedly deciding how each piece of content should be represented.",
  },
  {
    title: "Build the component library + renderer",
    happened: "I designed and coded the frontend components and integrated the renderer that maps JSON to UI.",
    artifact: "Spark learning component library + activity renderer.",
    prevented: "Rebuilding custom screens for every new lesson.",
  },
  {
    title: "Test with real learning files",
    happened: "We ran real Markdown files through the pipeline and reviewed the output as students would experience it.",
    artifact: "Tested translated activities and refinement notes.",
    prevented: "Technically correct output that felt cognitively overwhelming or visually fragmented.",
  },
  {
    title: "Add validation and correction checks",
    happened: "We added quality gates to catch malformed structures and edge cases.",
    artifact: "Validator and corrector stages.",
    prevented: "Speed becoming risky, especially when converting many files in batches.",
  },
];

const quotes = [
  {
    name: "Payal",
    role: "Principal Course Architect / CEO",
    quote: "The biggest shift with Spark was that the instructional logic did not get lost during conversion. The system preserved the course intent while making production dramatically faster.",
  },
  {
    name: "TBD",
    role: "Student Strategy Expert",
    quote: "The rendered activities feel more consistent and easier to move through. Students see a clearer learning flow instead of jumping between disconnected content blocks.",
  },
];

const pollOptions = [
  "Static authoring gives more control.",
  "Structured systems scale better.",
  "The answer depends on quality gates.",
];

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Brow({ children, tone = "green", className = "" }) {
  const tones = {
    green: "bg-[#2AE881] text-black",
    orange: "bg-[#FF5F00] text-white",
    yellow: "bg-[#FBE200] text-black",
    lilac: "bg-[#F0EDFF] text-black",
    black: "bg-black text-white",
  };

  return (
    <p className={`inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.2em] ${tones[tone]} ${className}`}>
      {children}
    </p>
  );
}

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`px-6 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

function Nav() {
  return (
    <nav className="fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-black/10 bg-white/85 p-1 shadow-[0_2px_16px_rgba(0,0,0,0.06)] backdrop-blur md:flex">
      <a href="#top" className="rounded-full px-4 py-2 text-sm font-black text-black no-underline hover:bg-[#F3F3F3]">Back</a>
      {links.map((link) => (
        <a key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-bold text-black/55 no-underline hover:bg-[#F3F3F3] hover:text-black">
          {link.label}
        </a>
      ))}
    </nav>
  );
}

function Arrow() {
  return <span className="hidden text-3xl font-black text-black/25 md:inline">→</span>;
}

function HeroSystemGraphic() {
  return (
    <div className="mx-auto mt-16 max-w-6xl rounded-[2rem] border border-black/10 bg-white p-4 shadow-[0_20px_70px_rgba(0,0,0,0.18)] md:p-6">
      <div className="rounded-[1.5rem] bg-[#F3F3F3] p-5 md:p-8">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1.1fr_auto_1fr] md:items-center">
          <div className="rounded-3xl border border-black/10 bg-white p-5 text-left">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-black/35">Source</p>
            <div className="space-y-2 font-mono text-sm text-black/65">
              <p># Lesson file.md</p>
              <p>- Concept explanation</p>
              <p>- Worked example</p>
              <p>- Practice prompt</p>
            </div>
          </div>
          <Arrow />
          <div className="rounded-3xl border border-black bg-black p-5 text-left text-white">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-white/45">Spark engine</p>
            <div className="grid gap-3">
              {['Scan learning moments', 'Map approved blocks', 'Validate structure'].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-black text-white/80">{item}</div>
              ))}
            </div>
          </div>
          <Arrow />
          <div className="rounded-3xl border border-black/10 bg-white p-5 text-left">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-black/35">Output</p>
            <div className="rounded-2xl bg-[#D4FBE6] p-4 font-mono text-sm font-bold text-black/70">
              {'{'}<br />
              &nbsp;&nbsp;activityId,<br />
              &nbsp;&nbsp;learningBlocks,<br />
              &nbsp;&nbsp;renderRules<br />
              {'}'}
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-3xl border border-black/10 bg-[#FBE200] p-5 text-left md:mt-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-black/55">Hero graphic intent</p>
          <p className="mt-2 text-xl font-black leading-tight text-black">Show conversion intelligence, not just the final lesson UI.</p>
        </div>
      </div>
    </div>
  );
}

function Metric({ metric }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-center">
      <button onClick={() => setOpen((value) => !value)} className="group block w-full rounded-3xl border border-black/10 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        <p className="font-sans text-6xl font-black leading-none tracking-tighter text-black md:text-7xl">{metric.value}</p>
        <p className="mt-3 font-sans text-xl font-black text-black">{metric.detail}</p>
        <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-black/45">{metric.label}</p>
        <p className="mt-4 text-sm leading-relaxed text-black/60">{metric.explanation}</p>
        <span className="mt-4 inline-flex h-6 w-6 items-center justify-center rounded-full border border-black/10 bg-[#F3F3F3] text-xs font-black">?</span>
      </button>
      {open && (
        <div className="absolute left-1/2 top-[calc(100%+0.75rem)] z-20 w-72 -translate-x-1/2 rounded-2xl border border-black/10 bg-black p-4 text-left text-sm font-medium leading-relaxed text-white shadow-xl">
          {metric.tooltip}
        </div>
      )}
    </div>
  );
}

function TldrGraphic() {
  const inputs = ["SME intent", "Design grammar", "Engineering scale"];
  const outputs = ["Structured JSON", "Reusable components", "Trackable product behavior"];

  return (
    <div className="mx-auto mt-12 max-w-5xl rounded-[2rem] border border-black/10 bg-[#F3F3F3] p-5 md:p-8">
      <div className="grid gap-5 md:grid-cols-[1fr_1.1fr_1fr] md:items-center">
        <div className="space-y-3">
          {inputs.map((item) => (
            <div key={item} className="rounded-2xl bg-white px-5 py-4 text-center text-sm font-black shadow-sm">{item}</div>
          ))}
        </div>
        <div className="rounded-full border border-black bg-black px-8 py-12 text-center text-white shadow-[0_25px_70px_rgba(0,0,0,0.28)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Center system</p>
          <h3 className="mt-3 text-3xl font-black leading-tight">Spark Content Presenter</h3>
          <p className="mt-4 text-sm font-medium leading-relaxed text-white/60">Codifies the conversion decisions that were previously manual.</p>
        </div>
        <div className="space-y-3">
          {outputs.map((item) => (
            <div key={item} className="rounded-2xl bg-[#D4FBE6] px-5 py-4 text-center text-sm font-black shadow-sm">{item}</div>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-sm font-bold italic leading-relaxed text-black/50">Before Spark, these lived in separate hands. After Spark, they became one repeatable production system.</p>
    </div>
  );
}

function EvidenceStack() {
  const [active, setActive] = useState(0);
  const current = evidenceCards[active];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % evidenceCards.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
      <p className="mb-6 text-center text-sm italic leading-relaxed text-black/45">Internal workflow signals · tap a role</p>
      <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
        <div className="mb-5 flex flex-wrap gap-2">
          {evidenceCards.map((card, index) => (
            <button key={card.role} onClick={() => setActive(index)} className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.12em] ${active === index ? 'bg-black text-white' : 'bg-[#F3F3F3] text-black/50'}`}>
              {card.role.split(" /")[0]}
            </button>
          ))}
        </div>
        <motion.div key={current.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">{current.role}</p>
          <h3 className="mt-3 text-3xl font-black leading-tight tracking-tight">{current.title}</h3>
          <p className="mt-6 text-lg font-bold italic leading-relaxed text-black/70">“{current.quote}”</p>
          <div className="my-6 border-t border-black/10" />
          <p className="text-base font-medium leading-relaxed text-black/65">{current.interpretation}</p>
        </motion.div>
      </div>
    </div>
  );
}

function BottleneckDiagram() {
  const steps = ["SME Markdown", "Designer interpretation", "Manual block picking", "Activity build", "SME review", "Export + upload"];
  return (
    <div className="mt-12 rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm md:p-7">
      <div className="grid gap-3 md:grid-cols-6">
        {steps.map((step, index) => (
          <div key={step} className={`relative rounded-2xl px-4 py-5 text-center text-sm font-black ${index > 0 && index < 4 ? 'bg-[#FFDFCC]' : 'bg-[#F3F3F3]'}`}>
            {step}
          </div>
        ))}
      </div>
      <div className="mx-auto mt-5 max-w-2xl rounded-2xl bg-[#FBE200] px-5 py-4 text-center text-xl font-black leading-tight">
        Presentation decisions were trapped inside the manual authoring workflow.
      </div>
    </div>
  );
}

function ApproachMachine({ machine, index }) {
  return (
    <Reveal delay={index * 0.05}>
      <article className="grid gap-6 rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:grid-cols-[0.8fr_1.2fr] md:p-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">{machine.label}</p>
          <h3 className="mt-3 text-4xl font-black leading-tight tracking-tight">{machine.title}</h3>
          <p className="mt-5 rounded-2xl bg-black p-5 text-lg font-black leading-snug text-white">{machine.question}</p>
        </div>
        <div className="grid gap-3">
          <div className="rounded-2xl bg-[#F3F3F3] p-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Intent</p><p className="mt-2 text-sm font-bold leading-relaxed text-black/70">{machine.intent}</p></div>
          <div className="rounded-2xl bg-[#D4FBE6] p-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Success criteria</p><p className="mt-2 text-sm font-bold leading-relaxed text-black/70">{machine.criteria}</p></div>
          <div className="rounded-2xl bg-[#F0EDFF] p-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Decision logic</p><p className="mt-2 text-sm font-bold leading-relaxed text-black/70">{machine.logic}</p></div>
        </div>
      </article>
    </Reveal>
  );
}

function DecisionCard({ decision }) {
  return (
    <Reveal>
      <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.07)] md:p-8">
        <div className="grid gap-6 md:grid-cols-[140px_1fr]">
          <div>
            <p className="text-7xl font-black tracking-tighter text-black/10">{decision.number}</p>
          </div>
          <div>
            <h3 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">{decision.title}</h3>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-[#F3F3F3] p-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Decision aim</p><p className="mt-3 text-sm font-bold leading-relaxed text-black/70">{decision.aim}</p></div>
              <div className="rounded-3xl bg-[#F0EDFF] p-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Product decision</p><p className="mt-3 text-sm font-bold leading-relaxed text-black/70">{decision.product}</p></div>
              <div className="rounded-3xl bg-[#D4FBE6] p-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">UX / system support</p><p className="mt-3 text-sm font-bold leading-relaxed text-black/70">{decision.support}</p></div>
            </div>
            <div className="mt-4 rounded-3xl border border-black/10 bg-white p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">What this prevented</p>
              <p className="mt-3 text-base font-bold leading-relaxed text-black/70">{decision.prevented}</p>
              {decision.tradeoff && <p className="mt-4 rounded-2xl bg-[#FBE200] p-4 text-sm font-black leading-relaxed text-black">{decision.tradeoff}</p>}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function PipelineGraphic() {
  const steps = ["Source MD", "Extractor", "Navigator", "Validator", "Corrector", "Final JSON", "Renderer", "Activity"];
  return (
    <div className="mt-12 rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm md:p-7">
      <div className="grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step} className={`rounded-2xl px-4 py-5 text-center text-sm font-black ${index === 0 ? 'bg-[#FBE200]' : index === steps.length - 1 ? 'bg-[#2AE881]' : 'bg-[#F3F3F3]'}`}>
            <p className="text-xs text-black/35">{String(index + 1).padStart(2, '0')}</p>
            {step}
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-sm font-bold italic leading-relaxed text-black/45">Public-safe pipeline view. Internal prompts, full schemas, and backend contracts are intentionally not shown.</p>
    </div>
  );
}

function ProcessStep({ step, index }) {
  return (
    <Reveal delay={index * 0.03}>
      <div className="grid gap-5 border-b border-black/10 p-6 last:border-b-0 md:grid-cols-[90px_1fr_1fr_1fr] md:items-start">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-black/35">{String(index + 1).padStart(2, '0')}</p>
        <div><h3 className="text-2xl font-black leading-tight">{step.title}</h3><p className="mt-3 text-sm font-medium leading-relaxed text-black/60">{step.happened}</p></div>
        <div><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Artifact produced</p><p className="mt-3 text-sm font-bold leading-relaxed text-black/70">{step.artifact}</p></div>
        <div><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">What this prevented</p><p className="mt-3 text-sm font-bold leading-relaxed text-black/70">{step.prevented}</p></div>
      </div>
    </Reveal>
  );
}

function LiveProductCard() {
  const disabled = !liveActivityUrl;
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.09)] md:p-7">
      <div className="overflow-hidden rounded-3xl border border-black/10 bg-[#F7F8FA]">
        <div className="flex items-center gap-2 border-b border-black/10 bg-white px-5 py-4">
          <span className="h-3 w-3 rounded-full bg-black/15" /><span className="h-3 w-3 rounded-full bg-black/15" /><span className="h-3 w-3 rounded-full bg-black/15" />
          <div className="ml-4 flex-1 rounded-full bg-[#F3F3F3] px-4 py-2 text-xs font-bold text-black/40">spark/rendered-learning-activity</div>
        </div>
        <div className="grid min-h-[360px] gap-0 md:grid-cols-[190px_1fr]">
          <aside className="border-r border-black/10 bg-white p-5">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-black/35">Lesson path</p>
            {['Context', 'Learn', 'Practice', 'Recap'].map((item, index) => <div key={item} className={`mb-2 rounded-2xl px-4 py-3 text-sm font-black ${index === 1 ? 'bg-black text-white' : 'bg-[#F3F3F3] text-black/60'}`}>{item}</div>)}
          </aside>
          <main className="p-5">
            <p className="mb-3 inline-flex rounded-full bg-[#2AE881] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-black">Live product output</p>
            <h3 className="text-3xl font-black leading-tight tracking-tight">A cohesive learning activity rendered from structured data.</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 shadow-sm"><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Example</p><p className="mt-3 text-base font-bold leading-relaxed text-black/70">The interface presents the learning moment as an approved component, not a manually pasted block.</p></div>
              <div className="rounded-3xl bg-[#D4FBE6] p-5 shadow-sm"><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Takeaway</p><p className="mt-3 text-base font-bold leading-relaxed text-black/70">The final activity feels native to the product ecosystem, not stitched together.</p></div>
            </div>
          </main>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Try the live learning experience</p>
          <p className="mt-2 text-sm font-bold leading-relaxed text-black/60">The converter is internal; this card points to the rendered student-facing output.</p>
        </div>
        {disabled ? (
          <button disabled className="rounded-full bg-[#F3F3F3] px-5 py-3 text-sm font-black text-black/35">Add live URL</button>
        ) : (
          <a href={liveActivityUrl} target="_blank" rel="noreferrer" className="rounded-full bg-black px-5 py-3 text-sm font-black text-white no-underline">Open live activity ↗</a>
        )}
      </div>
    </div>
  );
}

function OutcomePoll() {
  const [selected, setSelected] = useState(null);
  const votes = useMemo(() => [18, 41, 27], []);
  const total = votes.reduce((sum, value) => sum + value, 0);

  return (
    <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">What do you think?</p>
      <h3 className="mt-3 text-3xl font-black leading-tight tracking-tight">Should learning content at scale be authored as static pages — or assembled from structured data?</h3>
      <div className="mt-7 space-y-3">
        {pollOptions.map((option, index) => {
          const percent = Math.round((votes[index] / total) * 100);
          return (
            <button key={option} onClick={() => setSelected(index)} className="w-full rounded-2xl border border-black/10 bg-[#F3F3F3] p-4 text-left transition hover:border-black">
              <div className="flex items-center justify-between gap-4"><span className="text-sm font-black text-black/75">{option}</span><span className="text-sm font-black text-black/45">{selected !== null ? `${percent}%` : 'Vote'}</span></div>
              {selected !== null && <div className="mt-3 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-[#2AE881]" style={{ width: `${percent}%` }} /></div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SparkLearningContentPresenterCaseStudy() {
  return (
    <div id="top" className="min-h-screen bg-white text-black">
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden px-6 pb-24 pt-32 text-center md:pt-36">
          <div className="absolute inset-0 -z-10 opacity-35" style={{ backgroundImage: "linear-gradient(#d2d2d2 1px, transparent 1px), linear-gradient(90deg, #d2d2d2 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 78%, transparent 100%)" }} />
          <div className="mx-auto max-w-[1100px]">
            <Reveal>
              <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.2em] text-black/50">Spark Content Presenter</p>
              <h1 className="mx-auto mb-8 max-w-5xl text-5xl font-black leading-[1.05] tracking-tight text-black md:text-7xl">
                The system that turns lesson files into learning experiences <span className="inline-block -rotate-1 bg-[#FBE200] px-2">in hours, not days.</span>
              </h1>
              <p className="mb-10 text-3xl font-black leading-tight text-black">No manual authoring. No interpretation drift. Just structured learning content, converted at scale.</p>
              <p className="mx-auto mb-10 max-w-4xl text-lg leading-relaxed text-black/75 md:text-xl">
                Spark Content Presenter converts SME-written Markdown into production-ready learning activities. It scans the source content, maps learning moments to approved presentation blocks, generates validated JSON, and renders the final activity through a custom component library built for e-GMAT’s learning ecosystem.
              </p>
              <div className="mb-3 flex flex-wrap justify-center gap-4 text-sm text-black/70">
                {['Principal Product Architect', 'Frontend + System Ownership', 'December 2025', 'e-GMAT'].map((badge) => <span key={badge} className="rounded-full border border-black/10 bg-[#F3F3F3] px-4 py-2 font-bold">{badge}</span>)}
              </div>
            </Reveal>
            <HeroSystemGraphic />
          </div>
        </section>

        <Section id="tldr" className="bg-white">
          <Reveal>
            <Brow className="mb-5">TL;DR</Brow>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
              <span className="box-decoration-clone bg-[#2AE881] px-2">I architected and built Spark Content Presenter as a custom learning-content assembly line</span> — replacing manual Rise-era authoring with a reusable system that converts SME Markdown into structured, validated, production-ready learning activities.
            </h2>
            <p className="mt-8 text-xl font-bold leading-relaxed text-black/70">
              In the product, this meant content no longer had to be manually rebuilt lesson by lesson. The system could identify learning moments, map them to approved components, validate the output, and render the activity inside the same e-GMAT learning ecosystem.
            </p>
            <TldrGraphic />
            <div className="mt-16 pt-4">
              <Brow className="mb-8">My Impact</Brow>
              <h3 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">After Spark, lesson conversion moved from a slow manual authoring workflow to a scalable production system.</h3>
              <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
                {metrics.map((metric) => <Metric key={metric.label} metric={metric} />)}
              </div>
            </div>
          </Reveal>
        </Section>

        <section id="problem" className="relative isolate overflow-hidden bg-white px-6 py-20 md:py-28">
          <div className="absolute inset-0 -z-10 opacity-20" style={{ backgroundImage: "linear-gradient(#d2d2d2 1px, transparent 1px), linear-gradient(90deg, #d2d2d2 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
                <div>
                  <Brow tone="orange" className="mb-6">The Problem</Brow>
                  <h2 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
                    Content creation had scaled. <span className="box-decoration-clone bg-white px-2">Presentation was still trapped in manual authoring.</span>
                  </h2>
                  <p className="mt-10 max-w-xl text-lg leading-relaxed text-black/75 md:text-xl">
                    AI had made it possible to create learning content much faster. But converting that prose content into structured, presentable, review-ready learning activities was still slow.
                  </p>
                </div>
                <EvidenceStack />
              </div>
              <BottleneckDiagram />
              <div className="mt-20 border-t border-black/10 pt-10 md:mt-24 md:pt-12">
                <p className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
                  The bottleneck was not content. It was not UI polish either. The real bottleneck was that <span className="box-decoration-clone bg-[#FBE200] px-2">presentation decisions were trapped inside a manual authoring workflow.</span>
                </p>
                <p className="mt-8 text-2xl font-black leading-tight text-black/75">So the next question became: if those decisions are repeatable, can they be removed from the manual workflow and turned into a system?</p>
              </div>
            </Reveal>
          </div>
        </section>

        <Section id="solution" className="bg-[#F3F3F3]">
          <Reveal>
            <Brow className="mb-5">My Approach</Brow>
            <h2 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">What if lesson conversion worked like an assembly line?</h2>
            <p className="mt-8 max-w-4xl text-xl font-bold leading-relaxed text-black/70">Instead of treating every learning activity as a fresh design-and-build task, I looked at the manual workflow as a sequence of repeatable decisions. If each decision had an intent, a success criterion, and a decision rule, then the workflow could be systemized.</p>
            <div className="mt-10 rounded-[2rem] bg-black p-8 text-white">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Core question</p>
              <p className="mt-4 text-3xl font-black leading-tight md:text-5xl">If we were building an assembly line for converting learning content into a presentable activity, what machines would it need?</p>
            </div>
          </Reveal>
          <div className="mt-12 space-y-6">
            {approachMachines.map((machine, index) => <ApproachMachine key={machine.title} machine={machine} index={index} />)}
          </div>
          <Reveal>
            <div className="mt-14 rounded-[2rem] border border-black/10 bg-white p-8 text-center shadow-sm">
              <p className="text-3xl font-black leading-tight tracking-tight md:text-5xl">Spark did not need to be another authoring tool. It needed to be an assembly line where SME judgment, design judgment, and engineering scalability were codified into repeatable product behavior.</p>
            </div>
          </Reveal>
        </Section>

        <Section id="decisions" className="bg-white">
          <Reveal>
            <Brow className="mb-5">Key Design Decisions</Brow>
            <h2 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-6xl">I made <span className="box-decoration-clone bg-[#2AE881] px-2">5 decisions</span> that turned manual conversion into a scalable product system.</h2>
          </Reveal>
          <div className="mt-12 space-y-8 md:mt-16">
            {decisions.map((decision) => <DecisionCard key={decision.number} decision={decision} />)}
          </div>
          <Reveal>
            <div className="mt-16 rounded-[2rem] bg-black p-8 text-center text-white">
              <p className="mx-auto max-w-4xl text-3xl font-black leading-tight tracking-tight md:text-5xl">Together, these decisions made <span className="box-decoration-clone bg-[#FBE200] px-2 text-black">scalable conversion the default</span>, not a manual craft process.</p>
            </div>
          </Reveal>
        </Section>

        <Section id="process" className="bg-[#F3F3F3]">
          <Reveal>
            <Brow tone="lilac" className="mb-5">Build Process</Brow>
            <h2 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">The build process produced a system, not just a screen.</h2>
            <p className="mt-8 max-w-4xl text-xl font-bold leading-relaxed text-black/70">The work was less about designing a single learning activity and more about building a reliable production path. Each stage produced an artifact that made the next stage possible.</p>
            <PipelineGraphic />
          </Reveal>
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.07)]">
            {processSteps.map((step, index) => <ProcessStep key={step.title} step={step} index={index} />)}
          </div>
          <Reveal>
            <div className="mt-14 rounded-[2rem] bg-black p-8 text-white">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2AE881]">Why this process worked</p>
              <h3 className="mt-4 text-4xl font-black leading-tight tracking-tight">It did not depend on one giant leap from Markdown to UI.</h3>
              <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-white/65">It broke conversion into smaller accountable stages. Each stage had a job, an output, and a check. That made the system fast, reliable, and easier to improve over time.</p>
              <div className="mt-8 grid gap-3 md:grid-cols-5">
                {['Component grammar constrained choices', 'JSON contract made output renderable', 'Validation protected quality', 'Real-file testing exposed cognitive load', 'Renderer made updates reusable'].map((item) => <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-black leading-snug text-white/80">{item}</div>)}
              </div>
            </div>
          </Reveal>
        </Section>

        <Section id="shipped" className="bg-white">
          <Reveal>
            <Brow tone="orange" className="mb-5">Shipped Output</Brow>
            <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div>
                <h2 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">Students don’t see the converter. They experience a more cohesive learning product.</h2>
                <p className="mt-8 text-xl font-bold leading-relaxed text-black/70">Spark’s backend and translation logic stay invisible to the learner. What students experience is the final rendered activity: a cleaner, more coherent learning flow that feels like part of the same e-GMAT ecosystem, not a third-party activity stitched onto the side.</p>
              </div>
              <LiveProductCard />
            </div>
          </Reveal>
        </Section>

        <section id="outcome" className="bg-black px-6 py-20 text-white md:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-[#2AE881]">Outcome</p>
              <h2 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-6xl">The bottleneck moved from manual authoring to scalable production.</h2>
              <p className="mt-8 max-w-4xl text-xl font-bold leading-relaxed text-white/65">Spark changed how learning activities were produced, maintained, and rendered. The same content pipeline could now support faster conversion, consistent learning UX, easier updates, and better tracking flexibility.</p>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {metrics.map((metric) => <div key={metric.label} className="rounded-[2rem] bg-white p-6 text-black"><p className="text-6xl font-black tracking-tighter">{metric.value}</p><p className="mt-3 text-xl font-black">{metric.detail}</p><p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-black/45">{metric.label}</p><p className="mt-4 text-sm font-medium leading-relaxed text-black/60">{metric.explanation}</p></div>)}
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {quotes.map((quote) => <figure key={quote.name} className="rounded-[2rem] bg-white/10 p-7"><blockquote className="text-2xl font-black leading-snug tracking-tight">“{quote.quote}”</blockquote><figcaption className="mt-8 border-t border-white/10 pt-5"><p className="font-black">{quote.name}</p><p className="text-sm font-bold text-white/45">{quote.role}</p><p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-white/30">Directional quote · replace with approved quote</p></figcaption></figure>)}
            </div>
            <div className="mt-14">
              <OutcomePoll />
            </div>
          </div>
        </section>

        <Section id="next" className="bg-white">
          <Reveal>
            <div className="rounded-[2.5rem] bg-black p-8 text-white md:p-12">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2AE881]">Next Case Study</p>
              <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="mb-4 text-sm font-bold text-white/45">That is how I built this one.</p>
                  <h2 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">e-GMAT Public Website Revamp</h2>
                  <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/65">Spark solved internal content scale. Next, a public-facing product surface with a different kind of complexity: clarity, trust, SEO, performance, and conversion behavior.</p>
                </div>
                <button className="inline-flex items-center gap-3 rounded-full bg-[#FBE200] px-6 py-4 text-sm font-black text-black">View next case →</button>
              </div>
            </div>
          </Reveal>
        </Section>
      </main>
    </div>
  );
}
