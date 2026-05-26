import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Star, Map as MapIcon, Clock, CheckCircle2 } from 'lucide-react';
import { SectionTitle } from './common';

const DriverDashboard = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto bg-slate-50">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-sans font-black tracking-tight text-slate-900">Panel de <span className="text-primary">{t('driver.titleHighlight')}</span></h2>
          <p className="text-slate-400 font-medium mt-2">{t('driver.welcome')}</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-bold tracking-widest text-slate-500">{t('driver.status')}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: t('driver.stats.earnings'), val: 'USD 145', icon: <TrendingUp size={18} className="text-primary" />, sub: t('driver.stats.vsYesterday') },
          { label: t('driver.stats.rating'), val: '4.95', icon: <Star size={18} className="text-primary" />, sub: t('driver.stats.ratingDetail') },
          { label: t('driver.stats.trips'), val: '4', icon: <MapIcon size={18} className="text-primary" />, sub: t('driver.stats.completedTrips') },
          { label: t('driver.stats.activeTime'), val: '6h 12m', icon: <Clock size={18} className="text-primary" />, sub: t('driver.stats.sla') },
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
          <SectionTitle>{t('driver.availableTrips.title')}</SectionTitle>
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
                   <p className="text-xs text-slate-400 font-medium">{trip.pax} {t('driver.availableTrips.passengers')}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-3">
                   <div>
                     <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-widest">{t('driver.availableTrips.yourEarnings')}</span>
                     <span className="text-xl font-sans font-black text-slate-900">USD {trip.price * 0.8}</span>
                   </div>
                   <button className="px-6 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20">{t('driver.availableTrips.acceptButton')}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <SectionTitle>{t('driver.history.title')}</SectionTitle>
          <div className="bg-white border border-slate-100 p-8 rounded-[2rem] space-y-6 shadow-sm">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <CheckCircle2 size={20} className="text-green-500" />
                  </div>
                   <div>
                     <h5 className="text-sm font-bold text-slate-900">{t('driver.history.completed')}</h5>
                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">GIG → Ipanema · 10 {t('driver.history.completed')}</span>
                   </div>
                </div>
                <span className="text-sm font-sans font-black text-slate-900">+ USD 48.00</span>
              </div>
            ))}
            <button className="w-full py-4 border border-slate-200 rounded-xl text-[10px] font-bold tracking-widest text-slate-400 hover:text-primary transition-colors uppercase">{t('driver.history.viewAll')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
