import { View, Text } from 'react-native';
import { COLORS } from '@theme/theme';

export default function InboxScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
      <Text style={{ color: COLORS.black }}>Inbox Screen</Text>
    </View>
  );
} 