import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityProvider } from '../src/context';
import { colors } from '../src/constants/theme';

export default function RootLayout() {
  return (
    <ActivityProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="activity/[id]"
          options={{
            title: 'Detalle de Actividad',
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="activity/new"
          options={{
            title: 'Nueva Actividad',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="activity/edit/[id]"
          options={{
            title: 'Editar Actividad',
            presentation: 'modal',
          }}
        />
      </Stack>
    </ActivityProvider>
  );
}
