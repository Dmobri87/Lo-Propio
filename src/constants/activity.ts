import { ActivityCategory, ActivityPriority, ActivityStatus } from '../types';
import { colors } from './theme';

export const STATUS_CONFIG: Record<ActivityStatus, { label: string; color: string; icon: string }> = {
  pending: {
    label: 'Pendiente',
    color: colors.statusPending,
    icon: 'clock-outline',
  },
  in_progress: {
    label: 'En Progreso',
    color: colors.statusInProgress,
    icon: 'progress-clock',
  },
  completed: {
    label: 'Completada',
    color: colors.statusCompleted,
    icon: 'check-circle-outline',
  },
};

export const PRIORITY_CONFIG: Record<ActivityPriority, { label: string; color: string; icon: string }> = {
  high: {
    label: 'Alta',
    color: colors.priorityHigh,
    icon: 'arrow-up-bold',
  },
  medium: {
    label: 'Media',
    color: colors.priorityMedium,
    icon: 'minus',
  },
  low: {
    label: 'Baja',
    color: colors.priorityLow,
    icon: 'arrow-down-bold',
  },
};

export const CATEGORY_CONFIG: Record<ActivityCategory, { label: string; icon: string; color: string }> = {
  meeting: {
    label: 'Reunion',
    icon: 'account-group',
    color: '#8B5CF6',
  },
  development: {
    label: 'Desarrollo',
    icon: 'code-braces',
    color: '#3B82F6',
  },
  administration: {
    label: 'Administracion',
    icon: 'file-document-outline',
    color: '#6B7280',
  },
  communication: {
    label: 'Comunicacion',
    icon: 'message-text-outline',
    color: '#EC4899',
  },
  planning: {
    label: 'Planificacion',
    icon: 'calendar-outline',
    color: '#F59E0B',
  },
  review: {
    label: 'Revision',
    icon: 'eye-outline',
    color: '#10B981',
  },
  other: {
    label: 'Otro',
    icon: 'dots-horizontal',
    color: '#9CA3AF',
  },
};

export const STATUS_OPTIONS = Object.entries(STATUS_CONFIG).map(([value, config]) => ({
  value: value as ActivityStatus,
  label: config.label,
}));

export const PRIORITY_OPTIONS = Object.entries(PRIORITY_CONFIG).map(([value, config]) => ({
  value: value as ActivityPriority,
  label: config.label,
}));

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_CONFIG).map(([value, config]) => ({
  value: value as ActivityCategory,
  label: config.label,
}));
