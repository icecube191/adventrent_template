import { Platform, KeyboardAvoidingView as RNKeyboardAvoidingView, StyleSheet, ViewProps } from 'react-native';
import { SIZES } from '@/app/theme/theme';

export default function KeyboardAvoidingView({ children, style, ...props }: ViewProps) {
  return (
    <RNKeyboardAvoidingView
      behavior={typeof Platform !== 'undefined' && Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={typeof Platform !== 'undefined' && Platform.OS === 'ios' ? 0 : SIZES.statusBarHeight}
      style={[styles.container, style]}
      {...props}
    >
      {children}
    </RNKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});