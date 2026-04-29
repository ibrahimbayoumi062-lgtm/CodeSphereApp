import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useApp } from '../../hooks/AppContext';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const { colors } = useApp();

  const getContainerStyle = (): ViewStyle => {
    const base: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      gap: 6,
    };

    if (fullWidth) base.width = '100%';

    switch (size) {
      case 'sm': Object.assign(base, { paddingHorizontal: 12, paddingVertical: 8 }); break;
      case 'lg': Object.assign(base, { paddingHorizontal: 24, paddingVertical: 16 }); break;
      default: Object.assign(base, { paddingHorizontal: 16, paddingVertical: 12 }); break;
    }

    switch (variant) {
      case 'primary':
        Object.assign(base, { backgroundColor: colors.primary });
        break;
      case 'secondary':
        Object.assign(base, { backgroundColor: colors.inputBg });
        break;
      case 'outline':
        Object.assign(base, { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border });
        break;
      case 'ghost':
        Object.assign(base, { backgroundColor: 'transparent' });
        break;
      case 'danger':
        Object.assign(base, { backgroundColor: colors.error });
        break;
    }

    if (disabled || loading) base.opacity = 0.6;

    return base;
  };

  const getTextStyle = (): TextStyle => {
    const base: TextStyle = { fontWeight: '600' };

    switch (size) {
      case 'sm': base.fontSize = 13; break;
      case 'lg': base.fontSize = 16; break;
      default: base.fontSize = 14; break;
    }

    switch (variant) {
      case 'primary':
      case 'danger':
        base.color = '#FFFFFF';
        break;
      case 'secondary':
        base.color = colors.text;
        break;
      case 'outline':
      case 'ghost':
        base.color = colors.text;
        break;
    }

    return base;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getContainerStyle(), style]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? '#FFF' : colors.primary} />
      ) : (
        <>
          {icon}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
