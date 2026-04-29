import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Input } from '../../components/ui/Input';
import { Ionicons } from '@expo/vector-icons';
import type { Post } from '../../types';

const samplePosts: Post[] = [
  { id: '1', author: 'Ahmed Hassan', avatar: null, title: 'How to start with Machine Learning?', content: 'I finished the Python course and want to move to ML. Any recommendations?', category: 'question', likes: 12, replies: 5, time: '2h ago' },
  { id: '2', author: 'Sarah Johnson', avatar: null, title: 'My first portfolio website', content: 'Just completed the HTML/CSS course and built my first portfolio!', category: 'project', likes: 24, replies: 8, time: '5h ago' },
  { id: '3', author: 'Mohamed Ali', avatar: null, title: 'JavaScript vs Python for beginners', content: 'Which language should a complete beginner start with?', category: 'discussion', likes: 18, replies: 15, time: '1d ago' },
  { id: '4', author: 'Lisa Mueller', avatar: null, title: 'Tips for solving C++ pointer problems', content: "I've been struggling with pointers. Here are tips that helped me.", category: 'discussion', likes: 31, replies: 7, time: '2d ago' },
];

const categoryBadge: Record<string, 'info' | 'warning' | 'success'> = {
  question: 'warning', discussion: 'info', project: 'success',
};

export function CommunityScreen() {
  const { t, colors } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [posts, setPosts] = useState(samplePosts);

  const categories = [
    { value: 'all', label: t('courses.all') },
    { value: 'discussion', label: t('community.discussions') },
    { value: 'question', label: t('community.questions') },
    { value: 'project', label: t('community.projects') },
  ];

  const filtered = posts.filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handlePublish = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const newPost: Post = {
      id: Date.now().toString(), author: 'You', avatar: null,
      title: newTitle, content: newContent, category: 'discussion',
      likes: 0, replies: 0, time: 'Just now',
    };
    setPosts([newPost, ...posts]);
    setNewTitle(''); setNewContent(''); setShowNewPost(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text }}>{t('community.title')}</Text>
        <Button
          title={t('community.newPost')}
          size="sm"
          onPress={() => setShowNewPost(!showNewPost)}
          icon={<Ionicons name="add" size={16} color="#FFF" />}
        />
      </View>

      {showNewPost && (
        <Card style={{ marginTop: 16 }}>
          <CardContent style={{ gap: 12 }}>
            <Input label={t('community.postTitle')} value={newTitle} onChangeText={setNewTitle} placeholder="Enter your post title..." />
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text }}>{t('community.postContent')}</Text>
              <TextInput
                style={{
                  backgroundColor: colors.inputBg, borderRadius: 12, padding: 12,
                  borderWidth: 1, borderColor: colors.border, fontSize: 14,
                  color: colors.text, minHeight: 80, textAlignVertical: 'top',
                }}
                multiline value={newContent} onChangeText={setNewContent} placeholder="Write your post..."
                placeholderTextColor={colors.textTertiary}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button title={t('community.publish')} size="sm" onPress={handlePublish} />
              <Button title={t('common.cancel')} size="sm" variant="secondary" onPress={() => setShowNewPost(false)} />
            </View>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', backgroundColor: colors.inputBg,
        borderRadius: 12, paddingHorizontal: 12, marginTop: 16, borderWidth: 1, borderColor: colors.border,
      }}>
        <Ionicons name="search" size={18} color={colors.textTertiary} />
        <TextInput
          style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 8, fontSize: 14, color: colors.text }}
          placeholder={t('common.search')} placeholderTextColor={colors.textTertiary}
          value={search} onChangeText={setSearch}
        />
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {categories.map((cat) => (
            <Button key={cat.value} title={cat.label} variant={activeCategory === cat.value ? 'primary' : 'secondary'} size="sm" onPress={() => setActiveCategory(cat.value)} />
          ))}
        </View>
      </ScrollView>

      {/* Posts */}
      <View style={{ marginTop: 16, gap: 12 }}>
        {filtered.map((post) => (
          <Card key={post.id}>
            <CardContent>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Avatar name={post.author} size="sm" />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>{post.author}</Text>
                  <Text style={{ fontSize: 11, color: colors.textTertiary }}>{post.time}</Text>
                </View>
                <Badge text={post.category} variant={categoryBadge[post.category] || 'default'} />
              </View>
              <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{post.title}</Text>
              <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4, lineHeight: 18 }}>{post.content}</Text>
              <View style={{ flexDirection: 'row', gap: 16, marginTop: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons name="heart-outline" size={16} color={colors.textTertiary} />
                  <Text style={{ fontSize: 12, color: colors.textSecondary }}>{post.likes} {t('community.likes')}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons name="chatbubble-outline" size={16} color={colors.textTertiary} />
                  <Text style={{ fontSize: 12, color: colors.textSecondary }}>{post.replies} {t('community.replies')}</Text>
                </View>
              </View>
            </CardContent>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}
