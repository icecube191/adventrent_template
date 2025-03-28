import Constants from 'expo-constants';

const ENV = {
  development: {
    apiUrl: 'https://bggf225g95.execute-api.us-east-1.amazonaws.com/dev',
    database: {
      host: process.env.DB_HOST || 'advenrent-instance-1.cabwqitbdsrq.us-east-1.rds.amazonaws.com',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      name: process.env.DB_NAME || 'powersports',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      ssl: false
    },
    stripe: {
      publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
    },
    features: {
      errorLogging: true,
      analytics: false,
      debugMode: true
    }
  },
  production: {
    apiUrl: 'https://api.advenrent.com',
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: {
        rejectUnauthorized: false
      }
    },
    stripe: {
      publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
    },
    features: {
      errorLogging: true,
      analytics: true,
      debugMode: false
    }
  }
};

const getEnvironment = () => {
  const environment = process.env.NODE_ENV || 'development';
  return ENV[environment as keyof typeof ENV] || ENV.development;
};

export const config = {
  ...getEnvironment(),
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
};