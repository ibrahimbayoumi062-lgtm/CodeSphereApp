import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Ionicons } from '@expo/vector-icons';

export function LoginScreen({ navigation }: any) {
  const { t, colors, setUser, isRTL } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t('common.error'), 'Please fill all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setUser({
        id: 'user-1',
        name: email.split('@')[0] || 'Learner',
        email,
        role: 'user',
        xp: 250,
        level: 3,
        streak: 5,
        locale: 'en',
      });
      setLoading(false);
    }, 800);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 50, left: 16 }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <View style={{
          width: 60, height: 60, borderRadius: 16, backgroundColor: '#2563EB',
          alignItems: 'center', justifyContent: 'center', marginBottom: 16,
        }}>
          <Ionicons name="code-slash" size={32} color="#FFF" />
        </View>
        <Text style={{ fontSize: 28, fontWeight: '700', color: colors.text }}>
          {t('nav.login')}
        </Text>
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 8 }}>
          Welcome back to CodeSphere
        </Text>
      </View>

      <View style={{ gap: 16 }}>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          icon={<Ionicons name="mail-outline" size={18} color={colors.textTertiary} />}
        />
        <View>
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            icon={<Ionicons name="lock-closed-outline" size={18} color={colors.textTertiary} />}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: 12, top: 38 }}
          >
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        <Button title={t('nav.login')} onPress={handleLogin} loading={loading} size="lg" fullWidth />

        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ alignItems: 'center', marginTop: 12 }}>
          <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
            Don't have an account?{' '}
            <Text style={{ color: colors.primary, fontWeight: '600' }}>{t('nav.signup')}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
