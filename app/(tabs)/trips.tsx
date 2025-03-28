import { View, Text } from 'react-native';
import { COLORS } from '@theme/theme';

export default function TripsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
      <Text style={{ color: COLORS.black }}>Trips Screen</Text>
    </View>
  );
} 