import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Card, CardContent } from '../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';

const menuItems = [
  { screen: 'MyFiles', icon: 'folder-open' as const, labelKey: 'myFiles.savedVideos', color: '#6366F1' },
  { screen: 'Community', icon: 'people' as const, labelKey: 'nav.community', color: '#3B82F6' },
  { screen: 'Roadmaps', icon: 'map' as const, labelKey: 'nav.roadmaps', color: '#8B5CF6' },
  { screen: 'Leaderboard', icon: 'trophy' as const, labelKey: 'nav.leaderboard', color: '#F97316' },
  { screen: 'Projects', icon: 'folder' as const, labelKey: 'nav.projects', color: '#22C55E' },
  { screen: 'Certificates', icon: 'ribbon' as const, labelKey: 'nav.certificates', color: '#EC4899' },
  { screen: 'Profile', icon: 'person' as const, labelKey: 'nav.profile', color: '#14B8A6' },
  { screen: 'Settings', icon: 'settings' as const, labelKey: 'nav.settings', color: '#6B7280' },
];

export function MoreScreen({ navigation }: any) {
  const { t, colors, user } = useApp();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      {/* User Info */}
      <Card style={{ marginBottom: 20 }}>
        <CardContent style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={{
            width: 50, height: 50, borderRadius: 25, backgroundColor: colors.primaryLight,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: colors.primary }}>
              {(user?.name || 'L')[0].toUpperCase()}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 17, fontWeight: '600', color: colors.text }}>{user?.name || 'Learner'}</Text>
            <Text style={{ fontSize: 13, color: colors.textSecondary }}>{user?.email || 'learner@example.com'}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="flash" size={16} color={colors.primary} />
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.primary }}>{user?.xp || 0} XP</Text>
          </View>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <View style={{ gap: 8 }}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.screen}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={t(item.labelKey)}
          >
            <Card>
              <CardContent style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 }}>
                <View style={{
                  width: 42, height: 42, borderRadius: 12,
                  backgroundColor: item.color + '20', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Ionicons name={item.icon} size={22} color={item.color} />
                </View>
                <Text style={{ flex: 1, fontSize: 15, fontWeight: '500', color: colors.text }}>{t(item.labelKey)}</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
              </CardContent>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
