const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');

const app = express();

// CORS middleware
app.use(cors({
  origin: config.api.cors.origin,
  methods: config.api.cors.methods,
  credentials: true,
}));

// Logging middleware
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', environment: config.nodeEnv });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/payments', require('./routes/payments'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: config.nodeEnv === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

const PORT = config.port;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
  });
}

module.exports = app;