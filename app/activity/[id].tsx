import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useActivities } from '../../src/context';
import { StatusSelector } from '../../src/components';
import { Activity, ActivityStatus } from '../../src/types';
import {
  STATUS_CONFIG,
  PRIORITY_CONFIG,
  CATEGORY_CONFIG,
} from '../../src/constants';
import { colors, spacing, borderRadius, fontSize } from '../../src/constants/theme';
import { formatDateTime } from '../../src/utils';

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { activities, updateActivityStatus, deleteActivity } = useActivities();

  const [activity, setActivity] = useState<Activity | null>(null);
  const [showStatusSelector, setShowStatusSelector] = useState(false);

  useEffect(() => {
    const found = activities.find((a) => a.id === id);
    setActivity(found || null);
  }, [id, activities]);

  if (!activity) {
    return (
      <View style={styles.notFound}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.textLight} />
        <Text style={styles.notFoundText}>Actividad no encontrada</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const statusConfig = STATUS_CONFIG[activity.status];
  const priorityConfig = PRIORITY_CONFIG[activity.priority];
  const categoryConfig = CATEGORY_CONFIG[activity.category];

  const handleStatusSelect = async (status: ActivityStatus) => {
    await updateActivityStatus(activity.id, status);
  };

  const handleEdit = () => {
    router.push(`/activity/edit/${activity.id}`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Actividad',
      `¿Estas seguro de que deseas eliminar "${activity.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteActivity(activity.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={[styles.categoryBadge, { backgroundColor: categoryConfig.color + '20' }]}>
            <Text style={[styles.categoryText, { color: categoryConfig.color }]}>
              {categoryConfig.label}
            </Text>
          </View>
          <View style={styles.priorityBadge}>
            <View style={[styles.priorityDot, { backgroundColor: priorityConfig.color }]} />
            <Text style={styles.priorityText}>Prioridad {priorityConfig.label}</Text>
          </View>
        </View>

        <Text style={styles.title}>{activity.title}</Text>

        <TouchableOpacity
          style={[styles.statusBadge, { backgroundColor: statusConfig.color + '15' }]}
          onPress={() => setShowStatusSelector(true)}
        >
          <View style={[styles.statusDot, { backgroundColor: statusConfig.color }]} />
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.label}
          </Text>
          <Ionicons name="chevron-down" size={16} color={statusConfig.color} />
        </TouchableOpacity>

        {activity.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripcion</Text>
            <Text style={styles.description}>{activity.description}</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informacion</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.infoLabel}>Creada</Text>
              <Text style={styles.infoValue}>{formatDateTime(activity.createdAt)}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="refresh-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.infoLabel}>Actualizada</Text>
              <Text style={styles.infoValue}>{formatDateTime(activity.updatedAt)}</Text>
            </View>
            {activity.completedAt && (
              <>
                <View style={styles.infoDivider} />
                <View style={styles.infoRow}>
                  <Ionicons name="checkmark-circle-outline" size={18} color={colors.success} />
                  <Text style={styles.infoLabel}>Completada</Text>
                  <Text style={styles.infoValue}>{formatDateTime(activity.completedAt)}</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color={colors.error} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Ionicons name="pencil-outline" size={20} color={colors.surface} />
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      <StatusSelector
        visible={showStatusSelector}
        currentStatus={activity.status}
        onSelect={handleStatusSelect}
        onClose={() => setShowStatusSelector(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 24,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  infoLabel: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '500',
  },
  infoDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  deleteButton: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.errorLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  editButtonText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.surface,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  notFoundText: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  backButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  backButtonText: {
    color: colors.surface,
    fontWeight: '600',
  },
});
