import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Activity, ActivityFilters, ActivityStatus } from '../types';
import { StorageService } from '../services';
import { filterActivities, sortActivities, generateId } from '../utils';

interface ActivityContextType {
  activities: Activity[];
  filteredActivities: Activity[];
  filters: ActivityFilters;
  isLoading: boolean;
  error: string | null;
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateActivity: (activity: Activity) => Promise<void>;
  deleteActivity: (activityId: string) => Promise<void>;
  updateActivityStatus: (activityId: string, status: ActivityStatus) => Promise<void>;
  setFilters: (filters: ActivityFilters) => void;
  clearFilters: () => void;
  refreshActivities: () => Promise<void>;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

interface ActivityProviderProps {
  children: ReactNode;
}

export function ActivityProvider({ children }: ActivityProviderProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filters, setFilters] = useState<ActivityFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadActivities = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await StorageService.getActivities();
      setActivities(data);
    } catch (err) {
      setError('Error al cargar las actividades');
      console.error('Error loading activities:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  const filteredActivities = React.useMemo(() => {
    const filtered = filterActivities(activities, filters);
    return sortActivities(filtered, 'date', 'desc');
  }, [activities, filters]);

  const addActivity = useCallback(
    async (activityData: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const now = new Date().toISOString();
        const newActivity: Activity = {
          ...activityData,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        };
        await StorageService.addActivity(newActivity);
        setActivities((prev) => [newActivity, ...prev]);
      } catch (err) {
        setError('Error al crear la actividad');
        throw err;
      }
    },
    []
  );

  const updateActivity = useCallback(async (updatedActivity: Activity) => {
    try {
      const activityWithUpdatedTime = {
        ...updatedActivity,
        updatedAt: new Date().toISOString(),
      };
      await StorageService.updateActivity(activityWithUpdatedTime);
      setActivities((prev) =>
        prev.map((a) => (a.id === updatedActivity.id ? activityWithUpdatedTime : a))
      );
    } catch (err) {
      setError('Error al actualizar la actividad');
      throw err;
    }
  }, []);

  const deleteActivity = useCallback(async (activityId: string) => {
    try {
      await StorageService.deleteActivity(activityId);
      setActivities((prev) => prev.filter((a) => a.id !== activityId));
    } catch (err) {
      setError('Error al eliminar la actividad');
      throw err;
    }
  }, []);

  const updateActivityStatus = useCallback(
    async (activityId: string, status: ActivityStatus) => {
      const activity = activities.find((a) => a.id === activityId);
      if (activity) {
        const updatedActivity: Activity = {
          ...activity,
          status,
          updatedAt: new Date().toISOString(),
          completedAt: status === 'completed' ? new Date().toISOString() : undefined,
        };
        await updateActivity(updatedActivity);
      }
    },
    [activities, updateActivity]
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const refreshActivities = useCallback(async () => {
    await loadActivities();
  }, [loadActivities]);

  const value: ActivityContextType = {
    activities,
    filteredActivities,
    filters,
    isLoading,
    error,
    addActivity,
    updateActivity,
    deleteActivity,
    updateActivityStatus,
    setFilters,
    clearFilters,
    refreshActivities,
  };

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
}

export function useActivities() {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
}
