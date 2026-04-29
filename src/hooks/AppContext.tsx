import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/colors';
import { translations } from '../data/translations';
import type { Locale, ThemeMode, UserData } from '../types';

interface AppContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  getLocalized: (en: string, ar: string, de: string) => string;
  isRTL: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
  colors: typeof Colors.light;
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [locale, setLocaleState] = useState<Locale>('en');
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [user, setUserState] = useState<UserData | null>(null);

  useEffect(() => {
    const load = async () => {
      const [savedLocale, savedTheme, savedUser] = await Promise.all([
        AsyncStorage.getItem('codesphere-locale'),
        AsyncStorage.getItem('codesphere-theme'),
        AsyncStorage.getItem('codesphere-user'),
      ]);
      if (savedLocale === 'en' || savedLocale === 'ar' || savedLocale === 'de') {
        setLocaleState(savedLocale);
      }
      if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
        setThemeModeState(savedTheme);
      }
      if (savedUser) {
        try { setUserState(JSON.parse(savedUser)); } catch {}
      }
    };
    load();
  }, []);

  const setLocale = useCallback(async (newLocale: Locale) => {
    setLocaleState(newLocale);
    await AsyncStorage.setItem('codesphere-locale', newLocale);
  }, []);

  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem('codesphere-theme', mode);
  }, []);

  const setUser = useCallback(async (newUser: UserData | null) => {
    setUserState(newUser);
    if (newUser) {
      await AsyncStorage.setItem('codesphere-user', JSON.stringify(newUser));
    } else {
      await AsyncStorage.removeItem('codesphere-user');
    }
  }, []);

  const logout = useCallback(async () => {
    setUserState(null);
    await AsyncStorage.removeItem('codesphere-user');
  }, []);

  const t = useCallback(
    (key: string): string => {
      const [section, field] = key.split('.');
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
  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemScheme === 'dark');
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <AppContext.Provider
      value={{
        locale, setLocale, t, getLocalized, isRTL,
        themeMode, setThemeMode, isDark, colors,
        user, setUser, logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
