import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Card, CardContent } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Ionicons } from '@expo/vector-icons';

export function DashboardScreen({ navigation }: any) {
  const { t, colors, user } = useApp();
  const stats = {
    xp: user?.xp || 250,
    level: user?.level || 3,
    streak: user?.streak || 5,
    enrolledCourses: 3,
  };

  const xpProgress = (stats.xp % 100);

  const quickActions = [
    { screen: 'CoursesTab', icon: 'book' as const, label: t('nav.courses'), color: '#3B82F6' },
    { screen: 'EditorTab', icon: 'code-slash' as const, label: t('nav.editor'), color: '#22C55E' },
    { screen: 'AITab', icon: 'sparkles' as const, label: t('nav.aiAssistant'), color: '#8B5CF6' },
    { screen: 'MoreTab', icon: 'trophy' as const, label: t('nav.leaderboard'), color: '#F97316' },
  ];

  const continueCourses = [
    { name: 'Python for Beginners', slug: 'python-beginners', progress: 65, icon: '🐍' },
    { name: 'JavaScript Essentials', slug: 'javascript-essentials', progress: 30, icon: '⚡' },
    { name: 'HTML & CSS Fundamentals', slug: 'html-css-fundamentals', progress: 45, icon: '🌐' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      {/* Welcome */}
      <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text }}>
        {(user?.xp || 0) > 0 ? t('dashboard.welcomeBack') : t('dashboard.welcomeNew')}, {user?.name || 'Learner'} 👋
      </Text>
      <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 4 }}>
        {(user?.xp || 0) > 0 ? t('dashboard.keepGoing') : t('dashboard.startJourney')}
      </Text>

      {/* Stats Grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
        {[
          { label: t('dashboard.xp'), value: stats.xp, icon: 'flash' as const, color: '#3B82F6', bg: '#DBEAFE' },
          { label: t('dashboard.level'), value: stats.level, icon: 'trophy' as const, color: '#8B5CF6', bg: '#EDE9FE' },
          { label: t('dashboard.streak'), value: stats.streak, icon: 'flame' as const, color: '#F97316', bg: '#FFF7ED' },
          { label: t('dashboard.enrolled'), value: stats.enrolledCourses, icon: 'book' as const, color: '#22C55E', bg: '#DCFCE7' },
        ].map((item) => (
          <Card key={item.label} style={{ flex: 1, minWidth: '45%' }}>
            <CardContent style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{
                width: 48, height: 48, borderRadius: 14,
                backgroundColor: item.bg, alignItems: 'center', justifyContent: 'center',
              }}>
                <Ionicons name={item.icon} size={24} color={item.color} />
              </View>
              <View>
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>{item.label}</Text>
                <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text }}>{item.value}</Text>
              </View>
            </CardContent>
          </Card>
        ))}
      </View>

      {/* XP Progress */}
      <Card style={{ marginTop: 16 }}>
        <CardContent>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text }}>Level {stats.level} Progress</Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>{xpProgress}/100 XP</Text>
          </View>
          <ProgressBar value={xpProgress} color="blue" />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.label}
            style={{
              flex: 1, alignItems: 'center', padding: 14,
              backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: colors.border,
            }}
            onPress={() => navigation.navigate(action.screen)}
          >
            <View style={{
              width: 44, height: 44, borderRadius: 12,
              backgroundColor: action.color + '20', alignItems: 'center', justifyContent: 'center',
            }}>
              <Ionicons name={action.icon} size={22} color={action.color} />
            </View>
            <Text style={{ fontSize: 11, fontWeight: '500', color: colors.text, marginTop: 8, textAlign: 'center' }}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue Learning */}
      <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 24, marginBottom: 12 }}>
        {t('dashboard.continueLearn')}
      </Text>
      {continueCourses.map((course) => (
        <TouchableOpacity
          key={course.slug}
          onPress={() => navigation.navigate('CoursesTab')}
        >
          <Card style={{ marginBottom: 12 }}>
            <CardContent style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <Text style={{ fontSize: 32 }}>{course.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{course.name}</Text>
                <View style={{ marginTop: 8 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontSize: 12, color: colors.textSecondary }}>{t('courses.progress')}</Text>
                    <Text style={{ fontSize: 12, color: colors.primary, fontWeight: '600' }}>{course.progress}%</Text>
                  </View>
                  <ProgressBar value={course.progress} color="blue" height={6} />
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
            </CardContent>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
