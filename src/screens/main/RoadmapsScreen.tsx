import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const roadmaps = [
  {
    id: 'webdev', title: 'Web Developer', icon: '🌐', colors: ['#3B82F6', '#06B6D4'] as [string, string],
    steps: [
      { title: 'HTML & CSS Fundamentals', desc: 'Learn the building blocks of the web', skills: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox'], duration: '4-6 weeks' },
      { title: 'JavaScript Essentials', desc: 'Add interactivity to web pages', skills: ['Variables', 'Functions', 'DOM', 'Events'], duration: '6-8 weeks' },
      { title: 'Frontend Frameworks', desc: 'Build modern web applications', skills: ['React', 'Next.js', 'State Management'], duration: '8-10 weeks' },
      { title: 'Backend Development', desc: 'Build servers and APIs', skills: ['Node.js', 'Express', 'REST APIs', 'Databases'], duration: '8-10 weeks' },
      { title: 'Full-Stack Projects', desc: 'Build complete applications', skills: ['Deployment', 'CI/CD', 'Testing'], duration: 'Ongoing' },
    ],
  },
  {
    id: 'ai', title: 'AI Engineer', icon: '🤖', colors: ['#8B5CF6', '#EC4899'] as [string, string],
    steps: [
      { title: 'Python Mastery', desc: 'Master Python programming', skills: ['Python Basics', 'Data Structures', 'OOP'], duration: '6-8 weeks' },
      { title: 'Mathematics for AI', desc: 'Learn the math behind AI', skills: ['Linear Algebra', 'Calculus', 'Probability'], duration: '6-8 weeks' },
      { title: 'Machine Learning', desc: 'Understand ML algorithms', skills: ['Supervised Learning', 'Unsupervised Learning'], duration: '10-12 weeks' },
      { title: 'Deep Learning', desc: 'Neural networks and deep learning', skills: ['Neural Networks', 'CNNs', 'Transformers'], duration: '10-12 weeks' },
      { title: 'AI Projects', desc: 'Build and deploy AI systems', skills: ['MLOps', 'Model Serving', 'AI Ethics'], duration: 'Ongoing' },
    ],
  },
  {
    id: 'data', title: 'Data Analyst', icon: '📊', colors: ['#22C55E', '#10B981'] as [string, string],
    steps: [
      { title: 'Python Basics', desc: 'Learn Python for data analysis', skills: ['Python', 'Pandas', 'NumPy'], duration: '4-6 weeks' },
      { title: 'Data Visualization', desc: 'Create compelling visualizations', skills: ['Matplotlib', 'Seaborn', 'Plotly'], duration: '4-6 weeks' },
      { title: 'SQL & Databases', desc: 'Query and manage data', skills: ['SQL', 'PostgreSQL', 'ETL'], duration: '4-6 weeks' },
      { title: 'Statistics & Analytics', desc: 'Statistical analysis and insights', skills: ['Descriptive Stats', 'Hypothesis Testing'], duration: '6-8 weeks' },
      { title: 'Business Intelligence', desc: 'Drive decisions with data', skills: ['Tableau', 'Power BI', 'Reporting'], duration: 'Ongoing' },
    ],
  },
  {
    id: 'gamedev', title: 'Game Developer', icon: '🎮', colors: ['#EF4444', '#B91C1C'] as [string, string],
    steps: [
      { title: 'Programming Basics', desc: 'Learn programming fundamentals', skills: ['C#', 'Variables', 'OOP'], duration: '4-6 weeks' },
      { title: 'Game Engine Basics', desc: 'Get started with Unity', skills: ['Unity Interface', 'GameObjects', 'Physics'], duration: '6-8 weeks' },
      { title: '2D Game Development', desc: 'Build 2D games', skills: ['Sprites', 'Tilemaps', 'Animations'], duration: '6-8 weeks' },
      { title: '3D Game Development', desc: 'Move to 3D games', skills: ['3D Models', 'Lighting', 'Shaders'], duration: '10-12 weeks' },
      { title: 'Publish Your Game', desc: 'Release on app stores', skills: ['Optimization', 'Testing', 'Marketing'], duration: 'Ongoing' },
    ],
  },
];

export function RoadmapsScreen() {
  const { t, colors } = useApp();
  const [selectedRoadmap, setSelectedRoadmap] = useState(roadmaps[0].id);
  const current = roadmaps.find((r) => r.id === selectedRoadmap)!;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text }}>{t('roadmaps.title')}</Text>

      {/* Roadmap Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {roadmaps.map((r) => (
            <TouchableOpacity
              key={r.id}
              onPress={() => setSelectedRoadmap(r.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={selectedRoadmap === r.id ? r.colors : [colors.inputBg, colors.inputBg]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={{ paddingHorizontal: 16, paddingVertical: 12, borderRadius: 14, alignItems: 'center', minWidth: 100 }}
              >
                <Text style={{ fontSize: 24 }}>{r.icon}</Text>
                <Text style={{
                  fontSize: 12, fontWeight: '600', marginTop: 4,
                  color: selectedRoadmap === r.id ? '#FFF' : colors.text,
                }}>{r.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Steps */}
      <View style={{ marginTop: 20 }}>
        {current.steps.map((step, idx) => (
          <View key={idx} style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            {/* Timeline */}
            <View style={{ alignItems: 'center', width: 32 }}>
              <LinearGradient
                colors={current.colors}
                style={{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>{idx + 1}</Text>
              </LinearGradient>
              {idx < current.steps.length - 1 && (
                <View style={{ width: 2, flex: 1, backgroundColor: colors.border, marginVertical: 4 }} />
              )}
            </View>
            {/* Content */}
            <Card style={{ flex: 1 }}>
              <CardContent>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{step.title}</Text>
                <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>{step.desc}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                  {step.skills.map((skill) => (
                    <Badge key={skill} text={skill} variant="info" />
                  ))}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 10 }}>
                  <Ionicons name="time-outline" size={14} color={colors.textTertiary} />
                  <Text style={{ fontSize: 12, color: colors.textSecondary }}>{step.duration}</Text>
                </View>
              </CardContent>
            </Card>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
