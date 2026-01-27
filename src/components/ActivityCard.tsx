import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Activity } from '../types';
import { STATUS_CONFIG, PRIORITY_CONFIG, CATEGORY_CONFIG } from '../constants';
import { colors, spacing, borderRadius, fontSize } from '../constants/theme';
import { formatDate, formatTime } from '../utils';

interface ActivityCardProps {
  activity: Activity;
  onPress: () => void;
  onStatusChange: () => void;
  onDelete: () => void;
}

export function ActivityCard({
  activity,
  onPress,
  onStatusChange,
  onDelete,
}: ActivityCardProps) {
  const statusConfig = STATUS_CONFIG[activity.status];
  const priorityConfig = PRIORITY_CONFIG[activity.priority];
  const categoryConfig = CATEGORY_CONFIG[activity.category];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={[styles.categoryBadge, { backgroundColor: categoryConfig.color + '20' }]}>
          <Text style={[styles.categoryText, { color: categoryConfig.color }]}>
            {categoryConfig.label}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.priorityIndicator, { backgroundColor: priorityConfig.color }]} />
          <TouchableOpacity onPress={onDelete} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="trash-outline" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {activity.title}
      </Text>

      {activity.description ? (
        <Text style={styles.description} numberOfLines={2}>
          {activity.description}
        </Text>
      ) : null}

      <View style={styles.footer}>
        <Pressable
          style={[styles.statusBadge, { backgroundColor: statusConfig.color + '20' }]}
          onPress={onStatusChange}
        >
          <View style={[styles.statusDot, { backgroundColor: statusConfig.color }]} />
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.label}
          </Text>
        </Pressable>

        <View style={styles.dateContainer}>
          <Ionicons name="time-outline" size={14} color={colors.textLight} />
          <Text style={styles.dateText}>
            {formatDate(activity.createdAt)} - {formatTime(activity.createdAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dateText: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
});
