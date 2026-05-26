'use client';

import { createI18nProvider } from 'next-international/client';

export const I18nProvider = createI18nProvider({
  es: () => import('./es'),
  en: () => import('./en'),
  pt: () => import('./pt'),
});
