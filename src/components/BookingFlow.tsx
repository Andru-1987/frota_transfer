import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, CheckCircle2, Users, Briefcase, Smartphone } from 'lucide-react';
import { VehicleCategory, VEHICLE_CATEGORIES } from '../types';

const BookingFlow = () => {
  const { t } = useTranslation();
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
              <h2 className="text-3xl font-sans font-black mb-8 text-slate-900">{t('booking.planYourTrip')} <span className="text-primary">{t('booking.planYourTripHighlight')}</span></h2>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-2 uppercase">{t('booking.step1.origin')}</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:border-primary/40 focus:bg-white outline-none transition-colors text-slate-900" 
                      placeholder={t('booking.step1.originPlaceholder')}
                      value={data.from}
                      onChange={e => setData({...data, from: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-2 uppercase">{t('booking.step1.destination')}</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:border-primary/40 focus:bg-white outline-none transition-colors text-slate-900" 
                      placeholder={t('booking.step1.destinationPlaceholder')}
                      value={data.to}
                      onChange={e => setData({...data, to: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-2 uppercase">{t('booking.step1.date')}</label>
                    <input 
                      type="date"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 focus:border-primary/40 focus:bg-white outline-none transition-colors text-slate-900" 
                      value={data.date}
                      onChange={e => setData({...data, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-2 uppercase">{t('booking.step1.time')}</label>
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
                    <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-2 uppercase">{t('booking.step1.passengers')}</label>
                    <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-2">
                       <button onClick={() => setData({...data, pax: Math.max(1, data.pax - 1)})} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-slate-100 rounded-lg">-</button>
                       <span className="flex-1 text-center font-bold text-slate-900">{data.pax}</span>
                       <button onClick={() => setData({...data, pax: Math.min(10, data.pax + 1)})} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-slate-100 rounded-lg">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold tracking-widest block mb-2 uppercase">{t('booking.step1.baggage')}</label>
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
                  {t('booking.step1.nextButton')}
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
              <button onClick={prevStep} className="text-primary text-xs font-bold tracking-widest mb-6 uppercase">{t('booking.step2.back')}</button>
              <h2 className="text-3xl font-sans font-black mb-8 text-slate-900">{t('booking.step2.chooseCategory')} <span className="text-primary">{t('booking.step2.chooseCategoryHighlight')}</span></h2>
              <div className="space-y-4 mb-8">
                {VEHICLE_CATEGORIES.map((v: VehicleCategory) => (
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
                {t('booking.step2.nextButton')}
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
              <button onClick={prevStep} className="text-primary text-xs font-bold tracking-widest mb-6 uppercase">{t('booking.step3.back')}</button>
              <h2 className="text-3xl font-sans font-black mb-8 text-slate-900">{t('booking.step3.reviewBooking')} <span className="text-primary">{t('booking.step3.reviewBookingHighlight')}</span></h2>
              
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 mb-8 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-primary font-bold tracking-widest block mb-1 uppercase">{t('booking.step3.trip')}</span>
                    <p className="text-sm font-medium text-slate-900">{data.from} → {data.to}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-primary font-bold tracking-widest block mb-1 uppercase">{t('booking.step3.date')}</span>
                    <p className="text-sm text-slate-600">{data.date} · {data.time}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-primary font-bold tracking-widest block mb-1 uppercase">{t('booking.step3.vehicle')}</span>
                    <p className="text-sm font-bold text-slate-900">{data.vehicle.name}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-medium text-sm">
                  <span>{t('booking.step3.totalPrice')}</span>
                  <span className="text-slate-900">USD {data.vehicle.price}</span>
                </div>
                <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 flex justify-between items-center shadow-sm shadow-primary/5">
                  <div>
                    <span className="text-xs font-bold text-primary block uppercase">{t('booking.step3.payNow')}</span>
                    <p className="text-2xl font-black text-slate-900">USD {data.vehicle.price / 2}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400 block uppercase">{t('booking.step3.balanceAtDestination')}</span>
                    <p className="text-xl font-bold text-slate-500">USD {data.vehicle.price / 2}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => window.location.reload()}
                className="w-full brand-gradient text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
              >
                <Smartphone size={20} /> {t('booking.step3.confirmButton')}
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-6 leading-relaxed uppercase tracking-wider">
                {t('booking.step3.disclaimer')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingFlow;
