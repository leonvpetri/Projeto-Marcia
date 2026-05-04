import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Loader2, Sparkles, User, Presentation, Settings, CheckCircle2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from './FadeIn';

type Message = {
  id: string;
  role: 'user' | 'agent';
  text: string;
  page?: number;
  brand?: string;
  product_code?: string;
};

const WEBHOOK_URL = 'https://artefinal-rag2-marcia.gumtcw.easypanel.host/search';
const FLIPBOOKS: Record<string, string> = {
  natura:    'https://artefinal-rag2-marcia.gumtcw.easypanel.host/natura/natura-abril-2026.htm',
  boticario: 'https://artefinal-rag2-marcia.gumtcw.easypanel.host/boticario/catalogo_boticario_abril.htm',
};

export function ChatRAG() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      text: 'Que bom que você me chamou! 🌸\nSou sua consultora virtual e estou aqui para ajudar você a encontrar os produtos que combinam com seu cuidado e bem-estar.\n\nPosso te ajudar a:\n• Buscar produtos Natura ou Boticário por nome\n• Mostrar preço, descrição e onde encontrar no catálogo\n• Indicar o código para localização rápida no catálogo\n\nAh, e lembre-se: confira sempre o que eu te mostrar antes de finalizar sua escolha! 😊\n\nVocê está buscando um produto Natura ou Boticário?',
      page: 1,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBrand, setCurrentBrand] = useState('natura');
  const [showPdf, setShowPdf] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(WEBHOOK_URL);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const flipbookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // No mobile, rola até o flipbook quando ele aparece pela primeira vez
  useEffect(() => {
    if (showPdf && window.innerWidth < 1024) {
      setTimeout(() => {
        flipbookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [showPdf]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      let responseData: { text: string; page?: number; pagina?: number; brand?: string; codigo?: string; arquivo?: string; imagem_url?: string; flipbook_url?: string };

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue.trim(),
          sessionId: 'react-rag-' + Math.random().toString(36).substring(2, 9),
        }),
      });

      if (!res.ok) throw new Error('Falha na conexão com o servidor');
      const rawData = await res.json();

      const dataObj = Array.isArray(rawData) ? rawData[0] : rawData;

      if (dataObj?.output) {
        try {
          responseData =
            typeof dataObj.output === 'string'
              ? JSON.parse(dataObj.output)
              : dataObj.output;
        } catch {
          responseData = { text: dataObj.output, page: 1 };
        }
      } else if (dataObj?.text) {
        responseData = dataObj;
      } else {
        responseData = { text: JSON.stringify(dataObj || rawData), page: 1 };
      }

      // Mapeia pagina → page
      if (responseData.pagina) {
        responseData.page = responseData.pagina;
      }

      if (responseData.page && responseData.page > 0) {
        responseData.page = parseInt(responseData.page.toString(), 10);
      }

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        text: responseData.text || 'Ops, recebi uma resposta vazia do servidor.',
        page: responseData.page,
        product_code: responseData.codigo,
      };

      setMessages((prev) => [...prev, agentMessage]);
      if (responseData.brand) {
        setCurrentBrand(responseData.brand.toLowerCase());
      }
      if (responseData.page && responseData.page > 0) {
        setCurrentPage(responseData.page);
        setShowPdf(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          text: 'Ops! Parece que nossa consultora teve um momento de distração. 😅 Pode repetir sua pergunta? Às vezes ela precisa de uma segundinha para se concentrar!',
          page: currentPage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="revista-digital" className="py-32 border-b border-zinc-100 bg-[#F9F7F5]">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Section header */}
        <FadeIn className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="section-kicker">REVISTA DIGITAL</span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>
          <h2 className="section-title text-5xl md:text-6xl leading-[0.98] mb-4">
            Catálogo Inteligente
          </h2>
          <p className="section-subtitle text-base md:text-lg max-w-xl">
            Pergunte sobre qualquer produto e a consultora virtual abre a página certa da revista para você.
          </p>
        </FadeIn>

        {/* Chat + Flipbook widget */}
        <FadeIn delay={0.15}>
          <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl shadow-zinc-900/10 lg:h-[clamp(520px,70vh,720px)]">

            {/* Left — Chat (40%) */}
            <div className={`flex flex-col w-full lg:w-[40%] lg:min-w-[360px] border-r border-[#EBE4DC] bg-white z-20 shrink-0 transition-all duration-500 ${showPdf ? 'h-[480px] lg:h-full' : 'h-[480px] lg:h-full'}`}>

              {/* Chat header */}
              <header className="flex flex-col px-6 py-4 border-b border-[#EBE4DC] bg-white shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-md shadow-orange-500/20">
                      <Sparkles size={18} className="fill-current opacity-90" />
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-800 leading-tight text-base tracking-tight">Consultoria</p>
                      <p className="text-xs text-orange-600 font-medium tracking-wide">Revista de Ciclo Digital</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`p-2 rounded-full transition-all duration-300 ${showSettings ? 'bg-orange-50 text-orange-600 rotate-90' : 'text-zinc-400 hover:text-orange-500 hover:bg-orange-50'}`}
                    title="Configurar Conexão n8n"
                  >
                    <Settings size={18} />
                  </button>
                </div>

                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 bg-[#FBF9F8] border border-[#EBE4DC] rounded-xl text-sm mt-2 shadow-inner">
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                          URL Webhook (n8n)
                        </label>
                        <input
                          type="url"
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          placeholder="https://seu-n8n.com/webhook/..."
                          className="w-full px-3 py-2 bg-white border border-[#EBE4DC] rounded-lg text-xs focus:outline-none focus:border-orange-400 transition-all font-mono shadow-sm"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </header>

              {/* Messages */}
              <main className="flex-1 overflow-y-auto px-5 py-6 scroll-smooth bg-gradient-to-b from-white to-[#FAFAFA]">
                <div className="flex flex-col gap-5">
                  <AnimatePresence initial={false}>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2.5 max-w-[90%] ${message.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                      >
                        <div className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 mt-1 shadow-sm ${message.role === 'user' ? 'bg-[#F0EBE6] text-zinc-600' : 'bg-orange-100 text-orange-600'}`}>
                          {message.role === 'user' ? <User size={13} /> : <Sparkles size={13} />}
                        </div>
                        <div className={`px-4 py-3 shadow-sm text-sm leading-relaxed ${message.role === 'user' ? 'bg-zinc-800 text-white rounded-2xl rounded-tr-sm shadow-md' : 'bg-white border border-[#F0EBE6] text-zinc-700 rounded-2xl rounded-tl-sm shadow-sm'}`}>
                          {message.text}
                          {message.page !== undefined && message.page > 0 && message.role === 'agent' && (
                            <span className="inline-flex items-center gap-1 mt-2 text-[10px] uppercase tracking-wider font-bold text-orange-700 bg-orange-50/80 px-2 py-1 rounded border border-orange-100/50">
                              <Presentation size={11} />
                              {currentBrand === 'boticario' ? 'Boticário' : 'Natura'} · Pág: {message.page}
                            </span>
                          )}
                          {message.product_code && (
                            <span className="inline-flex items-center gap-1 mt-1 text-[10px] uppercase tracking-wider font-bold text-zinc-600 bg-zinc-50 px-2 py-1 rounded border border-zinc-100">
                              🔍 Código: {message.product_code}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2.5 max-w-[85%] mr-auto"
                      >
                        <div className="flex items-center justify-center w-7 h-7 rounded-full shrink-0 mt-1 bg-orange-100 text-orange-600 shadow-sm">
                          <Sparkles size={13} />
                        </div>
                        <div className="px-5 py-3 rounded-2xl bg-white border border-[#F0EBE6] rounded-tl-sm flex items-center justify-center shadow-sm">
                          <Loader2 size={16} className="animate-spin text-orange-400" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={messagesEndRef} className="h-1" />
                </div>
              </main>

              {/* Input */}
              <footer className="p-4 bg-white border-t border-[#F0EBE6] shrink-0">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center gap-2 p-1.5 bg-[#FBF9F8] border border-[#EBE4DC] rounded-full focus-within:ring-4 focus-within:ring-orange-500/10 focus-within:border-orange-400 transition-all shadow-inner"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Qual produto você procura?"
                    className="flex-1 px-4 py-2 bg-transparent text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 text-white hover:from-orange-500 hover:to-amber-600 disabled:from-zinc-200 disabled:to-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                  >
                    <Send size={16} className="ml-0.5" />
                  </button>
                </form>
                <div className="text-center mt-3">
                  <span className="inline-flex items-center justify-center gap-1 text-[10px] text-emerald-600 uppercase tracking-[0.1em] font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    ● NATURA · BOTICÁRIO
                  </span>
                </div>
              </footer>
            </div>

            {/* Right — Flipbook (60%) */}
            <div ref={flipbookRef} className={`${showPdf ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-1 bg-[#F9F7F5] border-t lg:border-t-0 lg:border-l border-[#EBE4DC] relative overflow-hidden h-[420px] lg:h-auto`}>
              <AnimatePresence mode="wait">
                {!showPdf ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[#F9F7F5] p-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-5 shadow-sm border border-orange-200">
                      <BookOpen size={34} className="text-orange-500" />
                    </div>
                    <h3 className="text-lg font-medium text-zinc-800 mb-2 tracking-wide">Revista Inteligente</h3>
                    <p className="text-sm text-zinc-500 max-w-[260px] text-center leading-relaxed">
                      Faça uma pergunta no chat e a revista abrirá automaticamente na página do produto.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="viewer"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-3 bg-gradient-to-b from-[#1A1A1A]/80 to-transparent pointer-events-none">
                      <div className="flex items-center gap-2 text-zinc-200 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 pointer-events-auto shadow-xl">
                        <FileText size={15} className="text-orange-400/90" />
                        <span className="font-medium text-xs tracking-wide uppercase">
                          {currentBrand === 'boticario' ? 'Catálogo_Boticário' : 'Revista_Natura'}
                        </span>
                      </div>
                      <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md text-orange-50 flex items-center gap-1.5 rounded-xl border border-white/10 pointer-events-auto shadow-xl">
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-80">Pág:</span>
                        <span className="font-mono text-sm font-bold text-orange-400">{currentPage}</span>
                      </div>
                    </header>
                    <main className="flex-1 relative w-full h-full bg-[#1A1A1A]">
                      <iframe
                        src={`${FLIPBOOKS[currentBrand] ?? FLIPBOOKS['natura']}#page/${currentPage}`}
                        allowFullScreen
                        className="w-full h-full border-none transition-opacity duration-300"
                        title="Revista Flipbook 3D"
                      />
                    </main>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </FadeIn>

      </div>
    </section>
  );
}
