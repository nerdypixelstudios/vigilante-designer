const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sodales arcu at tempus pretium. Suspendisse magna lorem, iaculis sit amet convallis id, fringilla in dui. Phasellus eget fringilla nisi. Nulla facilisi. Vivamus semper elit at sapien imperdiet, eu dictum est placerat. In ullamcorper posuere sapien. Vivamus ut gravida est. Etiam dignissim ipsum eget diam venenatis lacinia. Donec eget scelerisque tortor. Phasellus mattis tellus vestibulum, fermentum ligula sed, faucibus lacus. Praesent in dolor quam.";

export default function Home() {
  return (
    <main className="min-h-screen">

      {/* ── Typography hierarchy ─────────────────────────────────── */}
      <div className="grid md:grid-cols-2">

        {/* Normal mode */}
        <div className="bg-surface-white p-10 border-r border-ink-100">
          <p className="font-dm text-ink-800 font-extrabold text-base mb-8">Normal Mode</p>

          <div className="divide-y divide-ink-100 border-t border-ink-100">

            <div className="py-8">
              <p className="font-cabinet text-ink-950 text-h1 font-extrabold leading-none">
                H1 — Cabinet Grotesk, Extra Bold, 72px
              </p>
            </div>

            <div className="py-8">
              <p className="font-cabinet text-ink-950 text-h2 font-extrabold leading-none">
                H2 — Cabinet Grotesk, Extra Bold, 48px
              </p>
            </div>

            <div className="py-6">
              <p className="font-dm text-ink-950 text-h3 font-extrabold">
                H3 — DM Sans, Extra Bold, 26px
              </p>
            </div>

            <div className="py-6">
              <p className="font-dm text-ink-950 text-h4 font-extrabold">
                H4 — DM Sans, Extra Bold, 20px
              </p>
            </div>

            <div className="py-6">
              <p className="font-dm text-ink-950 text-body font-extrabold mb-3">
                Body Text — DM Sans, Regular, 20px
              </p>
              <p className="font-dm text-ink-950 text-body font-normal leading-relaxed">
                {lorem}
              </p>
            </div>

          </div>
        </div>

        {/* Fun mode */}
        <div className="bg-fun-surface-black p-10">
          <p className="font-dm text-fun-ink-50 font-extrabold text-base mb-8">Fun Mode</p>

          <div className="divide-y divide-fun-ink-900 border-t border-fun-ink-900">

            <div className="py-8">
              <p className="font-rock-salt text-fun-ink-50 text-fun-h1 leading-rock-salt">
                H1 — Rock Salt, Regular, 65px
              </p>
            </div>

            <div className="py-8">
              <p className="font-rock-salt text-fun-ink-50 text-fun-h2 leading-rock-salt">
                H2 — Rock Salt, Regular, 40px
              </p>
            </div>

            <div className="py-6">
              <p className="font-caveat text-fun-ink-50 text-fun-h3 font-bold">
                H3 — Caveat, Bold, 30px
              </p>
            </div>

            <div className="py-6">
              <p className="font-caveat text-fun-ink-50 text-fun-h4 font-bold">
                H4 — Caveat, Bold, 26px
              </p>
            </div>

            <div className="py-6">
              <p className="font-dm text-fun-ink-50 text-body font-extrabold mb-3">
                Body Text — DM Sans, Regular, 20px
              </p>
              <p className="font-dm text-fun-ink-50 text-body font-normal leading-relaxed">
                {lorem}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── Color tokens ─────────────────────────────────────────── */}
      <div className="bg-surface-light p-10">
        <p className="font-dm text-ink-700 font-extrabold text-base mb-10">Color Tokens</p>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Normal mode palette */}
          <div>
            <p className="font-dm text-ink-500 text-xs uppercase tracking-widest mb-6">Normal Mode</p>

            <p className="font-dm text-ink-700 text-xs mb-3">Accent</p>
            <div className="flex gap-3 mb-6">
              <Swatch bg="bg-accent-yellow" label="yellow" dark />
              <Swatch bg="bg-accent-green" label="green" dark />
              <Swatch bg="bg-accent-orange" label="orange" dark />
              <Swatch bg="bg-accent-lavender" label="lavender" dark />
              <Swatch bg="bg-accent-sky" label="sky" dark />
            </div>

            <p className="font-dm text-ink-700 text-xs mb-3">Surface</p>
            <div className="flex gap-3 mb-6">
              <Swatch bg="bg-surface-light" label="light" dark border />
              <Swatch bg="bg-surface-mint" label="mint" dark />
              <Swatch bg="bg-surface-peach" label="peach" dark />
              <Swatch bg="bg-surface-lilac" label="lilac" dark />
              <Swatch bg="bg-surface-ice" label="ice" dark />
              <Swatch bg="bg-surface-white" label="white" dark border />
            </div>

            <p className="font-dm text-ink-700 text-xs mb-3">Ink</p>
            <div className="flex gap-3">
              <Swatch bg="bg-ink-950" label="950" />
              <Swatch bg="bg-ink-800" label="800" />
              <Swatch bg="bg-ink-700" label="700" />
              <Swatch bg="bg-ink-500" label="500" />
              <Swatch bg="bg-ink-300" label="300" />
              <Swatch bg="bg-ink-100" label="100" dark border />
            </div>
          </div>

          {/* Fun mode palette */}
          <div className="bg-fun-surface-dark p-8 rounded-lg">
            <p className="font-dm text-fun-ink-500 text-xs uppercase tracking-widest mb-6">Fun Mode</p>

            <p className="font-dm text-fun-ink-300 text-xs mb-3">Accent</p>
            <div className="flex gap-3 mb-6">
              <SwatchFun bg="bg-fun-accent-yellow" label="yellow" />
              <SwatchFun bg="bg-fun-accent-forest" label="forest" />
              <SwatchFun bg="bg-fun-accent-red" label="red" />
              <SwatchFun bg="bg-fun-accent-pink" label="pink" />
              <SwatchFun bg="bg-fun-accent-blue" label="blue" />
            </div>

            <p className="font-dm text-fun-ink-300 text-xs mb-3">Surface</p>
            <div className="flex gap-3 mb-6">
              <SwatchFun bg="bg-fun-surface-black" label="black" border />
              <SwatchFun bg="bg-fun-surface-dark" label="dark" border />
              <SwatchFun bg="bg-fun-surface-orange" label="orange" />
              <SwatchFun bg="bg-fun-surface-red" label="red" />
              <SwatchFun bg="bg-fun-surface-royal" label="royal" />
              <SwatchFun bg="bg-fun-surface-white" label="white" dark />
            </div>

            <p className="font-dm text-fun-ink-300 text-xs mb-3">Ink</p>
            <div className="flex gap-3">
              <SwatchFun bg="bg-fun-ink-50" label="50" dark />
              <SwatchFun bg="bg-fun-ink-100" label="100" dark />
              <SwatchFun bg="bg-fun-ink-300" label="300" dark />
              <SwatchFun bg="bg-fun-ink-500" label="500" />
              <SwatchFun bg="bg-fun-ink-700" label="700" />
              <SwatchFun bg="bg-fun-ink-900" label="900" />
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}

function Swatch({ bg, label, dark, border }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-12 h-12 rounded ${bg} ${border ? "border border-ink-300" : ""}`} />
      <span className={`font-dm text-xs ${dark ? "text-ink-500" : "text-fun-ink-500"}`}>{label}</span>
    </div>
  );
}

function SwatchFun({ bg, label, border }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-12 h-12 rounded ${bg} ${border ? "border border-fun-ink-700" : ""}`} />
      <span className="font-dm text-fun-ink-500 text-xs">{label}</span>
    </div>
  );
}
