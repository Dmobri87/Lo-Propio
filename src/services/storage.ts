import AsyncStorage from '@react-native-async-storage/async-storage';
import { Activity } from '../types';

const ACTIVITIES_KEY = '@lo_propio_activities';

export const StorageService = {
  async getActivities(): Promise<Activity[]> {
    try {
      const data = await AsyncStorage.getItem(ACTIVITIES_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error('Error getting activities:', error);
      return [];
    }
  },

  async saveActivities(activities: Activity[]): Promise<void> {
    try {
      await AsyncStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
    } catch (error) {
      console.error('Error saving activities:', error);
      throw error;
    }
  },

  async addActivity(activity: Activity): Promise<void> {
    const activities = await this.getActivities();
    activities.unshift(activity);
    await this.saveActivities(activities);
  },

  async updateActivity(updatedActivity: Activity): Promise<void> {
    const activities = await this.getActivities();
    const index = activities.findIndex((a) => a.id === updatedActivity.id);
    if (index !== -1) {
      activities[index] = updatedActivity;
      await this.saveActivities(activities);
    }
  },

  async deleteActivity(activityId: string): Promise<void> {
    const activities = await this.getActivities();
    const filtered = activities.filter((a) => a.id !== activityId);
    await this.saveActivities(filtered);
  },

  async getActivityById(activityId: string): Promise<Activity | null> {
    const activities = await this.getActivities();
    return activities.find((a) => a.id === activityId) || null;
  },

  async clearAllActivities(): Promise<void> {
    try {
      await AsyncStorage.removeItem(ACTIVITIES_KEY);
    } catch (error) {
      console.error('Error clearing activities:', error);
      throw error;
    }
  },
};
