const dotenv = require('dotenv');
const path = require('path');

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production'
  : process.env.NODE_ENV === 'staging'
  ? '.env.staging'
  : '.env';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const config = {
  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  database: {
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  },
  
  // Authentication
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
  },
  
  // Stripe Configuration
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  
  // API Configuration
  api: {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
    },
  },
};

module.exports = config;