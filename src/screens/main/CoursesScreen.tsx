import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { coursesData } from '../../data/courses';
import { categoryIcons, categoryColors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export function CoursesScreen({ navigation }: any) {
  const { t, getLocalized, colors } = useApp();
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('all');

  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filtered = coursesData.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesDiff = difficulty === 'all' || c.difficulty === difficulty;
    return matchesSearch && matchesDiff;
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text }}>{t('courses.title')}</Text>
      <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 4 }}>
        All courses are free and unlocked. Start learning now!
      </Text>

      {/* Search */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', backgroundColor: colors.inputBg,
        borderRadius: 12, paddingHorizontal: 12, marginTop: 16, borderWidth: 1, borderColor: colors.border,
      }}>
        <Ionicons name="search" size={18} color={colors.textTertiary} />
        <TextInput
          style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 8, fontSize: 14, color: colors.text }}
          placeholder={t('courses.search')}
          placeholderTextColor={colors.textTertiary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {difficulties.map((d) => (
            <Button
              key={d}
              title={d === 'all' ? t('courses.all') : t(`courses.${d}`)}
              variant={difficulty === d ? 'primary' : 'secondary'}
              size="sm"
              onPress={() => setDifficulty(d)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Courses */}
      <View style={{ marginTop: 16, gap: 16 }}>
        {filtered.map((course) => {
          const gradColors = categoryColors[course.category] || ['#6B7280', '#374151'];
          return (
            <TouchableOpacity
              key={course.id}
              onPress={() => navigation.navigate('CourseDetail', { courseId: course.slug })}
              activeOpacity={0.8}
            >
              <Card>
                <LinearGradient
                  colors={gradColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                >
                  <Text style={{ fontSize: 28 }}>{categoryIcons[course.category] || '📚'}</Text>
                  <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFF', marginTop: 10 }}>
                    {getLocalized(course.title, course.titleAr, course.titleDe)}
                  </Text>
                  <View style={{
                    backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4,
                    borderRadius: 12, alignSelf: 'flex-start', marginTop: 8,
                  }}>
                    <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>
                      {t(`courses.${course.difficulty}`)}
                    </Text>
                  </View>
                </LinearGradient>
                <CardContent>
                  <Text style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 18 }} numberOfLines={2}>
                    {getLocalized(course.description, course.descriptionAr, course.descriptionDe)}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Ionicons name="book-outline" size={14} color={colors.textTertiary} />
                        <Text style={{ fontSize: 12, color: colors.textSecondary }}>{course.lessonsCount} {t('courses.lessons')}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Ionicons name="time-outline" size={14} color={colors.textTertiary} />
                        <Text style={{ fontSize: 12, color: colors.textSecondary }}>{Math.round(course.duration / 60)}h</Text>
                      </View>
                    </View>
                    <Badge text={t('courses.free')} variant="success" />
                  </View>
                </CardContent>
              </Card>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
