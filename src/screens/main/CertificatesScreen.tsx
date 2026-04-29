import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../../hooks/AppContext';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const sampleCertificates = [
  { id: '1', course: 'Python for Beginners', date: '2025-01-15', status: 'earned' },
  { id: '2', course: 'HTML & CSS Fundamentals', date: '2025-02-20', status: 'earned' },
];

export function CertificatesScreen() {
  const { t, colors } = useApp();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text }}>{t('certificates.title')}</Text>

      {sampleCertificates.length > 0 ? (
        <View style={{ marginTop: 16, gap: 16 }}>
          {sampleCertificates.map((cert) => (
            <Card key={cert.id} style={{ overflow: 'hidden' }}>
              <LinearGradient
                colors={['#2563EB', '#7C3AED']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={{ padding: 24, alignItems: 'center' }}
              >
                <Ionicons name="ribbon" size={48} color="#FFF" />
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFF', marginTop: 12 }}>
                  Certificate of Completion
                </Text>
              </LinearGradient>
              <CardContent style={{ alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>{cert.course}</Text>
                <Text style={{ fontSize: 13, color: colors.textSecondary }}>Issued: {cert.date}</Text>
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                  <Button
                    title={t('certificates.download')}
                    size="sm" variant="outline"
                    icon={<Ionicons name="download-outline" size={16} color={colors.text} />}
                  />
                  <Button
                    title="Share"
                    size="sm" variant="ghost"
                    icon={<Ionicons name="share-outline" size={16} color={colors.text} />}
                  />
                </View>
              </CardContent>
            </Card>
          ))}
        </View>
      ) : (
        <Card style={{ marginTop: 20 }}>
          <CardContent style={{ paddingVertical: 40, alignItems: 'center' }}>
            <Ionicons name="ribbon-outline" size={48} color={colors.textTertiary} />
            <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 12 }}>{t('certificates.noCerts')}</Text>
          </CardContent>
        </Card>
      )}
    </ScrollView>
  );
}
