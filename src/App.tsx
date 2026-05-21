/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/common';
import { Role } from './types';

const Landing = lazy(() => import('./components/Landing'));
const BookingFlow = lazy(() => import('./components/BookingFlow'));
const ActiveTripView = lazy(() => import('./components/ActiveTripView'));
const DriverDashboard = lazy(() => import('./components/DriverDashboard'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

// --- App Shell ---

export default function App() {
  const [role, setRole] = useState<Role>('client');
  const [isBooking, setIsBooking] = useState(false);
  const [showActiveTrip, setShowActiveTrip] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-primary/20 selection:text-primary">
      <Navbar role={role} setRole={(r) => { 
        setRole(r); 
        setIsBooking(false); 
        setShowActiveTrip(false); 
      }} />
      
      <main>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center font-bold text-primary">Cargando...</div>}>
          {role === 'client' && (
            <>
              {!isBooking && !showActiveTrip && <Landing onStartBooking={() => setIsBooking(true)} />}
              {isBooking && <BookingFlow />}
              {showActiveTrip && <ActiveTripView />}
              
              {/* Quick Dock for Mock purposes */}
              <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-slate-200 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl shadow-indigo-900/10 z-50">
                <button 
                  onClick={() => { setIsBooking(false); setShowActiveTrip(false); }}
                  className={`flex flex-col items-center gap-1 group transition-all ${!isBooking && !showActiveTrip ? 'text-primary scale-110' : 'text-slate-300'}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full bg-current mb-1 transition-opacity ${!isBooking && !showActiveTrip ? 'opacity-100' : 'opacity-0'}`} />
                  <span className="text-[10px] font-bold tracking-widest uppercase">INICIO</span>
                </button>
                <div className="w-[1px] h-4 bg-slate-100" />
                <button 
                  onClick={() => { setIsBooking(false); setShowActiveTrip(true); }}
                  className={`flex flex-col items-center gap-1 group transition-all ${showActiveTrip ? 'text-primary scale-110' : 'text-slate-300'}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full bg-current mb-1 transition-opacity ${showActiveTrip ? 'opacity-100' : 'opacity-0'}`} />
                  <span className="text-[10px] font-bold tracking-widest uppercase">MI VIAJE</span>
                </button>
              </div>
            </>
          )}

          {role === 'driver' && <DriverDashboard />}
          {role === 'admin' && <AdminDashboard />}
        </Suspense>
      </main>

      <footer className="pt-24 pb-12 px-6 bg-slate-900 text-slate-400 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-white font-sans text-2xl font-black tracking-tight">Frota</span>
          <span className="text-slate-500 font-sans text-2xl tracking-tight font-light">Transfer</span>
        </div>
        <div className="flex gap-8 mb-8 text-[10px] font-bold tracking-widest uppercase">
          <span className="hover:text-white cursor-pointer transition-colors">Términos</span>
          <span className="hover:text-white cursor-pointer transition-colors">Privacidad</span>
          <span className="hover:text-white cursor-pointer transition-colors">Soporte</span>
        </div>
        <p className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-50">BY ANDRU SERVICES · RIO DE JANEIRO 2026</p>
      </footer>
    </div>
  );
}


// --- Mock Data ---
const VEHICLE_CATEGORIES: VehicleCategory[] = [
  { id: 'sedan', name: 'Sedan Ejecutivo', pax: 4, bags: 4, price: 65, icon: <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-lg text-primary font-bold">S</div>, description: 'Confort y discreción. Ideal para negocios.' },
  { id: 'suv', name: 'SUV Premium', pax: 5, bags: 4, price: 95, icon: <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-lg text-primary font-bold">X</div>, description: 'Espacio extra y visibilidad. Perfecto para la familia.' },
  { id: 'van', name: 'Van Grupal', pax: 8, bags: 8, price: 140, icon: <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-lg text-primary font-bold">V</div>, description: 'Espacio máximo. Ideal para grupos jóvenes o familias grandes.' },
  { id: 'hybrid', name: 'Eco Hybrid', pax: 4, bags: 4, price: 75, icon: <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-lg text-primary font-bold">H</div>, description: 'Viaje sustentable con la última tecnología.' },
];

const MOCK_ACTIVE_BOOKING = {
  id: 'FT-2094',
  from: 'Aeropuerto Galeão (GIG)',
  to: 'Hotel Fasano Ipanema',
  date: '10 Mayo, 2026',
  time: '14:30',
  status: 'en_route' as BookingStatus,
  driver: {
    name: 'Cristiano Barreto',
    phone: '+55 21 98877-6655',
    vehicle: 'Toyota Corolla 2024 · Gris',
    plate: 'ABC-1234',
    rating: 4.9,
    trips: 142
  },
  price: 130,
  deposit: 65
};



const BookingFlow = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    pax: 2,
    bags: 2,
    vehicle: VEHICLE_CATEGORIES[0],
    return: false
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center bg-slate-50">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-12 relative px-4">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-200 -z-10" />
          {[1, 2, 3].map(s => (
            <div 
              key={s} 
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                step >= s ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white border border-slate-200 text-slate-300'
              }`}
            >
              {step > s ? <CheckCircle2 size={24} /> : <span className="font-bold">{s}</span>}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100"
            >
              <h2 className="text-3xl font-sans font-black mb-8 text-slate-900">Planificá tu <span className="text-primary">Transfer</span></h2>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-2 uppercase">ORIGEN (Aeropuerto, Hotel, Puerto, etc.)</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:border-primary/40 focus:bg-white outline-none transition-colors text-slate-900" 
                      placeholder="Ej: Aeropuerto Galeão (GIG)"
                      value={data.from}
                      onChange={e => setData({...data, from: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-2 uppercase">DESTINO (Cualquier punto B)</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:border-primary/40 focus:bg-white outline-none transition-colors text-slate-900" 
                      placeholder="Ej: Hotel Copacabana Palace"
                      value={data.to}
                      onChange={e => setData({...data, to: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-2 uppercase">FECHA</label>
                    <input 
                      type="date"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 focus:border-primary/40 focus:bg-white outline-none transition-colors text-slate-900" 
                      value={data.date}
                      onChange={e => setData({...data, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-2 uppercase">HORA</label>
                    <input 
                      type="time"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 focus:border-primary/40 focus:bg-white outline-none transition-colors text-slate-900" 
                      value={data.time}
                      onChange={e => setData({...data, time: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-2 uppercase">PASAJEROS</label>
                    <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-2">
                       <button onClick={() => setData({...data, pax: Math.max(1, data.pax - 1)})} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-slate-100 rounded-lg">-</button>
                       <span className="flex-1 text-center font-bold text-slate-900">{data.pax}</span>
                       <button onClick={() => setData({...data, pax: Math.min(10, data.pax + 1)})} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-slate-100 rounded-lg">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-2 uppercase">EQUIPAJE</label>
                    <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-2">
                       <button onClick={() => setData({...data, bags: Math.max(0, data.bags - 1)})} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-slate-100 rounded-lg">-</button>
                       <span className="flex-1 text-center font-bold text-slate-900">{data.bags}</span>
                       <button onClick={() => setData({...data, bags: Math.min(10, data.bags + 1)})} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-slate-100 rounded-lg">+</button>
                    </div>
                  </div>
                </div>
                <button 
                  disabled={!data.from || !data.to || !data.date || !data.time}
                  onClick={nextStep}
                  className="w-full brand-gradient text-white font-bold py-5 rounded-xl mt-4 disabled:opacity-30 disabled:grayscale transition-all shadow-lg shadow-primary/20"
                >
                  SIGUIENTE: ELEGIR VEHÍCULO
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100"
            >
              <button onClick={prevStep} className="text-primary text-xs font-bold tracking-widest mb-6 uppercase">VOLVER</button>
              <h2 className="text-3xl font-sans font-black mb-8 text-slate-900">Elegí tu <span className="text-primary">Categoría</span></h2>
              <div className="space-y-4 mb-8">
                {VEHICLE_CATEGORIES.map((v) => (
                  <div 
                    key={v.id} 
                    onClick={() => setData({...data, vehicle: v})}
                    className={`p-6 rounded-2xl border cursor-pointer transition-all flex items-center gap-6 ${
                      data.vehicle.id === v.id ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-primary/30'
                    }`}
                  >
                    {v.icon}
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900">{v.name}</h4>
                      <p className="text-xs text-slate-400 mb-2">{v.description}</p>
                      <div className="flex gap-4 text-[10px] font-bold text-slate-500 uppercase">
                        <span className="flex items-center gap-1"><Users size={12} /> MAX {v.pax}</span>
                        <span className="flex items-center gap-1"><Briefcase size={12} /> MAX {v.bags}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-black text-slate-900">USD {v.price}</span>
                      <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">IDA</span>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={nextStep}
                className="w-full brand-gradient text-white font-bold py-5 rounded-xl shadow-lg shadow-primary/20"
              >
                SIGUIENTE: PAGO Y CONFIRMACIÓN
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100"
            >
              <button onClick={prevStep} className="text-primary text-xs font-bold tracking-widest mb-6 uppercase">VOLVER</button>
              <h2 className="text-3xl font-sans font-black mb-8 text-slate-900">Revisá tu <span className="text-primary">Reserva</span></h2>
              
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 mb-8 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-primary font-bold tracking-widest block mb-1 uppercase">VIAJE</span>
                    <p className="text-sm font-medium text-slate-900">{data.from} → {data.to}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-primary font-bold tracking-widest block mb-1 uppercase">FECHA</span>
                    <p className="text-sm text-slate-600">{data.date} · {data.time}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-primary font-bold tracking-widest block mb-1 uppercase">VEHÍCULO</span>
                    <p className="text-sm font-bold text-slate-900">{data.vehicle.name}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-medium text-sm">
                  <span>Precio Total</span>
                  <span className="text-slate-900">USD {data.vehicle.price}</span>
                </div>
                <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 flex justify-between items-center shadow-sm shadow-primary/5">
                  <div>
                    <span className="text-xs font-bold text-primary block uppercase">PAGÁS AHORA (50%)</span>
                    <p className="text-2xl font-black text-slate-900">USD {data.vehicle.price / 2}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400 block uppercase">SALDO EN DESTINO</span>
                    <p className="text-xl font-bold text-slate-500">USD {data.vehicle.price / 2}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => window.location.reload()}
                className="w-full brand-gradient text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
              >
                <Smartphone size={20} /> CONFIRMAR Y PAGAR POR WHATSAPP
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-6 leading-relaxed uppercase tracking-wider">
                Al confirmar, serás redirigido a WhatsApp para completar el pago mediante un link de MercadoPago.
                Cancelación gratuita hasta 7 días antes.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ActiveTripView = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-50">
      <div className="md:col-span-2 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-sans font-black tracking-tight text-slate-900">Tu <span className="text-primary">Viaje Activo</span></h2>
          <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.2em] animate-pulse uppercase">EN CAMINO</span>
        </div>

        {/* Map Simulation */}
        <div className="w-full aspect-[16/10] bg-slate-200 rounded-[2rem] border border-slate-100 relative overflow-hidden shadow-inner">
          {/* Mock Road Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-300 transform -rotate-12" />
          <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-slate-300 transform rotate-6" />
          
          {/* Destination Marker */}
          <div className="absolute top-1/4 right-1/4 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold shadow-xl">B</div>
            <span className="text-[10px] font-bold bg-white px-2 py-1 rounded mt-2 border border-slate-200 shadow-sm text-slate-900">HOTEL IPANEMA</span>
          </div>

          {/* Car Marker (Animated) */}
          <motion.div 
            animate={{ x: [0, 100, 200, 300], y: [0, -20, 10, -10] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/4 flex flex-col items-center"
          >
             <div className="p-3 bg-primary rounded-xl border-4 border-white shadow-2xl relative">
               <TrendingUp size={24} className="text-white" />
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full border-2 border-white" />
             </div>
             <span className="text-[10px] font-bold bg-primary text-white px-2 py-1 rounded mt-2 uppercase tracking-widest shadow-md">CONDUCTOR</span>
          </motion.div>

          {/* Map Info Overlay */}
          <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <Clock className="text-primary" size={24} />
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">ETA</span>
                <span className="text-xl font-black text-slate-900 uppercase">12 MINUTOS</span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-4">
              <MapPin className="text-primary" size={24} />
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">SIGUIENTE</span>
                <span className="text-xl font-bold text-slate-900">AV. ATLANTICA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
          <SectionTitle>CONDUCTOR ASIGNADO</SectionTitle>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center overflow-hidden shadow-inner">
               <User size={32} className="text-primary" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">{MOCK_ACTIVE_BOOKING.driver.name}</h4>
              <div className="flex items-center gap-2 text-xs text-primary font-bold">
                 <Star size={12} fill="currentColor" /> {MOCK_ACTIVE_BOOKING.driver.rating} · {MOCK_ACTIVE_BOOKING.driver.trips} viajes
              </div>
            </div>
          </div>
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 mb-8">
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1 tracking-widest">VEHÍCULO</span>
            <p className="text-sm font-semibold text-slate-900">{MOCK_ACTIVE_BOOKING.driver.vehicle}</p>
            <span className="px-2 py-0.5 bg-white border border-slate-200 rounded mt-2 inline-block text-[10px] font-mono text-slate-500 font-bold">PLACA: {MOCK_ACTIVE_BOOKING.driver.plate}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="py-4 rounded-xl border border-slate-200 text-slate-600 font-bold flex flex-col items-center gap-2 hover:bg-slate-50 transition-all text-xs tracking-wider">
              <Phone size={18} className="text-primary" />
              <span>LLAMAR</span>
            </button>
            <button className="py-4 rounded-xl brand-gradient text-white font-bold flex flex-col items-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 transition-all text-xs tracking-wider">
              <MessageSquare size={18} />
              <span>WHATSAPP</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
          <SectionTitle>DETALLES DEL PAGO</SectionTitle>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 font-medium">Total del viaje</span>
              <span className="font-bold text-slate-900">USD 130</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 font-medium">Depósito pagado</span>
              <span className="text-green-600 font-black">USD 65</span>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-bold text-primary tracking-widest">SALDO PENDIENTE</span>
              <span className="text-2xl font-black text-slate-900">USD 65</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DriverDashboard = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto bg-slate-50">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-sans font-black tracking-tight text-slate-900">Panel de <span className="text-primary">Conductor</span></h2>
          <p className="text-slate-400 font-medium mt-2">Bienvenido de nuevo, Cristiano.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-bold tracking-widest text-slate-500">ESTADO: EN LÍNEA</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'GANANCIAS HOY', val: 'USD 145', icon: <TrendingUp size={18} className="text-primary" />, sub: '+12% vs ayer' },
          { label: 'CALIFICACIÓN', val: '4.95', icon: <Star size={18} className="text-primary" />, sub: 'Top 5% flota' },
          { label: 'VIAJES HOY', val: '4', icon: <MapIcon size={18} className="text-primary" />, sub: '2 completados' },
          { label: 'TIEMPO ACTIVO', val: '6h 12m', icon: <Clock size={18} className="text-primary" />, sub: 'SLA 98%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="text-3xl font-sans font-black text-slate-900 mb-2">{stat.val}</div>
            <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{stat.sub}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <SectionTitle>VIAJES DISPONIBLES</SectionTitle>
          <div className="space-y-4">
            {[
              { id: 'FT-2095', from: 'GIG Airport', to: 'Barra da Tijuca', price: 95, time: '16:00', pax: 2 },
              { id: 'FT-2096', from: 'Hotel Sheraton', to: 'Santos Dumont', price: 60, time: '18:15', pax: 1 },
            ].map((trip) => (
              <div key={trip.id} className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer shadow-sm">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 border border-primary/40 text-primary rounded">{trip.id}</span>
                    <span className="text-xs text-slate-400 font-medium">{trip.time}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{trip.from} → {trip.to}</h4>
                  <p className="text-xs text-slate-400 font-medium">{trip.pax} Pasajeros</p>
                </div>
                <div className="text-right flex flex-col items-end gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-widest">TUS GANANCIAS</span>
                    <span className="text-xl font-sans font-black text-slate-900">USD {trip.price * 0.8}</span>
                  </div>
                  <button className="px-6 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20">ACEPTAR</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <SectionTitle>HISTORIAL RECIENTE</SectionTitle>
          <div className="bg-white border border-slate-100 p-8 rounded-[2rem] space-y-6 shadow-sm">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <CheckCircle2 size={20} className="text-green-500" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Viaje Completado</h5>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">GIG → Ipanema · 10 Mayo</span>
                  </div>
                </div>
                <span className="text-sm font-sans font-black text-slate-900">+ USD 48.00</span>
              </div>
            ))}
            <button className="w-full py-4 border border-slate-200 rounded-xl text-[10px] font-bold tracking-widest text-slate-400 hover:text-primary transition-colors uppercase">VER TODO EL HISTORIAL</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto bg-slate-50">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-sans font-black tracking-tight text-slate-900">Dashboard <span className="text-primary">Operativo</span></h2>
        <div className="flex gap-4">
           <button className="bg-white border border-slate-200 px-6 py-3 rounded-2xl flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all">
             <Settings size={18} className="text-primary" />
             <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">CONFIGURACIÓN</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'VIAJES HOY', val: '42', icon: <TrendingUp size={18} className="text-blue-500" /> },
          { label: 'REVENUE PROY.', val: 'USD 4.8k', icon: <TrendingUp size={18} className="text-green-500" /> },
          { label: 'CANCELACIONES', val: '2', icon: <AlertCircle size={18} className="text-red-500" /> },
          { label: 'CONDUCTORES', val: '14/20', icon: <Users size={18} className="text-primary" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm border-l-4 border-l-primary">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="text-3xl font-sans font-black text-slate-900">{stat.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <SectionTitle>MONITOREO DE RESERVAS</SectionTitle>
          <div className="bg-white border border-slate-100 overflow-hidden rounded-[2rem] shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-bold tracking-widest text-slate-400 border-b border-slate-100 uppercase">
                <tr>
                  <th className="px-8 py-6">ID</th>
                  <th className="px-8 py-6">CLIENTE</th>
                  <th className="px-8 py-6">RUTA</th>
                  <th className="px-8 py-6">ESTADO</th>
                  <th className="px-8 py-6">CONDUCTOR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { id: 'FT-2094', client: 'María G.', route: 'GIG → Ipanema', status: 'en_route', driver: 'Cristiano B.' },
                  { id: 'FT-2095', client: 'Ana P.', route: 'SDU → Búzios', status: 'pending', driver: '-' },
                  { id: 'FT-2096', client: 'Carlos M.', route: 'Resort → FLN', status: 'confirmed', driver: 'Giovane R.' },
                ].map((r) => (
                  <tr key={r.id} className="text-sm hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6 font-mono text-primary font-bold">{r.id}</td>
                    <td className="px-8 py-6 font-bold text-slate-900">{r.client}</td>
                    <td className="px-8 py-6 text-slate-500 font-medium">{r.route}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        r.status === 'en_route' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' : 
                        r.status === 'pending' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' :
                        'bg-green-500/10 text-green-600 border border-green-500/20'
                      }`}>
                        {r.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-600 font-medium">{r.driver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <SectionTitle>CONFIGURACIÓN DE REGLAS</SectionTitle>
          <div className="bg-white border border-slate-100 p-8 rounded-[2rem] space-y-6 shadow-sm">
            <div>
              <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-4 uppercase">POLÍTICA DE ESPERA</label>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Cortesía (min)</span>
                  <span className="font-bold text-primary">15</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Tarifa espera (USD/h)</span>
                  <span className="font-bold text-primary">15</span>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100">
              <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-4 uppercase">TIPO DE CAMBIO (USD)</label>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">BRL Real</span>
                  <span className="font-bold text-primary">5.24</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">ARS Peso</span>
                  <span className="font-bold text-primary">885</span>
                </div>
              </div>
            </div>
            <button className="w-full brand-gradient text-white font-bold py-4 rounded-xl text-xs mt-4 shadow-lg shadow-primary/20 hover:brightness-110 transition-all uppercase tracking-widest">ACTUALIZAR REGLAS</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-1.5 h-4 bg-primary rounded-full shadow-sm" />
    <h3 className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">{children}</h3>
  </div>
);

// --- App Shell ---

export default function App() {
  const [role, setRole] = useState<Role>('client');
  const [isBooking, setIsBooking] = useState(false);
  const [showActiveTrip, setShowActiveTrip] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-primary/20 selection:text-primary">
      <Navbar role={role} setRole={(r) => { 
        setRole(r); 
        setIsBooking(false); 
        setShowActiveTrip(false); 
      }} />
      
      <main>
        {role === 'client' && (
          <>
            {!isBooking && !showActiveTrip && <Landing onStartBooking={() => setIsBooking(true)} />}
            {isBooking && <BookingFlow />}
            {showActiveTrip && <ActiveTripView />}
            
            {/* Quick Dock for Mock purposes */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-slate-200 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl shadow-indigo-900/10 z-50">
              <button 
                onClick={() => { setIsBooking(false); setShowActiveTrip(false); }}
                className={`flex flex-col items-center gap-1 group transition-all ${!isBooking && !showActiveTrip ? 'text-primary scale-110' : 'text-slate-300'}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full bg-current mb-1 transition-opacity ${!isBooking && !showActiveTrip ? 'opacity-100' : 'opacity-0'}`} />
                <span className="text-[10px] font-bold tracking-widest uppercase">INICIO</span>
              </button>
              <div className="w-[1px] h-4 bg-slate-100" />
              <button 
                onClick={() => { setIsBooking(false); setShowActiveTrip(true); }}
                className={`flex flex-col items-center gap-1 group transition-all ${showActiveTrip ? 'text-primary scale-110' : 'text-slate-300'}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full bg-current mb-1 transition-opacity ${showActiveTrip ? 'opacity-100' : 'opacity-0'}`} />
                <span className="text-[10px] font-bold tracking-widest uppercase">MI VIAJE</span>
              </button>
            </div>
          </>
        )}

        {role === 'driver' && <DriverDashboard />}
        {role === 'admin' && <AdminDashboard />}
      </main>

      <footer className="pt-24 pb-12 px-6 bg-slate-900 text-slate-400 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-white font-sans text-2xl font-black tracking-tight">Frota</span>
          <span className="text-slate-500 font-sans text-2xl tracking-tight font-light">Transfer</span>
        </div>
        <div className="flex gap-8 mb-8 text-[10px] font-bold tracking-widest uppercase">
          <span className="hover:text-white cursor-pointer transition-colors">Términos</span>
          <span className="hover:text-white cursor-pointer transition-colors">Privacidad</span>
          <span className="hover:text-white cursor-pointer transition-colors">Soporte</span>
        </div>
        <p className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-50">BY ANDRU SERVICES · RIO DE JANEIRO 2026</p>
      </footer>
    </div>
  );
}
