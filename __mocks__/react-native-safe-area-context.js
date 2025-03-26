import { View } from 'react-native';

const defaultInsets = { top: 0, right: 0, bottom: 0, left: 0 };

export const SafeAreaProvider = ({ children, onInsetsChange, initialMetrics }) => {
  if (onInsetsChange && initialMetrics) {
    // Simulate initial insets change
    setTimeout(() => {
      onInsetsChange(initialMetrics.insets || defaultInsets);
    }, 0);
  }
  return <View style={{ flex: 1 }}>{children}</View>;
};

export const SafeAreaConsumer = ({ children }) => children(defaultInsets);

export const useSafeAreaInsets = () => defaultInsets;

export const initialWindowMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: defaultInsets,
};

// Mock native modules
export const RNCSafeAreaProvider = {
  initialWindowMetrics,
  addEventListener: () => ({ remove: () => {} }),
  removeEventListener: () => {},
};

export const RNCSafeAreaProviderView = View;