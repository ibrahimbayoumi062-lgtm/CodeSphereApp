import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { coursesData } from '../../data/courses';
import { Ionicons } from '@expo/vector-icons';

export function LessonScreen({ route, navigation }: any) {
  const { courseId, lessonId } = route.params;
  const { t, getLocalized, colors } = useApp();
  const [completed, setCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizResults, setQuizResults] = useState<Record<string, boolean | null>>({});
  const [taskCode, setTaskCode] = useState<Record<string, string>>({});

  const course = coursesData.find((c) => c.slug === courseId);
  const lesson = course?.lessons?.find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>Lesson not found</Text>
      </View>
    );
  }

  const lessonIdx = course?.lessons?.findIndex((l) => l.id === lessonId) || 0;
  const nextLesson = course?.lessons?.[lessonIdx + 1];
  const prevLesson = lessonIdx > 0 ? course?.lessons?.[lessonIdx - 1] : null;

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCode = false;
    let codeBuf = '';

    lines.forEach((line, idx) => {
      if (line.startsWith('```')) {
        if (inCode) {
          elements.push(
            <View key={`code-${idx}`} style={{
              backgroundColor: '#1F2937', borderRadius: 12, padding: 14, marginVertical: 8,
            }}>
              <Text style={{ fontFamily: 'monospace', fontSize: 13, color: '#E5E7EB' }}>{codeBuf.trim()}</Text>
            </View>
          );
          codeBuf = '';
          inCode = false;
        } else {
          inCode = true;
        }
        return;
      }
      if (inCode) { codeBuf += line + '\n'; return; }
      if (line.startsWith('# ')) {
        elements.push(<Text key={idx} style={{ fontSize: 22, fontWeight: '700', color: colors.text, marginTop: 16, marginBottom: 8 }}>{line.slice(2)}</Text>);
      } else if (line.startsWith('## ')) {
        elements.push(<Text key={idx} style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 14, marginBottom: 6 }}>{line.slice(3)}</Text>);
      } else if (line.startsWith('- ')) {
        elements.push(
          <View key={idx} style={{ flexDirection: 'row', gap: 8, marginLeft: 8, marginBottom: 4 }}>
            <Text style={{ color: colors.textSecondary }}>•</Text>
            <Text style={{ flex: 1, color: colors.textSecondary, lineHeight: 20 }}>{line.slice(2)}</Text>
          </View>
        );
      } else if (line.trim()) {
        elements.push(<Text key={idx} style={{ color: colors.textSecondary, lineHeight: 22, marginBottom: 8 }}>{line}</Text>);
      }
    });
    return elements;
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, paddingTop: 50 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>
            {getLocalized(lesson.title, lesson.titleAr, lesson.titleDe)}
          </Text>
          <Text style={{ fontSize: 12, color: colors.textSecondary }}>{lesson.duration} {t('courses.minutes')} • {lesson.xpReward} XP</Text>
        </View>
      </View>

      {/* Content */}
      <View style={{ padding: 16 }}>
        {renderContent(getLocalized(lesson.content, lesson.contentAr, lesson.contentDe))}
      </View>

      {/* Quizzes */}
      {lesson.quizzes.length > 0 && (
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 12 }}>
            {t('lesson.quiz')}
          </Text>
          {lesson.quizzes.map((quiz) => {
            const options = JSON.parse(quiz.options) as string[];
            const result = quizResults[quiz.id];
            return (
              <Card key={quiz.id} style={{ marginBottom: 12 }}>
                <CardContent>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text, marginBottom: 12 }}>
                    {getLocalized(quiz.question, quiz.questionAr, quiz.questionDe)}
                  </Text>
                  {options.map((opt, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => setQuizAnswers({ ...quizAnswers, [quiz.id]: idx })}
                      style={{
                        flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12,
                        borderRadius: 10, marginBottom: 8,
                        backgroundColor: quizAnswers[quiz.id] === idx ? colors.primaryLight : colors.inputBg,
                        borderWidth: 1,
                        borderColor: quizAnswers[quiz.id] === idx ? colors.primary : colors.border,
                      }}
                    >
                      <View style={{
                        width: 20, height: 20, borderRadius: 10,
                        borderWidth: 2, borderColor: quizAnswers[quiz.id] === idx ? colors.primary : colors.textTertiary,
                        backgroundColor: quizAnswers[quiz.id] === idx ? colors.primary : 'transparent',
                        alignItems: 'center', justifyContent: 'center',
                      }}>
                        {quizAnswers[quiz.id] === idx && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFF' }} />}
                      </View>
                      <Text style={{ color: colors.text, fontSize: 14 }}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                  <Button
                    title={t('lesson.submit')}
                    size="sm"
                    onPress={() => {
                      const userAns = quizAnswers[quiz.id];
                      if (userAns !== undefined) {
                        setQuizResults({ ...quizResults, [quiz.id]: userAns === quiz.answer });
                      }
                    }}
                    style={{ marginTop: 8 }}
                  />
                  {result !== undefined && result !== null && (
                    <View style={{
                      flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12,
                      padding: 10, borderRadius: 8,
                      backgroundColor: result ? '#DCFCE7' : '#FEE2E2',
                    }}>
                      <Ionicons name={result ? 'checkmark-circle' : 'close-circle'} size={20} color={result ? '#16A34A' : '#EF4444'} />
                      <Text style={{ color: result ? '#16A34A' : '#EF4444', fontWeight: '500' }}>
                        {result ? t('lesson.correct') : t('lesson.incorrect')}
                      </Text>
                    </View>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </View>
      )}

      {/* Tasks */}
      {lesson.tasks.length > 0 && (
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 12 }}>
            {t('lesson.task')}
          </Text>
          {lesson.tasks.map((task) => (
            <Card key={task.id}>
              <CardContent>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{task.title}</Text>
                <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>{task.description}</Text>
                <TextInput
                  style={{
                    fontFamily: 'monospace', fontSize: 13, color: '#E5E7EB',
                    backgroundColor: '#1F2937', borderRadius: 12, padding: 14, marginTop: 12,
                    minHeight: 100, textAlignVertical: 'top',
                  }}
                  multiline
                  value={taskCode[task.id] || task.starterCode}
                  onChangeText={(text) => setTaskCode({ ...taskCode, [task.id]: text })}
                />
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                  <Button title={t('lesson.runCode')} size="sm" icon={<Ionicons name="play" size={14} color="#FFF" />} />
                  <Button title={t('lesson.resetCode')} size="sm" variant="secondary"
                    onPress={() => setTaskCode({ ...taskCode, [task.id]: task.starterCode })}
                  />
                </View>
              </CardContent>
            </Card>
          ))}
        </View>
      )}

      {/* Mark Complete & Navigation */}
      <View style={{ padding: 16, gap: 12 }}>
        <Button
          title={completed ? t('lesson.completed') : t('lesson.markComplete')}
          variant={completed ? 'secondary' : 'primary'}
          onPress={() => setCompleted(true)}
          disabled={completed}
          fullWidth
          icon={completed ? <Ionicons name="checkmark-circle" size={18} color={colors.green} /> : undefined}
        />
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {prevLesson && (
            <Button
              title={t('lesson.prevLesson')}
              variant="outline"
              style={{ flex: 1 }}
              onPress={() => navigation.replace('Lesson', { courseId, lessonId: prevLesson.id })}
              icon={<Ionicons name="arrow-back" size={16} color={colors.text} />}
            />
          )}
          {nextLesson && (
            <Button
              title={t('lesson.nextLesson')}
              variant="primary"
              style={{ flex: 1 }}
              onPress={() => navigation.replace('Lesson', { courseId, lessonId: nextLesson.id })}
              icon={<Ionicons name="arrow-forward" size={16} color="#FFF" />}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
