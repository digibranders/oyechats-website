# Editorial Multi-Surface Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the OyeChats homepage from a flat dark theme (plus the crude `.bg-section-b` white→blue gradient + `!important` override block) to a clean, token-driven **editorial multi-surface** system (Ink / Canvas / Mist / Slate), with **Fraunces** display + **Plus Jakarta Sans** body typography, and the **Aurora** WebGL background promoted from the featured pricing card to the hero and CTA.

**Architecture:** Introduce per-section CSS custom properties scoped by a `data-surface` attribute (`ink|slate|canvas|mist`). Components read semantic tokens (`--fg`, `--muted`, `--line`, `--accent`, `--card`, `--tint`) instead of hardcoded dark utilities. Because Tailwind v4 utilities live in a cascade `@layer`, plain (unlayered) rules in `globals.css` scoped by `[data-surface="canvas"]` override the dark-theme utilities **without `!important`** — this replaces the existing override spaghetti with a clean compatibility layer, so we get the light surfaces working immediately without rewriting all 20 components, then migrate the two flagship sections (FeatureBento, PricingPreview) to be genuinely token-native as the reference pattern.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4 (`@theme inline`), `next/font/google`, Three.js (Aurora shader), Framer Motion, GSAP.

**Verification note (adaptation):** This is visual/CSS work, not unit-testable logic. Each task's "test" gates are: (1) `npm run lint` clean, (2) `npx tsc --noEmit` clean, (3) `npm run build` succeeds, and (4) a Playwright/preview screenshot at 1440px confirming the visual result. Treat these as the red/green cycle.

---

## File Structure

| File | Responsibility | Action |
|------|----------------|--------|
| `src/app/layout.tsx` | Load Fraunces + Plus Jakarta Sans via `next/font`, expose `--font-display` / `--font-sans` vars on `<body>` | Modify |
| `src/app/globals.css` | Replace the `.bg-section-a/.bg-section-b` block (lines 1–134) with the `data-surface` token system + scoped light compatibility layer; repoint `--font-display`/`--font-sans`; add Aurora reduced-motion guard | Modify |
| `src/app/page.tsx` | Swap `bg-section-a/b` wrappers for the `data-surface` rhythm map | Modify |
| `src/components/home/Hero.tsx` | Make surface-aware; render `Aurora` as the hero background; demote gradient heading to a single accent | Modify |
| `src/components/home/FeatureBento.tsx` | Convert to token-native light Canvas (reference migration) | Modify |
| `src/components/home/PricingPreview.tsx` | Ensure it reads correctly on light Canvas (keeps Aurora on featured card) | Modify |
| `src/components/shared/Aurora.tsx` | Add `prefers-reduced-motion` guard (freeze animation) | Modify |
| `src/components/home/{ScrollStory,LiveStats,IntegrationsPreview,Testimonials,HomeCTA}.tsx` | Spot fixes surfaced by their assigned surface | Modify (light-touch) |

**Surface rhythm (home):** Hero=`ink` → FeatureBento=`canvas` → ScrollStory=`slate` → LiveStats=`mist` → IntegrationsPreview=`canvas` → Testimonials=`ink` → PricingPreview=`canvas` → HomeCTA=`ink`.

**Token contract (used by every component):**
```
--bg  --fg  --muted  --line  --accent  --card  --tint  --chip  --chip-line
```

---

## Task 0: Typography — Fraunces (display) + Plus Jakarta Sans (body)

**Files:**
- Modify: `src/app/layout.tsx` (font imports + body variables)
- Modify: `src/app/globals.css` (`--font-display`, `--font-sans`, `.font-display`)

- [ ] **Step 1: Add font loaders in `layout.tsx`** (next to the existing `Inter`/`Geist_Mono` declarations)

```tsx
import { Inter, Geist_Mono, Fraunces, Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-jakarta',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-fraunces',
});
```

- [ ] **Step 2: Add the variables to the `<body>` (or `<html>`) className** — keep `inter` for fallback continuity

```tsx
<body className={`font-sans ${jakarta.variable} ${fraunces.variable} ${inter.variable} ${geistMono.variable}`}>
```
(If `inter`/`geistMono` variables were previously applied on `<html>`, keep them there and add the two new ones alongside — do not drop existing variables.)

