# Renaissance Hero — Implementation Spec

A drop-in replacement for the first fold (hero) of `allanfernandes.dev`. Everything below is framework-agnostic; adapt class names to your Tailwind / CSS Modules / SCSS setup as needed.

---

## 1. Concept

A **renaissance-inspired hero** pairing:
- **Left:** an oversized serif display headline "Software Engineer" + the existing accessibility/UX sub-copy + two wax-seal CTAs.
- **Right:** a circular portrait frame containing a custom Vitruvian-style illustration of Allan, surrounded by a double ink ring. Subtle float animation.
- **Background:** parchment/sepia palette with paper grain + vignette, evoking an aged manuscript page.

Flair level: **medium**. Parchment tone + ornamental touches, but typography and layout stay modern and readable. No Latin marginalia, no inscription text, no tick marks.

---

## 2. Assets required

| Asset | Path | Notes |
|---|---|---|
| Portrait illustration | `/public/vitruvian.png` | 1:1 square. The full figure must be visible (use `object-fit: contain`). |

---

## 3. Typography

Load from Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=EB+Garamond:ital,wght@0,400;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

| Role | Family | Weight / Style |
|---|---|---|
| Display headline | Cormorant Garamond | 500 regular, italic for "Engineer" |
| Body text | Inter | 400, 600 for emphasis |
| Eyebrow / italic accents | Cormorant Garamond | italic 400–500 |
| Marginalia (bottom corners only) | EB Garamond | italic 400 |

Sizes:
- H1: `clamp(64px, 9vw, 132px)`, line-height `.92`, letter-spacing `-0.01em`
- Sub: 19px / 1.55 line-height
- Eyebrow: 18px italic with a 48px horizontal rule

---

## 4. Color tokens

```css
:root {
  --parchment-1: #f4e9d1;   /* page top */
  --parchment-2: #ead9b3;   /* page bottom */
  --ink:     #2a1d0e;       /* primary text */
  --ink-2:   #4a361c;       /* secondary text */
  --ink-3:   #6a4e2a;       /* tertiary / marginalia */
  --sepia:   #8a5a2b;       /* accent, eyebrow */
  --wax:     #7a1f1a;       /* wax-seal red */
  --wax-dark:#4a0f0d;
}
```

Page background (layered):

```css
background:
  radial-gradient(1200px 700px at 20% 10%, #faf1d8 0%, transparent 60%),
  radial-gradient(900px 600px at 85% 90%, #e6d2a4 0%, transparent 55%),
  linear-gradient(180deg, var(--parchment-1) 0%, var(--parchment-2) 100%);
```

Paper grain (fixed overlay, `mix-blend-mode: multiply`, opacity `.6`):

```css
background-image:
  radial-gradient(rgba(74,54,28,0.07) 1px, transparent 1px),
  radial-gradient(rgba(74,54,28,0.04) 1px, transparent 1px);
background-size: 3px 3px, 7px 7px;
background-position: 0 0, 1px 2px;
```

Vignette (fixed overlay):

```css
background: radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(80,50,15,0.28) 100%);
```

---

## 5. Layout

- Page is relative; grain + vignette are `position: fixed; pointer-events: none; z-index: 1;`.
- Hero content sits at `z-index: 2` and is a two-column CSS grid:
  - `grid-template-columns: 1.05fr 1fr;`
  - `gap: 48px;`
  - `max-width: 1360px; margin: 0 auto; padding: 72px 48px 96px;`
  - `min-height: calc(100vh - 88px);`
- At `max-width: 960px`: collapse to single column, hide the bottom marginalia, hide primary nav.

### Top bar

- Flex row: brand mark (left) · nav (center-right) · light-mode indicator (far right).
- 22px vertical padding, 48px horizontal.
- Bottom border: `1px solid rgba(74,54,28,0.18)`.
- Brand mark: circular monogram "AF" (34×34, 1.5px ink border, inset 3px parchment shadow) + "Allan Fernandes — est. MMXVIII" in Cormorant 18px, with the "est." part italic.
- Nav links: Cormorant 17px, uppercase, letter-spacing `.08em`. Active link gets a small rotated diamond below it.

### Left column (copy)

1. **Eyebrow:** 48px horizontal rule · "A · MMXXVI" in uppercase Cormorant · em-dash phrase "— a portfolio, of sorts" in italic.
2. **H1:** two lines — "Software" on line 1, italic "Engineer" on line 2.
3. **Sub-copy:** Keep the existing line verbatim, with `<strong>` on "accessibility" and "user experience" (weight 600, primary ink color). Link to Royal London in wax red (`var(--wax)`), 1px bottom border.
4. **CTAs:** two wax-seal buttons (spec below).

### Right column (portrait)

- `aspect-ratio: 1 / 1; max-width: 620px; justify-self: end;`
- Outer wrapper animates a **7s ease-in-out infinite float** of `±10px` on `translateY`.
- Inside:
  - **Circular image container:** `position: absolute; inset: 3%; border-radius: 50%; overflow: hidden;` with `object-fit: contain` on the `<img>` so the full artwork shows.
  - **Double ink ring (SVG overlay):** two concentric circles at `r=292` (stroke 1px, opacity .55) and `r=285` (stroke 0.5px, opacity .4). `viewBox="0 0 600 600"`. No text, no ticks, no cardinal ornaments.
  - **Four corner flourishes:** 54×54 SVGs positioned at the four corners of the bounding box, each a quarter-arc + inner arc + a filigree curve + a small filled dot. TL unflipped; TR = `scaleX(-1)`; BL = `scaleY(-1)`; BR = `scale(-1,-1)`.

