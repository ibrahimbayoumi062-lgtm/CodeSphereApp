import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Card, CardContent } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const leaderboard = [
  { rank: 1, name: 'Ahmed Hassan', xp: 2450, level: 25, badges: 12 },
  { rank: 2, name: 'Sarah Johnson', xp: 2100, level: 22, badges: 10 },
  { rank: 3, name: 'Mohamed Ali', xp: 1800, level: 19, badges: 8 },
  { rank: 4, name: 'Lisa Mueller', xp: 1650, level: 17, badges: 7 },
  { rank: 5, name: 'Carlos Rodriguez', xp: 1500, level: 16, badges: 6 },
  { rank: 6, name: 'Fatima Zahra', xp: 1350, level: 14, badges: 5 },
  { rank: 7, name: 'David Kim', xp: 1200, level: 13, badges: 5 },
  { rank: 8, name: 'Emma Wilson', xp: 1050, level: 11, badges: 4 },
  { rank: 9, name: 'Omar Khaled', xp: 900, level: 10, badges: 3 },
  { rank: 10, name: 'Anna Schmidt', xp: 750, level: 8, badges: 3 },
];

const rankColors: Record<number, [string, string]> = {
  1: ['#F59E0B', '#D97706'],
  2: ['#9CA3AF', '#6B7280'],
  3: ['#F97316', '#EA580C'],
};

export function LeaderboardScreen() {
  const { t, colors } = useApp();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Ionicons name="trophy" size={20} color="#F59E0B" />;
    if (rank === 2) return <Ionicons name="medal" size={20} color="#9CA3AF" />;
    if (rank === 3) return <Ionicons name="ribbon" size={20} color="#F97316" />;
    return <Text style={{ fontSize: 14, fontWeight: '700', color: colors.textTertiary }}>#{rank}</Text>;
  };

  const podiumOrder = [1, 0, 2];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text }}>{t('leaderboard.title')}</Text>

      {/* Top 3 Podium */}
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 20, alignItems: 'flex-end' }}>
        {podiumOrder.map((idx) => {
          const user = leaderboard[idx];
          const isFirst = idx === 0;
          const gradColors = rankColors[user.rank] || ['#6B7280', '#6B7280'];
          return (
            <View key={user.rank} style={{ flex: 1 }}>
              <Card style={isFirst ? { borderColor: '#F59E0B', borderWidth: 2 } : {}}>
                <CardContent style={{ alignItems: 'center', paddingVertical: isFirst ? 24 : 16 }}>
                  {getRankIcon(user.rank)}
                  <Avatar name={user.name} size={isFirst ? 'lg' : 'md'} style={{ marginTop: 8 }} />
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginTop: 8, textAlign: 'center' }}>{user.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    <Ionicons name="flash" size={14} color={colors.primary} />
                    <Text style={{ fontSize: 14, fontWeight: '700', color: colors.primary }}>{user.xp}</Text>
                  </View>
                  <Text style={{ fontSize: 11, color: colors.textSecondary }}>Level {user.level}</Text>
                </CardContent>
              </Card>
            </View>
          );
        })}
      </View>

      {/* Full List */}
      <Card style={{ marginTop: 20 }}>
        {leaderboard.map((user, idx) => (
          <View key={user.rank} style={{
            flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12,
            borderBottomWidth: idx < leaderboard.length - 1 ? 1 : 0, borderBottomColor: colors.border,
          }}>
            <View style={{ width: 28, alignItems: 'center' }}>{getRankIcon(user.rank)}</View>
            <Avatar name={user.name} size="sm" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text }}>{user.name}</Text>
            </View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.primary }}>{user.xp} XP</Text>
            <Badge text={`Lv.${user.level}`} variant="info" />
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}
