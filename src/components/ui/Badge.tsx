import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { useApp } from '../../hooks/AppContext';

interface BadgeProps {
  text: string;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  style?: ViewStyle;
}

export function Badge({ text, variant = 'default', style }: BadgeProps) {
  const { colors } = useApp();

  const getColors = () => {
    switch (variant) {
      case 'info': return { bg: colors.blueLight, text: colors.blue };
      case 'success': return { bg: colors.greenLight, text: colors.green };
      case 'warning': return { bg: colors.orangeLight, text: colors.orange };
      case 'error': return { bg: '#FEE2E2', text: colors.red };
      default: return { bg: colors.inputBg, text: colors.textSecondary };
    }
  };

  const c = getColors();

  return (
    <View style={[{
      backgroundColor: c.bg,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
      alignSelf: 'flex-start',
    }, style]}>
      <Text style={{ color: c.text, fontSize: 12, fontWeight: '600' }}>{text}</Text>
    </View>
  );
}
