import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Leaf, Sparkles, Heart, Menu, X, Star,
  MessageCircle, PackageSearch, Truck, ShoppingBag
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

// ─── Dados do Catálogo ────────────────────────────────────────────────────────
type Brand = 'todos' | 'natura' | 'avon' | 'boticario' | 'marykay' | 'eudora';

interface Product {
  id: number;
  brand: Exclude<Brand, 'todos'>;
  brandLabel: string;
  category: string;
  name: string;
  description: string;
  image: string;
  whatsappMsg: string;
}

const PRODUCTS: Product[] = [
  // NATURA
  {
    id: 1,
    brand: 'natura',
    brandLabel: 'Natura',
    category: 'SKINCARE',
    name: 'Sérum Luminosidade',
    description: 'Vitamina C estabilizada com ácido hialurônico. Radiância visível em 7 dias.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Tenho interesse no Sérum Luminosidade da Natura. 😊',
  },
  {
    id: 2,
    brand: 'natura',
    brandLabel: 'Natura',
    category: 'TRATAMENTO',
    name: 'Óleo Facial Botânico',
    description: 'Blend de óleos naturais de rosa mosqueta e jojoba. Nutrição profunda.',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Gostaria de saber mais sobre o Óleo Facial Botânico da Natura. 😊',
  },
  {
    id: 3,
    brand: 'natura',
    brandLabel: 'Natura',
    category: 'HIDRATAÇÃO',
    name: 'Hidratante Barreira',
    description: 'Ceramidas vegetais para restaurar a barreira cutânea. Pele saudável.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Quero saber mais sobre o Hidratante Barreira da Natura. 😊',
  },
  {
    id: 4,
    brand: 'natura',
    brandLabel: 'Natura',
    category: 'RITUAL',
    name: 'Bruma Facial Calmante',
    description: 'Água termal e extrato de camomila. Frescor e equilíbrio instantâneo.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Tenho interesse na Bruma Facial Calmante da Natura. 😊',
  },
  // AVON
  {
    id: 5,
    brand: 'avon',
    brandLabel: 'Avon',
    category: 'SKINCARE',
    name: 'Protetor Solar FPS 50',
    description: 'Proteção diária com toque seco e acabamento matte. Ideal para uso sob maquiagem.',
    image: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Tenho interesse no Protetor Solar FPS 50 da Avon. 😊',
  },
  {
    id: 6,
    brand: 'avon',
    brandLabel: 'Avon',
    category: 'MAQUIAGEM',
    name: 'Base Líquida Cobertura Total',
    description: 'Fórmula leve com cobertura modulável. Dura até 24 horas sem retoques.',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Quero saber mais sobre a Base Líquida Cobertura Total da Avon. 😊',
  },
  {
    id: 7,
    brand: 'avon',
    brandLabel: 'Avon',
    category: 'PERFUMARIA',
    name: 'Deo Parfum Far Away',
    description: 'Fragrância floral oriental com notas de baunilha e âmbar. Longa duração.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Tenho interesse no Deo Parfum Far Away da Avon. 😊',
  },
  {
    id: 8,
    brand: 'avon',
    brandLabel: 'Avon',
    category: 'LABIAL',
    name: 'Batom Ultra Color',
    description: 'Pigmentação intensa com textura cremosa. Hidrata e define os lábios.',
    image: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2263?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Gostaria de saber mais sobre o Batom Ultra Color da Avon. 😊',
  },
  // O BOTICÁRIO
  {
    id: 9,
    brand: 'boticario',
    brandLabel: 'O Boticário',
    category: 'PERFUMARIA',
    name: 'Eau de Parfum Malbec',
    description: 'Fragrância amadeirada marcante com notas de baunilha, pimenta e cedro.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Tenho interesse no Malbec do Boticário. 😊',
  },
  {
    id: 10,
    brand: 'boticario',
    brandLabel: 'O Boticário',
    category: 'SKINCARE',
    name: 'Hidratante Nativa SPA',
    description: 'Manteiga de karité e óleo de argan. Hidratação intensa por até 72 horas.',
    image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Quero saber sobre o Hidratante Nativa SPA do Boticário. 😊',
  },
  {
    id: 11,
    brand: 'boticario',
    brandLabel: 'O Boticário',
    category: 'MAQUIAGEM',
    name: 'Make B. Paleta de Sombras',
    description: '12 tons pensados para o olhar brasileiro. Do nude ao smokey, tudo em uma paleta.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Tenho interesse na Paleta de Sombras Make B. do Boticário. 😊',
  },
  {
    id: 12,
    brand: 'boticario',
    brandLabel: 'O Boticário',
    category: 'CABELOS',
    name: 'Elsève Óleo Extraordinário',
    description: 'Tratamento leave-in com 6 óleos preciosos. Brilho e maciez imediatos.',
    image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Gostaria de saber sobre o Óleo para cabelos do Boticário. 😊',
  },
  // MARY KAY
  {
    id: 13,
    brand: 'marykay',
    brandLabel: 'Mary Kay',
    category: 'SKINCARE',
    name: 'TimeWise Repair Sérum',
    description: 'Tecnologia anti-idade com peptídeos e vitamina C. Redução de rugas em 4 semanas.',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Tenho interesse no TimeWise Repair Sérum da Mary Kay. 😊',
  },
  {
    id: 14,
    brand: 'marykay',
    brandLabel: 'Mary Kay',
    category: 'PROTEÇÃO',
    name: 'CC Cream FPS 15',
    description: 'Multifuncional que hidrata, protege e corrige o tom da pele. Acabamento natural.',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Quero saber mais sobre o CC Cream da Mary Kay. 😊',
  },
  {
    id: 15,
    brand: 'marykay',
    brandLabel: 'Mary Kay',
    category: 'MAQUIAGEM',
    name: 'Máscara Lash Love',
    description: 'Volumiza e alonga os cílios sem pesar. Fórmula resistente à umidade.',
    image: 'https://images.unsplash.com/photo-1631214524020-3c69b3eba2b3?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Tenho interesse na Máscara Lash Love da Mary Kay. 😊',
  },
  {
    id: 16,
    brand: 'marykay',
    brandLabel: 'Mary Kay',
    category: 'HIDRATAÇÃO',
    name: 'Creme Hidratante Botanical',
    description: 'Extrato de algodão e aloe vera. Textura leve que absorve rápido sem oleosidade.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Gostaria de saber mais sobre o Creme Hidratante Botanical da Mary Kay. 😊',
  },
  // EUDORA
  {
    id: 17,
    brand: 'eudora',
    brandLabel: 'Eudora',
    category: 'PERFUMARIA',
    name: 'Glamour Eau de Parfum',
    description: 'Fragrância floral com coração de peônia e gardênia. Feminino e sofisticado.',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Tenho interesse no Glamour Eau de Parfum da Eudora. 😊',
  },
  {
    id: 18,
    brand: 'eudora',
    brandLabel: 'Eudora',
    category: 'MAQUIAGEM',
    name: 'Pó Compacto Oil Control',
    description: 'Controla a oleosidade por até 8 horas. Acabamento matte e cobertura natural.',
    image: 'https://images.unsplash.com/photo-1543069190-4dd11d5e2b5c?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Quero saber mais sobre o Pó Compacto Oil Control da Eudora. 😊',
  },
  {
    id: 19,
    brand: 'eudora',
    brandLabel: 'Eudora',
    category: 'SKINCARE',
    name: 'Sérum Anti-Idade Retinol',
    description: 'Retinol vegetal + vitamina C. Anti-rugas de alta performance sem irritação.',
    image: 'https://images.unsplash.com/photo-1629380137432-bd24afef96f0?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Tenho interesse no Sérum Anti-Idade Retinol da Eudora. 😊',
  },
  {
    id: 20,
    brand: 'eudora',
    brandLabel: 'Eudora',
    category: 'LABIAL',
    name: 'Gloss Labial Hidratante',
    description: 'Brilho volumizador com ação hidratante. Deixa os lábios macios e definidos.',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=800',
    whatsappMsg: 'Olá Márcia! Gostaria de saber mais sobre o Gloss Labial da Eudora. 😊',
  },
];

