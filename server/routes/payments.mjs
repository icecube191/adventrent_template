import express from 'express';
import Stripe from 'stripe';
import config from '../config/index.mjs';

const router = express.Router();
const stripe = new Stripe(config.stripe.secretKey);

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.stripe.webhookSecret
    );
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        // TODO: Handle successful payment
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ received: true });
  } catch (error) {
    res.status(400).json({ error: 'Webhook error' });
  }
});

export default router; 