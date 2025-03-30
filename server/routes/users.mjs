import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index.mjs';

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all users (admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    // TODO: Implement user listing
    res.json({ users: [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    // TODO: Implement profile fetching
    res.json({ user: { id: req.user.userId } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

export default router; 