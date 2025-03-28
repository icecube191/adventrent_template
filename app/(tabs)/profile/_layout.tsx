import { Stack } from 'expo-router';
import { COLORS } from '../../theme/theme';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.white },
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="edit"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}