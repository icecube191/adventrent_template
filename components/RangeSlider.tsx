import { useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { COLORS, SIZES } from '@/app/theme/theme';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  values: [number, number];
  onValuesChange: (values: [number, number]) => void;
}

export default function RangeSlider({
  min,
  max,
  step,
  values,
  onValuesChange,
}: RangeSliderProps) {
  const [width, setWidth] = useState(0);
  const leftPos = useSharedValue((values[0] - min) / (max - min) * width);
  const rightPos = useSharedValue((values[1] - min) / (max - min) * width);

  const onLayout = (event: LayoutChangeEvent) => {
    const newWidth = event.nativeEvent.layout.width;
    setWidth(newWidth);
    leftPos.value = (values[0] - min) / (max - min) * newWidth;
    rightPos.value = (values[1] - min) / (max - min) * newWidth;
  };

  const leftGesture = Gesture.Pan()
    .onChange((event) => {
      leftPos.value = Math.max(0, Math.min(rightPos.value, leftPos.value + event.changeX));
      const value = Math.round((leftPos.value / width * (max - min) + min) / step) * step;
      onValuesChange([value, values[1]]);
    });

  const rightGesture = Gesture.Pan()
    .onChange((event) => {
      rightPos.value = Math.min(width, Math.max(leftPos.value, rightPos.value + event.changeX));
      const value = Math.round((rightPos.value / width * (max - min) + min) / step) * step;
      onValuesChange([values[0], value]);
    });

  const leftThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(leftPos.value) }],
  }));

  const rightThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(rightPos.value) }],
  }));

  const rangeStyle = useAnimatedStyle(() => ({
    left: withSpring(leftPos.value),
    right: withSpring(width - rightPos.value),
  }));

  return (
    <View style={styles.container} onLayout={onLayout}>
      <View style={styles.track} />
      <Animated.View style={[styles.range, rangeStyle]} />
      <GestureDetector gesture={leftGesture}>
        <Animated.View style={[styles.thumb, leftThumbStyle]} />
      </GestureDetector>
      <GestureDetector gesture={rightGesture}>
        <Animated.View style={[styles.thumb, rightThumbStyle]} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    backgroundColor: COLORS.gray[200],
    borderRadius: 2,
  },
  range: {
    position: 'absolute',
    height: 4,
    backgroundColor: COLORS.primary,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});