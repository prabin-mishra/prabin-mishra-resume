# Prabin Mishra — Résumé Website

A single-page, AI-forward résumé site for **Prabin Mishra** — Senior Product Owner / Product Manager for supply chain & logistics software and the enterprise B2B SaaS ERP underneath it.

**Live site:** https://prabin-mishra.github.io/prabin-mishra-resume/

## What's in it

- **"Ask my résumé" chat** — a conversational panel that answers recruiter questions ("Does he have ERP experience?", "What's his biggest achievement?") from a structured knowledge base ([js/kb.js](js/kb.js)). It runs **entirely in the browser** — no backend, no API key, no network calls — and never invents facts: anything outside the knowledge base gets an honest "that's not covered here, email Prabin" reply.
- **Supply chain, end to end** — a photo-driven section walking the five links of the physical chain (ocean freight → ports & terminals → warehousing → line-haul → last mile), each tied to the roles and named operators behind it. Roles in the timeline carry a photograph of the operation they were built for.
- **Career progression ladder** — the trajectory read as steps rather than a job list: operate → analyse → own a product → lead teams → own a platform, with a five-segment level meter per step, the MBA marked as a deliberate pivot, and the scope that grew at each one (interfaces → customers → users → teams → platform).
- **Project case studies** — the five builds behind the timeline, each as *problem → what I did → outcome* with the number at the end (API platform, cloud migration, PostNord last mile, the $50M business case, the AET Tankers BI platform). Side projects follow in their own section.
- **Scroll-driven career timeline** (2010 → present) with expandable role details and a progress line that fills as you scroll.
- **Animated impact metrics** — counters that count up on scroll (1,400+ story backlog, ~6,000 API endpoints, $50M business case, …). Final values are hard-coded in the HTML, so they're correct even with JavaScript disabled or reduced motion enabled.
- **System-aware dark / light theme** — follows the visitor's OS/browser color-scheme preference (updating live if it changes, e.g. scheduled dark mode), with a time-of-day fallback when no preference is exposed; the manual toggle overrides and persists. Refined typography (Inter · Newsreader · JetBrains Mono) and restrained micro-interactions.
- **Accessible**: WCAG AA contrast in both themes, full keyboard navigation, skip link, `aria-expanded`/`aria-controls` on disclosures, `prefers-reduced-motion` respected, readable without JavaScript, print-friendly.

## Stack

Plain HTML + CSS + vanilla JavaScript. No build step, no dependencies, no trackers.

```
index.html        — all content (single page)
css/style.css     — design tokens (dark/light) + components
js/kb.js          — structured profile knowledge base (chat source of truth)
js/chat.js        — chat panel: local retrieval engine + optional LLM adapter
js/main.js        — theme, scroll reveals, counters, timeline
assets/           — favicon, Open Graph image
assets/img/       — supply chain photography (hero, chain cards, timeline, band)
```

## Run locally

Any static file server works:

```bash
python3 -m http.server 4173
# → http://localhost:4173
```

(Opening `index.html` directly also works — there are no fetch calls.)

## Deploy

**GitHub Pages** (this repo's default): Settings → Pages → Deploy from branch → `main`, folder `/ (root)`. Done.

**Netlify / Vercel**: import the repo, no build command, publish directory = repo root.

If you host it somewhere other than `prabin-mishra.github.io/prabin-mishra-resume`, update the `og:url` / `og:image` meta tags and the JSON-LD `url` in `index.html`.

## Upgrading the chat to a real LLM (optional)

The chat works fully offline by default. To route answers through an LLM instead, add this **before** the `js/kb.js` script tag in `index.html`:

```html
<script>
  window.RESUME_CHAT_CONFIG = {
    provider: "anthropic",   // or "openai"
    apiKey: "YOUR_KEY",
    model: ""                // optional; defaults to a fast small model
  };
</script>
```

The LLM receives the same knowledge base with strict instructions to answer only from it; any API error silently falls back to the local engine. ⚠️ An API key in a public static site is visible to visitors — only use a key you're comfortable exposing (or proxy it), otherwise stick with the excellent local mode.

## Editing content

All visible content lives in `index.html`; the chat's facts live in `js/kb.js`. Keep the two in sync when updating achievements or dates.

## Photography

The supply chain photographs in `assets/img/` come from [Unsplash](https://unsplash.com/license) and are used under the Unsplash License. They are self-hosted rather than hot-linked, and resized / re-encoded for the web (the whole set is under 2 MB).

---

© Prabin Mishra. Content (profile, achievements, copy) is personal — please don't reuse it. Code structure is free to learn from.
