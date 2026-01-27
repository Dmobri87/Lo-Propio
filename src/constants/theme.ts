export const colors = {
  primary: '#4F46E5',
  primaryLight: '#818CF8',
  primaryDark: '#3730A3',

  secondary: '#10B981',
  secondaryLight: '#34D399',
  secondaryDark: '#059669',

  background: '#F9FAFB',
  surface: '#FFFFFF',
  surfaceSecondary: '#F3F4F6',

  text: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',

  border: '#E5E7EB',
  borderLight: '#F3F4F6',

  error: '#EF4444',
  errorLight: '#FEE2E2',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  success: '#10B981',
  successLight: '#D1FAE5',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Status colors
  statusPending: '#F59E0B',
  statusInProgress: '#3B82F6',
  statusCompleted: '#10B981',

  // Priority colors
  priorityHigh: '#EF4444',
  priorityMedium: '#F59E0B',
  priorityLow: '#10B981',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};
