import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/index.mjs';
import authRoutes from './routes/auth.mjs';
import userRoutes from './routes/users.mjs';
import paymentRoutes from './routes/payments.mjs';

const app = express();

// CORS middleware
app.use(cors({
  origin: config.api.cors.origin,
  credentials: true
}));

// Logging middleware
app.use(morgan('dev'));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app; 