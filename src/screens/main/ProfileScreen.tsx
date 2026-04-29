import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Ionicons } from '@expo/vector-icons';

export function ProfileScreen() {
  const { t, colors, user } = useApp();
  const profile = {
    name: user?.name || 'Learner',
    email: user?.email || 'learner@example.com',
    xp: user?.xp || 250,
    level: user?.level || 3,
    streak: user?.streak || 5,
  };

  const badges = [
    { name: 'First Steps', icon: '🚀', description: 'Complete your first lesson' },
    { name: 'Quick Learner', icon: '⚡', description: 'Complete 10 lessons' },
    { name: 'Code Warrior', icon: '⚔️', description: 'Reach 500 XP' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text }}>{t('profile.title')}</Text>

      {/* Profile Header */}
      <Card style={{ marginTop: 16 }}>
        <CardContent style={{ alignItems: 'center', paddingVertical: 24 }}>
          <Avatar name={profile.name} size="lg" style={{ width: 80, height: 80, borderRadius: 40 }} />
          <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text, marginTop: 12 }}>{profile.name}</Text>
          <Text style={{ fontSize: 14, color: colors.textSecondary }}>{profile.email}</Text>
          <View style={{ flexDirection: 'row', gap: 24, marginTop: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="flash" size={18} color="#3B82F6" />
                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>{profile.xp}</Text>
              </View>
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>XP</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="trophy" size={18} color="#8B5CF6" />
                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>{profile.level}</Text>
              </View>
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>Level</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="flame" size={18} color="#F97316" />
                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>{profile.streak}</Text>
              </View>
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>Streak</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Level Progress */}
      <Card style={{ marginTop: 16 }}>
        <CardContent>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontWeight: '500', color: colors.text }}>Level {profile.level}</Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>{profile.xp % 100}/100 XP to Level {profile.level + 1}</Text>
          </View>
          <ProgressBar value={profile.xp % 100} color="purple" />
        </CardContent>
      </Card>

      {/* Badges */}
      <Card style={{ marginTop: 16 }}>
        <CardHeader>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{t('profile.achievements')}</Text>
        </CardHeader>
        <CardContent style={{ gap: 12 }}>
          {badges.map((badge) => (
            <View key={badge.name} style={{
              flexDirection: 'row', alignItems: 'center', gap: 12,
              padding: 14, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
            }}>
              <Text style={{ fontSize: 28 }}>{badge.icon}</Text>
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>{badge.name}</Text>
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>{badge.description}</Text>
              </View>
            </View>
          ))}
        </CardContent>
      </Card>
    </ScrollView>
  );
}