- [ ] **Step 3: Repoint the type tokens in `globals.css` `@theme inline`** (currently ~lines 175–176)

```css
--font-sans: var(--font-jakarta), var(--font-inter), system-ui, sans-serif;
--font-display: var(--font-fraunces), Georgia, 'Times New Roman', serif;
```

- [ ] **Step 4: Repoint the `.font-display` utility** (currently ~line 416)

```css
.font-display {
  font-family: var(--font-fraunces), Georgia, serif;
  font-optical-sizing: auto;
  letter-spacing: -0.012em;
}
```

- [ ] **Step 5: Verify** — `npm run lint && npx tsc --noEmit && npm run build`. Expected: all pass. Screenshot the home hero; headings should render in a serif.

- [ ] **Step 6: Commit**
```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat(type): add Fraunces display + Plus Jakarta Sans body fonts"
```

---

## Task 1: Surface token system + clean compatibility layer

**Files:**
- Modify: `src/app/globals.css` — **replace lines 1–134** (the `.bg-section-a` + `.bg-section-b` override block) with the block below. Leave everything from `@font-face`/`@theme` onward intact except the token repoints from Task 0.

- [ ] **Step 1: Replace lines 1–134** with the token system (keep `@import "tailwindcss";` as line 1)

```css
@import "tailwindcss";

/* ═══════════════════════════════════════════════════════════════
   SURFACE SYSTEM — editorial multi-surface rhythm.
   Each <section data-surface="…"> exposes semantic tokens that
   components consume (--fg, --muted, --line, --accent, --card, --tint).
   Replaces the old .bg-section-a/.bg-section-b + !important overrides.
   ═══════════════════════════════════════════════════════════════ */
[data-surface]{ background: var(--bg); color: var(--fg); position: relative; }

[data-surface="ink"]{
  --bg:#0A1122; --fg:#E8EDF7; --muted:#9AA7C0; --line:rgba(255,255,255,.08);
  --accent:#60A5FA; --card:#111A2E; --tint:rgba(96,165,250,.10);
  --chip:rgba(96,165,250,.12); --chip-line:rgba(96,165,250,.28);
}
[data-surface="slate"]{
  --bg:#0F1830; --fg:#E8EDF7; --muted:#94A2BE; --line:rgba(255,255,255,.08);
  --accent:#60A5FA; --card:#16223E; --tint:rgba(96,165,250,.10);
  --chip:rgba(96,165,250,.12); --chip-line:rgba(96,165,250,.28);
}
[data-surface="canvas"]{
  --bg:#FAFBFD; --fg:#0E1729; --muted:#51607A; --line:#E6EBF3;
  --accent:#2563EB; --card:#FFFFFF; --tint:#EFF4FF;
  --chip:#EFF4FF; --chip-line:#D3E0FA;
}
[data-surface="mist"]{
  --bg:#F2F5FB; --fg:#0E1729; --muted:#51607A; --line:#E2E8F2;
  --accent:#2563EB; --card:#FFFFFF; --tint:#E7EEFB;
  --chip:#FFFFFF; --chip-line:#DCE4F1;
}

/* ── Legacy aliases so any not-yet-migrated wrapper keeps a valid bg ── */
.bg-section-a{ background:#0A1122; }
.bg-section-b{ background:#FAFBFD; }

/* ═══════════════════════════════════════════════════════════════
   LIGHT-SURFACE COMPATIBILITY LAYER
   Remaps the dark-theme Tailwind utilities that existing components
   still use, so they read correctly on canvas/mist WITHOUT rewriting
   every component. These rules are UNLAYERED, so they beat Tailwind's
   @layer utilities by cascade order — no !important needed.
   Delete a block once its components are migrated to tokens (Tasks 4–5).
   ═══════════════════════════════════════════════════════════════ */
:where([data-surface="canvas"],[data-surface="mist"]){ color:#0E1729; }

[data-surface="canvas"] :is(h1,h2,h3,h4,h5,h6),
[data-surface="mist"]   :is(h1,h2,h3,h4,h5,h6){ color:#0B1528; }

/* text-white and its opacity variants → slate ink */
[data-surface="canvas"] .text-white, [data-surface="mist"] .text-white{ color:#0E1729; }
[data-surface="canvas"] .text-white\/90,[data-surface="mist"] .text-white\/90{ color:rgba(15,23,42,.92); }
[data-surface="canvas"] .text-white\/80,[data-surface="mist"] .text-white\/80{ color:rgba(15,23,42,.86); }
[data-surface="canvas"] .text-white\/75,[data-surface="mist"] .text-white\/75{ color:rgba(15,23,42,.82); }
[data-surface="canvas"] .text-white\/70,[data-surface="mist"] .text-white\/70{ color:rgba(15,23,42,.78); }
[data-surface="canvas"] .text-white\/65,[data-surface="mist"] .text-white\/65{ color:rgba(15,23,42,.72); }
[data-surface="canvas"] .text-white\/60,[data-surface="mist"] .text-white\/60{ color:rgba(15,23,42,.68); }
[data-surface="canvas"] .text-white\/55,[data-surface="mist"] .text-white\/55{ color:rgba(15,23,42,.64); }
[data-surface="canvas"] .text-white\/50,[data-surface="mist"] .text-white\/50{ color:rgba(15,23,42,.60); }
[data-surface="canvas"] .text-white\/45,[data-surface="mist"] .text-white\/45{ color:rgba(15,23,42,.55); }
[data-surface="canvas"] .text-white\/40,[data-surface="mist"] .text-white\/40{ color:rgba(15,23,42,.48); }

/* Accent text utilities → darker, legible-on-light equivalents */
[data-surface="canvas"] .text-blue-400,   [data-surface="mist"] .text-blue-400   { color:#1D4ED8; }
[data-surface="canvas"] .text-indigo-400, [data-surface="mist"] .text-indigo-400 { color:#4338CA; }
[data-surface="canvas"] .text-cyan-400,   [data-surface="mist"] .text-cyan-400   { color:#0369A1; }
[data-surface="canvas"] .text-emerald-400,[data-surface="mist"] .text-emerald-400{ color:#047857; }
[data-surface="canvas"] .text-violet-400, [data-surface="mist"] .text-violet-400 { color:#6D28D9; }
[data-surface="canvas"] .text-amber-400,  [data-surface="mist"] .text-amber-400  { color:#B45309; }

/* Gradient headings → single dark→brand accent on light */
[data-surface="canvas"] .gradient-text-heading,[data-surface="mist"] .gradient-text-heading{
  background:linear-gradient(118deg,#0B1528 30%,#2563EB 100%);
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
}
[data-surface="canvas"] .gradient-text-indigo,[data-surface="mist"] .gradient-text-indigo{
  background:linear-gradient(118deg,#0B1528 25%,#4F46E5 100%);
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
}
[data-surface="canvas"] .gradient-text-cyan,[data-surface="mist"] .gradient-text-cyan{
  background:linear-gradient(118deg,#0B1528 25%,#0369A1 100%);
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
}

/* Glass tiers → soft white elevation cards on light */
[data-surface="canvas"] .glass-1,[data-surface="mist"] .glass-1,
[data-surface="canvas"] .glass-2,[data-surface="mist"] .glass-2,
[data-surface="canvas"] .glass-3,[data-surface="mist"] .glass-3{
  background:#FFFFFF; color:#0E1729;
  border:1px solid #E6EBF3;
  backdrop-filter:none; -webkit-backdrop-filter:none;
  box-shadow:0 1px 2px rgba(15,23,42,.04), 0 10px 30px rgba(15,23,42,.06);
}

/* Translucent borders / fills → light equivalents */
[data-surface="canvas"] .border-white\/6,[data-surface="mist"] .border-white\/6,
[data-surface="canvas"] .border-white\/8,[data-surface="mist"] .border-white\/8,
[data-surface="canvas"] .border-white\/10,[data-surface="mist"] .border-white\/10{ border-color:#E6EBF3; }
[data-surface="canvas"] .bg-white\/\[\.03\],[data-surface="mist"] .bg-white\/\[\.03\]{ background-color:#F5F8FD; }
[data-surface="canvas"] .bg-white\/8,[data-surface="mist"] .bg-white\/8{ background-color:#EFF4FF; }
[data-surface="canvas"] .bg-white\/10,[data-surface="mist"] .bg-white\/10{ background-color:#EAF1FE; }

/* Ghost button on light */
[data-surface="canvas"] .btn-ghost-style,[data-surface="mist"] .btn-ghost-style{
  border:1px solid #E6EBF3; color:#0E1729; background:#fff;
}
[data-surface="canvas"] .btn-ghost-style:hover,[data-surface="mist"] .btn-ghost-style:hover{
  background:#FAFBFE; border-color:#C4D0E6;
}

/* Chat bubbles on light */
[data-surface="canvas"] .chat-bubble-human,[data-surface="mist"] .chat-bubble-human{
  background:#FFFFFF; border-color:#E6EBF3; color:#0F172A;
}
[data-surface="canvas"] .chat-bubble-bot,[data-surface="mist"] .chat-bubble-bot{
  background:rgba(37,99,235,.08); border-color:rgba(37,99,235,.20); color:#1E40AF;
}
[data-surface="canvas"] .chat-bubble-operator,[data-surface="mist"] .chat-bubble-operator{
  background:rgba(6,182,212,.08); border-color:rgba(6,182,212,.20); color:#0369A1;
}

/* ═══════════════════════════════════════════════════════════════
   SHIELD UTILITY
   Any component with class .keep-dark (e.g. Code Previews, Tooltips,
   and featured card wrappers) keeps dark-mode text and color styling.
   ═══════════════════════════════════════════════════════════════ */
[data-surface] .keep-dark, [data-surface] .keep-dark * {
  color: revert-layer;
}
[data-surface] .keep-dark .text-white { color: #FFFFFF; }
[data-surface] .keep-dark .text-white\/90 { color: rgba(255,255,255,.9); }
[data-surface] .keep-dark .text-white\/80 { color: rgba(255,255,255,.8); }
[data-surface] .keep-dark .text-white\/75 { color: rgba(255,255,255,.75); }
[data-surface] .keep-dark .text-white\/70 { color: rgba(255,255,255,.7); }
[data-surface] .keep-dark .text-white\/65 { color: rgba(255,255,255,.65); }
[data-surface] .keep-dark .text-white\/60 { color: rgba(255,255,255,.6); }
[data-surface] .keep-dark .text-white\/55 { color: rgba(255,255,255,.55); }
[data-surface] .keep-dark .text-white\/50 { color: rgba(255,255,255,.5); }
[data-surface] .keep-dark .text-white\/45 { color: rgba(255,255,255,.45); }
[data-surface] .keep-dark .text-white\/40 { color: rgba(255,255,255,.4); }
[data-surface] .keep-dark .text-blue-400 { color: #60A5FA; }
[data-surface] .keep-dark .text-indigo-400 { color: #818CF8; }
[data-surface] .keep-dark .text-cyan-400 { color: #22D3EE; }
[data-surface] .keep-dark .text-emerald-400 { color: #34D399; }
[data-surface] .keep-dark .text-violet-400 { color: #A78BFA; }
[data-surface] .keep-dark .text-amber-400 { color: #FBBF24; }
```

