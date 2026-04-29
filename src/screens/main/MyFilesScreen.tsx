import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Linking, Share } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

interface SavedFile {
  lessonId: string;
  courseId: string;
  courseSlug: string;
  title: string;
  titleAr: string;
  titleDe: string;
  courseTitle: string;
  courseTitleAr: string;
  courseTitleDe: string;
  videoUrl: string;
  duration: number;
  savedAt: string;
}

export function MyFilesScreen({ navigation }: any) {
  const { t, getLocalized, colors } = useApp();
  const [files, setFiles] = useState<SavedFile[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, [])
  );

  const loadFiles = async () => {
    try {
      const saved = await AsyncStorage.getItem('codesphere-my-files');
      if (saved) {
        setFiles(JSON.parse(saved));
      }
    } catch {
      setFiles([]);
    }
  };

  const removeFile = async (lessonId: string) => {
    Alert.alert(
      t('myFiles.remove'),
      'Are you sure?',
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('myFiles.remove'),
          style: 'destructive',
          onPress: async () => {
            const updated = files.filter((f) => f.lessonId !== lessonId);
            setFiles(updated);
            await AsyncStorage.setItem('codesphere-my-files', JSON.stringify(updated));
          },
        },
      ]
    );
  };

  const openVideo = (videoUrl: string) => {
    const watchUrl = videoUrl.replace('/embed/', '/watch?v=');
    Linking.openURL(watchUrl);
  };

  const shareFile = async (file: SavedFile) => {
    try {
      const watchUrl = file.videoUrl.replace('/embed/', '/watch?v=');
      await Share.share({
        title: file.title,
        message: `Check out this lesson: ${file.title} - ${watchUrl}`,
        url: watchUrl,
      });
    } catch {
      // User cancelled
    }
  };

  const shareAll = async () => {
    if (files.length === 0) return;
    try {
      const lines = files.map((f) => {
        const url = f.videoUrl.replace('/embed/', '/watch?v=');
        return `${f.title}: ${url}`;
      });
      await Share.share({
        title: 'My CodeSphere Videos',
        message: `My Saved Videos from CodeSphere:\n\n${lines.join('\n')}`,
      });
    } catch {
      // User cancelled
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingTop: 50 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel={t('common.back')}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text }} accessibilityRole="header">
            {t('myFiles.savedVideos')}
          </Text>
        </View>
        {files.length > 0 && (
          <TouchableOpacity onPress={shareAll} accessibilityRole="button" accessibilityLabel={t('myFiles.exportAll')}>
            <Ionicons name="share-outline" size={22} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {files.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
          <Ionicons name="folder-open-outline" size={64} color={colors.textTertiary} />
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginTop: 16, textAlign: 'center' }}>
            {t('myFiles.noFiles')}
          </Text>
          <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 8, textAlign: 'center' }}>
            Save videos from lessons to access them here.
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 100 }}>
          <Text style={{ fontSize: 13, color: colors.textSecondary, marginBottom: 4 }}>
            {files.length} {files.length === 1 ? 'video' : 'videos'} saved
          </Text>
          {files.map((file) => (
            <View
              key={file.lessonId}
              style={{
                backgroundColor: colors.card, borderRadius: 14, padding: 14,
                borderWidth: 1, borderColor: colors.border,
              }}
              accessibilityRole="button"
              accessibilityLabel={`${getLocalized(file.title, file.titleAr, file.titleDe)} from ${getLocalized(file.courseTitle, file.courseTitleAr, file.courseTitleDe)}`}
            >
              <TouchableOpacity onPress={() => openVideo(file.videoUrl)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{
                    width: 48, height: 48, borderRadius: 12,
                    backgroundColor: colors.primaryLight,
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Ionicons name="play-circle" size={28} color={colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>
                      {getLocalized(file.title, file.titleAr, file.titleDe)}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                      {getLocalized(file.courseTitle, file.courseTitleAr, file.courseTitleDe)}
                    </Text>
                    <Text style={{ fontSize: 11, color: colors.textTertiary, marginTop: 2 }}>
                      {t('myFiles.savedOn')} {formatDate(file.savedAt)} • {file.duration} min
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                <TouchableOpacity
                  onPress={() => openVideo(file.videoUrl)}
                  accessibilityRole="button"
                  accessibilityLabel={t('myFiles.openVideo')}
                  style={{
                    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                    gap: 6, paddingVertical: 8, borderRadius: 8,
                    backgroundColor: colors.primaryLight,
                  }}
                >
                  <Ionicons name="play" size={14} color={colors.primary} />
                  <Text style={{ fontSize: 12, fontWeight: '600', color: colors.primary }}>{t('myFiles.openVideo')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => shareFile(file)}
                  accessibilityRole="button"
                  accessibilityLabel={t('myFiles.shareFile')}
                  style={{
                    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                    gap: 6, paddingVertical: 8, borderRadius: 8,
                    backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border,
                  }}
                >
                  <Ionicons name="share-social" size={14} color={colors.text} />
                  <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text }}>{t('myFiles.shareFile')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removeFile(file.lessonId)}
                  accessibilityRole="button"
                  accessibilityLabel={t('myFiles.remove')}
                  style={{
                    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8,
                    backgroundColor: '#FEE2E2',
                  }}
                >
                  <Ionicons name="trash-outline" size={14} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
