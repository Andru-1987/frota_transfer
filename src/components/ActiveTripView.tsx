import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Clock, MapPin, User, Star, Phone, MessageSquare, TrendingUp } from 'lucide-react';
import { SectionTitle } from './common';
import { MOCK_ACTIVE_BOOKING } from '../types';

const ActiveTripView = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-50">
      <div className="md:col-span-2 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-sans font-black tracking-tight text-slate-900">{t('activeTrip.title')} <span className="text-primary">{t('activeTrip.titleHighlight')}</span></h2>
          <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.2em] animate-pulse uppercase">{t('activeTrip.status')}</span>
        </div>

        {/* Map Simulation */}
        <div className="w-full aspect-[16/10] bg-slate-200 rounded-[2rem] border border-slate-100 relative overflow-hidden shadow-inner">
          {/* Mock Road Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-300 transform -rotate-12" />
          <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-slate-300 transform rotate-6" />
          
          {/* Destination Marker */}
          <div className="absolute top-1/4 right-1/4 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold shadow-xl">B</div>
            <span className="text-[10px] font-bold bg-white px-2 py-1 rounded mt-2 border border-slate-200 shadow-sm text-slate-900">{t('activeTrip.hotel')}</span>
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
              <span className="text-[10px] font-bold bg-primary text-white px-2 py-1 rounded mt-2 uppercase tracking-widest shadow-md">{t('activeTrip.driver')}</span>
          </motion.div>

          {/* Map Info Overlay */}
          <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <Clock className="text-primary" size={24} />
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">{t('activeTrip.eta')}</span>
                <span className="text-xl font-black text-slate-900 uppercase">{t('activeTrip.etaValue')}</span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-4">
              <MapPin className="text-primary" size={24} />
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">{t('activeTrip.next')}</span>
                <span className="text-xl font-bold text-slate-900">{t('activeTrip.nextLocation')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
          <SectionTitle>{t('activeTrip.assignedDriver')}</SectionTitle>
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
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1 tracking-widest">{t('activeTrip.vehicle')}</span>
            <p className="text-sm font-semibold text-slate-900">{MOCK_ACTIVE_BOOKING.driver.vehicle}</p>
            <span className="px-2 py-0.5 bg-white border border-slate-200 rounded mt-2 inline-block text-[10px] font-mono text-slate-500 font-bold">{t('activeTrip.plate')} {MOCK_ACTIVE_BOOKING.driver.plate}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="py-4 rounded-xl border border-slate-200 text-slate-600 font-bold flex flex-col items-center gap-2 hover:bg-slate-50 transition-all text-xs tracking-wider">
              <Phone size={18} className="text-primary" />
              <span>{t('activeTrip.call')}</span>
            </button>
            <button className="py-4 rounded-xl brand-gradient text-white font-bold flex flex-col items-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 transition-all text-xs tracking-wider">
              <MessageSquare size={18} />
              <span>{t('activeTrip.whatsapp')}</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
          <SectionTitle>{t('activeTrip.paymentDetails')}</SectionTitle>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 font-medium">{t('activeTrip.tripTotal')}</span>
              <span className="font-bold text-slate-900">USD 130</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 font-medium">{t('activeTrip.depositPaid')}</span>
              <span className="text-green-600 font-black">USD 65</span>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-bold text-primary tracking-widest">{t('activeTrip.pendingBalance')}</span>
              <span className="text-2xl font-black text-slate-900">USD 65</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveTripView;
