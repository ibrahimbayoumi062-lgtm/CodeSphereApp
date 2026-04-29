import React from 'react';
import { View, Text, Image, ViewStyle, ImageStyle } from 'react-native';
import { useApp } from '../../hooks/AppContext';

interface AvatarProps {
  name: string;
  image?: string | null;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

const sizeMap = { sm: 32, md: 40, lg: 64 };
const fontMap = { sm: 12, md: 14, lg: 24 };

export function Avatar({ name, image, size = 'md', style }: AvatarProps) {
  const { colors } = useApp();
  const dim = sizeMap[size];
  const fontSize = fontMap[size];
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (image) {
    return (
      <Image
        source={{ uri: image }}
        style={[{
          width: dim, height: dim, borderRadius: dim / 2,
        }, style as ImageStyle]}
      />
    );
  }

  return (
    <View
      style={[{
        width: dim,
        height: dim,
        borderRadius: dim / 2,
        backgroundColor: colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
      }, style]}
    >
      <Text style={{ color: colors.primary, fontSize, fontWeight: '700' }}>
        {initials}
      </Text>
    </View>
  );
}
