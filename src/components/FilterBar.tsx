import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActivityFilters, ActivityStatus, ActivityPriority, ActivityCategory } from '../types';
import { STATUS_CONFIG, PRIORITY_CONFIG, CATEGORY_CONFIG } from '../constants';
import { colors, spacing, borderRadius, fontSize } from '../constants/theme';

interface FilterBarProps {
  filters: ActivityFilters;
  onFiltersChange: (filters: ActivityFilters) => void;
  onClearFilters: () => void;
}

type FilterChip = {
  key: string;
  label: string;
  value: string;
  color: string;
};

export function FilterBar({ filters, onFiltersChange, onClearFilters }: FilterBarProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const activeFiltersCount = [
    filters.status && filters.status !== 'all',
    filters.priority && filters.priority !== 'all',
    filters.category && filters.category !== 'all',
    filters.searchQuery,
  ].filter(Boolean).length;

  const handleStatusFilter = (status: ActivityStatus | 'all') => {
    onFiltersChange({ ...filters, status });
  };

  const handlePriorityFilter = (priority: ActivityPriority | 'all') => {
    onFiltersChange({ ...filters, priority });
  };

  const handleCategoryFilter = (category: ActivityCategory | 'all') => {
    onFiltersChange({ ...filters, category });
  };

  const handleSearchChange = (searchQuery: string) => {
    onFiltersChange({ ...filters, searchQuery });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={[styles.iconButton, showSearch && styles.iconButtonActive]}
          onPress={() => setShowSearch(!showSearch)}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={showSearch ? colors.primary : colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, showFilters && styles.filterButtonActive]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={showFilters ? colors.primary : colors.textSecondary}
          />
          <Text style={[styles.filterButtonText, showFilters && styles.filterButtonTextActive]}>
            Filtros
          </Text>
          {activeFiltersCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {activeFiltersCount > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={onClearFilters}>
            <Text style={styles.clearButtonText}>Limpiar</Text>
          </TouchableOpacity>
        )}
      </View>

      {showSearch && (
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color={colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar actividades..."
            placeholderTextColor={colors.textLight}
            value={filters.searchQuery || ''}
            onChangeText={handleSearchChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {filters.searchQuery ? (
            <TouchableOpacity onPress={() => handleSearchChange('')}>
              <Ionicons name="close-circle" size={18} color={colors.textLight} />
            </TouchableOpacity>
          ) : null}
        </View>
      )}

      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filterLabel}>Estado</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
            <TouchableOpacity
              style={[styles.chip, (!filters.status || filters.status === 'all') && styles.chipActive]}
              onPress={() => handleStatusFilter('all')}
            >
              <Text style={[styles.chipText, (!filters.status || filters.status === 'all') && styles.chipTextActive]}>
                Todos
              </Text>
            </TouchableOpacity>
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.chip,
                  filters.status === key && styles.chipActive,
                  filters.status === key && { backgroundColor: config.color + '20' },
                ]}
                onPress={() => handleStatusFilter(key as ActivityStatus)}
              >
                <View style={[styles.chipDot, { backgroundColor: config.color }]} />
                <Text
                  style={[
                    styles.chipText,
                    filters.status === key && { color: config.color },
                  ]}
                >
                  {config.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterLabel}>Prioridad</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
            <TouchableOpacity
              style={[styles.chip, (!filters.priority || filters.priority === 'all') && styles.chipActive]}
              onPress={() => handlePriorityFilter('all')}
            >
              <Text style={[styles.chipText, (!filters.priority || filters.priority === 'all') && styles.chipTextActive]}>
                Todas
              </Text>
            </TouchableOpacity>
            {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.chip,
                  filters.priority === key && styles.chipActive,
                  filters.priority === key && { backgroundColor: config.color + '20' },
                ]}
                onPress={() => handlePriorityFilter(key as ActivityPriority)}
              >
                <View style={[styles.chipDot, { backgroundColor: config.color }]} />
                <Text
                  style={[
                    styles.chipText,
                    filters.priority === key && { color: config.color },
                  ]}
                >
                  {config.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterLabel}>Categoria</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
            <TouchableOpacity
              style={[styles.chip, (!filters.category || filters.category === 'all') && styles.chipActive]}
              onPress={() => handleCategoryFilter('all')}
            >
              <Text style={[styles.chipText, (!filters.category || filters.category === 'all') && styles.chipTextActive]}>
                Todas
              </Text>
            </TouchableOpacity>
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.chip,
                  filters.category === key && styles.chipActive,
                  filters.category === key && { backgroundColor: config.color + '20' },
                ]}
                onPress={() => handleCategoryFilter(key as ActivityCategory)}
              >
                <Text
                  style={[
                    styles.chipText,
                    filters.category === key && { color: config.color },
                  ]}
                >
                  {config.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  iconButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceSecondary,
  },
  iconButtonActive: {
    backgroundColor: colors.primaryLight + '20',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceSecondary,
    gap: spacing.xs,
  },
  filterButtonActive: {
    backgroundColor: colors.primaryLight + '20',
  },
  filterButtonText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: colors.primary,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
  },
  badgeText: {
    color: colors.surface,
    fontSize: 10,
    fontWeight: '600',
  },
  clearButton: {
    marginLeft: 'auto',
    padding: spacing.sm,
  },
  clearButtonText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    padding: 0,
  },
  filtersContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  filterLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  chipScroll: {
    flexDirection: 'row',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceSecondary,
    marginRight: spacing.xs,
    gap: spacing.xs,
  },
  chipActive: {
    backgroundColor: colors.primaryLight + '20',
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  chipText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.primary,
    fontWeight: '500',
  },
});
