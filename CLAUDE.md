# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` — starts Vite on port 3000, accessible from any host
- **Build:** `npm run build`
- **Preview build:** `npm run preview`
- **Type-check (lint):** `npm run lint` — runs `tsc --noEmit` (no ESLint configured)
- **Clean:** `npm run clean` — removes `dist/`

## Architecture

Single-page React app (`src/App.tsx`) composed of stacked full-width sections identified by anchor IDs (`#hero`, `#produtos`, `#sobre`, `#sobre-consultora`, `#depoimentos`, `#sustentabilidade`, `#contato`). No router — navigation is scroll-based.

### Section layout convention
- All sections: `py-32 border-b border-zinc-100`
- 12-column grid with `col-span-3` label + `col-span-9` content
- Section numbering label pattern: `01 / LABEL`, `02 / LABEL`, etc.

### Reusable components (`src/components/`)
- **FadeIn.tsx** — viewport-triggered fade+blur animation; props: `children`, `delay` (0–1 s), `className`
- **FlashlightCard.tsx** — interactive card with mouse-tracking radial gradient; props: `children`, `className`
- **TextReveal.tsx** — text reveal animation; props: `children`, `delay`

### Inline components (defined in `App.tsx`)
- **Tooltip** (~line 22) — motion-animated tooltip with spring transitions; used on the floating WhatsApp button
- **Modal** (~line 50) — backdrop+content modal with `AnimatePresence`; currently rendered but never opened (no trigger sets `isModalOpen`)

### WhatsApp integration
Single constant defined at the top of `App.tsx`: `const WHATSAPP_NUMBER = "553496508057";` — used in footer, consultant CTA, and floating button. Change this one value to update all contact links.

### Styling
- Tailwind CSS v4 — config is injected via `@tailwindcss/vite` plugin (no `tailwind.config.js`)
- Custom utilities defined in `src/index.css`: `.text-stroke-outline`, `.bg-grid`, `.bg-noise`, `.animate-marquee`
- Fonts: Inter (sans), JetBrains Mono (mono), Playfair Display (serif), Oswald (display — used for headings)
- Typography utility classes in `src/index.css`: `.section-kicker`, `.section-title`, `.section-subtitle`, `.hero-title`, `.hero-subtitle`, `.lead-copy`, `.section-meta`
- External images use `referrerPolicy="no-referrer"`; all product/logo images served from GitHub raw CDN (`https://raw.githubusercontent.com/leonvpetri/Imagens/...`)
- Catalog cards use CSS custom properties `--tilt-x`, `--tilt-y`, `--mouse-x`, `--mouse-y` for 3D tilt effects computed via `getBoundingClientRect()` + `mousemove` listeners; radial gradient "flashlight" follows cursor via `::before` in `index.css`

### Animations
Use `motion/react` (Framer Motion v12) for all motion components. `FadeIn` wraps sections with progressive `delay` values to stagger entry.

### Environment
- `GEMINI_API_KEY` — Google Gemini API key, exposed to the Vite build
- `APP_URL` — AI Studio app URL
- Copy `.env.example` to `.env` before running locally

### Lead capture
- Contact form POSTs to N8N webhook: `https://artefinal-n8n.gumtcw.easypanel.host/webhook/marcia-leads`
- Form submission states: `'idle' | 'loading' | 'success' | 'duplicate' | 'error'`
- Duplicate detection by keyword matching in response body (`"duplicate"`, `"duplicado"`, `"já cadastrado"`)
- Submission timestamp is localized to `America/Sao_Paulo`

### Known placeholders
- Second Eudora catalog card (`App.tsx` ~line 682) has a literal `LINK_LOJA_EUDORA` placeholder — URL not yet set

### Vite config notes
- Path alias `@/` maps to the project root
- HMR is disabled when `DISABLE_HMR` env var is set (for AI Studio compatibility)

## Integração SaaS RAG — Catálogo Inteligente

### Objetivo
Substituir a seção `#ingredientes` por uma seção `#revista-digital` contendo
o chat RAG integrado ao flipbook do catálogo Natura.

### Referência do componente
O componente ChatRAG deve ser extraído de:
https://github.com/leonvpetri/rag_saas_marcia — src/App.tsx

Salvar como: `src/components/ChatRAG.tsx`

### Configurações já definidas
- Webhook RAG: `https://artefinal-n8n.gumtcw.easypanel.host/webhook/rag`
- Flipbook: `https://heyzine.com/flip-book/f6ec899e22.html`

### Design
- Paleta do chat: laranja/âmbar (from-orange-400 to-amber-600) — manter do SaaS original
- Título/wrapper da seção: seguir padrão do design system (section-kicker + display-title + lead-copy)
- Envolver em FadeIn com delay consistente com as demais seções
- Layout: 40% chat / 60% flipbook (igual ao SaaS original)

### Alterações no App.tsx
1. Remover seção `#ingredientes` completamente
2. Importar e renderizar `<ChatRAG />` no lugar
3. Atualizar navItems: substituir `{ label: 'INGREDIENTES', href: '#ingredientes' }`
   por `{ label: 'REVISTA DIGITAL', href: '#revista-digital' }`

### Known placeholders
- Second Eudora card (~linha 682): substituir `LINK_LOJA_EUDORA` pela URL real da loja