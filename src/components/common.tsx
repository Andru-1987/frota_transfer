import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import { User } from 'lucide-react';
import { Role } from '../types';

export const Navbar = React.memo(({ role, setRole }: { role: Role, setRole: (r: Role) => void }) => {
  const { t } = useTranslation();
  
  return (
  <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-2">
      <span className="text-primary font-sans text-2xl font-extrabold tracking-tight">Frota</span>
      <span className="text-slate-400 font-sans text-2xl tracking-tight font-light">Transfer</span>
      <LanguageSwitcher />
    </div>
    
    <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
      <button onClick={() => setRole('client')} className={`hover:text-primary transition-colors ${role === 'client' ? 'text-primary' : 'text-slate-400'}`}>{t('navbar.client')}</button>
      <button onClick={() => setRole('driver')} className={`hover:text-primary transition-colors ${role === 'driver' ? 'text-primary' : 'text-slate-400'}`}>{t('navbar.driver')}</button>
      <button onClick={() => setRole('admin')} className={`hover:text-primary transition-colors ${role === 'admin' ? 'text-primary' : 'text-slate-400'}`}>{t('navbar.admin')}</button>
    </div>

    <div className="flex items-center gap-4">
      <div className="hidden sm:flex flex-col items-end">
        <span className="text-[10px] text-primary font-bold tracking-widest leading-none mb-1 uppercase">{t('navbar.membership')}</span>
        <span className="text-xs text-slate-900 font-medium italic">{t('navbar.membershipLevel')}</span>
      </div>
      <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden shadow-inner">
        <User size={20} className="text-slate-400" />
      </div>
    </div>
  </nav>
  );
});

export const SectionTitle = React.memo(({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-1.5 h-4 bg-primary rounded-full shadow-sm" />
    <h3 className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">{children}</h3>
  </div>
));

const languages = [
  { code: 'es', countryCode: 'ES', name: 'Español' },
  { code: 'en', countryCode: 'GB', name: 'English' },
  { code: 'pt', countryCode: 'BR', name: 'Português' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-3 ml-4">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`transition-opacity hover:opacity-100 ${
            i18n.language === lang.code ? 'opacity-100' : 'opacity-50'
          }`}
          title={lang.name}
        >
          <ReactCountryFlag
            countryCode={lang.countryCode}
            svg
            style={{
              width: '1.5em',
              height: '1.5em',
            }}
          />
        </button>
      ))}
    </div>
  );
};


