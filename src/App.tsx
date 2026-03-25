import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Leaf, Sparkles, Heart, Menu, X, Star,
  MessageCircle, PackageSearch, Truck, ShoppingBag,
  CheckCircle2, Info, AlertCircle
} from 'lucide-react';
import { FadeIn } from './components/FadeIn';
import { FlashlightCard } from './components/FlashlightCard';

// ─── WhatsApp SVG Icon ────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.428a.75.75 0 00.915.915l5.579-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.505-5.23-1.385l-.374-.217-3.882 1.023 1.023-3.882-.217-.374A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 5.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function Tooltip({ children, content }: { children: ReactNode; content: string }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded-md whitespace-nowrap z-50"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-zinc-100"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const WHATSAPP_NUMBER = "553496508057";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const testimonials = [
    { name: 'Ana Paula M.', product: 'Sérum Natura', text: 'A Márcia me indicou o sérum perfeito para minha pele sensível. Resultado incrível em 2 semanas!' },
    { name: 'Carla Souza', product: 'Kit Avon', text: 'Atendimento super atencioso, ela entendeu exatamente o que eu precisava. Super recomendo!' },
    { name: 'Fernanda Lima', product: 'Hidratante Boticário', text: 'Compro sempre com a Márcia. Ela sempre tem as melhores dicas e promoções exclusivas.' },
    { name: 'Juliana Torres', product: 'Mary Kay Skincare', text: 'Fiz uma consultoria completa e aprendi muito sobre minha rotina de skincare. Vale muito!' },
  ];

  const handleCatalogCardMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 9;
    const rotateX = -((y - midY) / midY) * 9;
    card.style.setProperty('--tilt-x', `${rotateX}deg`);
    card.style.setProperty('--tilt-y', `${rotateY}deg`);
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCatalogCardLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  };
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('loading');

    try {
      const dataAtual = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      
      const response = await fetch('https://artefinal-n8n.gumtcw.easypanel.host/webhook/marcia-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          data: dataAtual
        }),
      });

      const text = await response.text();
      console.log("Resposta bruta do N8N:", text);
      
      try {
        const result = JSON.parse(text);
        const data = Array.isArray(result) ? result[0] : result;
        
        // Verifica as chaves de forma mais flexível (booleanos ou strings, na raiz ou em data.body)
        const isSuccess = 
          data?.success === true || data?.success === "true" || 
          data?.body?.success === true || data?.body?.success === "true";
          
        const isDuplicate = 
          data?.duplicate === true || data?.duplicate === "true" || 
          data?.body?.duplicate === true || data?.body?.duplicate === "true";
        
        // Fallback: se o N8N retornou uma mensagem de erro em texto que contenha a palavra 'duplicate'
        const textLower = text.toLowerCase();
        const hasDuplicateKeyword = textLower.includes('duplicate') || textLower.includes('duplicado') || textLower.includes('já cadastrado');

        if (isDuplicate || hasDuplicateKeyword) {
          setSubmitStatus('duplicate');
        } else if (isSuccess) {
          setSubmitStatus('success');
          setNome('');
          setEmail('');
        } else {
          console.error("N8N retornou um formato inesperado:", data);
          // Se a requisição deu 200 OK mas não tem a flag success, assumimos sucesso como fallback
          if (response.ok) {
            setSubmitStatus('success');
            setNome('');
            setEmail('');
          } else {
            setSubmitStatus('error');
          }
        }
      } catch (err) {
        console.error("Erro ao fazer parse do JSON:", err);
        // Fallback se o N8N não retornar JSON válido
        if (text.toLowerCase().includes('duplicate')) {
          setSubmitStatus('duplicate');
        } else if (response.ok) {
          setSubmitStatus('success');
          setNome('');
          setEmail('');
        } else {
          setSubmitStatus('error');
        }
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'duplicate') {
      const timer = setTimeout(() => setSubmitStatus('idle'), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setShowWhatsApp(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'CATÁLOGO', href: '#catalogo' },
    { label: 'COMO FUNCIONA', href: '#como-funciona' },
    { label: 'SOBRE', href: '#sobre-consultora' },
    { label: 'DEPOIMENTOS', href: '#depoimentos' },
    { label: 'CONTATO', href: '#contato' },
  ];
  const marqueeBrands = [
    { name: 'Natura', src: 'https://raw.githubusercontent.com/leonvpetri/Imagens/main/assets/natura-logo.svg', scale: 1.55 },
    { name: 'Avon', src: 'https://raw.githubusercontent.com/leonvpetri/Imagens/main/assets/avon_logo.svg', scale: 1 },
    { name: 'Boticário', src: 'https://raw.githubusercontent.com/leonvpetri/Imagens/main/assets/boticario-logo.svg', scale: 2.6 },
    { name: 'Mary Kay', src: 'https://raw.githubusercontent.com/leonvpetri/Imagens/main/assets/marykay-logo.svg', scale: 2.3 },
    { name: 'Eudora', src: 'https://raw.githubusercontent.com/leonvpetri/Imagens/main/assets/eudora-logo.svg', scale: 2.1 },
  ];

  const whatsappHref = (msg: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 transition-all duration-300">
        <div className="max-w-[1920px] mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group cursor-pointer z-50">
            <video
              src="https://github.com/leonvpetri/Imagens/raw/main/assets/video-marcia.mp4"
              autoPlay loop muted playsInline
              className="h-28 md:h-36 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 justify-center flex-1 px-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 z-50">
            <a
              href={whatsappHref('Olá Márcia! Gostaria de agendar uma consultoria. 😊')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-xs font-mono uppercase tracking-widest rounded-full hover:bg-[#20bd5a] transition-colors shadow-md"
            >
              <WhatsAppIcon size={16} />
              Falar comigo
            </a>
            <button
              className="lg:hidden p-2 text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-white/40 backdrop-blur-md -z-10 lg:hidden"
                style={{ height: '100vh' }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-4 left-4 mt-2 bg-zinc-50 border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] lg:hidden z-50 overflow-hidden"
              >
                <nav className="flex flex-col py-4 select-none">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-6 py-3 mx-2 text-zinc-600 hover:bg-white hover:text-zinc-900 rounded-xl transition-colors text-[11px] font-mono tracking-widest uppercase"
                    >
                      {item.label}
                    </a>
                  ))}
                  <div className="px-4 pt-4 mt-2 border-t border-zinc-200/50">
                    <a
                      href={whatsappHref('Olá Márcia! Gostaria de agendar uma consultoria. 😊')}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl pt-3.5 pr-4 pb-3.5 pl-4 text-xs font-mono uppercase tracking-widest hover:bg-[#20bd5a] transition-all shadow-md"
                    >
                      <WhatsAppIcon size={16} />
                      Falar comigo no WhatsApp
                    </a>
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden border-b border-zinc-100 bg-grid pt-32 md:pt-48">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[10%] left-[15%] w-[600px] h-[600px] bg-gradient-to-tr from-stone-100 to-rose-50 rounded-full blur-[120px] opacity-60"
          />
          <motion.div
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-gradient-to-bl from-stone-100 to-emerald-50 rounded-full blur-[100px] opacity-60"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          {/* Badge */}
          <FadeIn delay={0.2} className="flex items-center justify-center gap-4 mb-8">
            <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">Consultora Oficial · Natura · Avon · Boticário · Mary Kay</span>
            <span className="w-12 h-[1px] bg-zinc-200"></span>
          </FadeIn>

          {/* Vídeo Hero */}
          <div className="flex justify-center mb-12">
            <video
              src="https://github.com/leonvpetri/Imagens/raw/refs/heads/main/assets/marcia-video-hero.mp4"
              autoPlay loop muted playsInline
              className="w-full max-w-3xl rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-white/20"
            />
          </div>

          <FadeIn delay={0.8}>
            <p className="text-lg md:text-xl text-zinc-500 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Cosméticos de alta performance com ingredientes 100% naturais.
              <br />
              <span className="text-zinc-900 font-medium">Ciência e pureza na sua pele.</span>
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={1} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* ── WhatsApp — botão principal verde ── */}
            <a
              href={whatsappHref('Olá Márcia! Gostaria de uma consultoria de beleza. 😊')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-all duration-300 hover:scale-105 shadow-lg shadow-green-200"
            >
              <WhatsAppIcon size={18} />
              Falar no WhatsApp
            </a>

            {/* ── Explorar Catálogo ── */}
            <a
              href="#catalogo"
              className="group relative flex items-center justify-center overflow-hidden rounded-full p-[1px] transform hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,#000_360deg)]" />
              <span className="relative flex h-full w-full items-center rounded-full bg-white px-8 py-4 ring-1 ring-zinc-900/5">
                <span className="font-mono text-xs font-bold uppercase tracking-widest mr-2">Ver Catálogo</span>
                <ShoppingBag size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>

            {/* ── Nossa Filosofia ── */}
            <a
              href="#sobre-consultora"
              className="group relative flex items-center justify-center overflow-hidden rounded-full p-[1px] transform hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,#000_360deg)]" />
              <span className="relative flex h-full w-full items-center rounded-full bg-white px-8 py-4 ring-1 ring-zinc-900/5">
                <span className="font-mono text-xs font-bold uppercase tracking-widest mr-2">Sobre a Márcia</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── Como Funciona ── */}
      <section id="como-funciona" className="py-32 border-b border-zinc-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            <div className="col-span-1 md:col-span-3">
              <FadeIn>
                <span className="section-kicker block mb-4">
                  COMO FUNCIONA
                </span>
              </FadeIn>
            </div>
            <div className="col-span-1 md:col-span-9">
              <FadeIn delay={0.1}>
                <h2 className="display-title section-title text-5xl md:text-7xl mb-6 leading-[0.95]">
                  Simples assim.
                </h2>
                <p className="lead-copy section-subtitle text-lg md:text-xl max-w-2xl">
                  Comprar com uma consultora é mais fácil do que você imagina. Em três passos você recebe os melhores produtos direto na sua porta.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
            {/* Linha conectora — só desktop */}
            <div className="hidden md:block absolute top-[3.25rem] left-[calc(16.666%+1rem)] right-[calc(16.666%+1rem)] h-[1px] bg-zinc-200 z-0" />

            {[
              {
                step: '01',
                icon: PackageSearch,
                title: 'Escolha o produto',
                description: 'Navegue pelo catálogo por marca ou categoria. Encontre o que combina com você.',
                cta: 'Ver Catálogo',
                href: '#catalogo',
              },
              {
                step: '02',
                icon: MessageCircle,
                title: 'Fale comigo',
                description: 'Me envie uma mensagem no WhatsApp. Eu te ajudo a escolher o produto certo para o seu tipo de pele e orçamento.',
                cta: 'Abrir WhatsApp',
                href: whatsappHref('Olá Márcia! Preciso de ajuda para escolher um produto. 😊'),
                external: true,
                highlight: true,
              },
              {
                step: '03',
                icon: Truck,
                title: 'Receba em casa',
                description: 'Após o pedido confirmado, o produto chega direto na sua porta. Rápido, fácil e sem complicação.',
                cta: null,
                href: null,
              },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeIn key={i} delay={i * 0.15} className="relative z-10">
                  <div className={`flex flex-col h-full px-6 md:px-10 py-10 md:py-0 border-b md:border-b-0 md:border-r border-zinc-100 last:border-0 ${i === 0 ? 'md:pl-0' : ''} ${i === 2 ? 'md:pr-0' : ''}`}>
                    {/* Número + ícone */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border ${s.highlight ? 'bg-[#25D366] border-[#25D366] shadow-lg shadow-green-200' : 'bg-white border-zinc-200'}`}>
                        <Icon size={22} className={s.highlight ? 'text-white' : 'text-zinc-700'} />
                      </div>
                      <span className="text-5xl font-bold tracking-tighter text-zinc-100 select-none">{s.step}</span>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight mb-4">{s.title}</h3>
                    <p className="text-zinc-500 leading-relaxed text-sm mb-8 flex-grow">{s.description}</p>

                    {s.cta && s.href && (
                      <a
                        href={s.href}
                        target={s.external ? '_blank' : undefined}
                        rel={s.external ? 'noopener noreferrer' : undefined}
                        className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold transition-all hover:gap-3 ${s.highlight ? 'text-[#25D366]' : 'text-zinc-900'}`}
                      >
                        {s.cta} <ArrowRight size={14} />
                      </a>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* CTA bottom */}
          <FadeIn delay={0.4} className="mt-20 pt-12 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-zinc-500 text-sm max-w-md">
              Tem dúvidas sobre qual produto é ideal para você? <span className="text-zinc-900 font-medium">A Márcia faz uma consultoria gratuita e personalizada.</span>
            </p>
            <a
              href={whatsappHref('Olá Márcia! Gostaria de uma consultoria gratuita. 😊')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-all hover:scale-105 shadow-lg shadow-green-200"
            >
              <WhatsAppIcon size={16} />
              Consultoria Gratuita
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── Catálogo por Marca ── */}
      <section id="catalogo" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="display-title section-title text-4xl md:text-6xl text-center mb-4">
            Marcas que Represento
          </h2>
          <p className="lead-copy section-subtitle text-center mb-12 max-w-xl mx-auto">
            Produtos originais com atendimento personalizado. Clique na marca para ver o catálogo completo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Natura */}
            <div
              className="catalog-card"
              style={{ '--accent-rgb': '22, 163, 74' } as React.CSSProperties}
              onMouseMove={handleCatalogCardMove}
              onMouseLeave={handleCatalogCardLeave}
            >
              <div className="catalog-media">
                <img
                  src="https://github.com/leonvpetri/Imagens/raw/main/assets/Natura-2.png"
                  alt="Natura"
                  className="catalog-media-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="catalog-content">
                <span className="catalog-title">Natura</span>
                <p className="catalog-desc">Skincare · Perfumaria · Corpo & Banho</p>
                <div className="catalog-actions">
                  <a
                    href="https://www.minhaloja.natura.com/consultoria/marciacunha2403"
                    target="_blank"
                    rel="noopener"
                    className="catalog-cta"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest mr-2">Ver Catálogo</span>
                    <ShoppingBag size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="https://wa.me/553496508057?text=Olá! Tenho interesse em produtos Natura." target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center">WhatsApp</a>
                </div>
              </div>
            </div>

            {/* Avon */}
            <div
              className="catalog-card"
              style={{ '--accent-rgb': '225, 29, 72' } as React.CSSProperties}
              onMouseMove={handleCatalogCardMove}
              onMouseLeave={handleCatalogCardLeave}
            >
              <div className="catalog-media">
                <img
                  src="https://github.com/leonvpetri/Imagens/raw/main/assets/avon-2.png"
                  alt="Avon"
                  className="catalog-media-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="catalog-content">
                <span className="catalog-title">Avon</span>
                <p className="catalog-desc">Maquiagem · Perfumaria · Cuidados</p>
                <div className="catalog-actions">
                  <a
                    href="https://www.avon.com.br/folheto-digital"
                    target="_blank"
                    rel="noopener"
                    className="catalog-cta"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest mr-2">Ver Catálogo</span>
                    <ShoppingBag size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="https://wa.me/553496508057?text=Olá! Tenho interesse em produtos Avon." target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center">WhatsApp</a>
                </div>
              </div>
            </div>

            {/* O Boticário */}
            <div
              className="catalog-card"
              style={{ '--accent-rgb': '16, 185, 129' } as React.CSSProperties}
              onMouseMove={handleCatalogCardMove}
              onMouseLeave={handleCatalogCardLeave}
            >
              <div className="catalog-media">
                <img
                  src="https://github.com/leonvpetri/Imagens/raw/main/assets/boticario-4.png"
                  alt="O Boticário"
                  className="catalog-media-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="catalog-content">
                <span className="catalog-title">O Boticário</span>
                <p className="catalog-desc">Perfumaria · Maquiagem · Skincare</p>
                <div className="catalog-actions">
                  <a
                    href="https://minhaloja.grupoboticario.com.br/loja-marciaferreiradacunha-15916127?utm_source=app_divulgar_marca&utm_medium=divulgar_loja_multimarca"
                    target="_blank"
                    rel="noopener"
                    className="catalog-cta"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest mr-2">Ver Catálogo</span>
                    <ShoppingBag size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="https://wa.me/553496508057?text=Olá! Tenho interesse em produtos O Boticário." target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center">WhatsApp</a>
                </div>
              </div>
            </div>

            {/* Mary Kay */}
            <div
              className="catalog-card"
              style={{ '--accent-rgb': '236, 72, 153' } as React.CSSProperties}
              onMouseMove={handleCatalogCardMove}
              onMouseLeave={handleCatalogCardLeave}
            >
              <div className="catalog-media">
                <img
                  src="https://github.com/leonvpetri/Imagens/raw/main/assets/marykay-4.png"
                  alt="Mary Kay"
                  className="catalog-media-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="catalog-content">
                <span className="catalog-title">Mary Kay</span>
                <p className="catalog-desc">Skincare · Maquiagem · Fragrâncias</p>
                <div className="catalog-actions">
                  <a
                    href="https://www.marykay.com.br"
                    target="_blank"
                    rel="noopener"
                    className="catalog-cta"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest mr-2">Ver Catálogo</span>
                    <ShoppingBag size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="https://wa.me/553496508057?text=Olá! Tenho interesse em produtos Mary Kay." target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center">WhatsApp</a>
                </div>
              </div>
            </div>

            {/* Eudora */}
            <div
              className="catalog-card"
              style={{ '--accent-rgb': '250, 204, 21' } as React.CSSProperties}
              onMouseMove={handleCatalogCardMove}
              onMouseLeave={handleCatalogCardLeave}
            >
              <div className="catalog-media">
                <img
                  src="https://github.com/leonvpetri/Imagens/raw/main/assets/eudora-4.png"
                  alt="Eudora"
                  className="catalog-media-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="catalog-content">
                <span className="catalog-title">Eudora</span>
                <p className="catalog-desc">Perfumaria · Maquiagem · Cuidados</p>
                <div className="catalog-actions">
                  <a
                    href="https://www.eudora.com.br/"
                    target="_blank"
                    rel="noopener"
                    className="catalog-cta"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest mr-2">Ver Catálogo</span>
                    <ShoppingBag size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="https://wa.me/553496508057?text=Olá! Tenho interesse em produtos Eudora." target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center">WhatsApp</a>
                </div>
              </div>
            </div>

            {/* Eudora (Clone) */}
            <div
              className="catalog-card"
              style={{ '--accent-rgb': '250, 204, 21' } as React.CSSProperties}
              onMouseMove={handleCatalogCardMove}
              onMouseLeave={handleCatalogCardLeave}
            >
              <div className="catalog-media">
                <img
                  src="https://github.com/leonvpetri/Imagens/raw/main/assets/eudora-4.png"
                  alt="Eudora"
                  className="catalog-media-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="catalog-content">
                <span className="catalog-title">Eudora</span>
                <p className="catalog-desc">Perfumaria · Maquiagem · Cuidados</p>
                <div className="catalog-actions">
                  <a href="LINK_LOJA_EUDORA" target="_blank" rel="noopener" className="catalog-cta">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest mr-2">Ver Catálogo</span>
                    <ShoppingBag size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="https://wa.me/553496508057?text=Olá! Tenho interesse em produtos Eudora." target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600 transition-colors">WhatsApp</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Filosofia ── */}
      <section id="filosofia" className="py-32 border-b border-zinc-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="col-span-1 md:col-span-3">
            <FadeIn>
              <span className="section-kicker block mb-4">FILOSOFIA</span>
            </FadeIn>
          </div>
          <div className="col-span-1 md:col-span-9">
            <FadeIn delay={0.1}>
              <h2 className="display-title section-title text-5xl md:text-7xl mb-8 leading-[0.95]">
                Beleza que respeita<br />a natureza.
              </h2>
              <p className="lead-copy section-subtitle text-lg md:text-xl max-w-3xl mb-16">
                Cada fórmula é uma convergência entre ciência avançada e os ingredientes mais puros da biodiversidade brasileira. Sem concessões, sem excessos —{' '}
                <span className="accent-word">apenas o essencial.</span>
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-zinc-100">
              {[
                { icon: Leaf, title: '100% Natural', desc: 'Ingredientes extraídos diretamente da flora brasileira. Sem parabenos, sem sulfatos, sem fragrâncias sintéticas.' },
                { icon: Sparkles, title: 'Sustentável', desc: 'Embalagens recicláveis e processos que respeitam o meio ambiente. Carbono neutro em toda a cadeia.' },
                { icon: Heart, title: 'Cruelty-Free', desc: 'Nunca testamos em animais. Certificados internacionais de ética e responsabilidade.' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <FadeIn key={i} delay={0.2 + i * 0.1}>
                    <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6">
                      <Icon size={20} className="text-zinc-700" />
                    </div>
                    <h4 className="text-lg font-semibold mb-3">{item.title}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sobre a Consultora ── */}
      <section id="sobre-consultora" className="py-32 border-b border-zinc-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="col-span-1 md:col-span-3">
            <FadeIn>
              <span className="section-kicker block mb-4">SOBRE</span>
            </FadeIn>
          </div>
          <div className="col-span-1 md:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-9 gap-12">
              <FadeIn delay={0.1} className="col-span-1 md:col-span-4">
                <div
                  className="tilt-photo"
                  onMouseMove={handleCatalogCardMove}
                  onMouseLeave={handleCatalogCardLeave}
                >
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <img
                      src="https://github.com/leonvpetri/Imagens/raw/main/assets/Marcia-Quem-Sou.jpg"
                      alt="Márcia Ferreira"
                      className="w-full rounded-2xl object-cover border border-zinc-100"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>
              </FadeIn>
              <div className="col-span-1 md:col-span-5">
                <FadeIn delay={0.2}>
                  <h2 className="display-title section-title text-5xl md:text-6xl mb-6 leading-[0.98]">Olá, eu sou a Márcia.</h2>
                  <p className="lead-copy section-subtitle text-base md:text-lg mb-6">
                    Sou consultora de beleza apaixonada por transformar a rotina de cuidados das minhas clientes.
                    Acredito que beleza vai além da aparência — é sobre como você se sente na sua própria pele.
                  </p>
                  <p className="lead-copy section-subtitle text-base md:text-lg mb-6">
                    Trabalho com as marcas que mais acredito: Natura, Avon, O Boticário e Mary Kay.
                    Cada recomendação é feita com cuidado, pensando no seu tipo de pele, rotina e orçamento.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="border-t border-zinc-100 pt-8 mt-8">
                    <div className="grid grid-cols-3 gap-8">
                      {[
                        { number: '+500', label: 'Clientes atendidas' },
                        { number: '4', label: 'Marcas parceiras' },
                        { number: '5', label: 'Anos de experiência' },
                      ].map((stat, i) => (
                        <FadeIn key={i} delay={0.3 + i * 0.1}>
                          <div className="text-3xl font-bold tracking-tighter">{stat.number}</div>
                          <div className="section-meta text-xs mt-1">{stat.label}</div>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.5} className="mt-10">
                  <a
                    href={whatsappHref('Olá Márcia! Gostaria de agendar uma consultoria. 😊')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-all hover:scale-105 shadow-lg shadow-green-200"
                  >
                    <WhatsAppIcon size={16} />
                    Agendar Consultoria
                  </a>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Depoimentos ── */}
      <section id="depoimentos" className="py-32 border-b border-zinc-100 bg-zinc-50/50">
        <div className="max-w-[1600px] mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="display-title section-title text-3xl md:text-5xl">Depoimentos</h2>
            </div>
          </FadeIn>
        </div>
        <div className="marquee-full">
          <div className="marquee-container">
            <div className="marquee-content">
              {testimonials.concat(testimonials).map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-quote">&ldquo;</div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="border-t border-zinc-100 pt-4">
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.product}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ingredientes ── */}
      <section id="ingredientes" className="py-32 border-b border-zinc-100 bg-zinc-50/50">
        <div className="max-w-[1600px] mx-auto px-6">
          <FadeIn className="flex items-center gap-4 mb-16">
            <span className="section-kicker">INGREDIENTES ATIVOS</span>
            <div className="h-px flex-1 bg-zinc-200" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Ácido Hialurônico', subtitle: 'VEGETAL', desc: 'Hidratação profunda com retenção molecular de água na epiderme.' },
              { title: 'Vitamina C', subtitle: 'CAMU-CAMU', desc: 'Antioxidante de alta potência para luminosidade e uniformização.' },
              { title: 'Esqualano', subtitle: 'OLIVA', desc: 'Emoliente biocompatível que restaura a barreira lipídica natural.' },
              { title: 'Rosa Mosqueta', subtitle: 'PATAGÔNIA', desc: 'Regeneração celular com ácidos graxos essenciais e retinol natural.' },
              { title: 'Niacinamida', subtitle: 'BIOTECNOLOGIA', desc: 'Controle de oleosidade e minimização de poros com ação anti-inflamatória.' },
              { title: 'Bakuchiol', subtitle: 'BABCHI', desc: 'Alternativa vegetal ao retinol. Anti-idade sem irritação.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white border border-zinc-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center">
                      <Leaf size={16} className="text-zinc-400" />
                    </div>
                    <span className="section-meta text-[10px]">{item.subtitle}</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{item.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed flex-grow">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contato ── */}
      <section id="contato" className="py-24 border-b border-zinc-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="col-span-1 md:col-span-3">
            <FadeIn>
              <span className="section-kicker block mb-4">CONTATO</span>
            </FadeIn>
          </div>
          <div className="col-span-1 md:col-span-9 max-w-2xl">
            <FadeIn delay={0.1}>
              <h2 className="display-title section-title text-5xl md:text-6xl mb-6 leading-[0.98]">Receba novidades exclusivas</h2>
              <p className="lead-copy section-subtitle text-base md:text-lg mb-12">
                Seja a primeira a saber sobre lançamentos, promoções e dicas de beleza personalizadas.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Seu nome" 
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 rounded-full border border-zinc-200 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors disabled:opacity-50" 
                />
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 rounded-full border border-zinc-200 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors disabled:opacity-50" 
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full font-bold text-xs uppercase tracking-widest hover:border-zinc-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'ENVIANDO...' : (
                    <>QUERO ME CADASTRAR <ArrowRight size={16} /></>
                  )}
                </button>
                
                <div className="min-h-[48px] flex items-center justify-center mt-3">
                  <AnimatePresence mode="wait">
                    {submitStatus === 'success' && (
                      <motion.p
                        key="success"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-xs font-mono uppercase tracking-widest text-emerald-600 flex items-center justify-center gap-2 text-center"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                        >
                          <CheckCircle2 size={16} />
                        </motion.span>
                        Seu convite para o exclusivo mundo da beleza foi enviado! ✨
                      </motion.p>
                    )}
                    
                    {submitStatus === 'duplicate' && (
                      <motion.p
                        key="duplicate"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-xs font-mono uppercase tracking-widest text-zinc-500 flex items-center justify-center gap-2 text-center"
                      >
                        <motion.span
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                        >
                          <Sparkles size={16} />
                        </motion.span>
                        Que bom te ver de novo! Você já faz parte do nosso círculo VIP. 🌸
                      </motion.p>
                    )}

                    {submitStatus === 'error' && (
                      <motion.p
                        key="error"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-xs font-mono uppercase tracking-widest text-rose-600 flex items-center justify-center gap-2 text-center"
                      >
                        <motion.span
                          initial={{ scale: 0, x: -10 }}
                          animate={{ scale: 1, x: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.2 }}
                        >
                          <AlertCircle size={16} />
                        </motion.span>
                        Ops! Um pequeno contratempo. Tente novamente em instantes? 💄
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <p className="section-meta text-[10px] text-center mt-3">
                  Ao se cadastrar, você concorda com nossa política de privacidade.
                </p>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee-shell py-6 md:py-10 relative overflow-hidden">
        <div className="relative z-10 flex overflow-hidden">
          <div className="flex w-max animate-marquee items-center">
            {[...Array(2)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex items-center gap-4 md:gap-6 px-4 md:px-10">
                {marqueeBrands.map((brand) => (
                  <div
                    key={`${groupIndex}-${brand.name}`}
                    className="brand-chip rounded-2xl md:rounded-3xl px-4 py-3 md:px-6 md:py-4 min-w-[180px] md:min-w-[220px] flex items-center justify-center"
                  >
                    <img
                      src={brand.src}
                      alt={brand.name}
                      className="h-8 md:h-10 w-auto object-contain"
                      style={{ transform: `scale(${brand.scale})` }}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto text-center">
          <FadeIn delay={0.4} className="mt-12 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-zinc-100 pt-8 gap-6">
            <div className="text-center md:text-left">
              <img 
                src="https://github.com/leonvpetri/Imagens/raw/main/assets/marcia_logo.png" 
                alt="Márcia Ferreira Beauty Consultant" 
                className="h-28 md:h-36 w-auto object-contain"   
                referrerPolicy="no-referrer"
              />
              <span className="text-xs text-zinc-400 block">© 2026 All Rights Reserved.</span>
            </div>
            <div className="flex gap-6 items-center">
              <a href="https://www.instagram.com/cfmarcia?utm_source=qr&igsh=dHV6cDlmb2Q0bGRr" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2 group">
                <img 
                  src="https://github.com/leonvpetri/Imagens/raw/main/assets/logo-instagram.png" 
                  alt="Instagram" 
                  className="w-14 h-14 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <span className="text-sm font-medium">Instagram</span>
              </a>
              <a href="https://www.facebook.com/share/1GxQDm4xms/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2 group">
                <img 
                  src="https://github.com/leonvpetri/Imagens/raw/main/assets/logo-facebook.png" 
                  alt="Facebook" 
                  className="w-6 h-6 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <span className="text-sm font-medium">Facebook</span>
              </a>
              <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors text-sm font-medium">LinkedIn</a>
            </div>
          </FadeIn>
        </div>
      </footer>

      {/* Modal Instance */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">System Notification</h3>
            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-zinc-500 mb-8">This is a demonstration of the modal component. It uses Framer Motion for smooth entrance and exit animations, along with a backdrop blur effect.</p>
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors">Cancel</button>
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors">Confirm</button>
          </div>
        </div>
      </Modal>

      {/* Floating WhatsApp Button */}
      <AnimatePresence>
        {showWhatsApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Tooltip content="Falar com a Márcia">
              <a
                href={whatsappHref('Olá Márcia! Gostaria de uma consultoria. 😊')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full p-4 bg-[#25D366] hover:bg-[#20bd5a] shadow-2xl transition-colors"
              >
                <WhatsAppIcon size={28} />
              </a>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
