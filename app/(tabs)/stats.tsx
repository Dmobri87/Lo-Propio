import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useActivities } from '../../src/context';
import { StatsCard } from '../../src/components';
import { calculateWeeklyStats, calculateDailyStats } from '../../src/utils';
import { CATEGORY_CONFIG, PRIORITY_CONFIG } from '../../src/constants';
import { colors, spacing, borderRadius, fontSize } from '../../src/constants/theme';

export default function StatsScreen() {
  const { activities } = useActivities();

  const weeklyStats = useMemo(() => calculateWeeklyStats(activities), [activities]);
  const todayStats = useMemo(
    () => calculateDailyStats(activities, new Date().toISOString()),
    [activities]
  );

  const completionPercentage = Math.round(weeklyStats.completionRate);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Resumen de Hoy</Text>
      <View style={styles.statsRow}>
        <StatsCard
          title="Total"
          value={todayStats.total}
          icon="layers-outline"
          color={colors.primary}
        />
        <StatsCard
          title="Completadas"
          value={todayStats.completed}
          icon="checkmark-circle-outline"
          color={colors.success}
        />
      </View>
      <View style={styles.statsRow}>
        <StatsCard
          title="En Progreso"
          value={todayStats.inProgress}
          icon="time-outline"
          color={colors.info}
        />
        <StatsCard
          title="Pendientes"
          value={todayStats.pending}
          icon="hourglass-outline"
          color={colors.warning}
        />
      </View>

      <Text style={styles.sectionTitle}>Resumen Semanal</Text>
      <View style={styles.weeklyCard}>
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Tasa de Completado</Text>
            <Text style={styles.progressValue}>{completionPercentage}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${completionPercentage}%` },
              ]}
            />
          </View>
          <Text style={styles.progressSubtext}>
            {weeklyStats.completedActivities} de {weeklyStats.totalActivities} actividades
          </Text>
        </View>
      </View>

      {Object.keys(weeklyStats.byCategory).length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Por Categoria</Text>
          <View style={styles.categoryCard}>
            {Object.entries(weeklyStats.byCategory).map(([category, count]) => {
              const config = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];
              const percentage = Math.round((count / weeklyStats.totalActivities) * 100);

              return (
                <View key={category} style={styles.categoryItem}>
                  <View style={styles.categoryHeader}>
                    <View style={[styles.categoryDot, { backgroundColor: config.color }]} />
                    <Text style={styles.categoryLabel}>{config.label}</Text>
                    <Text style={styles.categoryCount}>{count}</Text>
                  </View>
                  <View style={styles.categoryBar}>
                    <View
                      style={[
                        styles.categoryBarFill,
                        { width: `${percentage}%`, backgroundColor: config.color },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </>
      )}

      {Object.keys(weeklyStats.byPriority).length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Por Prioridad</Text>
          <View style={styles.priorityRow}>
            {Object.entries(weeklyStats.byPriority).map(([priority, count]) => {
              const config = PRIORITY_CONFIG[priority as keyof typeof PRIORITY_CONFIG];
              return (
                <View key={priority} style={styles.priorityCard}>
                  <View style={[styles.priorityIndicator, { backgroundColor: config.color }]} />
                  <Text style={styles.priorityCount}>{count}</Text>
                  <Text style={styles.priorityLabel}>{config.label}</Text>
                </View>
              );
            })}
          </View>
        </>
      )}

      {activities.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            Aun no tienes actividades registradas.{'\n'}
            Crea tu primera actividad para ver las estadisticas.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  weeklyCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  progressContainer: {
    gap: spacing.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: fontSize.md,
    fontWeight: '500',
    color: colors.text,
  },
  progressValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressSubtext: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  categoryCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryItem: {
    gap: spacing.xs,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  categoryLabel: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
  },
  categoryCount: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  categoryBar: {
    height: 4,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  categoryBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  priorityCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: spacing.xs,
  },
  priorityCount: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  priorityLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
