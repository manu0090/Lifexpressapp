import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadows } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  padding?: number;
  borderRadius?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
  padding = 16,
  borderRadius = BorderRadius.xl,
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    { padding, borderRadius },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={cardStyle}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.card,
    overflow: 'hidden',
  },
  default: {
    ...Shadows.md,
  },
  elevated: {
    ...Shadows.lg,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  flat: {
    backgroundColor: Colors.backgroundDark,
  },
});

export default Card;
