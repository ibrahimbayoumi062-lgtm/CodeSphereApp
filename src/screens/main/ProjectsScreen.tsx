import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Ionicons } from '@expo/vector-icons';

const sampleProjects = [
  { id: '1', title: 'Portfolio Website', description: 'A responsive personal portfolio built with HTML, CSS, and JavaScript.', category: 'html-css', liveUrl: '#', repoUrl: '#' },
  { id: '2', title: 'Todo App', description: 'A full-featured task management app with React and localStorage.', category: 'javascript', liveUrl: '#', repoUrl: '#' },
  { id: '3', title: 'Data Visualizer', description: 'Python script that visualizes COVID-19 data using matplotlib.', category: 'python', repoUrl: '#' },
  { id: '4', title: 'Chat Bot', description: 'A simple AI chatbot built with Python and NLP.', category: 'ai-engineering', repoUrl: '#' },
];

const suggestedProjects = [
  { title: 'Calculator App', description: 'Build a calculator with HTML, CSS, and JavaScript', difficulty: 'beginner', category: 'javascript' },
  { title: 'Weather Dashboard', description: 'Fetch and display weather data from an API', difficulty: 'intermediate', category: 'javascript' },
  { title: 'Snake Game', description: 'Build the classic Snake game using Python', difficulty: 'beginner', category: 'python' },
  { title: 'Image Classifier', description: 'Build an ML model to classify images', difficulty: 'advanced', category: 'ai-engineering' },
];

export function ProjectsScreen() {
  const { t, colors } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text }}>{t('nav.projects')}</Text>
        <Button title="Add Project" size="sm" onPress={() => setShowAdd(!showAdd)} icon={<Ionicons name="add" size={16} color="#FFF" />} />
      </View>

      {showAdd && (
        <Card style={{ marginTop: 16 }}>
          <CardContent style={{ gap: 12 }}>
            <Input label="Project Title" placeholder="My awesome project..." />
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text }}>Description</Text>
              <TextInput style={{ backgroundColor: colors.inputBg, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: colors.border, fontSize: 14, color: colors.text, minHeight: 60, textAlignVertical: 'top' }} multiline placeholder="Describe your project..." placeholderTextColor={colors.textTertiary} />
            </View>
            <Input label="Live URL" placeholder="https://..." />
            <Input label="Repository URL" placeholder="https://github.com/..." />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button title="Save Project" size="sm" />
              <Button title={t('common.cancel')} size="sm" variant="secondary" onPress={() => setShowAdd(false)} />
            </View>
          </CardContent>
        </Card>
      )}

      <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginTop: 20, marginBottom: 12 }}>{t('profile.portfolio')}</Text>
      <View style={{ gap: 12 }}>
        {sampleProjects.map((project) => (
          <Card key={project.id}>
            <CardContent>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text, flex: 1 }}>{project.title}</Text>
                <Badge text={project.category} variant="info" />
              </View>
              <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 6, lineHeight: 18 }}>{project.description}</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                {project.liveUrl && (
                  <Button title="Live" size="sm" variant="outline" icon={<Ionicons name="open-outline" size={14} color={colors.text} />} />
                )}
                {project.repoUrl && (
                  <Button title="Code" size="sm" variant="ghost" icon={<Ionicons name="git-branch-outline" size={14} color={colors.text} />} />
                )}
              </View>
            </CardContent>
          </Card>
        ))}
      </View>

      <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginTop: 24, marginBottom: 12 }}>Suggested Projects</Text>
      <View style={{ gap: 12 }}>
        {suggestedProjects.map((project) => (
          <Card key={project.title}>
            <CardContent>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text, flex: 1 }}>{project.title}</Text>
                <Badge text={project.difficulty} variant={project.difficulty === 'beginner' ? 'success' : project.difficulty === 'intermediate' ? 'warning' : 'error'} />
              </View>
              <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>{project.description}</Text>
            </CardContent>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}
