export const Colors = {
  // Primary palette
  primary: '#1A56DB',
  primaryLight: '#3B82F6',
  primaryDark: '#1E40AF',
  primaryFaded: '#EFF6FF',

  // Secondary palette
  secondary: '#F97316',
  secondaryLight: '#FB923C',
  secondaryDark: '#EA580C',
  secondaryFaded: '#FFF7ED',

  // Backgrounds
  background: '#F8FAFC',
  backgroundDark: '#F1F5F9',
  card: '#FFFFFF',
  cardHover: '#F8FAFC',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',
  textMuted: '#CBD5E1',

  // Status colors
  success: '#10B981',
  successLight: '#D1FAE5',
  successDark: '#059669',

  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  warningDark: '#D97706',

  error: '#EF4444',
  errorLight: '#FEE2E2',
  errorDark: '#DC2626',

  info: '#06B6D4',
  infoLight: '#CFFAFE',
  infoDark: '#0891B2',

  purple: '#8B5CF6',
  purpleLight: '#EDE9FE',
  purpleDark: '#7C3AED',

  // Borders & Dividers
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  divider: '#E2E8F0',

  // Shadows
  shadowColor: '#000000',

  // Gradients (as arrays for LinearGradient)
  gradientPrimary: ['#1A56DB', '#3B82F6'] as string[],
  gradientSecondary: ['#F97316', '#FB923C'] as string[],
  gradientDark: ['#0F172A', '#1E293B'] as string[],
  gradientSuccess: ['#059669', '#10B981'] as string[],
  gradientPurple: ['#7C3AED', '#8B5CF6'] as string[],
  gradientOrange: ['#EA580C', '#F97316'] as string[],

  // Tab bar
  tabBarActive: '#1A56DB',
  tabBarInactive: '#94A3B8',
  tabBarBackground: '#FFFFFF',

  // Transparent
  transparent: 'transparent',
  overlay: 'rgba(15, 23, 42, 0.5)',
  overlayLight: 'rgba(15, 23, 42, 0.2)',
};

export type ColorKey = keyof typeof Colors;
