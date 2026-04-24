export default function Home() {
  return (
    <main className="min-h-screen bg-surface-white p-8 md:p-16">

      <h1 className="font-dm text-ink-800 mb-2 text-base font-normal">
        Lohith Savala — Portfolio
      </h1>
      <p className="font-dm text-ink-500 mb-16 text-sm">
        Phase 0 proof: four fonts + all color tokens rendering correctly.
      </p>

      {/* ── Four fonts ─────────────────────────────────────────── */}
      <section className="mb-16">
        <p className="font-dm text-ink-500 mb-6 text-xs uppercase tracking-widest">
          Four fonts
        </p>
        <div className="space-y-6">
          <div>
            <p className="font-dm text-ink-300 mb-1 text-xs">Cabinet Grotesk — normal mode H1 / H2</p>
            <p className="font-cabinet text-ink-950 text-4xl md:text-5xl font-extrabold">
              Work That Speaks!!
            </p>
          </div>
          <div>
            <p className="font-dm text-ink-300 mb-1 text-xs">DM Sans — normal mode H3 / H4 / body</p>
            <p className="font-dm text-ink-950 text-4xl md:text-5xl font-extrabold">
              Skills that I bring to table!
            </p>
          </div>
          <div className="bg-fun-surface-dark p-6 rounded-lg">
            <p className="font-dm text-fun-ink-500 mb-1 text-xs">Rock Salt — fun mode H1 / H2</p>
            <p className="font-rock-salt text-fun-ink-50 text-3xl md:text-4xl">
              Echoes of Impact!!
            </p>
          </div>
          <div className="bg-fun-surface-dark p-6 rounded-lg">
            <p className="font-dm text-fun-ink-500 mb-1 text-xs">Caveat Bold — fun mode H3 / H4</p>
            <p className="font-caveat text-fun-ink-50 text-4xl md:text-5xl font-bold">
              My guys are ready!!
            </p>
          </div>
        </div>
      </section>

      {/* ── Normal mode palette ────────────────────────────────── */}
      <section className="mb-16">
        <p className="font-dm text-ink-500 mb-6 text-xs uppercase tracking-widest">
          Normal mode palette
        </p>

        <p className="font-dm text-ink-700 mb-3 text-xs">Accent</p>
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-accent-yellow rounded" />
            <span className="font-dm text-ink-500 text-xs">yellow</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-accent-green rounded" />
            <span className="font-dm text-ink-500 text-xs">green</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-accent-orange rounded" />
            <span className="font-dm text-ink-500 text-xs">orange</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-accent-lavender rounded" />
            <span className="font-dm text-ink-500 text-xs">lavender</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-accent-sky rounded" />
            <span className="font-dm text-ink-500 text-xs">sky</span>
          </div>
        </div>

        <p className="font-dm text-ink-700 mb-3 text-xs">Surface</p>
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-surface-light rounded border border-ink-100" />
            <span className="font-dm text-ink-500 text-xs">light</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-surface-mint rounded" />
            <span className="font-dm text-ink-500 text-xs">mint</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-surface-peach rounded" />
            <span className="font-dm text-ink-500 text-xs">peach</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-surface-lilac rounded" />
            <span className="font-dm text-ink-500 text-xs">lilac</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-surface-ice rounded" />
            <span className="font-dm text-ink-500 text-xs">ice</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-surface-white rounded border border-ink-100" />
            <span className="font-dm text-ink-500 text-xs">white</span>
          </div>
        </div>

        <p className="font-dm text-ink-700 mb-3 text-xs">Ink (text scale)</p>
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-ink-950 rounded" />
            <span className="font-dm text-ink-500 text-xs">950</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-ink-800 rounded" />
            <span className="font-dm text-ink-500 text-xs">800</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-ink-700 rounded" />
            <span className="font-dm text-ink-500 text-xs">700</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-ink-500 rounded" />
            <span className="font-dm text-ink-500 text-xs">500</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-ink-300 rounded" />
            <span className="font-dm text-ink-500 text-xs">300</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-ink-100 rounded border border-ink-300" />
            <span className="font-dm text-ink-500 text-xs">100</span>
          </div>
        </div>
      </section>

      {/* ── Fun mode palette ───────────────────────────────────── */}
      <section className="bg-fun-surface-dark p-8 rounded-lg">
        <p className="font-dm text-fun-ink-500 mb-6 text-xs uppercase tracking-widest">
          Fun mode palette
        </p>

        <p className="font-dm text-fun-ink-300 mb-3 text-xs">Accent</p>
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-accent-yellow rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">yellow</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-accent-forest rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">forest</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-accent-red rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">red</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-accent-pink rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">pink</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-accent-blue rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">blue</span>
          </div>
        </div>

        <p className="font-dm text-fun-ink-300 mb-3 text-xs">Surface</p>
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-surface-black rounded border border-fun-ink-900" />
            <span className="font-dm text-fun-ink-500 text-xs">black</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-surface-dark rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">dark</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-surface-orange rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">orange</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-surface-red rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">red</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-surface-royal rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">royal</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-surface-white rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">white</span>
          </div>
        </div>

        <p className="font-dm text-fun-ink-300 mb-3 text-xs">Ink (text scale)</p>
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-ink-50 rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">50</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-ink-100 rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">100</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-ink-300 rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">300</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-ink-500 rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">500</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-ink-700 rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">700</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-fun-ink-900 rounded" />
            <span className="font-dm text-fun-ink-500 text-xs">900</span>
          </div>
        </div>
      </section>

    </main>
  );
}
