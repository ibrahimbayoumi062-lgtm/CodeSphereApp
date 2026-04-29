import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import type { Locale, ThemeMode } from '../../types';

export function SettingsScreen({ navigation }: any) {
  const { t, colors, locale, setLocale, themeMode, setThemeMode, isDark, logout } = useApp();

  const themes: { value: ThemeMode; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { value: 'light', label: t('settings.light'), icon: 'sunny' },
    { value: 'dark', label: t('settings.dark'), icon: 'moon' },
    { value: 'system', label: t('settings.system'), icon: 'phone-portrait' },
  ];

  const languages: { code: Locale; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية (Arabic)' },
    { code: 'de', label: 'Deutsch (German)' },
  ];

  const notifications = ['Learning reminders', 'Progress updates', 'Community mentions', 'New courses'];
  const [notifSettings, setNotifSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(notifications.map((n) => [n, true]))
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text }}>{t('settings.title')}</Text>

      {/* Theme */}
      <Card style={{ marginTop: 16 }}>
        <CardHeader>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{t('settings.theme')}</Text>
        </CardHeader>
        <CardContent>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {themes.map((th) => (
              <TouchableOpacity
                key={th.value}
                onPress={() => setThemeMode(th.value)}
                style={{
                  flex: 1, alignItems: 'center', gap: 8, padding: 16, borderRadius: 12,
                  borderWidth: 2,
                  borderColor: themeMode === th.value ? colors.primary : colors.border,
                  backgroundColor: themeMode === th.value ? colors.primaryLight : 'transparent',
                }}
              >
                <Ionicons name={th.icon} size={24} color={themeMode === th.value ? colors.primary : colors.textSecondary} />
                <Text style={{
                  fontSize: 13, fontWeight: '500',
                  color: themeMode === th.value ? colors.primary : colors.text,
                }}>{th.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </CardContent>
      </Card>

      {/* Language */}
      <Card style={{ marginTop: 16 }}>
        <CardHeader>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="globe-outline" size={20} color={colors.text} />
            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{t('settings.language')}</Text>
          </View>
        </CardHeader>
        <CardContent style={{ gap: 8 }}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => setLocale(lang.code)}
              style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                padding: 16, borderRadius: 12, borderWidth: 2,
                borderColor: locale === lang.code ? colors.primary : colors.border,
                backgroundColor: locale === lang.code ? colors.primaryLight : 'transparent',
              }}
            >
              <Text style={{
                fontSize: 14, fontWeight: '500',
                color: locale === lang.code ? colors.primary : colors.text,
              }}>{lang.label}</Text>
              {locale === lang.code && (
                <Text style={{ fontSize: 12, color: colors.primary, fontWeight: '600' }}>Active</Text>
              )}
            </TouchableOpacity>
          ))}
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card style={{ marginTop: 16 }}>
        <CardHeader>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{t('settings.notifications')}</Text>
        </CardHeader>
        <CardContent style={{ gap: 12 }}>
          {notifications.map((notif) => (
            <View key={notif} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: colors.text }}>{notif}</Text>
              <Switch
                value={notifSettings[notif]}
                onValueChange={(val) => setNotifSettings({ ...notifSettings, [notif]: val })}
                trackColor={{ true: colors.primary, false: colors.border }}
                thumbColor="#FFF"
              />
            </View>
          ))}
        </CardContent>
      </Card>

      {/* Logout */}
      <Button
        title={t('nav.logout')}
        variant="danger"
        fullWidth
        style={{ marginTop: 24 }}
        onPress={() => logout()}
        icon={<Ionicons name="log-out-outline" size={18} color="#FFF" />}
      />
    </ScrollView>
  );
}
