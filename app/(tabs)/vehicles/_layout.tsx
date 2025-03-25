import { Stack } from 'expo-router';
import { COLORS } from '../../theme/theme';

export default function VehiclesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.white },
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="new"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}