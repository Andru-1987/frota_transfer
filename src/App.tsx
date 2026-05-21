/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/common';
import { Role } from './types.tsx';

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

