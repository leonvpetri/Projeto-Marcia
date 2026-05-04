# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` — starts Vite on port 3000, accessible from any host
- **Build:** `npm run build`
- **Preview build:** `npm run preview`
- **Type-check (lint):** `npm run lint` — runs `tsc --noEmit` (no ESLint configured)
- **Clean:** `npm run clean` — removes `dist/`

## Architecture

Single-page React app (`src/App.tsx`) composed of stacked full-width sections identified by anchor IDs (`#hero`, `#produtos`, `#sobre`, `#sobre-consultora`, `#depoimentos`, `#revista-digital`, `#sustentabilidade`, `#contato`). No router — navigation is scroll-based.

### Section layout convention
- All sections: `py-32 border-b border-zinc-100`
- 12-column grid with `col-span-3` label + `col-span-9` content
- Section numbering label pattern: `01 / LABEL`, `02 / LABEL`, etc.

### Reusable components (`src/components/`)
- **FadeIn.tsx** — viewport-triggered fade+blur animation; props: `children`, `delay` (0–1 s), `className`
- **FlashlightCard.tsx** — interactive card with mouse-tracking radial gradient; props: `children`, `className`
- **TextReveal.tsx** — text reveal animation; props: `children`, `delay`
- **ChatRAG.tsx** — seção `#revista-digital` completa: chat RAG (40%) + flipbook (60%); backend RAG e flipbook URLs fixos nas constantes do topo do arquivo; paleta laranja/âmbar

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

### ChatRAG — Catálogo Inteligente (Revista Digital)
- Componente: `src/components/ChatRAG.tsx`
- Backend RAG: `https://artefinal-rag2-marcia.gumtcw.easypanel.host/search`
  (servidor Express Node.js hospedado na VPS via Easypanel)
- Flipbooks:
  - Natura: `https://artefinal-rag2-marcia.gumtcw.easypanel.host/natura/natura-abril-2026.htm`
  - Boticário: `https://artefinal-rag2-marcia.gumtcw.easypanel.host/boticario/catalogo_boticario_abril.htm`
- Layout: 40% chat / 60% flipbook, altura `clamp(520px, 70vh, 720px)`
- O servidor retorna `{ text, pagina, codigo, brand, arquivo, imagem_url, flipbook_url }`
  - `pagina` é mapeado para `page` no componente
  - `brand` determina qual flipbook abrir (natura ou boticario)
  - `codigo` exibe badge 🔍 Código: XXXXX na mensagem do agente
- Tipo Message: `{ id, role, text, page?, brand?, product_code? }`
- Paleta laranja/âmbar (`from-orange-400 to-amber-600`)
- Badge rodapé: "● NATURA · BOTICÁRIO"
- Detecção de marca feita no servidor — usuário deve informar
  "natura" ou "boticário" na mensagem

### Infraestrutura RAG (projeto separado: RAG2_Marcia)
- Repositório: https://github.com/leonvpetri/RAG2_MARCIA
- Deploy: VPS Easypanel — artefinal-rag2-marcia.gumtcw.easypanel.host
- Supabase projeto: rag2_marcia (São Paulo)
  - Tabela catalogo_boticario: 199 páginas vetorizadas
  - Tabela catalogo_natura: 164 páginas vetorizadas
  - Embedding: Gemini Embedding 2 (768 dims) + OCR Gemini 3.1 Flash Lite
- Flipbooks MyFlipbook hospedados na VPS em /app/public/
  - IMPORTANTE: após cada deploy no Easypanel, copiar imagens
    manualmente via docker cp para o container