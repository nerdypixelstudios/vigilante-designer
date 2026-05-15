# SAT LMS Interactive Demo

A portable, self-contained interactive demo of the SAT LMS product for use in Lohith Savala's portfolio website. Intended to be embedded inside the existing SAT LMS case study at `/case-studies/sat-lms`.

---

## What This Package Is

- A guided 9-step interactive walkthrough of the SAT LMS product flow
- Fully client-side — no backend calls, no auth, no routing dependency
- Written in JSX + CSS Modules — compatible with Next.js + React
- Uses the product's own design tokens (colors, typography) — not the portfolio's Tailwind system

---

## Package Entry

```
index.js  →  exports  { SatLmsDemo }
```

The single root component is `SatLmsDemo`. Import and mount it anywhere:

```jsx
import SatLmsDemo from '@/components/case-study/sat-lms-demo';
// or wherever you place the package in the portfolio repo

export default function SatLmsPage() {
  return (
    <section className="your-case-study-section">
      <SatLmsDemo />
    </section>
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | `''` | Extra class added to the root wrapper |
| `style` | object | `{}` | Inline styles for the root wrapper |
| `onDemoComplete` | function | `undefined` | Called when the user reaches a terminal step. Receives `{ branch: 'good' \| 'low' }` |

---

## Demo Flow (9 Steps)

```
Step 1  Course Page (Diagnostic not attempted)
Step 2  Diagnostic Quiz (5 questions, free attempt)
Step 3  Diagnostic Results (score, grade, hours saved)
Step 4  Post-Diagnostic Choice Modal
Step 5  Personalized Path (Diagnostic completed, PACE Island toggle)
Step 6  Activity Quiz (5 questions, free attempt)
         ↓ Guidance shade branch buttons
    ┌────────────────────┬────────────────────┐
    │   High-score path  │   Low-score path   │
    │   Step 7a          │   Step 7b          │
    │   Good Results     │   Low Results      │
    │   [demo ends]      │   Step 8           │
    │                    │   Remedial Modal   │
    │                    │   Step 9           │
    │                    │   Remedial Activity│
    │                    │   [demo ends]      │
    └────────────────────┴────────────────────┘
```

---

## Guidance Shade

A persistent bottom bar appears throughout the demo. On every step it shows:
- **Action**: what to click next
- **Why**: one line explaining why this step matters
- **Highlight this element**: scrolls the target into view and pulses a ring around it

On Step 6 (Activity Quiz), the shade also shows two branch buttons:
- `Show high-score path`
- `Show low-score path`

These deterministically route to the chosen outcome regardless of the user's quiz answers.

---

## Container Behavior

`SatLmsDemo` fills 100% of its parent container width. Height is driven by content. The guidance shade uses `position: sticky; bottom: 0` within the demo scroll container.

**Important for the portfolio host:**
- The demo does NOT assume it owns the viewport. Full-screen presentation behavior belongs to the portfolio.
- If you wrap the demo in a fixed-height container with `overflow-y: auto`, the sticky guidance shade will work correctly.
- If you want a full-screen presentation mode, wrap `SatLmsDemo` in a modal or full-screen overlay from the portfolio side.

Recommended minimum width: **375px** (mobile-first). The demo is tested at 375px, 768px, and 1280px.

---

## Assets

All icons are React SVG components in `components/icons/DemoIcons.jsx` — no static files needed.

No raster images or videos are used in this package.

---

## CSS Isolation

The demo uses CSS Modules. All styles are scoped — they will not leak into the portfolio's global styles.

The product design tokens live in `styles/tokens.css` and are applied under the `.sat-lms-demo` root class. They do not conflict with the portfolio's Tailwind token system.

---

## Fonts

The demo uses:
- **Plus Jakarta Sans** — headings
- **Inter** — body text

`DemoShell.jsx` injects a Google Fonts `<link>` tag into `<head>` at mount time (only once, checks for duplicates). If the portfolio already loads these fonts globally, the injection is harmless.

---

## File Structure

```
sat-lms-interactive-demo/
  index.js                      ← package entry
  components/
    DemoShell.jsx               ← root state machine
    GuidanceShade.jsx           ← persistent bottom bar
    steps/
      Step1CourseLanding.jsx
      Step2DiagnosticQuiz.jsx
      Step3DiagnosticResults.jsx
      Step4PostDiagnosticChoice.jsx
      Step5PersonalizedPath.jsx
      Step6ActivityPage.jsx
      Step7aGoodResults.jsx
      Step7bLowResults.jsx
      Step8RemedialCreatedModal.jsx
      Step9RemedialActivity.jsx
    ui/
      DiagnosticCard.jsx
      PaceIsland.jsx
      PostDiagnosticChoiceModal.jsx
      RemedialCreatedModal.jsx
      ActivityRow.jsx
      ModuleBlock.jsx
      CourseHeader.jsx
      QuizShell.jsx
      QuizQuestion.jsx
      ResultsCard.jsx
      ShadedOverlay.jsx
      ActivityHeroCard.jsx
      ConceptBlock.jsx
    icons/
      DemoIcons.jsx             ← extracted from LMS Icons.jsx
  scripts/
    extract_icons.py            ← regenerate DemoIcons.jsx from source
  data/
    demoSteps.js
    mockCourse.js
    mockDiagnosticQuiz.js
    mockActivityQuiz.js
  styles/
    tokens.css
    demo.module.css
    guidance.module.css
    quiz.module.css
    results.module.css
    highlight.module.css
    pace.module.css
    modal.module.css
    activity.module.css
  README.md
```

---

## Regenerating Icons

If the LMS source icons change, re-run:

```bash
cd sat-lms-interactive-demo
python scripts/extract_icons.py
```

This re-reads the LMS `Icons.jsx` and rewrites `components/icons/DemoIcons.jsx`.

---

## Points the Portfolio Host Controls

- Full-screen wrapper / modal presentation
- Outer max-width and centering
- Page-level scroll container
- Any transition animation between the demo and surrounding page content
- Whether to show `onDemoComplete` CTA (e.g., "See More Work" button)
