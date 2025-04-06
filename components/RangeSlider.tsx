import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS, FONTS, SIZES } from '@theme/theme';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  values: [number, number];
  onValuesChange: (values: [number, number]) => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  values,
  onValuesChange,
}) => {
  const [minValue, maxValue] = values;

  const handleMinChange = (value: number) => {
    onValuesChange([value, maxValue]);
  };

  const handleMaxChange = (value: number) => {
    onValuesChange([minValue, value]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          value={minValue}
          onValueChange={handleMinChange}
          step={step}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor={COLORS.gray[200]}
          thumbTintColor={COLORS.primary}
        />
        <Slider
          style={[styles.slider, styles.maxSlider]}
          minimumValue={min}
          maximumValue={max}
          value={maxValue}
          onValueChange={handleMaxChange}
          step={step}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor={COLORS.gray[200]}
          thumbTintColor={COLORS.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: SIZES.sm,
  },
  sliderContainer: {
    position: 'relative',
    height: 40,
  },
  slider: {
    position: 'absolute',
    width: '100%',
    height: 40,
  },
  maxSlider: {
    zIndex: 1,
  },
}); 