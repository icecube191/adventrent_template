const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../config/db');
const auth = require('../middleware/auth');

// @route   PUT api/users/role
// @desc    Update user role
// @access  Private
router.put('/role', [
  auth,
  check('role', 'Role is required').isIn(['renter', 'rentee', 'both']),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { role } = req.body;

  try {
    // Update profile
    const result = await db.query(
      'UPDATE profiles SET role = $1 WHERE user_id = $2 RETURNING *',
      [role, req.user.id]
    );

    if (result.rows.length === 0) {
      // Create profile if it doesn't exist
      const newProfile = await db.query(
        'INSERT INTO profiles (user_id, role) VALUES ($1, $2) RETURNING *',
        [req.user.id, role]
      );
      return res.json(newProfile.rows[0]);
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  auth,
  check('fullName', 'Full name is required').optional().notEmpty(),
  check('email', 'Please include a valid email').optional().isEmail(),
  check('phone', 'Please include a valid phone number').optional().matches(/^\+?[\d\s-()]+$/),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, phone } = req.body;

  try {
    // Start transaction
    await db.query('BEGIN');

    // Check if email is already taken
    if (email) {
      const emailCheck = await db.query(
        'SELECT id FROM users WHERE email = $1 AND id != $2',
        [email, req.user.id]
      );
      if (emailCheck.rows.length > 0) {
        await db.query('ROLLBACK');
        return res.status(400).json({ error: 'Email already in use' });
      }
    }

    // Update user
    const userResult = await db.query(
      'UPDATE users SET full_name = COALESCE($1, full_name), email = COALESCE($2, email), phone = COALESCE($3, phone) WHERE id = $4 RETURNING *',
      [fullName, email, phone, req.user.id]
    );

    // Update profile
    const profileResult = await db.query(
      'UPDATE profiles SET full_name = COALESCE($1, full_name) WHERE user_id = $2 RETURNING *',
      [fullName, req.user.id]
    );

    await db.query('COMMIT');

    res.json({
      ...userResult.rows[0],
      role: profileResult.rows[0].role,
    });
  } catch (err) {
    await db.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;