import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production'
  : process.env.NODE_ENV === 'staging'
    ? '.env.staging'
    : process.env.NODE_ENV === 'test'
      ? '.env.test'
      : '.env.dev';

// Load environment variables
dotenv.config({ path: envFile });

// API Configuration
const apiConfig = {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:8081'
  }
};

// Database Configuration
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

// JWT Configuration
const jwtConfig = {
  secret: process.env.JWT_SECRET
};

// Stripe Configuration
const stripeConfig = {
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
};

export default {
  api: apiConfig,
  db: dbConfig,
  jwt: jwtConfig,
  stripe: stripeConfig
}; 