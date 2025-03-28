import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { logErrorToServer } from '@/utils/errorLogger';
import { COLORS, FONTS, SIZES, SHADOWS } from '@/app/theme/theme';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logErrorToServer({
      error,
      errorInfo,
      screen: router.getCurrentRoute()?.name || 'unknown',
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    router.replace('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <AlertTriangle size={64} color={COLORS.error} style={styles.icon} />
          <Text style={styles.title}>Oops! Something went wrong</Text>
          <Text style={styles.message}>
            We've encountered an unexpected error. Our team has been notified and is working to fix it.
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleReset}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
          {__DEV__ && this.state.error && (
            <View style={styles.debugContainer}>
              <Text style={styles.debugTitle}>Debug Information:</Text>
              <Text style={styles.debugText}>{this.state.error.toString()}</Text>
            </View>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.xl,
  },
  icon: {
    marginBottom: SIZES.lg,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.xxl,
    color: COLORS.black,
    marginBottom: SIZES.md,
    textAlign: 'center',
  },
  message: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
    textAlign: 'center',
    marginBottom: SIZES.xl,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.lg,
    borderRadius: 12,
    ...SHADOWS.medium,
  },
  buttonText: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
  },
  debugContainer: {
    marginTop: SIZES.xl,
    padding: SIZES.md,
    backgroundColor: COLORS.gray[100],
    borderRadius: 8,
    width: '100%',
  },
  debugTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[700],
    marginBottom: SIZES.xs,
  },
  debugText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[600],
  },
});

export default ErrorBoundary;