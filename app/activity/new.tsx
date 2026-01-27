import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useActivities } from '../../src/context';
import {
  ActivityStatus,
  ActivityPriority,
  ActivityCategory,
} from '../../src/types';
import {
  STATUS_CONFIG,
  PRIORITY_CONFIG,
  CATEGORY_CONFIG,
} from '../../src/constants';
import { colors, spacing, borderRadius, fontSize } from '../../src/constants/theme';

export default function NewActivityScreen() {
  const router = useRouter();
  const { addActivity } = useActivities();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ActivityStatus>('pending');
  const [priority, setPriority] = useState<ActivityPriority>('medium');
  const [category, setCategory] = useState<ActivityCategory>('other');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El titulo es requerido');
      return;
    }

    setIsSubmitting(true);
    try {
      await addActivity({
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        category,
      });
      router.back();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la actividad');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Titulo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa el titulo de la actividad"
            placeholderTextColor={colors.textLight}
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Descripcion</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe la actividad (opcional)"
            placeholderTextColor={colors.textLight}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={500}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Estado</Text>
          <View style={styles.optionsRow}>
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.optionButton,
                  status === key && styles.optionButtonActive,
                  status === key && { borderColor: config.color },
                ]}
                onPress={() => setStatus(key as ActivityStatus)}
              >
                <View style={[styles.optionDot, { backgroundColor: config.color }]} />
                <Text
                  style={[
                    styles.optionText,
                    status === key && { color: config.color },
                  ]}
                >
                  {config.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Prioridad</Text>
          <View style={styles.optionsRow}>
            {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.optionButton,
                  priority === key && styles.optionButtonActive,
                  priority === key && { borderColor: config.color },
                ]}
                onPress={() => setPriority(key as ActivityPriority)}
              >
                <View style={[styles.optionDot, { backgroundColor: config.color }]} />
                <Text
                  style={[
                    styles.optionText,
                    priority === key && { color: config.color },
                  ]}
                >
                  {config.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.categoryGrid}>
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.categoryButton,
                  category === key && styles.categoryButtonActive,
                  category === key && { borderColor: config.color, backgroundColor: config.color + '10' },
                ]}
                onPress={() => setCategory(key as ActivityCategory)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === key && { color: config.color },
                  ]}
                >
                  {config.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Ionicons name="checkmark" size={20} color={colors.surface} />
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Creando...' : 'Crear Actividad'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    minHeight: 100,
    paddingTop: spacing.md,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  optionButtonActive: {
    borderWidth: 2,
  },
  optionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  optionText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryButtonActive: {
    borderWidth: 2,
  },
  categoryText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  cancelButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  submitButton: {
    flex: 2,
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.surface,
  },
});
