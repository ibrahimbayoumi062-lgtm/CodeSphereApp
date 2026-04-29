import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useApp } from '../../hooks/AppContext';

interface ProgressBarProps {
  value: number;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  height?: number;
  style?: ViewStyle;
}

export function ProgressBar({ value, color = 'blue', height = 8, style }: ProgressBarProps) {
  const { colors } = useApp();

  const colorMap = {
    blue: colors.primary,
    green: colors.green,
    purple: colors.purple,
    orange: colors.orange,
  };

  return (
    <View style={[{
      height,
      borderRadius: height / 2,
      backgroundColor: colors.inputBg,
      overflow: 'hidden',
    }, style]}>
      <View style={{
        height: '100%',
        width: `${Math.min(100, Math.max(0, value))}%`,
        borderRadius: height / 2,
        backgroundColor: colorMap[color],
      }} />
    </View>
  );
}
