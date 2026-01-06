
import React, { useState, useEffect, useRef } from 'react';
import { 
  Scissors, 
  Calendar, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Menu, 
  X,
  Search,
  Navigation,
  Image as ImageIcon
} from 'lucide-react';

// --- Utilitários ---

/**
 * Função de scroll robusta para ambientes de produção (Vercel/GitHub Pages).
 * Evita o comportamento padrão da âncora que pode causar recarregamento de página.
 */
const scrollToId = (id: string) => {
  const element = document.getElementById(id.replace('#', ''));
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// --- Componentes Reutilizáveis ---

/**
 * Componente de imagem com fallback. 
 * Se a imagem falhar (CORS ou erro de rede), exibe um placeholder elegante.
 */
const SafeImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-zinc-900 ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <ImageIcon className="text-zinc-700 h-8 w-8" />
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-800 text-zinc-500">
          <ImageIcon className="h-10 w-10 mb-2 opacity-20" />
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Imagem Indisponível</span>
        </div>
      ) : (
        <img 
          src={src} 
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        />
      )}
    </div>
  );
};

// --- Tipagens ---
interface Service {
  id: number;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  popular?: boolean;
}

// --- Componentes da Página ---

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', id: 'inicio' },
    { name: 'Serviços', id: 'servicos' },
    { name: 'Localização', id: 'localizacao' },
    { name: 'Contato', id: 'contato' },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToId(id);
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-background-dark/95 backdrop-blur-xl py-3 border-white/10' 
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button 
          onClick={(e) => handleNavClick(e, 'inicio')}
          className="flex items-center gap-3 group bg-transparent border-none cursor-pointer p-0"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background-dark transition-all duration-300">
            <Scissors className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">Barbearia Gold</span>
        </button>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-sm font-semibold text-zinc-400 hover:text-primary transition-colors cursor-pointer bg-transparent border-none py-2"
            >
              {link.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => scrollToId('contato')}
            className="hidden sm:flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-extrabold text-[#1a1a1a] transition-all hover:bg-primary-dark hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 border-none cursor-pointer"
          >
            AGENDAR AGORA
          </button>
          
          <button 
            className="md:hidden text-white p-2 bg-zinc-800/50 rounded-lg border-none cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background-dark border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 shadow-2xl">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-left text-lg font-bold text-zinc-300 hover:text-primary bg-transparent border-none p-2"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => { scrollToId('contato'); setIsMenuOpen(false); }}
            className="h-14 w-full flex items-center justify-center rounded-xl bg-primary px-5 text-base font-black text-[#1a1a1a] border-none mt-4"
          >
            AGENDAR HORÁRIO
          </button>
        </div>
      )}
    </header>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative flex min-h-[700px] w-full items-center justify-center px-4 pt-32 pb-20 lg:min-h-screen">
      <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <SafeImage 
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000"
          alt="Barber Shop Interior"
          className="h-full w-full"
        />
      </div>
      
      <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="flex flex-col items-center gap-6">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-5 py-1.5 text-[10px] font-black text-primary uppercase tracking-[0.2em] backdrop-blur-md">
            Excelência em cada corte
          </span>
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tighter text-white md:text-7xl lg:text-8xl text-shadow">
            Estilo & Tradição Para o <span className="text-primary block sm:inline">Homem Moderno</span>
          </h1>
          <p className="max-w-xl text-lg text-zinc-300 md:text-xl font-medium leading-relaxed opacity-90">
            Onde a arte da barbearia clássica encontra a sofisticação contemporânea. Reserve seu momento e eleve seu visual.
          </p>
        </div>
        
        <div className="mt-12 flex flex-col w-full gap-4 sm:flex-row sm:justify-center">
          <button 
            onClick={() => scrollToId('contato')}
            className="h-14 w-full sm:w-64 flex items-center justify-center rounded-xl bg-primary text-base font-black text-background-dark shadow-2xl hover:bg-primary-dark transition-all transform hover:-translate-y-1 cursor-pointer border-none"
          >
            RESERVAR AGORA
          </button>
          <button 
            onClick={() => scrollToId('servicos')}
            className="h-14 w-full sm:w-64 flex items-center justify-center rounded-xl border-2 border-white/20 bg-white/5 text-base font-black text-white backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer"
          >
            VER SERVIÇOS
          </button>
        </div>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      name: 'Corte Premium',
      price: 'R$ 60',
      description: 'Corte personalizado, lavagem relaxante com produtos premium e finalização com pomada importada.',
      imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      name: 'Barba Real',
      price: 'R$ 50',
      description: 'Toalha quente, óleos essenciais, massagem facial e alinhamento preciso com navalha de alta performance.',
      imageUrl: 'https://images.unsplash.com/photo-1621605815841-28d9446e3a43?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      name: 'Combo Gold',
      price: 'R$ 95',
      description: 'A experiência completa: Cabelo + Barba + Bebida de cortesia. Nosso serviço mais requisitado.',
      imageUrl: 'https://images.unsplash.com/photo-1593702275677-f916c8c99f17?auto=format&fit=crop&q=80&w=800',
      popular: true
    }
  ];

  return (
    <section id="servicos" className="py-24 bg-background-dark px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <span className="text-primary font-black tracking-widest text-[11px] uppercase">Nossa Tabela</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-2 tracking-tighter">Serviços Exclusivos</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(238,189,43,0.4)]"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative flex flex-col rounded-3xl bg-zinc-900/40 border border-white/5 transition-all duration-500 hover:border-primary/40 hover:bg-zinc-900/60 overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <SafeImage 
                  src={service.imageUrl} 
                  alt={service.name}
                  className="h-full w-full"
                />
                {service.popular && (
                  <div className="absolute top-5 right-5 z-20 rounded-full bg-primary px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-background-dark shadow-xl">
                    MAIS PEDIDO
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="flex flex-col flex-1 p-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white tracking-tight">{service.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-primary">R$</span>
                    <span className="text-3xl font-black text-primary tracking-tighter">{service.price.replace('R$ ', '')}</span>
                  </div>
                </div>
                <p className="mb-10 text-zinc-400 text-sm leading-relaxed font-medium">
                  {service.description}
                </p>
                <button 
                  onClick={() => scrollToId('contato')}
                  className={`mt-auto flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-sm font-black transition-all cursor-pointer border-none ${
                    service.popular 
                      ? 'bg-primary text-background-dark hover:shadow-lg hover:shadow-primary/20' 
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  <Calendar size={18} />
                  AGENDAR ESTE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Location: React.FC = () => {
  const address = "Av. Paulista, 1000 - Bela Vista, São Paulo - SP";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section id="localizacao" className="py-24 bg-zinc-950 px-6 border-y border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div>
            <span className="text-primary font-black tracking-widest text-[11px] uppercase">Onde nos encontrar</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-8 tracking-tighter leading-none">Ambiente de Elite no Coração da Cidade</h2>
            <p className="text-zinc-400 mb-10 text-lg leading-relaxed font-medium">
              Ambiente totalmente climatizado, Wi-Fi de alta velocidade, bar com bebidas premium e atendimento personalizado. Estacionamento gratuito para clientes.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: MapPin, title: 'Endereço', content: 'Av. Paulista, 1000 - São Paulo, SP' },
                { icon: Clock, title: 'Funcionamento', content: 'Seg - Sex: 09h às 20h | Sáb: 09h às 18h' },
                { icon: Phone, title: 'Contato Direto', content: '(11) 99999-9999' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-white/5 text-primary group-hover:scale-110 transition-transform">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-0.5">{item.title}</h4>
                    <p className="text-white font-bold">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl bg-zinc-900">
            <SafeImage 
              src="https://images.unsplash.com/photo-1512690196236-4bae84f399d8?auto=format&fit=crop&q=80&w=1200"
              alt="Shop Interior"
              className="aspect-[4/5] grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse rounded-full"></div>
                <MapPin className="h-16 w-16 text-primary relative z-10 drop-shadow-[0_0_15px_rgba(238,189,43,0.8)]" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">Estação Paulista</h3>
              <p className="text-zinc-400 font-bold mb-8">O melhor ponto de São Paulo para seu cuidado pessoal.</p>
              
              <button 
                onClick={() => window.open(mapsUrl, '_blank')}
                className="flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-sm font-black text-black hover:bg-zinc-200 transition-all transform hover:scale-105 border-none cursor-pointer"
              >
                ABRIR NO GOOGLE MAPS
                <Navigation size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de envio
    setTimeout(() => {
      alert(`Obrigado, ${formState.name}! Sua mensagem foi enviada. Entraremos em contato em breve.`);
      setFormState({ name: '', email: '', msg: '' });
      setLoading(false);
    }, 1200);
  };

  return (
    <section id="contato" className="py-24 bg-background-dark px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">Faça sua Reserva</h2>
            <p className="text-zinc-400 text-lg mb-12 font-medium leading-relaxed">
              Mande uma mensagem agora para tirar dúvidas ou solicitar um horário especial. Atendemos com agendamento prévio para garantir sua exclusividade.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="h-14 w-14 flex items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 text-white hover:text-primary hover:border-primary/40 transition-all">
                <Instagram size={24} />
              </a>
              <a href="#" className="h-14 w-14 flex items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 text-white hover:text-primary hover:border-primary/40 transition-all">
                <Facebook size={24} />
              </a>
              <a href="#" className="h-14 w-14 flex items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 text-white hover:text-primary hover:border-primary/40 transition-all">
                <Phone size={24} />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-7 bg-zinc-900/50 p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-1">Seu Nome</label>
                  <input 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="h-14 rounded-2xl bg-zinc-950 border border-white/10 px-6 text-white placeholder-zinc-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-bold"
                    placeholder="Ex: João Silva"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-1">E-mail</label>
                  <input 
                    required
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="h-14 rounded-2xl bg-zinc-950 border border-white/10 px-6 text-white placeholder-zinc-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-bold"
                    placeholder="joao@email.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-1">Mensagem ou Preferência</label>
                <textarea 
                  required
                  rows={4}
                  value={formState.msg}
                  onChange={(e) => setFormState({...formState, msg: e.target.value})}
                  className="rounded-2xl bg-zinc-950 border border-white/10 p-6 text-white placeholder-zinc-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-bold resize-none"
                  placeholder="Diga-nos o que você precisa..."
                ></textarea>
              </div>
              <button 
                disabled={loading}
                type="submit"
                className="h-16 w-full rounded-2xl bg-primary text-base font-black text-background-dark hover:bg-primary-dark transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 border-none cursor-pointer mt-4"
              >
                {loading ? 'ENVIANDO...' : 'ENVIAR SOLICITAÇÃO'}
                {!loading && <Mail size={20} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 py-16 px-6 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center bg-primary rounded-2xl text-black">
              <Scissors size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter">Barbearia Gold</h3>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Desde 2015</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {['Início', 'Serviços', 'Localização', 'Contato'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToId(item.toLowerCase())}
                className="text-sm font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
              >
                {item}
              </button>
            ))}
          </div>
          
          <p className="text-zinc-600 text-sm font-medium">
            &copy; {new Date().getFullYear()} Barbearia Gold. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-background-dark selection:bg-primary selection:text-background-dark">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
