import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { OrderStatus, getStatusLabel, getStatusColor, getStatusBgColor } from '../../data/mockData';
import { Typography, BorderRadius } from '../../constants/theme';

interface BadgeProps {
  status: OrderStatus;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
}

const Badge: React.FC<BadgeProps> = ({ status, style, textStyle, size = 'md' }) => {
  const color = getStatusColor(status);
  const bgColor = getStatusBgColor(status);
  const label = getStatusLabel(status);

  const sizeStyles = {
    sm: { paddingHorizontal: 8, paddingVertical: 3, fontSize: Typography.fontSize.xs },
    md: { paddingHorizontal: 10, paddingVertical: 4, fontSize: Typography.fontSize.sm },
    lg: { paddingHorizontal: 14, paddingVertical: 6, fontSize: Typography.fontSize.base },
  };

  const currentSize = sizeStyles[size];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bgColor,
          paddingHorizontal: currentSize.paddingHorizontal,
          paddingVertical: currentSize.paddingVertical,
        },
        style,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text
        style={[
          styles.text,
          { color, fontSize: currentSize.fontSize },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  text: {
    fontWeight: Typography.fontWeight.semibold,
    letterSpacing: 0.2,
  },
});

export default Badge;
