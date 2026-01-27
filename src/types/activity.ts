export type ActivityStatus = 'pending' | 'in_progress' | 'completed';

export type ActivityPriority = 'high' | 'medium' | 'low';

export type ActivityCategory =
  | 'meeting'
  | 'development'
  | 'administration'
  | 'communication'
  | 'planning'
  | 'review'
  | 'other';

export interface Activity {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
  priority: ActivityPriority;
  category: ActivityCategory;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  completedAt?: string;
}

export interface ActivityFilters {
  status?: ActivityStatus | 'all';
  priority?: ActivityPriority | 'all';
  category?: ActivityCategory | 'all';
  searchQuery?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface DailyStats {
  date: string;
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
}

export interface WeeklyStats {
  weekStart: string;
  weekEnd: string;
  totalActivities: number;
  completedActivities: number;
  completionRate: number;
  byCategory: Record<ActivityCategory, number>;
  byPriority: Record<ActivityPriority, number>;
}
