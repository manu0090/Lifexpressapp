import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography, Spacing, Shadows } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    badge?: number;
  };
  gradient?: boolean;
  transparent?: boolean;
  style?: ViewStyle;
  titleColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBack,
  rightAction,
  gradient = false,
  transparent = false,
  style,
  titleColor,
}) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 8;

  const content = (
    <View style={[styles.container, { paddingTop }, style]}>
      <View style={styles.row}>
        {/* Left side */}
        <View style={styles.side}>
          {onBack && (
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <View style={[styles.backCircle, gradient && styles.backCircleGradient]}>
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color={gradient ? Colors.textInverse : Colors.textPrimary}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Center */}
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              { color: titleColor || (gradient ? Colors.textInverse : Colors.textPrimary) },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                { color: gradient ? 'rgba(255,255,255,0.75)' : Colors.textSecondary },
              ]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right side */}
        <View style={styles.side}>
          {rightAction && (
            <TouchableOpacity
              onPress={rightAction.onPress}
              style={styles.rightButton}
              activeOpacity={0.7}
            >
              <View style={[styles.rightCircle, gradient && styles.backCircleGradient]}>
                <Ionicons
                  name={rightAction.icon}
                  size={22}
                  color={gradient ? Colors.textInverse : Colors.textPrimary}
                />
                {rightAction.badge !== undefined && rightAction.badge > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {rightAction.badge > 9 ? '9+' : rightAction.badge}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  if (gradient) {
    return (
      <LinearGradient
        colors={Colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientWrapper}
      >
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
        {content}
      </LinearGradient>
    );
  }

  if (transparent) {
    return (
      <View style={[styles.transparentWrapper]}>
        <StatusBar barStyle="dark-content" />
        {content}
      </View>
    );
  }

  return (
    <View style={[styles.solidWrapper, Shadows.sm]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.card} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  gradientWrapper: {
    paddingBottom: Spacing[4],
  },
  solidWrapper: {
    backgroundColor: Colors.card,
    paddingBottom: Spacing[3],
  },
  transparentWrapper: {
    paddingBottom: Spacing[3],
  },
  container: {
    paddingHorizontal: Spacing[5],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
  },
  side: {
    width: 44,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    marginTop: 2,
    textAlign: 'center',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backCircleGradient: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  rightButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: Colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: Colors.card,
  },
  badgeText: {
    color: Colors.textInverse,
    fontSize: 9,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default Header;
