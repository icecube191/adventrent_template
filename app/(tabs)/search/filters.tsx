import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../theme/theme';
import RangeSlider from '@/components/RangeSlider';
import DatePicker from '@/components/DatePicker';

const VEHICLE_TYPES = [
  { id: 'atv', label: 'ATV' },
  { id: 'boat', label: 'Boat' },
  { id: 'jet-ski', label: 'Jet Ski' },
  { id: 'snowmobile', label: 'Snowmobile' },
  { id: 'side-by-side', label: 'Side-by-Side' },
];

export default function FiltersScreen() {
  const params = useLocalSearchParams();
  const [selectedType, setSelectedType] = useState(params.type || '');
  const [priceRange, setPriceRange] = useState({
    min: Number(params.minPrice) || 0,
    max: Number(params.maxPrice) || 1000,
  });
  const [dates, setDates] = useState({
    start: params.startDate || '',
    end: params.endDate || '',
  });

  const handleApply = () => {
    router.push({
      pathname: '/search',
      params: {
        type: selectedType,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        startDate: dates.start,
        endDate: dates.end,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Type</Text>
          <View style={styles.typeGrid}>
            {VEHICLE_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeButton,
                  selectedType === type.id && styles.typeButtonSelected,
                ]}
                onPress={() => setSelectedType(type.id)}>
                <Text
                  style={[
                    styles.typeButtonText,
                    selectedType === type.id && styles.typeButtonTextSelected,
                  ]}>
                  {type.label}
                </Text>
                {selectedType === type.id && (
                  <Check size={16} color={COLORS.white} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <RangeSlider
            min={0}
            max={1000}
            step={50}
            values={[priceRange.min, priceRange.max]}
            onValuesChange={([min, max]) => setPriceRange({ min, max })}
          />
          <View style={styles.priceLabels}>
            <Text style={styles.priceLabel}>${priceRange.min}/day</Text>
            <Text style={styles.priceLabel}>${priceRange.max}/day</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dates</Text>
          <DatePicker
            startDate={dates.start}
            endDate={dates.end}
            onDatesChange={setDates}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.xl,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  backButton: {
    padding: SIZES.xs,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.xl,
    color: COLORS.black,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.lg,
    borderRadius: 8,
  },
  applyButtonText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: SIZES.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  sectionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.black,
    marginBottom: SIZES.lg,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -SIZES.xs,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[50],
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.lg,
    borderRadius: 8,
    margin: SIZES.xs,
  },
  typeButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  typeButtonText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[700],
  },
  typeButtonTextSelected: {
    color: COLORS.white,
  },
  checkIcon: {
    marginLeft: SIZES.sm,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.sm,
  },
  priceLabel: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[700],
  },
});