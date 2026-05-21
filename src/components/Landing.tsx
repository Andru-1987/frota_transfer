import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Map as MapIcon,
  Smartphone,
  ShieldCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';

const MOCK_PACKAGES = [
  { id: 1, name: 'Rio All-In', tag: 'MÁS VENDIDO', price: 320, description: 'Transfer GIG + 2 noches Ipanema + transfer regreso.', color: 'from-blue-600/20 to-gold/20' },
  { id: 2, name: 'Floripa Paradise', tag: 'ESCAPADA', price: 450, description: 'Transfer Aeropuerto + 3 noches en Resort + Paseo de Barco.', color: 'from-green-600/20 to-gold/20' },
  { id: 3, name: 'Nightlife Buzios', tag: 'GRUPOS', price: 180, description: 'Van exclusiva para el grupo. SDU -> Buzios + Conductor por la noche.', color: 'from-purple-600/20 to-gold/20' },
  { id: 4, name: 'Sao Paulo Business', tag: 'CORPORATIVO', price: 250, description: 'Traslados rápidos entre Congonhas y Centros Empresariales.', color: 'from-slate-600/20 to-gold/20' },
  { id: 5, name: 'Salvador Cultural', tag: 'HISTÓRICO', price: 210, description: 'Transfer Aeropuerto + Tour guiado por el Pelourinho.', color: 'from-orange-600/20 to-gold/20' },
  { id: 6, name: 'Natal Dunes', tag: 'AVENTURA', price: 380, description: 'Transfer + Buggy tour por las dunas de Genipabu.', color: 'from-yellow-600/20 to-gold/20' },
];

const Landing = ({ onStartBooking }: { onStartBooking: () => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center">
      <section className="w-full max-w-7xl px-6 py-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-[10px] font-bold tracking-[0.2em]"
        >
          <Zap size={12} fill="currentColor" />
          TRANSFER PRIVADO · BRASIL
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-serif font-light leading-[0.95] mb-8"
        >
          De cualquier punto <br />
          <span className="italic text-gold">a cualquier destino.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-cream/50 text-lg md:text-xl font-light mb-12 leading-relaxed"
        >
          Sin sorpresas. Reserva anticipada, seguimiento en tiempo real y conductores profesionales.
          Paga el 50% al reservar y el resto al llegar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <button
            onClick={onStartBooking}
            className="gold-gradient text-dark font-bold px-10 py-5 rounded-xl shadow-2xl shadow-gold/20 flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all"
          >
            RESERVAR TRANSFER <ArrowRight size={20} />
          </button>
          <button className="px-10 py-5 rounded-xl border border-white/10 hover:border-gold/40 transition-colors">
            VER PACKAGES
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-5xl">
          {[
            { icon: <ShieldCheck className="text-gold" />, title: 'Certeza Total', desc: 'Sabés quién viene y cuándo.' },
            { icon: <MapIcon className="text-gold" />, title: 'Real-time Tracking', desc: 'Seguí el viaje desde tu app.' },
            { icon: <CreditCard className="text-gold" />, title: 'Pago Fraccionado', desc: '50% reserva / 50% destino.' },
            { icon: <Smartphone className="text-gold" />, title: 'WhatsApp Centric', desc: 'Notificaciones cada paso.' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="p-8 rounded-3xl glass text-left"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-serif text-xl mb-2">{item.title}</h3>
              <p className="text-sm text-cream/40 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section className="w-full max-w-7xl px-6 py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-serif">Packages <span className="italic text-gold">Exclusivos</span></h2>
            <p className="text-cream/40 text-sm mt-2">Experiencias curadas para tu próximo destino.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {MOCK_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`min-w-[300px] md:min-w-[400px] snap-start p-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-br ${pkg.color} flex flex-col justify-between h-[450px] hover:border-gold/30 transition-all cursor-pointer group`}
            >
              <div>
                <span className="text-[10px] font-bold tracking-widest text-gold mb-4 block">{pkg.tag}</span>
                <h3 className="text-3xl font-serif mb-4 leading-tight">{pkg.name}</h3>
                <p className="text-cream/50 font-light leading-relaxed">{pkg.description}</p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs text-cream/30 block">DESDE</span>
                  <span className="text-4xl font-serif text-gold">USD {pkg.price}</span>
                </div>
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-dark transition-all">
                  <ArrowRight size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
