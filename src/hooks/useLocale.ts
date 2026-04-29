import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '../data/translations';
import { I18nManager } from 'react-native';
import type { Locale } from '../types';

const LOCALE_KEY = 'codesphere-locale';

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    AsyncStorage.getItem(LOCALE_KEY).then((saved) => {
      if (saved && (saved === 'en' || saved === 'ar' || saved === 'de')) {
        setLocaleState(saved as Locale);
      }
    });
  }, []);

  const setLocale = useCallback(async (newLocale: Locale) => {
    setLocaleState(newLocale);
    await AsyncStorage.setItem(LOCALE_KEY, newLocale);
    I18nManager.forceRTL(newLocale === 'ar');
  }, []);

  const t = useCallback(
    (key: string): string => {
      const parts = key.split('.');
      const section = parts[0];
      const field = parts[1];
      return translations[locale]?.[section]?.[field] || translations.en?.[section]?.[field] || key;
    },
    [locale]
  );

  const getLocalized = useCallback(
    (en: string, ar: string, de: string): string => {
      if (locale === 'ar' && ar) return ar;
      if (locale === 'de' && de) return de;
      return en;
    },
    [locale]
  );

  const isRTL = locale === 'ar';

  return { t, locale, setLocale, getLocalized, isRTL };
}
