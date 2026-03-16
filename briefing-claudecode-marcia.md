# Briefing Completo — Projeto Márcia Consultora
## Para executar no Claude Code (Opus 4.6)

---

## CONTEXTO DO PROJETO

**Repositório:** https://github.com/leonvpetri/Projeto-Marcia.git  
**Arquivo principal:** `App.tsx`  
**Stack:** React + TypeScript + Tailwind CSS + Framer Motion (`motion/react`)  
**Componentes disponíveis:** `FadeIn`, `TextReveal`, `FlashlightCard`  
**Ícones:** lucide-react  
**Padrão visual:** Minimalista refinado, fundo branco/zinc, tipografia bold tracking-tighter, numeração de seções `01 /`, `02 /`...

---

## REGRAS GERAIS PARA O AGENTE

1. Manter o padrão visual existente: cores zinc, bordas sutis, tipografia bold para títulos
2. Usar sempre `FadeIn` com `delay` progressivo nos elementos de cada seção
3. Seções seguem grid `md:grid-cols-12` com coluna lateral de label (`col-span-3`) + conteúdo (`col-span-9`)
4. Animações com `motion` do pacote `motion/react` (já importado)
5. Todas as seções têm `py-32 border-b border-zinc-100`
6. Imagens de placeholder: usar Unsplash com `?auto=format&fit=crop&q=80&w=800`

---

## TAREFA 1 — Corrigir o Footer

**Problema:** O footer atual tem texto de template genérico ("Ready to build the future?", "Start Project", "Documentation") que não tem nada a ver com o projeto.

**O que fazer:** Substituir completamente o bloco de conteúdo do footer, mantendo apenas a logo, copyright e redes sociais que já existem.

**Novo conteúdo do footer:**

```
Título grande: "Beleza que<br/>transforma."
Subtítulo: "Consultora oficial Natura · Avon · Boticário · Mary Kay"
Dois botões:
  - "Falar no WhatsApp" → href="https://wa.me/55XXXXXXXXXXX" target="_blank" — bg-zinc-900 text-white
  - "Ver Produtos" → href="#produtos" — bordado, estilo outline
```

**Manter abaixo:** a logo `marcia_logo.png`, copyright e ícones de redes sociais já existentes.

**Observação:** O número do WhatsApp ficará como placeholder `55XXXXXXXXXXX` por enquanto.

---

## TAREFA 2 — Seção "Sobre a Consultora"

**Onde inserir:** Após a seção `#sobre` (Filosofia, seção `02 / FILOSOFIA`), antes da seção `#sustentabilidade` (Ingredientes).

**Numeração:** `03 / SOBRE` — reajustar as demais seções para `04 / INGREDIENTES`, `05 / CONTATO`.

**Layout:** Grid 12 colunas — label lateral esquerda (`col-span-3`) + conteúdo direita (`col-span-9`).

**Conteúdo:**

```
Label: "03 / SOBRE"

Lado esquerdo do conteúdo (col-span-4):
  - Foto da Márcia
  - src: "https://github.com/leonvpetri/Imagens/raw/main/assets/marcia_logo.png"
  - Estilo: rounded-2xl, object-cover, com sutil borda border-zinc-100
  - Efeito: leve scale no hover (motion whileHover scale 1.02)

Lado direito do conteúdo (col-span-5):
  - Título: "Olá, eu sou a Márcia."
  - Estilo: text-4xl md:text-5xl font-bold tracking-tighter mb-6
  
  - Parágrafo 1:
    "Sou consultora de beleza apaixonada por transformar a rotina de cuidados das minhas clientes.
     Acredito que beleza vai além da aparência — é sobre como você se sente na sua própria pele."
  
  - Parágrafo 2:
    "Trabalho com as marcas que mais acredito: Natura, Avon, O Boticário e Mary Kay.
     Cada recomendação é feita com cuidado, pensando no seu tipo de pele, rotina e orçamento."
  
  - Estilo parágrafos: text-lg text-zinc-500 leading-relaxed mb-6

  - Linha divisória: border-t border-zinc-100 pt-8 mt-8

  - 3 números em linha (grid grid-cols-3 gap-8):
    · "+500 Clientes atendidas"
    · "4 Marcas parceiras"  
    · "5 Anos de experiência"
    Estilo número: text-3xl font-bold tracking-tighter
    Estilo label: text-xs font-mono uppercase tracking-widest text-zinc-400 mt-1

  - Botão CTA abaixo dos números:
    "Agendar Consultoria" com ArrowRight icon
    Estilo: mesmo padrão dos botões do hero (borda animada conic-gradient)
```

**Animações:**
- Foto entra com `FadeIn delay={0.1}` da esquerda (`initial x: -20`)
- Texto entra com `FadeIn delay={0.2}`
- Números entram com `FadeIn delay={0.3}` um a um com stagger

**Background:** `bg-white` (igual à seção de Filosofia)

---

## TAREFA 3 — Seção "Depoimentos"

**Onde inserir:** Após a seção `03 / SOBRE` (recém criada), antes de `04 / INGREDIENTES`.

