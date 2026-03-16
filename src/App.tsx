import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, ArrowDown, ShieldCheck, TrendingUp, 
  Leaf, Droplet, Sun, Sparkles, Heart, Shield, Search, Menu, X,
  CheckCircle2, AlertCircle, Info, ChevronRight, Star
} from 'lucide-react';
import { FadeIn } from './components/FadeIn';
import { TextReveal } from './components/TextReveal';
import { FlashlightCard } from './components/FlashlightCard';

function Tooltip({ children, content }: { children: ReactNode, content: string }) {
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

function Modal({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: ReactNode }) {
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

export default function App() {
  const WHATSAPP_NUMBER = "55XXXXXXXXXXX";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = ['PRODUTOS', 'SOBRE', 'SUSTENTABILIDADE', 'CONTATO', 'AGENDAR AGORA'];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-[1920px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer z-50">
            <video 
              src="https://github.com/leonvpetri/Imagens/raw/main/assets/video-marcia.mp4"
              autoPlay 
              loop 
              muted 
              playsInline
              className="h-28 md:h-36 w-auto object-contain"
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 justify-center flex-1 px-8">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors whitespace-nowrap">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 z-50">
            <button className="hidden md:block px-5 py-2 bg-zinc-900 text-white text-xs font-mono uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors">
              Download Kit
            </button>
            <button 
              className="lg:hidden p-2 text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
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
                      key={item} 
                      href={`#${item.toLowerCase().replace(' ', '-')}`} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-6 py-3 mx-2 text-zinc-600 hover:bg-white hover:text-zinc-900 rounded-xl transition-colors text-[11px] font-mono tracking-widest uppercase"
                    >
                      {item}
                    </a>
                  ))}
                  <div className="px-4 pt-4 mt-2 border-t border-zinc-200/50">
                    <button className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white rounded-xl pt-3.5 pr-4 pb-3.5 pl-4 text-xs font-mono uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-md">
                      Download Kit
                    </button>
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden border-b border-zinc-100 bg-grid pt-32 md:pt-48">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[15%] w-[600px] h-[600px] bg-gradient-to-tr from-stone-100 to-rose-50 rounded-full blur-[120px] opacity-60"
          />
          <motion.div 
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-gradient-to-bl from-stone-100 to-emerald-50 rounded-full blur-[100px] opacity-60"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          <FadeIn delay={0.2} className="flex items-center justify-center gap-4 mb-8">
            <span className="w-2 h-2 bg-zinc-900 rounded-full animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">Design System v4.0</span>
            <span className="w-12 h-[1px] bg-zinc-200"></span>
          </FadeIn>

          <div className="flex justify-center mb-12">
            <video 
              src="https://github.com/leonvpetri/Imagens/raw/refs/heads/main/assets/marcia-video-hero.mp4"
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full max-w-3xl rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-white/20"
            />
          </div>

          <FadeIn delay={0.8}>
            <p className="text-lg md:text-xl text-zinc-500 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Cosméticos de alta performance com ingredientes 100% naturais.
              <br/><span className="text-zinc-900 font-medium">Ciência e pureza na sua pele.</span>
            </p>
          </FadeIn>

          <FadeIn delay={1} className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="#produtos" className="group relative flex items-center justify-center overflow-hidden rounded-full p-[1px] transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,#000_360deg)]"></span>
              <span className="relative flex h-full w-full items-center rounded-full bg-white px-8 py-4 ring-1 ring-zinc-900/5">
                <span className="font-mono text-xs font-bold uppercase tracking-widest mr-2">Explorar Produtos</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            <a href="#sobre" className="group relative flex items-center justify-center overflow-hidden rounded-full p-[1px] transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,#000_360deg)]"></span>
              <span className="relative flex h-full w-full items-center rounded-full bg-white px-8 py-4 ring-1 ring-zinc-900/5">
                <span className="font-mono text-xs font-bold uppercase tracking-widest mr-2">Nossa Filosofia</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Produtos Section */}
      <section id="produtos" className="py-32 border-b border-zinc-100 bg-zinc-50/50 relative">
        <div className="max-w-[1600px] mx-auto px-6">
          <FadeIn>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-16">01 / PRODUTOS</span>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <FlashlightCard className="rounded-2xl p-6 h-full flex flex-col">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-zinc-100">
                  <img src="https://br.pinterest.com/pin/754564112614708958/" alt="Sérum Luminosidade" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">SKINCARE</div>
                <h4 className="text-xl font-semibold mb-2">Sérum Luminosidade</h4>
                <p className="text-sm text-zinc-500 mb-6 flex-grow">Vitamina C estabilizada com ácido hialurônico. Radiância visível em 7 dias.</p>
                <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  DESCOBRIR <ArrowRight size={14} />
                </button>
              </FlashlightCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <FlashlightCard className="rounded-2xl p-6 h-full flex flex-col">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-zinc-100">
                  <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800" alt="Óleo Facial Botânico" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">TRATAMENTO</div>
                <h4 className="text-xl font-semibold mb-2">Óleo Facial Botânico</h4>
                <p className="text-sm text-zinc-500 mb-6 flex-grow">Blend de óleos naturais de rosa mosqueta e jojoba. Nutrição profunda.</p>
                <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  DESCOBRIR <ArrowRight size={14} />
                </button>
              </FlashlightCard>
            </FadeIn>

            <FadeIn delay={0.3}>
              <FlashlightCard className="rounded-2xl p-6 h-full flex flex-col">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-zinc-100">
                  <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800" alt="Hidratante Barreira" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">SKINCARE</div>
                <h4 className="text-xl font-semibold mb-2">Hidratante Barreira</h4>
                <p className="text-sm text-zinc-500 mb-6 flex-grow">Ceramidas vegetais para restaurar a barreira cutânea. Pele saudável.</p>
                <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  DESCOBRIR <ArrowRight size={14} />
                </button>
              </FlashlightCard>
            </FadeIn>

            <FadeIn delay={0.4}>
              <FlashlightCard className="rounded-2xl p-6 h-full flex flex-col">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-zinc-100">
                  <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" alt="Bruma Facial Calmante" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">RITUAL</div>
                <h4 className="text-xl font-semibold mb-2">Bruma Facial Calmante</h4>
                <p className="text-sm text-zinc-500 mb-6 flex-grow">Água termal e extrato de camomila. Frescor e equilíbrio instantâneo.</p>
                <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  DESCOBRIR <ArrowRight size={14} />
                </button>
              </FlashlightCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Filosofia Section */}
      <section id="sobre" className="py-32 border-b border-zinc-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="col-span-1 md:col-span-3">
            <FadeIn>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-4">02 / FILOSOFIA</span>
            </FadeIn>
          </div>
          <div className="col-span-1 md:col-span-9">
            <FadeIn delay={0.1}>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                Beleza que respeita<br/>a natureza.
              </h2>
              <p className="text-xl text-zinc-500 leading-relaxed max-w-3xl mb-16">
                Cada fórmula é uma convergência entre ciência avançada e os ingredientes mais puros da biodiversidade brasileira. Sem concessões, sem excessos — <span className="text-zinc-900 font-medium">apenas o essencial.</span>
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-zinc-100">
              <FadeIn delay={0.2}>
                <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6">
                  <Leaf size={20} className="text-zinc-700" />
                </div>
                <h4 className="text-lg font-semibold mb-3">100% Natural</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">Ingredientes extraídos diretamente da flora brasileira. Sem parabenos, sem sulfatos, sem fragrâncias sintéticas.</p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6">
                  <Sparkles size={20} className="text-zinc-700" />
                </div>
                <h4 className="text-lg font-semibold mb-3">Sustentável</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">Embalagens recicláveis e processos que respeitam o meio ambiente. Carbono neutro em toda a cadeia.</p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6">
                  <Heart size={20} className="text-zinc-700" />
                </div>
                <h4 className="text-lg font-semibold mb-3">Cruelty-Free</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">Nunca testamos em animais. Certificados internacionais de ética e responsabilidade.</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre a Consultora Section */}
      <section id="sobre-consultora" className="py-32 border-b border-zinc-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="col-span-1 md:col-span-3">
            <FadeIn>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-4">03 / SOBRE</span>
            </FadeIn>
          </div>
          <div className="col-span-1 md:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-9 gap-12">
              <FadeIn delay={0.1} className="col-span-1 md:col-span-4">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <img
                    src="https://github.com/leonvpetri/Imagens/raw/main/assets/marcia_logo.png"
                    alt="Márcia Ferreira"
                    className="w-full rounded-2xl object-cover border border-zinc-100"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </FadeIn>
              <div className="col-span-1 md:col-span-5">
                <FadeIn delay={0.2}>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                    Olá, eu sou a Márcia.
                  </h2>
                  <p className="text-lg text-zinc-500 leading-relaxed mb-6">
                    Sou consultora de beleza apaixonada por transformar a rotina de cuidados das minhas clientes.
                    Acredito que beleza vai além da aparência — é sobre como você se sente na sua própria pele.
                  </p>
                  <p className="text-lg text-zinc-500 leading-relaxed mb-6">
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
                          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mt-1">{stat.label}</div>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.5} className="mt-10">
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] transform hover:scale-105 transition-transform duration-300 shadow-lg">
                    <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,#000_360deg)]"></span>
                    <span className="relative flex h-full w-full items-center rounded-full bg-white px-8 py-4 ring-1 ring-zinc-900/5">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest mr-2">Agendar Consultoria</span>
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="py-32 border-b border-zinc-100 bg-zinc-50/50">
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="col-span-1 md:col-span-3">
            <FadeIn>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-4">04 / DEPOIMENTOS</span>
            </FadeIn>
          </div>
          <div className="col-span-1 md:col-span-9">
            {/* TODO: Substituir por depoimentos reais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'Ana Paula M.', product: 'Sérum Natura', text: 'A Márcia me indicou o sérum perfeito para minha pele sensível. Resultado incrível em 2 semanas!' },
                { name: 'Carla Souza', product: 'Kit Avon', text: 'Atendimento super atencioso, ela entendeu exatamente o que eu precisava. Super recomendo!' },
                { name: 'Fernanda Lima', product: 'Hidratante Boticário', text: 'Compro sempre com a Márcia. Ela sempre tem as melhores dicas e promoções exclusivas.' },
                { name: 'Juliana Torres', product: 'Mary Kay Skincare', text: 'Fiz uma consultoria completa e aprendi muito sobre minha rotina de skincare. Vale muito!' },
              ].map((testimonial, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <FlashlightCard className="rounded-2xl p-8 h-full flex flex-col">
                    <div className="text-6xl text-zinc-100 font-serif leading-none mb-4">&ldquo;</div>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-6 flex-grow">{testimonial.text}</p>
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className="fill-zinc-900 text-zinc-900" />
                      ))}
                    </div>
                    <div className="border-t border-zinc-100 pt-4">
                      <div className="text-sm font-semibold">{testimonial.name}</div>
                      <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">{testimonial.product}</div>
                    </div>
                  </FlashlightCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ingredientes Section */}
      <section id="sustentabilidade" className="py-32 border-b border-zinc-100 bg-zinc-50/50">
        <div className="max-w-[1600px] mx-auto px-6">
          <FadeIn className="flex items-center gap-4 mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">05 / INGREDIENTES</span>
            <div className="h-px flex-1 bg-zinc-200"></div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">{item.subtitle}</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{item.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed flex-grow">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-32 border-b border-zinc-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="col-span-1 md:col-span-3">
            <FadeIn>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-4">06 / CONTATO</span>
            </FadeIn>
          </div>
          <div className="col-span-1 md:col-span-9 max-w-2xl">
            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Receba novidades exclusivas
              </h2>
              <p className="text-lg text-zinc-500 mb-12">
                Seja o primeiro a saber sobre lançamentos, ingredientes e rituais de cuidado.
              </p>
            </FadeIn>

            <FadeIn delay={0.2} className="space-y-4">
              <input 
                type="text" 
                placeholder="Seu nome" 
                className="w-full px-6 py-4 rounded-full border border-zinc-200 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors"
              />
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="w-full px-6 py-4 rounded-full border border-zinc-200 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors"
                />
              </div>
              <button className="w-full px-6 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full font-bold text-xs uppercase tracking-widest hover:border-zinc-900 transition-colors flex items-center justify-center gap-2">
                QUERO ME CADASTRAR <ArrowRight size={16} />
              </button>
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 text-center mt-6">
                AO SE CADASTRAR, VOCÊ CONCORDA COM NOSSA POLÍTICA DE PRIVACIDADE.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="py-20 bg-zinc-900 text-white relative">
        <div className="absolute inset-0 bg-noise opacity-20"></div>
        <div className="relative z-10 flex overflow-hidden">
          <div className="flex w-max animate-marquee items-center opacity-80">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-x-48 px-24">
                <div className="flex items-center gap-x-12">
                  <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] whitespace-nowrap">NATURA</span>
                  <img src="https://github.com/leonvpetri/Imagens/raw/main/assets/Natura_Preto.png" alt="Natura" className="h-12 md:h-16 invert object-contain flex-shrink-0" referrerPolicy="no-referrer" />
                </div>
                <div className="flex items-center gap-x-12">
                  <span className="text-4xl md:text-6xl font-bold tracking-tighter whitespace-nowrap">AVON</span>
                  <img src="https://github.com/leonvpetri/Imagens/raw/main/assets/Avon_Preto.jfif" alt="Avon" className="h-12 md:h-16 invert object-contain flex-shrink-0" referrerPolicy="no-referrer" />
                </div>
                <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] whitespace-nowrap">MARY KAY</span>
                <span className="text-4xl md:text-6xl font-bold tracking-tighter whitespace-nowrap">BOTICÁRIO</span>
                <div className="flex items-center gap-x-12">
                  <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] whitespace-nowrap">EUDORA</span>
                  <img src="https://github.com/leonvpetri/Imagens/raw/main/assets/Eudora%20Preto.jfif" alt="Eudora" className="h-12 md:h-16 invert object-contain flex-shrink-0" referrerPolicy="no-referrer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">
              Beleza que<br/><span className="text-stroke-outline text-black opacity-30">transforma.</span>
            </h2>
            <p className="text-lg text-zinc-500 mb-12">
              Consultora oficial Natura · Avon · Boticário · Mary Kay
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="flex justify-center gap-6">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-all hover:scale-105 shadow-lg">
              Falar no WhatsApp
            </a>
            <a href="#produtos" className="px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full font-medium hover:border-zinc-900 transition-all hover:scale-105 shadow-sm">
              Ver Produtos
            </a>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-32 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-zinc-100 pt-8 gap-6">
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
              <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2 group">
                <img 
                  src="https://github.com/leonvpetri/Imagens/raw/main/assets/logo-instagram.png" 
                  alt="Instagram" 
                  className="w-14 h-14 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <span className="text-sm font-medium">Instagram</span>
              </a>
              <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2 group">
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
    </div>
  );
}

