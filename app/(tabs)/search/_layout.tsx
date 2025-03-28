import { Stack } from 'expo-router';
import { COLORS } from '../../theme/theme';

export default function SearchLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.white },
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="filters"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}