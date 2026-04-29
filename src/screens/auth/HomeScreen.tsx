import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Button } from '../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

export function HomeScreen({ navigation }: any) {
  const { t, colors, locale, setLocale, isDark, setThemeMode, themeMode } = useApp();

  const features = [
    { icon: 'book-outline' as const, title: t('home.feat1Title'), desc: t('home.feat1Desc'), color: '#3B82F6' },
    { icon: 'hardware-chip-outline' as const, title: t('home.feat2Title'), desc: t('home.feat2Desc'), color: '#8B5CF6' },
    { icon: 'code-slash-outline' as const, title: t('home.feat3Title'), desc: t('home.feat3Desc'), color: '#22C55E' },
    { icon: 'ribbon-outline' as const, title: t('home.feat4Title'), desc: t('home.feat4Desc'), color: '#F97316' },
  ];

  const stats = [
    { value: '15+', label: t('home.coursesAvailable') },
    { value: '10K+', label: t('home.studentsLearning') },
    { value: '50K+', label: t('home.lessonsCompleted') },
  ];

  const languages = [
    { code: 'en' as const, label: 'EN' },
    { code: 'ar' as const, label: 'عر' },
    { code: 'de' as const, label: 'DE' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{
            width: 36, height: 36, borderRadius: 10, backgroundColor: '#2563EB',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Ionicons name="code-slash" size={20} color="#FFF" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>CodeSphere</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity
            onPress={() => setThemeMode(themeMode === 'dark' ? 'light' : themeMode === 'light' ? 'system' : 'dark')}
            style={{ padding: 8, borderRadius: 8 }}
          >
            <Ionicons
              name={isDark ? 'moon' : 'sunny'}
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', borderRadius: 8, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' }}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => setLocale(lang.code)}
                style={{
                  paddingHorizontal: 10, paddingVertical: 6,
                  backgroundColor: locale === lang.code ? '#2563EB' : 'transparent',
                }}
              >
                <Text style={{
                  fontSize: 11, fontWeight: '600',
                  color: locale === lang.code ? '#FFF' : colors.text,
                }}>{lang.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Hero */}
      <View style={{ padding: 24, alignItems: 'center' }}>
        <View style={{
          backgroundColor: colors.blueLight, paddingHorizontal: 14, paddingVertical: 6,
          borderRadius: 20, marginBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 6,
        }}>
          <Ionicons name="play" size={12} color={colors.primary} />
          <Text style={{ fontSize: 12, color: colors.primary, fontWeight: '500' }}>Free & Open for Everyone</Text>
        </View>

        <Text style={{
          fontSize: 28, fontWeight: '800', color: colors.text, textAlign: 'center', lineHeight: 36,
        }}>
          {t('home.title')}
        </Text>

        <Text style={{
          fontSize: 15, color: colors.textSecondary, textAlign: 'center', marginTop: 12, lineHeight: 22,
        }}>
          {t('home.subtitle')}
        </Text>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
          <Button title={t('home.cta')} onPress={() => navigation.navigate('Signup')} size="lg"
            icon={<Ionicons name="arrow-forward" size={18} color="#FFF" />}
          />
        </View>
        <Button title={t('nav.courses')} variant="outline" onPress={() => navigation.navigate('Signup')}
          style={{ marginTop: 12 }} size="lg"
        />
      </View>

      {/* Stats */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16, paddingVertical: 24 }}>
        {stats.map((stat) => (
          <View key={stat.label} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: '800', color: colors.primary }}>{stat.value}</Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary, marginTop: 4, textAlign: 'center' }}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Features */}
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: 20 }}>
          {t('home.features')}
        </Text>
        {features.map((feat) => (
          <View key={feat.title} style={{
            flexDirection: 'row', gap: 14, padding: 16, marginBottom: 12,
            backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: colors.border,
          }}>
            <View style={{
              width: 48, height: 48, borderRadius: 12, backgroundColor: feat.color + '20',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Ionicons name={feat.icon} size={24} color={feat.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>{feat.title}</Text>
              <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4, lineHeight: 18 }}>{feat.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Auth Buttons */}
      <View style={{ padding: 24, gap: 12, marginBottom: 40 }}>
        <Button title={t('nav.login')} variant="outline" size="lg" fullWidth onPress={() => navigation.navigate('Login')} />
        <Button title={t('nav.signup')} size="lg" fullWidth onPress={() => navigation.navigate('Signup')} />
      </View>
    </ScrollView>
  );
}
