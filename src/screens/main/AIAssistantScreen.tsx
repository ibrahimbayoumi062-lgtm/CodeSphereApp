import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import type { Message } from '../../types';

const aiResponses: Record<string, string> = {
  'what is a for loop': 'A **for loop** is a control flow statement that allows code to be executed repeatedly based on a given condition.\n\n```python\nfor i in range(5):\n    print(i)  # prints 0, 1, 2, 3, 4\n```\n\nFor loops are used when you know the number of iterations in advance.',
  'explain python decorators': 'A **decorator** in Python is a function that modifies the behavior of another function.\n\n```python\ndef my_decorator(func):\n    def wrapper():\n        print("Before")\n        func()\n        print("After")\n    return wrapper\n\n@my_decorator\ndef say_hello():\n    print("Hello!")\n```',
  'default': "That's a great question! Here's what I can tell you:\n\nThis topic is fundamental in programming. I recommend checking out our courses for a more detailed explanation with hands-on exercises.\n\nWould you like me to explain a specific aspect in more detail?",
};

export function AIAssistantScreen() {
  const { t, colors } = useApp();
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome', role: 'assistant',
    content: "Hello! I'm your AI coding assistant. I can help you with:\n\n- Explaining programming concepts\n- Debugging your code\n- Answering coding questions\n- Reviewing your code\n\nWhat would you like to learn about today?",
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'review'>('chat');
  const [codeReview, setCodeReview] = useState('');
  const [reviewResult, setReviewResult] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const quickQuestions = [
    'What is a for loop?',
    'Explain Python decorators',
    'How does async/await work?',
    'What is machine learning?',
  ];

  const handleSend = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: msg, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const key = msg.toLowerCase();
      const response = aiResponses[key] || aiResponses['default'];
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1200);
  };

  const handleReview = () => {
    if (!codeReview.trim()) return;
    setReviewResult('');
    setTimeout(() => {
      setReviewResult("Code Review Results:\n\n1. Code Structure: Good overall organization\n2. Naming: Variable names are clear and descriptive\n3. Suggestion: Consider adding error handling\n4. Performance: No major issues found\n5. Best Practice: Add type annotations for better maintainability\n\nOverall Score: 8/10");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Tab Switcher */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingTop: 8, gap: 8 }}>
        <Button
          title="Chat"
          variant={activeTab === 'chat' ? 'primary' : 'secondary'}
          size="sm"
          onPress={() => setActiveTab('chat')}
          icon={<Ionicons name="chatbubbles" size={14} color={activeTab === 'chat' ? '#FFF' : colors.text} />}
        />
        <Button
          title={t('ai.codeReview')}
          variant={activeTab === 'review' ? 'primary' : 'secondary'}
          size="sm"
          onPress={() => setActiveTab('review')}
          icon={<Ionicons name="code-slash" size={14} color={activeTab === 'review' ? '#FFF' : colors.text} />}
        />
      </View>

      {activeTab === 'chat' ? (
        <>
          {/* Messages */}
          <ScrollView ref={scrollRef} style={{ flex: 1, padding: 16 }} contentContainerStyle={{ paddingBottom: 16 }}>
            {messages.map((msg) => (
              <View key={msg.id} style={{
                flexDirection: 'row', gap: 10, marginBottom: 16,
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                {msg.role === 'assistant' && (
                  <View style={{
                    width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary,
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Ionicons name="sparkles" size={16} color="#FFF" />
                  </View>
                )}
                <View style={{
                  maxWidth: '80%', padding: 14, borderRadius: 16,
                  backgroundColor: msg.role === 'user' ? colors.primary : colors.card,
                  borderWidth: msg.role === 'assistant' ? 1 : 0, borderColor: colors.border,
                }}>
                  <Text style={{
                    fontSize: 14, lineHeight: 20,
                    color: msg.role === 'user' ? '#FFF' : colors.text,
                  }}>{msg.content}</Text>
                </View>
              </View>
            ))}
            {loading && (
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{
                  width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary,
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Ionicons name="sparkles" size={16} color="#FFF" />
                </View>
                <View style={{
                  padding: 14, borderRadius: 16, backgroundColor: colors.card,
                  borderWidth: 1, borderColor: colors.border,
                }}>
                  <Text style={{ color: colors.textSecondary }}>Thinking...</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Quick Questions */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 40, paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {quickQuestions.map((q) => (
                <TouchableOpacity
                  key={q}
                  onPress={() => handleSend(q)}
                  style={{
                    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
                    backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.border,
                  }}
                >
                  <Text style={{ fontSize: 12, color: colors.textSecondary }}>{q}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Input */}
          <View style={{
            flexDirection: 'row', alignItems: 'center', gap: 8,
            padding: 16, borderTopWidth: 1, borderTopColor: colors.border,
          }}>
            <TextInput
              style={{
                flex: 1, backgroundColor: colors.inputBg, borderRadius: 24,
                paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, color: colors.text,
                borderWidth: 1, borderColor: colors.border,
              }}
              placeholder={t('ai.placeholder')}
              placeholderTextColor={colors.textTertiary}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => handleSend()}
            />
            <TouchableOpacity
              onPress={() => handleSend()}
              style={{
                width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary,
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Ionicons name="send" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <ScrollView style={{ flex: 1, padding: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text, marginBottom: 8 }}>
            {t('ai.pasteCode')}
          </Text>
          <TextInput
            style={{
              fontFamily: 'monospace', fontSize: 13, color: '#E5E7EB',
              backgroundColor: '#1F2937', borderRadius: 12, padding: 14,
              minHeight: 200, textAlignVertical: 'top',
            }}
            multiline
            value={codeReview}
            onChangeText={setCodeReview}
            placeholder="Paste your code here..."
            placeholderTextColor="#6B7280"
          />
          <Button
            title={t('ai.review')}
            onPress={handleReview}
            style={{ marginTop: 12 }}
            fullWidth
            icon={<Ionicons name="search" size={16} color="#FFF" />}
          />
          {reviewResult ? (
            <Card style={{ marginTop: 16 }}>
              <CardContent>
                <Text style={{ fontSize: 14, color: colors.text, lineHeight: 22 }}>{reviewResult}</Text>
              </CardContent>
            </Card>
          ) : null}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