- [ ] **Step 2: Verify the compat layer beats Tailwind without `!important`.** Run `npm run build`, then serve and screenshot a temporarily-`data-surface="canvas"` section. If any `text-white` still renders white, wrap the compat block in `@layer` removal is NOT the fix — instead confirm the rules sit OUTSIDE any `@layer` (they do). Expected: text renders slate. (No code change if it works.)

- [ ] **Step 3: Commit**
```bash
git add src/app/globals.css
git commit -m "feat(theme): add data-surface token system + light compat layer, retire bg-section overrides"
```

---

## Task 2: Apply the surface rhythm in `page.tsx`

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the `<main>` body** with the surface map (keep `Suspense`, `AnimatedSeparator`, dynamic imports unchanged)

```tsx
<main>
  <section data-surface="ink"><Hero /></section>
  <section data-surface="canvas"><FeatureBento /></section>
  <Suspense fallback={<div className="h-48" />}>
    <section data-surface="slate"><AnimatedSeparator /><ScrollStory /></section>
    <section data-surface="mist"><AnimatedSeparator /><LiveStats /></section>
    <section data-surface="canvas"><AnimatedSeparator /><IntegrationsPreview /></section>
    <section data-surface="ink"><AnimatedSeparator /><Testimonials /></section>
    <section data-surface="canvas"><AnimatedSeparator /><PricingPreview /></section>
    <section data-surface="ink"><HomeCTA /></section>
  </Suspense>
</main>
```

