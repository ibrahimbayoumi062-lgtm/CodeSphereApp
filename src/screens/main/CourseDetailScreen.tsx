import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { coursesData } from '../../data/courses';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export function CourseDetailScreen({ route, navigation }: any) {
  const { courseId } = route.params;
  const { t, getLocalized, colors } = useApp();

  const course = coursesData.find((c) => c.slug === courseId);

  if (!course) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>Course not found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
          <Text style={{ color: colors.primary }}>{t('common.back')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const lessons = course.lessons || [];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <LinearGradient
        colors={['#2563EB', '#7C3AED']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 24, paddingTop: 60 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 16 }} accessibilityRole="button" accessibilityLabel={t('common.back')}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={{
          backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4,
          borderRadius: 12, alignSelf: 'flex-start',
        }}>
          <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>{t(`courses.${course.difficulty}`)}</Text>
        </View>
        <Text style={{ fontSize: 26, fontWeight: '700', color: '#FFF', marginTop: 12 }}>
          {getLocalized(course.title, course.titleAr, course.titleDe)}
        </Text>
        <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 8, lineHeight: 20 }}>
          {getLocalized(course.description, course.descriptionAr, course.descriptionDe)}
        </Text>
        <View style={{ flexDirection: 'row', gap: 20, marginTop: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="play-circle" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{lessons.length || course.lessonsCount} {t('courses.lessons')}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="time" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{Math.round(course.duration / 60)}h</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{ padding: 16, gap: 16 }}>
        {/* Progress */}
        <Card>
          <CardContent>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontWeight: '500', color: colors.text }}>{t('courses.progress')}</Text>
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>0 / {lessons.length || course.lessonsCount} {t('courses.lessons')}</Text>
            </View>
            <ProgressBar value={0} color="green" />
          </CardContent>
        </Card>

        {/* Lessons List */}
        <Card>
          <CardHeader>
            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{t('courses.lessons')}</Text>
          </CardHeader>
          {lessons.length > 0 ? (
            lessons.map((lesson, idx) => (
              <TouchableOpacity
                key={lesson.id}
                onPress={() => navigation.navigate('Lesson', { courseId: course.slug, lessonId: lesson.id })}
                accessibilityRole="button"
                accessibilityLabel={`Lesson ${idx + 1}: ${getLocalized(lesson.title, lesson.titleAr, lesson.titleDe)}`}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16,
                  borderBottomWidth: idx < lessons.length - 1 ? 1 : 0, borderBottomColor: colors.border,
                }}
              >
                <View style={{
                  width: 40, height: 40, borderRadius: 20, backgroundColor: colors.blueLight,
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: colors.primary }}>{idx + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '500', color: colors.text }}>
                    {getLocalized(lesson.title, lesson.titleAr, lesson.titleDe)}
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.textSecondary, marginTop: 2 }}>
                    {lesson.duration} {t('courses.minutes')}
                  </Text>
                </View>
                <Ionicons name="play-circle-outline" size={22} color={colors.textTertiary} />
              </TouchableOpacity>
            ))
          ) : (
            <CardContent>
              <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>
                Lessons coming soon!
              </Text>
            </CardContent>
          )}
        </Card>
      </View>
    </ScrollView>
  );
}
