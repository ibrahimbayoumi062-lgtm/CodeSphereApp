import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useApp } from '../../hooks/AppContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  const { colors } = useApp();
  return (
    <View style={[{
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    }, style]}>
      {children}
    </View>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardContent({ children, style }: CardContentProps) {
  return (
    <View style={[{ padding: 16 }, style]}>
      {children}
    </View>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  const { colors } = useApp();
  return (
    <View style={[{
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    }, style]}>
      {children}
    </View>
  );
}
