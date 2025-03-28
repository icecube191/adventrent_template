import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import { COLORS, FONTS, SIZES } from '@/app/theme/theme';

interface DatePickerProps {
  startDate: string;
  endDate: string;
  onDatesChange: (dates: { start: string; end: string }) => void;
}

export default function DatePicker({ startDate, endDate, onDatesChange }: DatePickerProps) {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const handleStartChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowStart(Platform.OS === 'ios');
    if (event.type === 'set' && date) {
      onDatesChange({
        start: date.toISOString().split('T')[0],
        end: endDate,
      });
    }
  };

  const handleEndChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowEnd(Platform.OS === 'ios');
    if (event.type === 'set' && date) {
      onDatesChange({
        start: startDate,
        end: date.toISOString().split('T')[0],
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowStart(true)}>
        <Calendar size={20} color={COLORS.gray[400]} />
        <Text style={styles.dateText}>
          {startDate || 'Start Date'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowEnd(true)}>
        <Calendar size={20} color={COLORS.gray[400]} />
        <Text style={styles.dateText}>
          {endDate || 'End Date'}
        </Text>
      </TouchableOpacity>

      {(showStart || showEnd) && (
        <DateTimePicker
          value={new Date(showStart ? startDate || Date.now() : endDate || Date.now())}
          mode="date"
          display="default"
          onChange={showStart ? handleStartChange : handleEndChange}
          minimumDate={showEnd && startDate ? new Date(startDate) : new Date()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SIZES.md,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[50],
    padding: SIZES.md,
    borderRadius: 8,
    gap: SIZES.sm,
  },
  dateText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[700],
  },
});