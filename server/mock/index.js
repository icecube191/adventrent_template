import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Mock data
const mockUsers = [
  { id: 1, email: 'test@example.com', name: 'Test User' }
];

const mockProducts = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 }
];

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth endpoints
app.post('/auth/login', (req, res) => {
  res.json({ 
    token: 'mock-jwt-token',
    user: mockUsers[0]
  });
});

app.post('/auth/register', (req, res) => {
  res.json({ 
    token: 'mock-jwt-token',
    user: mockUsers[0]
  });
});

// User endpoints
app.get('/users/me', (req, res) => {
  res.json(mockUsers[0]);
});

// Product endpoints
app.get('/products', (req, res) => {
  res.json(mockProducts);
});

app.get('/products/:id', (req, res) => {
  const product = mockProducts.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Payment endpoints
app.post('/payments/create-intent', (req, res) => {
  res.json({ 
    clientSecret: 'mock-client-secret'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
}); 