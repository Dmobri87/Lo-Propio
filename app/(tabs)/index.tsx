import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useActivities } from '../../src/context';
import { ActivityCard, EmptyState, FilterBar, StatusSelector } from '../../src/components';
import { Activity, ActivityStatus } from '../../src/types';
import { colors, spacing } from '../../src/constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const {
    filteredActivities,
    filters,
    isLoading,
    setFilters,
    clearFilters,
    updateActivityStatus,
    deleteActivity,
    refreshActivities,
  } = useActivities();

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showStatusSelector, setShowStatusSelector] = useState(false);

  const handleActivityPress = (activity: Activity) => {
    router.push(`/activity/${activity.id}`);
  };

  const handleStatusChange = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowStatusSelector(true);
  };

  const handleStatusSelect = async (status: ActivityStatus) => {
    if (selectedActivity) {
      await updateActivityStatus(selectedActivity.id, status);
    }
    setSelectedActivity(null);
  };

  const handleDelete = (activity: Activity) => {
    Alert.alert(
      'Eliminar Actividad',
      `¿Estas seguro de que deseas eliminar "${activity.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteActivity(activity.id),
        },
      ]
    );
  };

  const handleAddActivity = () => {
    router.push('/activity/new');
  };

  const renderActivity = ({ item }: { item: Activity }) => (
    <ActivityCard
      activity={item}
      onPress={() => handleActivityPress(item)}
      onStatusChange={() => handleStatusChange(item)}
      onDelete={() => handleDelete(item)}
    />
  );

  return (
    <View style={styles.container}>
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
      />

      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={renderActivity}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshActivities}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <EmptyState
            icon="clipboard-outline"
            title="No hay actividades"
            description="Crea tu primera actividad tocando el boton +"
          />
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddActivity}>
        <Ionicons name="add" size={28} color={colors.surface} />
      </TouchableOpacity>

      <StatusSelector
        visible={showStatusSelector}
        currentStatus={selectedActivity?.status || 'pending'}
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
  listContent: {
    padding: spacing.md,
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