**Numeração:** `04 / DEPOIMENTOS` — reajustar as demais para `05 / INGREDIENTES`, `06 / CONTATO`.

**Layout:** Label lateral (`col-span-3`) + grid de cards (`col-span-9`).

**Cards:** Grid `md:grid-cols-2` com 4 cards de depoimento.

**Conteúdo dos cards:**

```
Card 1:
  Nome: "Ana Paula M."
  Produto: "Sérum Natura"
  Texto: "A Márcia me indicou o sérum perfeito para minha pele sensível. Resultado incrível em 2 semanas!"
  Avaliação: ★★★★★

Card 2:
  Nome: "Carla Souza"
  Produto: "Kit Avon"
  Texto: "Atendimento super atencioso, ela entendeu exatamente o que eu precisava. Super recomendo!"
  Avaliação: ★★★★★

Card 3:
  Nome: "Fernanda Lima"
  Produto: "Hidratante Boticário"
  Texto: "Compro sempre com a Márcia. Ela sempre tem as melhores dicas e promoções exclusivas."
  Avaliação: ★★★★★

Card 4:
  Nome: "Juliana Torres"
  Produto: "Mary Kay Skincare"
  Texto: "Fiz uma consultoria completa e aprendi muito sobre minha rotina de skincare. Vale muito!"
  Avaliação: ★★★★★
```

**Estilo dos cards:**
- Usar `FlashlightCard` (já existente no projeto)
- Padding `p-8`, `rounded-2xl`
- Aspas decorativas grandes no topo: `"` em `text-6xl text-zinc-100 font-serif leading-none`
- Texto do depoimento: `text-sm text-zinc-600 leading-relaxed mb-6`
- Linha divisória + nome/produto na base
- Nome: `text-sm font-semibold`
- Produto: `text-xs font-mono uppercase tracking-widest text-zinc-400`
- Estrelas: usar ícone `Star` do lucide-react, `fill-zinc-900 text-zinc-900`, tamanho 12

**Animações:**
- Cards entram com `FadeIn` e stagger de `0.1` por card

**Background:** `bg-zinc-50/50` (alternar com a seção anterior)

**Nota:** Deixar um comentário no código `{/* TODO: Substituir por depoimentos reais */}` acima dos dados dos cards.

---

## TAREFA 4 — Botão Flutuante WhatsApp

**O que é:** Um botão fixo no canto inferior direito da tela, visível em todas as seções, que abre o WhatsApp.

**Onde adicionar:** Dentro do `return` do componente `App`, logo antes do fechamento `</div>` final, após o `<Modal>`.

**Comportamento:**
- Aparece após o usuário rolar 300px para baixo (`useEffect` com `scroll` listener + `useState`)
- Entra com animação `motion.a` — `initial opacity 0, scale 0.8` → `animate opacity 1, scale 1`
- Sai com `exit opacity 0, scale 0.8`
- Envolvido em `AnimatePresence` (já importado)

**Visual:**
```
- Posição: fixed bottom-6 right-6 z-50
- Formato: rounded-full p-4 shadow-2xl
- Cor: bg-[#25D366] (verde WhatsApp) hover:bg-[#20bd5a]
- Ícone: usar SVG inline do WhatsApp (não está no lucide) — OU usar MessageCircle do lucide como fallback
- Tooltip ao hover: "Falar com a Márcia" (usar o componente Tooltip já existente)
- Tamanho do ícone: 28px, cor branca
```

**SVG do WhatsApp para usar:**
```svg
<svg viewBox="0 0 24 24" width="28" height="28" fill="white">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.428a.75.75 0 00.915.915l5.579-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.505-5.23-1.385l-.374-.217-3.882 1.023 1.023-3.882-.217-.374A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 5.477 10 10-4.477 10-10 10z"/>
</svg>
```

**Link:** `href="https://wa.me/55XXXXXXXXXXX"` `target="_blank"` `rel="noopener noreferrer"`

---

## ORDEM DE EXECUÇÃO SUGERIDA

```
1. Tarefa 1 — Corrigir footer (mais simples, elimina o template)
2. Tarefa 2 — Seção Sobre a Consultora
3. Tarefa 3 — Seção Depoimentos
4. Tarefa 4 — Botão WhatsApp flutuante
```

Após cada tarefa, fazer commit individual com mensagem descritiva:
- `feat: corrige footer com conteúdo real da consultora`
- `feat: adiciona seção Sobre a Consultora`
- `feat: adiciona seção de Depoimentos`  
- `feat: adiciona botão flutuante WhatsApp`

---

## OBSERVAÇÕES FINAIS

- O número do WhatsApp aparece em 3 lugares (footer, seção sobre CTA, botão flutuante) — usar uma constante no topo do `App.tsx`: `const WHATSAPP_NUMBER = "55XXXXXXXXXXX";`
- A foto da Márcia está em: `https://github.com/leonvpetri/Imagens/raw/main/assets/marcia_logo.png` — é a melhor disponível no repositório de imagens por enquanto
- Todos os textos são placeholders — a Márcia pode ajustar depois
- Manter o `referrerPolicy="no-referrer"` em todas as imagens do GitHub (padrão já usado no projeto)
