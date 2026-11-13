# Destron Labs — Project README

## File Structure

```
destron-labs/
├── index.html                        ← Main landing page
├── assets/
│   ├── css/
│   │   └── style.css                 ← All styles (Altron @font-face included)
│   ├── fonts/
│   │   ├── altron.otf                ← Altron custom font (OpenType)
│   │   └── altron.ttf                ← Altron custom font (TrueType)
│   └── images/
│       ├── circuit-bg.svg            ← Static circuit board hero background
│       └── logo-horizontal.png       ← ⚠️  PLACEHOLDER — see instructions below
```

---

## Logo Setup (Required Step)

The navbar and footer reference `assets/images/logo-horizontal.png`.

To add your real logo:

1. Export a **clean, transparent-background PNG** of the horizontal
   "DESTRON LABS" wordmark from your logo.jpeg source file
   (use Photoshop, Figma, or remove.bg).
2. Save it as `assets/images/logo-horizontal.png`.
3. Recommended height: **60–80px tall** at 2× resolution (so 30–40px
   display size looks crisp on Retina screens).

Until that file is present, the site automatically falls back to the
**Altron-fonted text "DESTRON LABS"** — so the page is fully functional
from day one without it.

---

## Font

The Altron font is applied via `@font-face` in `style.css` to:
- Navbar logo text (`.logo-t`)
- Hero headline (`.hw`, `.ht`)
- Section headings (`.sh`)
- CTA buttons (`.bp`, `.nb`, `.bsub`)
- Stats numbers (`.sn`)

---

## Background

The hero circuit board pattern is a **static SVG** (`circuit-bg.svg`)
applied as a CSS `background-image`. No JavaScript, no canvas, no
external dependencies — works offline and loads instantly.

---

## Expanding the Site

This is a single-page foundation. To add new sections:
1. Add HTML inside `<body>` following the existing `.sec` pattern.
2. Add CSS to `assets/css/style.css`.
3. New pages → duplicate `index.html`, rename, link from nav.