### Bottom marginalia (keep only these two)

- **Bottom-left:** `§ I.` (italic) + "Homo faber, qui aedificat in rete."
- **Bottom-right:** `Notanda:` (italic) + "accessibilitas prima."
- 12px EB Garamond italic, `color: var(--ink-3)`, opacity `.55`, `max-width: 180px`.

### Scroll cue

Centered at `bottom: 20px`. "Scroll · continua" in Cormorant italic 13px uppercase + a 1px vertical line that pulses via `@keyframes descend` (scaleY `.6 → 1 → .6` over 2s).

---

## 6. Wax-seal CTA button

Structure:

```html
<a class="seal-btn" href="#projects">
  <span class="seal"></span>
  <span>View Projects</span>
  <span class="arrow">→</span>
</a>
```

Button shell:

```css
.seal-btn {
  font-family: 'Cormorant Garamond', serif;
  display: inline-flex; align-items: center; gap: 14px;
  padding: 14px 28px 14px 14px;
  font-size: 18px; font-weight: 500; letter-spacing: .04em;
  color: var(--ink);
  border: 1px solid rgba(74,54,28,.35);
  border-radius: 999px;
  background: rgba(255,250,235,0.35);
  transition: transform .2s, background .2s, border-color .2s;
}
.seal-btn:hover { transform: translateY(-1px); background: rgba(255,250,235,0.6); border-color: rgba(74,54,28,.55); }
```

Wax seal dot (28×28, no letter inside):

```css
.seal {
  width: 28px; height: 28px; border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #a93a30 0%, var(--wax) 40%, var(--wax-dark) 100%);
  box-shadow:
    inset 0 2px 0 rgba(255,200,170,.35),
    inset 0 -2px 4px rgba(0,0,0,.35),
    0 2px 3px rgba(0,0,0,.2);
  transform: rotate(-6deg);
  position: relative; flex-shrink: 0;
}
.seal::before {
  content: ""; position: absolute; inset: 3px; border-radius: 50%;
  border: 1px dashed rgba(244,217,177,.4);
}
```

**Variant** `.seal-btn.ghost` → transparent background, seal background swapped to a **gilt** gradient: `radial-gradient(circle at 35% 30%, #e9c97b 0%, #b8873a 45%, #7a5a1e 100%)`.

Primary button: "View Projects" (wax red seal).
Secondary button: "Read the Blog" (ghost + gilt seal).
Trailing arrow: Cormorant 20px, `color: var(--ink-3)`.

---

## 7. Motion

- **Copy column:** `fadeUp` (translateY 14px → 0, opacity 0 → 1) over .9s ease-out, 100ms delay.
- **Art column:** `fadeIn` over 1.1s ease-out, 200ms delay.
- **Portrait:** 7s infinite ease-in-out float (±10px vertical).
- **Scroll cue line:** 2s infinite ease-in-out scaleY pulse (.6 ↔ 1).
- Respect `prefers-reduced-motion: reduce` — disable float and descend animations.

---

## 8. Content (exact strings)

- Brand mark: `Allan Fernandes — est. MMXVIII`
- Nav: `Home` · `Projects` · `Writing` · `Contact`
- Eyebrow: `A · MMXXVI — a portfolio, of sorts`
- H1: `Software` / *`Engineer`*
- Sub: `Building cool things on the internet while caring deeply about **accessibility** and **user experience**. Currently at [Royal London Equity Release], five years deep and still chasing the shiny objects.`
- CTA 1: `View Projects` →
- CTA 2: `Read the Blog` →
- Bottom-left marginalia: `§ I. Homo faber, qui aedificat in rete.`
- Bottom-right marginalia: `Notanda: accessibilitas prima.`
- Scroll cue: `Scroll · continua`

---

## 9. Acceptance checklist

- [ ] Parchment gradient + grain + vignette visible and layered correctly.
- [ ] H1 renders in Cormorant with italic on "Engineer"; min 64px mobile, up to 132px desktop.
- [ ] Portrait fully visible inside a plain double ink ring — **no inscription, no tick marks, no cardinal ornaments**.
- [ ] Four corner flourishes sit outside the image bounds.
- [ ] Two wax-seal buttons with no letters inside the seals.
- [ ] Only bottom-left and bottom-right marginalia exist (none at the top).
- [ ] Float + fade-in motion active; `prefers-reduced-motion` disables it.
- [ ] Collapses cleanly below 960px.

---

## 10. Prompt for an LLM coding assistant

Paste this verbatim to Claude Code / Cursor / Copilot Chat:

> Replace the hero section of `allanfernandes.dev` with a renaissance-inspired design per `HANDOFF.md` in this repo. Follow all sections: typography (Cormorant Garamond display + Inter body), parchment background with paper grain + vignette, two-column layout with copy on the left and a circular portrait on the right inside a plain double ink ring (no inscription or ticks), wax-seal CTAs without letters, bottom-corner marginalia only, and the specified float/fade animations. Use `/public/vitruvian.png` for the portrait with `object-fit: contain`. Do not alter any section below the hero.
