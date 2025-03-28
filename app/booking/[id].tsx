import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Calendar, CreditCard, ArrowLeft } from 'lucide-react-native';
import { loadStripe } from '@stripe/stripe-js';
import { COLORS, FONTS, SIZES, SHADOWS } from '../theme/theme';

const stripePromise = loadStripe(process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BookingScreen() {
  const { id } = useLocalSearchParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError('');

      // Calculate total amount (mock calculation)
      const amount = 299; // Replace with actual calculation based on dates

      // Create payment intent
      const response = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          bookingId: id,
          amount,
        }),
      });

      const { clientSecret, error: paymentError } = await response.json();

      if (paymentError) {
        throw new Error(paymentError);
      }

      // Load Stripe
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Confirm payment
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            number: cardNumber,
            exp_month: parseInt(expiryDate.split('/')[0]),
            exp_year: parseInt(expiryDate.split('/')[1]),
            cvc,
          },
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Payment successful
      router.push('/trips');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color={COLORS.black} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Complete Your Booking</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Dates</Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateInput}>
              <Calendar size={20} color={COLORS.gray[400]} />
              <TextInput
                style={styles.input}
                placeholder="Start Date"
                value={startDate}
                onChangeText={setStartDate}
                placeholderTextColor={COLORS.gray[400]}
              />
            </View>
            <View style={styles.dateInput}>
              <Calendar size={20} color={COLORS.gray[400]} />
              <TextInput
                style={styles.input}
                placeholder="End Date"
                value={endDate}
                onChangeText={setEndDate}
                placeholderTextColor={COLORS.gray[400]}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.cardContainer}>
            <View style={styles.cardInput}>
              <CreditCard size={20} color={COLORS.gray[400]} />
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                maxLength={16}
                placeholderTextColor={COLORS.gray[400]}
              />
            </View>
            <View style={styles.cardRow}>
              <View style={[styles.cardInput, styles.halfWidth]}>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  keyboardType="numeric"
                  maxLength={5}
                  placeholderTextColor={COLORS.gray[400]}
                />
              </View>
              <View style={[styles.cardInput, styles.halfWidth]}>
                <TextInput
                  style={styles.input}
                  placeholder="CVC"
                  value={cvc}
                  onChangeText={setCvc}
                  keyboardType="numeric"
                  maxLength={3}
                  placeholderTextColor={COLORS.gray[400]}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Daily Rate</Text>
            <Text style={styles.summaryValue}>$299</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Fee</Text>
            <Text style={styles.summaryValue}>$29.90</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$328.90</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.payButton, loading && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={loading}>
          <Text style={styles.payButtonText}>
            {loading ? 'Processing...' : 'Confirm & Pay'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButton: {
    padding: SIZES.md,
    marginTop: SIZES.xl,
  },
  content: {
    padding: SIZES.xl,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.xxxl,
    color: COLORS.black,
    marginBottom: SIZES.xl,
  },
  section: {
    marginBottom: SIZES.xl,
  },
  sectionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.black,
    marginBottom: SIZES.md,
  },
  dateContainer: {
    gap: SIZES.md,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[50],
    borderRadius: 12,
    padding: SIZES.md,
    gap: SIZES.sm,
  },
  cardContainer: {
    gap: SIZES.md,
  },
  cardInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[50],
    borderRadius: 12,
    padding: SIZES.md,
    gap: SIZES.sm,
  },
  cardRow: {
    flexDirection: 'row',
    gap: SIZES.md,
  },
  halfWidth: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.black,
  },
  summary: {
    backgroundColor: COLORS.gray[50],
    borderRadius: 12,
    padding: SIZES.xl,
    marginBottom: SIZES.xl,
  },
  summaryTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.black,
    marginBottom: SIZES.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.sm,
  },
  summaryLabel: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
  },
  summaryValue: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.black,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    marginTop: SIZES.md,
    paddingTop: SIZES.md,
  },
  totalLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.black,
  },
  totalValue: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.xl,
    color: COLORS.primary,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SIZES.lg,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  payButtonDisabled: {
    opacity: 0.7,
  },
  payButtonText: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.white,
  },
  error: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.error,
    marginBottom: SIZES.md,
    padding: SIZES.md,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
  },
});