- [ ] **Step 2: Check `AnimatedSeparator`** — if it renders a hardcoded dark gradient line, have it use `var(--line)` (open `src/components/shared/AnimatedSeparator.tsx`; if it uses `bg-white/…` or a fixed color, swap to `bg-[var(--line)]`). If already subtle/neutral, leave it.

- [ ] **Step 3: Verify** — `npm run build`; serve; full-page screenshot. Expected rhythm: dark → light → dark → light → light → dark → light → dark. Confirm no invisible text on light sections.

- [ ] **Step 4: Commit**
```bash
git add src/app/page.tsx src/components/shared/AnimatedSeparator.tsx
git commit -m "feat(home): apply editorial surface rhythm to homepage sections"
```

---

## Task 3: Hero — promote Aurora, surface-aware, demote gradient heading

**Files:**
- Modify: `src/components/home/Hero.tsx`
- Modify: `src/components/shared/Aurora.tsx` (reduced-motion guard)

- [ ] **Step 1: Add a reduced-motion guard to `Aurora.tsx`** — inside the main `useEffect`, before starting `animate()`:

```tsx
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```
Then in `animate()`, only schedule the next frame when not reduced:
```tsx
const animate = () => {
  const elapsedTime = (performance.now() - startTime) / 1000;
  material.uniforms.uTime.value = elapsedTime;
  renderer.render(scene, camera);
  if (!prefersReduced) animationFrameRef.current = requestAnimationFrame(animate);
};
```
(Renders one static frame when reduced-motion is on.)

