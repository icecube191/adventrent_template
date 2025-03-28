import React from 'react';
import { View } from 'react-native';

const defaultInsets = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const defaultFrame = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export const SafeAreaProvider = ({ children }) => (
  <View style={{ flex: 1 }}>{children}</View>
);

export const SafeAreaConsumer = ({ children }) => children(defaultInsets);

export const useSafeAreaInsets = () => defaultInsets;

export const useSafeAreaFrame = () => defaultFrame;

export const initialWindowMetrics = {
  frame: defaultFrame,
  insets: defaultInsets,
};

export const SafeAreaView = View;

export const useSafeArea = () => ({
  ...defaultInsets,
  ...defaultFrame,
});

export const withSafeAreaInsets = (WrappedComponent) => (props) => {
  return <WrappedComponent {...props} insets={defaultInsets} />;
};