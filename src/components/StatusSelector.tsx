import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActivityStatus } from '../types';
import { STATUS_CONFIG } from '../constants';
import { colors, spacing, borderRadius, fontSize } from '../constants/theme';

interface StatusSelectorProps {
  visible: boolean;
  currentStatus: ActivityStatus;
  onSelect: (status: ActivityStatus) => void;
  onClose: () => void;
}

export function StatusSelector({
  visible,
  currentStatus,
  onSelect,
  onClose,
}: StatusSelectorProps) {
  const statuses: ActivityStatus[] = ['pending', 'in_progress', 'completed'];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.container} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Cambiar Estado</Text>

          {statuses.map((status) => {
            const config = STATUS_CONFIG[status];
            const isSelected = status === currentStatus;

            return (
              <TouchableOpacity
                key={status}
                style={[
                  styles.option,
                  isSelected && styles.optionSelected,
                  isSelected && { backgroundColor: config.color + '15' },
                ]}
                onPress={() => {
                  onSelect(status);
                  onClose();
                }}
              >
                <View style={[styles.statusDot, { backgroundColor: config.color }]} />
                <Text
                  style={[
                    styles.optionText,
                    isSelected && { color: config.color, fontWeight: '600' },
                  ]}
                >
                  {config.label}
                </Text>
                {isSelected && (
                  <Ionicons name="checkmark" size={20} color={config.color} />
                )}
              </TouchableOpacity>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 320,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  optionSelected: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  optionText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
  },
});