- [ ] **Step 2: Replace the Hero background block.** In `Hero.tsx`, keep the `<section>` but set the background to the ink surface and render Aurora behind content. Remove the disabled `AntigravityParticles` scaffold and the `SHOW_HERO_PARTICLES` flag (dead code). Add at the top of the section, before `.hero-glow`:

```tsx
{/* Aurora WebGL silk-wave background — brand blues, behind all content */}
<div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
  <Aurora
    colors={["#060a14", "#0a1329", "#112247", "#1c356b", "#2a4c93", "#4f46e5", "#0ea5e9", "#06b6d4"]}
    speed={1.0}
    opacity={0.85}
  />
</div>
{/* readability veil */}
<div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 30%, transparent, rgba(10,17,34,.55))' }} aria-hidden="true" />
```
Import at top: `import { Aurora } from '@/components/shared/Aurora';`
Ensure the content wrapper is `relative z-10` (it already is). Change the section's inline `background` from `var(--color-bg-void)` to `var(--bg)` (inherits the `ink` surface) or leave `#0A1122`.

Also, find the bottom fade div in `Hero.tsx` (~lines 252-255) and swap the gradient endpoint from the old `#030D1F` to the new off-white canvas background `#FAFBFD`. This eases the dark-to-light transition glare between the Hero (`ink`) and Bento (`canvas`):
```tsx
{/* Bottom fade: blends Hero's dark ink color into the following light canvas section */}
<div
  className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
  style={{ background: 'linear-gradient(to bottom, transparent, #FAFBFD)' }}
/>
```

- [ ] **Step 3: Demote the gradient heading to one accent.** The H1 already wraps the whole phrase in `.gradient-text-heading`. Change it so only the second line carries the accent and the rest is solid white:
```tsx
<span className="text-white">You Only Talk </span>
<br className="sm:hidden" />
<span className="gradient-text-heading">to Buyers</span>
```

- [ ] **Step 4: Delete** the `AntigravityParticles` dynamic import, the `SHOW_HERO_PARTICLES` constant, and its render block (now replaced by Aurora).

