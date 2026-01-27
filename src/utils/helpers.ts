import { format, isToday, isYesterday, parseISO, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import { Activity, ActivityFilters, DailyStats, WeeklyStats, ActivityCategory, ActivityPriority } from '../types';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);

  if (isToday(date)) {
    return 'Hoy';
  }

  if (isYesterday(date)) {
    return 'Ayer';
  }

  return format(date, "d 'de' MMMM", { locale: es });
}

export function formatDateTime(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "d 'de' MMMM, HH:mm", { locale: es });
}

export function formatTime(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'HH:mm');
}

export function filterActivities(activities: Activity[], filters: ActivityFilters): Activity[] {
  return activities.filter((activity) => {
    // Filter by status
    if (filters.status && filters.status !== 'all' && activity.status !== filters.status) {
      return false;
    }

    // Filter by priority
    if (filters.priority && filters.priority !== 'all' && activity.priority !== filters.priority) {
      return false;
    }

    // Filter by category
    if (filters.category && filters.category !== 'all' && activity.category !== filters.category) {
      return false;
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = activity.title.toLowerCase().includes(query);
      const matchesDescription = activity.description.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDescription) {
        return false;
      }
    }

    // Filter by date range
    if (filters.dateRange) {
      const activityDate = parseISO(activity.createdAt);
      const start = parseISO(filters.dateRange.start);
      const end = parseISO(filters.dateRange.end);
      if (!isWithinInterval(activityDate, { start, end })) {
        return false;
      }
    }

    return true;
  });
}

export function calculateDailyStats(activities: Activity[], date: string): DailyStats {
  const targetDate = date.split('T')[0];
  const dayActivities = activities.filter(
    (a) => a.createdAt.split('T')[0] === targetDate
  );

  return {
    date: targetDate,
    total: dayActivities.length,
    completed: dayActivities.filter((a) => a.status === 'completed').length,
    pending: dayActivities.filter((a) => a.status === 'pending').length,
    inProgress: dayActivities.filter((a) => a.status === 'in_progress').length,
  };
}

export function calculateWeeklyStats(activities: Activity[]): WeeklyStats {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const weekActivities = activities.filter((a) => {
    const activityDate = parseISO(a.createdAt);
    return isWithinInterval(activityDate, { start: weekStart, end: weekEnd });
  });

  const completedActivities = weekActivities.filter((a) => a.status === 'completed').length;
  const totalActivities = weekActivities.length;

  const byCategory = {} as Record<ActivityCategory, number>;
  const byPriority = {} as Record<ActivityPriority, number>;

  weekActivities.forEach((activity) => {
    byCategory[activity.category] = (byCategory[activity.category] || 0) + 1;
    byPriority[activity.priority] = (byPriority[activity.priority] || 0) + 1;
  });

  return {
    weekStart: weekStart.toISOString(),
    weekEnd: weekEnd.toISOString(),
    totalActivities,
    completedActivities,
    completionRate: totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0,
    byCategory,
    byPriority,
  };
}

export function groupActivitiesByDate(activities: Activity[]): Record<string, Activity[]> {
  const grouped: Record<string, Activity[]> = {};

  activities.forEach((activity) => {
    const dateKey = activity.createdAt.split('T')[0];
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(activity);
  });

  return grouped;
}

export function sortActivities(
  activities: Activity[],
  sortBy: 'date' | 'priority' | 'status' = 'date',
  order: 'asc' | 'desc' = 'desc'
): Activity[] {
  const sorted = [...activities].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'status':
        const statusOrder = { pending: 1, in_progress: 2, completed: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      default:
        return 0;
    }
  });

  return order === 'asc' ? sorted.reverse() : sorted;
}
