import Constants from 'expo-constants';

const ENV = {
  development: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL!,
    stripePublishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    features: {
      errorLogging: true,
      analytics: false,
      debugMode: true
    },
    api: {
      timeout: 30000,
      retries: 3
    }
  },
  staging: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL!,
    stripePublishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    features: {
      errorLogging: true,
      analytics: true,
      debugMode: true
    },
    api: {
      timeout: 30000,
      retries: 3
    }
  },
  production: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL!,
    stripePublishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    features: {
      errorLogging: true,
      analytics: true,
      debugMode: false
    },
    api: {
      timeout: 15000,
      retries: 2
    }
  }
};

const getEnvironment = () => {
  const environment = Constants.expoConfig?.extra?.env || 'development';
  return ENV[environment as keyof typeof ENV];
};

export const config = getEnvironment();