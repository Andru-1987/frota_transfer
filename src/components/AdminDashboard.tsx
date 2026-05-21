import React from 'react';
import { Settings, TrendingUp, AlertCircle, Users } from 'lucide-react';
import { SectionTitle } from './common';

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

export default AdminDashboard;