- [ ] **Step 5: Verify** — `npm run lint && npx tsc --noEmit && npm run build`; screenshot hero. Expected: animated aurora glow behind a serif headline, single blue accent on "to Buyers", product panel legible.

- [ ] **Step 6: Commit**
```bash
git add src/components/home/Hero.tsx src/components/shared/Aurora.tsx
git commit -m "feat(hero): promote Aurora to hero background, single-accent heading, reduced-motion guard"
```

---

## Task 4: FeatureBento → token-native light Canvas (reference migration)

**Files:**
- Modify: `src/components/home/FeatureBento.tsx`

This section is the exemplar: migrate off dark utilities to tokens so it no longer relies on the compat layer.

- [ ] **Step 1: Swap the card shells** — replace `glass-2` on the five cells with a token card class string:
`className="rounded-2xl p-6 h-full bg-[var(--card)] border border-[var(--line)] card-hover"` and drop the `SpotlightCard` neon `spotlightColor` (or set it to a faint `rgba(37,99,235,0.06)`).

- [ ] **Step 2: Swap text colors** — replace `text-white` → `text-[var(--fg)]`, `text-white/50` and `text-white/45` → `text-[var(--muted)]`, on all headings/paragraphs/labels in the five cells and the section header.

- [ ] **Step 3: Swap inner chips/borders** — the pipeline stage pills `border-white/8 bg-white/[.03]` → `border-[var(--line)] bg-[var(--tint)]`; stat values `text-blue-400` → `text-[var(--accent)]`.

- [ ] **Step 4: Section heading** — remove `gradient` prop from `<SectionHeading>` (or keep the single accent span only). Keep `SectionEyebrow` but ensure it reads `var(--accent)`.

