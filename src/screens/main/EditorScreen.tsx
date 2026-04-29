import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

const defaultCode: Record<string, string> = {
  python: `# Python - Welcome to CodeSphere!
def fibonacci(n):
    """Generate Fibonacci sequence"""
    sequence = []
    a, b = 0, 1
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    return sequence

result = fibonacci(10)
print("Fibonacci:", result)
print("Sum:", sum(result))`,
  javascript: `// JavaScript - Welcome to CodeSphere!
function reverseString(str) {
  return str.split('').reverse().join('');
}

function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === reverseString(cleaned);
}

const words = ['racecar', 'hello', 'level'];
words.forEach(word => {
  console.log(\`"\${word}" is \${isPalindrome(word) ? '' : 'not '}a palindrome\`);
});`,
  cpp: `// C++ - Welcome to CodeSphere!
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums = {5, 2, 8, 1, 9, 3};
    sort(nums.begin(), nums.end());
    for (int n : nums) cout << n << " ";
    cout << endl;
    return 0;
}`,
};

export function EditorScreen() {
  const { t, colors } = useApp();
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(defaultCode.python);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const handleRun = () => {
    setRunning(true);
    setOutput('');
    setTimeout(() => {
      if (language === 'python') {
        setOutput('Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\nSum: 88');
      } else if (language === 'javascript') {
        setOutput('"racecar" is a palindrome\n"hello" is not a palindrome\n"level" is a palindrome');
      } else {
        setOutput('1 2 3 5 8 9');
      }
      setRunning(false);
    }, 1000);
  };

  const languages = [
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'javascript', label: 'JS', icon: '⚡' },
    { value: 'cpp', label: 'C++', icon: '⚙️' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>{t('editor.title')}</Text>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.value}
              onPress={() => { setLanguage(lang.value); setCode(defaultCode[lang.value]); setOutput(''); }}
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 4,
                paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8,
                backgroundColor: language === lang.value ? colors.primary : colors.inputBg,
              }}
            >
              <Text style={{ fontSize: 14 }}>{lang.icon}</Text>
              <Text style={{
                fontSize: 12, fontWeight: '600',
                color: language === lang.value ? '#FFF' : colors.text,
              }}>{lang.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Editor */}
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View style={{
          flex: 2, backgroundColor: '#1F2937', borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: 'hidden',
        }}>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            paddingHorizontal: 14, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#374151',
          }}>
            <Text style={{ fontSize: 12, color: '#9CA3AF', fontWeight: '500' }}>
              {languages.find((l) => l.value === language)?.label}
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity onPress={() => { setCode(defaultCode[language]); setOutput(''); }}>
                <Ionicons name="refresh" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            style={{
              flex: 1, fontFamily: 'monospace', fontSize: 13, color: '#E5E7EB',
              padding: 14, textAlignVertical: 'top',
            }}
            multiline
            value={code}
            onChangeText={setCode}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Run Button */}
        <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 8 }}>
          <Button
            title={running ? t('editor.running') : t('editor.run')}
            onPress={handleRun}
            loading={running}
            style={{ flex: 1 }}
            icon={!running ? <Ionicons name="play" size={16} color="#FFF" /> : undefined}
          />
          <Button
            title={t('editor.clear')}
            variant="secondary"
            onPress={() => setOutput('')}
            icon={<Ionicons name="trash-outline" size={16} color={colors.text} />}
          />
        </View>

        {/* Output */}
        <View style={{
          flex: 1, backgroundColor: '#111827', borderRadius: 16, padding: 14, marginBottom: 16,
        }}>
          <Text style={{ fontSize: 12, color: '#9CA3AF', fontWeight: '600', marginBottom: 8 }}>
            {t('editor.output')}
          </Text>
          <ScrollView>
            <Text style={{ fontFamily: 'monospace', fontSize: 13, color: '#4ADE80' }}>
              {output || '// Run your code to see output here'}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
