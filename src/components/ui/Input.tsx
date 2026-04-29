import React from 'react';
import { View, Text, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { useApp } from '../../hooks/AppContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  icon?: React.ReactNode;
}

export function Input({ label, error, containerStyle, icon, style, ...props }: InputProps) {
  const { colors, isRTL } = useApp();

  return (
    <View style={[{ gap: 6 }, containerStyle]}>
      {label && (
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: colors.text,
          textAlign: isRTL ? 'right' : 'left',
        }}>
          {label}
        </Text>
      )}
      <View style={{
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        backgroundColor: colors.inputBg,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: error ? colors.error : colors.border,
        paddingHorizontal: 12,
      }}>
        {icon && <View style={{ marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0 }}>{icon}</View>}
        <TextInput
          style={[{
            flex: 1,
            paddingVertical: 12,
            fontSize: 14,
            color: colors.text,
            textAlign: isRTL ? 'right' : 'left',
          }, style]}
          placeholderTextColor={colors.textTertiary}
          {...props}
        />
      </View>
      {error && (
        <Text style={{ fontSize: 12, color: colors.error, textAlign: isRTL ? 'right' : 'left' }}>
          {error}
        </Text>
      )}
    </View>
  );
}