- [ ] **Step 5: Verify** — `npm run build`; screenshot the features section. Expected: white section, slate text, soft-shadow cards, blue accents, serif heading. Confirm identical look with the compat layer temporarily disabled (proves it's token-native).

- [ ] **Step 6: Commit**
```bash
git add src/components/home/FeatureBento.tsx
git commit -m "feat(home): migrate FeatureBento to surface tokens (light Canvas)"
```

---

## Task 5: PricingPreview on light Canvas (retain Aurora on featured)

**Files:**
- Modify: `src/components/home/PricingPreview.tsx`

- [ ] **Step 1: Non-featured cards** — swap `glass-2 border border-white/8` → `bg-[var(--card)] border border-[var(--line)]`, and body text `text-white/50/55` → `text-[var(--muted)]`, tier name `text-white` → `text-[var(--fg)]`.

- [ ] **Step 2: Featured card** — keep the `fc-border-wrapper` + `Aurora` + `fc-overlay` exactly as merged (dark aurora card intentionally pops against white). Wrap the featured card wrapper in the `.keep-dark` helper class so that all internal white text and accents are preserved exactly as in dark mode, shielding it from the light compatibility layer overrides.

- [ ] **Step 3: Badge** — the violet gradient badge is fine on both; leave.

- [ ] **Step 4: Verify** — `npm run build`; screenshot pricing. Expected: white section, three light cards + one dark aurora "Most Popular" card, all text legible.

- [ ] **Step 5: Commit**
```bash
git add src/components/home/PricingPreview.tsx src/app/globals.css
git commit -m "feat(home): PricingPreview reads on light Canvas, featured card keeps Aurora"
```

---

## Task 6: Remaining sections — surface polish

**Files:** `ScrollStory.tsx` (slate), `LiveStats.tsx` (mist), `IntegrationsPreview.tsx` (canvas), `Testimonials.tsx` (ink), `HomeCTA.tsx` (ink)

For each, the compat layer already handles light surfaces; this task is spot-fixing anything the layer can't reach (inline `style` colors, SVGs, hardcoded hex).

- [ ] **Step 1: LiveStats (mist)** — the animated bar chart uses inline `rgba(37,99,235,…)` fills that read fine on light; confirm the `NumberTicker` text uses `text-white`→ inherits compat slate. Screenshot; fix any inline white hex to `var(--fg)`.

- [ ] **Step 2: IntegrationsPreview (canvas)** — integration logos use `integration-logo-filter` (grayscale). On white, `brightness(0.7)` may look muddy; if so, in `globals.css` add `[data-surface="canvas"] .integration-logo-filter{ filter:grayscale(100%) brightness(1); opacity:.65; }`. Screenshot to decide.

- [ ] **Step 3: HomeCTA (ink)** — likely already dark-correct; if it hardcodes its own dark bg, replace with reliance on the `ink` surface. Add an `Aurora` background like the Hero for a bookend (optional; matches mockup). Screenshot.

- [ ] **Step 4: ScrollStory (slate) + Testimonials (ink)** — dark surfaces; verify no regression, screenshot.

- [ ] **Step 5: Verify** — full-page screenshot; confirm the full rhythm and legibility end-to-end.

- [ ] **Step 6: Commit**
```bash
git add src/components/home/*.tsx src/app/globals.css
git commit -m "feat(home): surface polish for remaining sections"
```

---

## Task 7: Global polish — motion + contrast + cleanup

**Files:** `src/app/globals.css`, any section still using ambient neon

- [ ] **Step 1: Retire ambient neon from the marketing flow** — audit for `Meteors`, `BorderBeam`, heavy `box-shadow: 0 0 40px` glow usage in home sections; keep meaningful motion (BANT ring, NumberTicker, chat handoff), remove decorative. (Scope: home components only.)

- [ ] **Step 2: Contrast sweep** — grep home components for `text-white/45` and `text-white/40` used for body/labels; on dark surfaces bump to `/70`. `grep -rn "text-white/4" src/components/home`.

- [ ] **Step 3: Confirm reduced-motion** — the existing `@media (prefers-reduced-motion: reduce)` block plus the Aurora guard (Task 3) cover the new motion. Verify Aurora freezes.

- [ ] **Step 4: Verify** — `npm run lint && npx tsc --noEmit && npm run build`; final full-page screenshot at 1440 + a 390px mobile screenshot.

- [ ] **Step 5: Commit**
```bash
git add -A
git commit -m "polish(home): retire ambient neon, contrast sweep, verify reduced-motion"
```

---

## Task 8: Verify & open PR

- [ ] **Step 1: Full gate** — `npm run lint && npx tsc --noEmit && npm run build` all clean.
- [ ] **Step 2: Visual QA** — screenshots at 1440 / 1024 / 768 / 390; confirm no horizontal scroll, legible text on every surface, hover states work, MouseTrail present on desktop.
- [ ] **Step 3: Push + PR into `development`**
```bash
git push -u origin feat/editorial-multi-surface
gh pr create --base development --head feat/editorial-multi-surface \
  --title "Editorial multi-surface redesign (home)" \
  --body "Token-driven Ink/Canvas/Mist/Slate surface system, Fraunces + Plus Jakarta Sans, Aurora promoted to hero. Retires the bg-section-b gradient + !important overrides."
```

---

## Self-Review (against the approved mockup)

- **Surfaces:** Tasks 1–2 deliver the 4-surface rhythm. ✓
- **Typography:** Task 0 wires Fraunces + Jakarta. ✓
- **Aurora in hero:** Task 3. ✓ (retained on featured pricing card, Task 5.)
- **MouseTrail:** already global in `layout.tsx` from the merge — no task needed; verify in Task 8. ✓
- **Dynamic pricing:** untouched (already live via `pricingApi`); PricingPreview only restyled. ✓
- **Kills the crude override block:** Task 1 replaces lines 1–134. ✓
- **Contrast/a11y:** Task 7 sweep + focus-visible already present. ✓
- **Open risk (flagged):** the compat layer relies on unlayered rules beating Tailwind v4's `@layer utilities`. Task 1 Step 2 explicitly verifies this; if a future Tailwind config moves globals into a layer, revisit. Featured-pricing-card white text exemption handled in Task 5 Step 2.
- **Not in scope:** inner pages (features/pricing/integrations/about/legal) — this plan is homepage-only. Inner pages still use `bg-section-a/b` aliases (kept as valid backgrounds) and can migrate in a follow-up plan.
