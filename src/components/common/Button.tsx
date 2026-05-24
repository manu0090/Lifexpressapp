import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography, BorderRadius, Spacing } from '../../constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  fullWidth = false,
}) => {
  const sizeStyles = getSizeStyles(size);
  const isDisabled = disabled || loading;

  const renderContent = () => (
    <View style={styles.contentRow}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.textInverse}
          size="small"
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={sizeStyles.iconSize}
              color={getIconColor(variant)}
              style={styles.iconLeft}
            />
          )}
          <Text style={[styles.text, sizeStyles.text, getTextStyle(variant), textStyle]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={sizeStyles.iconSize}
              color={getIconColor(variant)}
              style={styles.iconRight}
            />
          )}
        </>
      )}
    </View>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={[fullWidth && styles.fullWidth, style]}
      >
        <LinearGradient
          colors={isDisabled ? ['#94A3B8', '#CBD5E1'] : [Colors.primary, Colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, sizeStyles.container, styles.primaryGradient]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'secondary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={[fullWidth && styles.fullWidth, style]}
      >
        <LinearGradient
          colors={isDisabled ? ['#94A3B8', '#CBD5E1'] : [Colors.secondary, Colors.secondaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, sizeStyles.container, styles.primaryGradient]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        sizeStyles.container,
        getContainerStyle(variant),
        isDisabled && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const getSizeStyles = (size: ButtonSize) => {
  const sizes = {
    sm: {
      container: { height: 38, paddingHorizontal: Spacing[4] },
      text: { fontSize: Typography.fontSize.sm },
      iconSize: 16,
    },
    md: {
      container: { height: 52, paddingHorizontal: Spacing[6] },
      text: { fontSize: Typography.fontSize.md },
      iconSize: 18,
    },
    lg: {
      container: { height: 58, paddingHorizontal: Spacing[8] },
      text: { fontSize: Typography.fontSize.lg },
      iconSize: 20,
    },
  };
  return sizes[size];
};

const getContainerStyle = (variant: ButtonVariant): ViewStyle => {
  const containerStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {},
    secondary: {},
    outline: {
      backgroundColor: Colors.transparent,
      borderWidth: 1.5,
      borderColor: Colors.primary,
    },
    ghost: {
      backgroundColor: Colors.transparent,
    },
    danger: {
      backgroundColor: Colors.error,
    },
  };
  return containerStyles[variant];
};

const getTextStyle = (variant: ButtonVariant): TextStyle => {
  const textStyles: Record<ButtonVariant, TextStyle> = {
    primary: { color: Colors.textInverse },
    secondary: { color: Colors.textInverse },
    outline: { color: Colors.primary },
    ghost: { color: Colors.primary },
    danger: { color: Colors.textInverse },
  };
  return textStyles[variant];
};

const getIconColor = (variant: ButtonVariant): string => {
  const iconColors: Record<ButtonVariant, string> = {
    primary: Colors.textInverse,
    secondary: Colors.textInverse,
    outline: Colors.primary,
    ghost: Colors.primary,
    danger: Colors.textInverse,
  };
  return iconColors[variant];
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  primaryGradient: {
    borderRadius: BorderRadius.xl,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: Typography.fontWeight.semibold,
    letterSpacing: Typography.letterSpacing.wide,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
});

export default Button;
