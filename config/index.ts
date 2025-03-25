import Constants from 'expo-constants';

const ENV = {
  development: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL!,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
    stripePublishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    logErrorsEnabled: true,
    apiTimeout: 30000,
    maxRetries: 3,
  },
  staging: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL!,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
    stripePublishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    logErrorsEnabled: true,
    apiTimeout: 30000,
    maxRetries: 3,
  },
  production: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL!,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
    stripePublishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    logErrorsEnabled: true,
    apiTimeout: 15000,
    maxRetries: 2,
  },
};

export const config = ENV[Constants.expoConfig?.extra?.env || 'development'];