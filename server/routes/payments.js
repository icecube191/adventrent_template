const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');
const db = require('../config/db');
const auth = require('../middleware/auth');

router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { bookingId, amount } = req.body;

    // Validate booking exists and belongs to user
    const booking = await db.query(
      'SELECT * FROM bookings WHERE id = $1 AND renter_id = $2',
      [bookingId, req.user.id]
    );

    if (booking.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found or unauthorized' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: {
        bookingId,
        userId: req.user.id,
      },
    });

    // Create payment record
    await db.query(
      'INSERT INTO payments (booking_id, amount, stripe_transaction_id, status) VALUES ($1, $2, $3, $4)',
      [bookingId, amount, paymentIntent.id, 'pending']
    );

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;