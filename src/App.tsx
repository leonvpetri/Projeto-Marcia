import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, ArrowDown, ShieldCheck, TrendingUp, 
  Leaf, Droplet, Sun, Sparkles, Heart, Shield, Search, Menu, X,
  CheckCircle2, AlertCircle, Info, ChevronRight
} from 'lucide-react';
import { FadeIn } from './components/FadeIn';
import { TextReveal } from './components/TextReveal';
import { FlashlightCard } from './components/FlashlightCard';

function Tooltip({ children, content }: { children: React.ReactNode, content: string }) {
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

function Modal({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) {
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-zinc-900 text-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-90">
              <Sparkles size={16} />
            </div>
            <span className="font-bold tracking-tight text-lg">PURA<span className="font-light text-zinc-400">ESSÊNCIA</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {['PRODUTOS', 'SOBRE', 'SUSTENTABILIDADE', 'CONTATO', 'AGENDAR AGORA'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <button className="px-5 py-2 bg-zinc-900 text-white text-xs font-mono uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors">
            Download Kit
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden border-b border-zinc-100 bg-grid pt-16">
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

        <motion.div 
          initial={{ opacity: 0, y: 50, rotate: 10 }}
          animate={{ opacity: 1, y: 0, rotate: 5 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="absolute right-[10%] top-[20%] w-64 h-80 rounded-2xl overflow-hidden shadow-2xl hidden lg:block border border-white/50 z-20"
        >
          <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" alt="Bruma Facial Calmante" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          <FadeIn delay={0.2} className="flex items-center justify-center gap-4 mb-8">
            <span className="w-2 h-2 bg-zinc-900 rounded-full animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">Design System v4.0</span>
            <span className="w-12 h-[1px] bg-zinc-200"></span>
          </FadeIn>

          <h1 className="text-6xl md:text-[10rem] leading-none font-bold tracking-tighter mb-8 flex flex-col justify-center items-center gap-2">
            <TextReveal text="PURA" delay={0.3} />
            <TextReveal text="ESSÊNCIA." outline delay={0.5} />
          </h1>

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
                  <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800" alt="Sérum Luminosidade" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
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

      {/* Ingredientes Section */}
      <section id="sustentabilidade" className="py-32 border-b border-zinc-100 bg-zinc-50/50">
        <div className="max-w-[1600px] mx-auto px-6">
          <FadeIn className="flex items-center gap-4 mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">03 / INGREDIENTES</span>
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
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-4">04 / CONTATO</span>
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
              <div key={i} className="flex items-center">
                <span className="text-4xl md:text-6xl font-bold tracking-tighter mx-8 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">BELEZA NATURAL</span>
                <span className="text-4xl md:text-6xl font-bold tracking-tighter mx-8">CRUELTY-FREE</span>
                <span className="text-4xl md:text-6xl font-bold tracking-tighter mx-8 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">100% VEGANO</span>
                <span className="text-4xl md:text-6xl font-bold tracking-tighter mx-8">SUSTENTÁVEL</span>
                <span className="text-4xl md:text-6xl font-bold tracking-tighter mx-8 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">CIÊNCIA PURA</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-12">
              Ready to build the<br/><span className="text-stroke-outline text-black opacity-30">future?</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} className="flex justify-center gap-6">
            <button className="px-8 py-4 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-all hover:scale-105 shadow-lg">
              Start Project
            </button>
            <button className="px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full font-medium hover:border-zinc-900 transition-all hover:scale-105 shadow-sm">
              Documentation
            </button>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-32 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-zinc-100 pt-8 gap-6">
            <div className="text-center md:text-left">
              <span className="font-bold block text-lg">PURA<span className="font-light text-zinc-400">ESSÊNCIA</span></span>
              <span className="text-xs text-zinc-400">© 2026 All Rights Reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors text-sm font-medium">Instagram</a>
              <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors text-sm font-medium">Twitter</a>
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