const BRAND_FILTERS: { id: Brand; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'natura', label: 'Natura' },
  { id: 'avon', label: 'Avon' },
  { id: 'boticario', label: 'O Boticário' },
  { id: 'marykay', label: 'Mary Kay' },
  { id: 'eudora', label: 'Eudora' },
];

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const WHATSAPP_NUMBER = "553496508057";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [activeBrand, setActiveBrand] = useState<Brand>('todos');

  const filteredProducts =
    activeBrand === 'todos'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.brand === activeBrand);

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
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-4">
                  01 / COMO FUNCIONA
                </span>
              </FadeIn>
            </div>
            <div className="col-span-1 md:col-span-9">
              <FadeIn delay={0.1}>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
                  Simples assim.
                </h2>
                <p className="text-xl text-zinc-500 leading-relaxed max-w-2xl">
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
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-4 tracking-tight">
            Marcas que Represento
          </h2>
          <p className="text-zinc-900 text-center mb-12 max-w-xl mx-auto">
            Produtos originais com atendimento personalizado. Clique na marca para ver o catálogo completo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Natura */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img src="https://github.com/leonvpetri/Imagens/raw/main/assets/Natura-2.png" alt="Natura" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                <span className="text-white text-xl font-bold tracking-tight">Natura</span>
                <p className="text-zinc-300 text-sm">Skincare · Perfumaria · Corpo & Banho</p>
                <div className="flex gap-2">
                  <a href="LINK_LOJA_NATURA" target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-white text-zinc-900 font-semibold py-2 rounded-xl hover:bg-zinc-100 transition-colors">Ver Catálogo</a>
                  <a href="https://wa.me/553496508057?text=Olá! Tenho interesse em produtos Natura." target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600 transition-colors">WhatsApp</a>
                </div>
              </div>
            </div>

            {/* Avon */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img src="https://github.com/leonvpetri/Imagens/raw/main/assets/avon-2.png" alt="Avon" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                <span className="text-white text-xl font-bold tracking-tight">Avon</span>
                <p className="text-zinc-300 text-sm">Maquiagem · Perfumaria · Cuidados</p>
                <div className="flex gap-2">
                  <a href="LINK_LOJA_AVON" target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-white text-zinc-900 font-semibold py-2 rounded-xl hover:bg-zinc-100 transition-colors">Ver Catálogo</a>
                  <a href="https://wa.me/5534965080570?text=Olá! Tenho interesse em produtos Avon." target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600 transition-colors">WhatsApp</a>
                </div>
              </div>
            </div>

            {/* O Boticário */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img src="https://github.com/leonvpetri/Imagens/raw/main/assets/boticario-4.png" alt="O Boticário" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                <span className="text-white text-xl font-bold tracking-tight">O Boticário</span>
                <p className="text-zinc-300 text-sm">Perfumaria · Maquiagem · Skincare</p>
                <div className="flex gap-2">
                  <a href="LINK_LOJA_BOTICARIO" target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-white text-zinc-900 font-semibold py-2 rounded-xl hover:bg-zinc-100 transition-colors">Ver Catálogo</a>
                  <a href="https://wa.me/553496508057?text=Olá! Tenho interesse em produtos O Boticário." target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600 transition-colors">WhatsApp</a>
                </div>
              </div>
            </div>

            {/* Mary Kay */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img src="https://github.com/leonvpetri/Imagens/raw/main/assets/marykay-4.png" alt="Mary Kay" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                <span className="text-white text-xl font-bold tracking-tight">Mary Kay</span>
                <p className="text-zinc-300 text-sm">Skincare · Maquiagem · Fragrâncias</p>
                <div className="flex gap-2">
                  <a href="LINK_LOJA_MARYKAY" target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-white text-zinc-900 font-semibold py-2 rounded-xl hover:bg-zinc-100 transition-colors">Ver Catálogo</a>
                  <a href="https://wa.me/553496508057?text=Olá! Tenho interesse em produtos Mary Kay." target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600 transition-colors">WhatsApp</a>
                </div>
              </div>
            </div>

            {/* Eudora */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img src="https://github.com/leonvpetri/Imagens/raw/main/assets/eudora-4.png" alt="Eudora" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                <span className="text-white text-xl font-bold tracking-tight">Eudora</span>
                <p className="text-zinc-300 text-sm">Perfumaria · Maquiagem · Cuidados</p>
                <div className="flex gap-2">
                  <a href="LINK_LOJA_EUDORA" target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-white text-zinc-900 font-semibold py-2 rounded-xl hover:bg-zinc-100 transition-colors">Ver Catálogo</a>
                  <a href="https://wa.me/553496508057?text=Olá! Tenho interesse em produtos Eudora." target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600 transition-colors">WhatsApp</a>
                </div>
              </div>
            </div>

            {/* Eudora (Clone) */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img src="https://github.com/leonvpetri/Imagens/raw/main/assets/eudora-4.png" alt="Eudora" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                <span className="text-white text-xl font-bold tracking-tight">Eudora</span>
                <p className="text-zinc-300 text-sm">Perfumaria · Maquiagem · Cuidados</p>
                <div className="flex gap-2">
                  <a href="LINK_LOJA_EUDORA" target="_blank" rel="noopener" className="flex-1 text-center text-sm bg-white text-zinc-900 font-semibold py-2 rounded-xl hover:bg-zinc-100 transition-colors">Ver Catálogo</a>
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
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-4">03 / FILOSOFIA</span>
            </FadeIn>
          </div>
          <div className="col-span-1 md:col-span-9">
            <FadeIn delay={0.1}>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                Beleza que respeita<br />a natureza.
              </h2>
              <p className="text-xl text-zinc-500 leading-relaxed max-w-3xl mb-16">
                Cada fórmula é uma convergência entre ciência avançada e os ingredientes mais puros da biodiversidade brasileira. Sem concessões, sem excessos —{' '}
                <span className="text-zinc-900 font-medium">apenas o essencial.</span>
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
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-4">04 / SOBRE</span>
            </FadeIn>
          </div>
          <div className="col-span-1 md:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-9 gap-12">
              <FadeIn delay={0.1} className="col-span-1 md:col-span-4">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <img
                    src="https://github.com/leonvpetri/Imagens/raw/main/assets/Marcia-Quem-Sou.jpg"
                    alt="Márcia Ferreira"
                    className="w-full rounded-2xl object-cover border border-zinc-100"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </FadeIn>
              <div className="col-span-1 md:col-span-5">
                <FadeIn delay={0.2}>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Olá, eu sou a Márcia.</h2>
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
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="col-span-1 md:col-span-3">
            <FadeIn>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-4">05 / DEPOIMENTOS</span>
            </FadeIn>
          </div>
          <div className="col-span-1 md:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'Ana Paula M.', product: 'Sérum Natura', text: 'A Márcia me indicou o sérum perfeito para minha pele sensível. Resultado incrível em 2 semanas!' },
                { name: 'Carla Souza', product: 'Kit Avon', text: 'Atendimento super atencioso, ela entendeu exatamente o que eu precisava. Super recomendo!' },
                { name: 'Fernanda Lima', product: 'Hidratante Boticário', text: 'Compro sempre com a Márcia. Ela sempre tem as melhores dicas e promoções exclusivas.' },
                { name: 'Juliana Torres', product: 'Mary Kay Skincare', text: 'Fiz uma consultoria completa e aprendi muito sobre minha rotina de skincare. Vale muito!' },
              ].map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <FlashlightCard className="rounded-2xl p-8 h-full flex flex-col">
                    <div className="text-6xl text-zinc-100 font-serif leading-none mb-4">&ldquo;</div>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-6 flex-grow">{t.text}</p>
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className="fill-zinc-900 text-zinc-900" />
                      ))}
                    </div>
                    <div className="border-t border-zinc-100 pt-4">
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">{t.product}</div>
                    </div>
                  </FlashlightCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ingredientes ── */}
      <section id="ingredientes" className="py-32 border-b border-zinc-100 bg-zinc-50/50">
        <div className="max-w-[1600px] mx-auto px-6">
          <FadeIn className="flex items-center gap-4 mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">06 / INGREDIENTES ATIVOS</span>
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

      {/* ── Contato ── */}
      <section id="contato" className="py-32 border-b border-zinc-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="col-span-1 md:col-span-3">
            <FadeIn>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-4">07 / CONTATO</span>
            </FadeIn>
          </div>
          <div className="col-span-1 md:col-span-9 max-w-2xl">
            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Receba novidades exclusivas</h2>
              <p className="text-lg text-zinc-500 mb-12">
                Seja a primeira a saber sobre lançamentos, promoções e dicas de beleza personalizadas.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} className="space-y-4">
              <input type="text" placeholder="Seu nome" className="w-full px-6 py-4 rounded-full border border-zinc-200 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors" />
              <input type="email" placeholder="Seu melhor e-mail" className="w-full px-6 py-4 rounded-full border border-zinc-200 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors" />
              <button className="w-full px-6 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full font-bold text-xs uppercase tracking-widest hover:border-zinc-900 transition-colors flex items-center justify-center gap-2">
                QUERO ME CADASTRAR <ArrowRight size={16} />
              </button>
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 text-center mt-6">
                Ao se cadastrar, você concorda com nossa política de privacidade.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="py-10 md:py-20 bg-zinc-900 text-white relative overflow-hidden">
        <div className="relative z-10 flex overflow-hidden">
          <div className="flex w-max animate-marquee items-center opacity-80">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-x-12 md:gap-x-48 px-8 md:px-24">
                <div className="flex items-center gap-x-6 md:gap-x-12">
                  <span className="text-2xl md:text-6xl font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] whitespace-nowrap">NATURA</span>
                  <img src="https://github.com/leonvpetri/Imagens/raw/main/assets/Natura_Preto.png" alt="Natura" className="h-6 md:h-12 invert object-contain flex-shrink-0" referrerPolicy="no-referrer" />
                </div>
                <div className="flex items-center gap-x-6 md:gap-x-12">
                  <span className="text-2xl md:text-6xl font-bold tracking-tighter whitespace-nowrap">AVON</span>
                  <img src="https://github.com/leonvpetri/Imagens/raw/main/assets/Avon_Preto.jfif" alt="Avon" className="h-6 md:h-12 invert object-contain flex-shrink-0" referrerPolicy="no-referrer" />
                </div>
                <span className="text-2xl md:text-6xl font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] whitespace-nowrap">MARY KAY</span>
                <span className="text-2xl md:text-6xl font-bold tracking-tighter whitespace-nowrap">BOTICÁRIO</span>
                <div className="flex items-center gap-x-6 md:gap-x-12">
                  <span className="text-2xl md:text-6xl font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] whitespace-nowrap">EUDORA</span>
                  <img src="https://github.com/leonvpetri/Imagens/raw/main/assets/Eudora%20Preto.jfif" alt="Eudora" className="h-6 md:h-12 invert object-contain flex-shrink-0" referrerPolicy="no-referrer" />
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
            <a href={whatsappHref('Olá Márcia! Gostaria de uma consultoria. 😊')} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-all hover:scale-105 shadow-lg">
              Falar no WhatsApp
            </a>
            <a href="#catalogo" className="px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full font-medium hover:border-zinc-900 transition-all hover:scale-105 shadow-sm">
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