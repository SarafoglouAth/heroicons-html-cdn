# heroicons-html-cdn

A zero‑runtime icon library that ships **plain SVG files** from the official Heroicons set, organised by style (`solid` / `outline`). Ideal for Astro, Eleventy, or any static‑site generator where you want **inline SVG + Tailwind color control** without external requests.

## Why this package?

- 📦 **No JS bundle bloat** – SVGs are copied at install time, not imported as React components.
- 🚀 **Zero HTTP requests** – icons render inline; nothing to fetch in production.
- 🎨 **Tailwind‑friendly** – `fill="currentColor"` so `text-*` utilities just work.
- 🔄 **Always up‑to‑date** – the `prepare` script downloads the latest Heroicons release on every install.
- 🪄 **MIT licence** – free for commercial & OSS projects.

## Installation

```bash
npm i heroicons-html-cdn
# or
yarn add heroicons-html-cdn
```
 
```astro
---
import fs from 'fs';
const svg = fs.readFileSync('node_modules/heroicons-html-cdn/solid/home.svg', 'utf-8');
---
<!-- Astro: innerHTML approach -->
<div class="w-6 h-6 text-blue-600" innerHTML={svg} />

<!-- Alternative syntax using set:html directive -->
<div class="h-6 w-6 text-white" set:html={svg} />
