import Constants from 'expo-constants';

const ENV = {
  development: {
    apiUrl: 'https://k8k188y24i.execute-api.us-east-1.amazonaws.com',
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
    },
    api: {
      timeout: 10000, // 10 seconds
      retries: 3,
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      },
      rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // Limit each IP to 100 requests per windowMs
      }
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
    },
    api: {
      timeout: 5000, // 5 seconds
      retries: 2,
      cors: {
        origin: 'https://advenrent.com',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      },
      rateLimit: {
        windowMs: 15 * 60 * 1000,
        max: 100
      }
    }
  }
};

const getEnvironment = () => {
  const environment = Constants.expoConfig?.extra?.env || process.env.NODE_ENV || 'development';
  return ENV[environment as keyof typeof ENV] || ENV.development;
};

export const config = {
  ...getEnvironment(),
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
};