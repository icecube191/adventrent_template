import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../theme/theme';
import { useAuthStore } from '@/store/auth';

export default function SignupScreen() {
  const { register } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const { fullName, email, password } = formData;

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      throw new Error('Please fill in all required fields');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    // Password validation
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
    }

    // Phone validation (optional)
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      throw new Error('Please enter a valid phone number');
    }
  };

  const handleSignup = async () => {
    try {
      setError('');
      validateForm();

      setIsSubmitting(true);
      await register(formData);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1601924372499-921f3df3c56c?q=80&w=1000' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Join Advenrent</Text>
          <Text style={styles.subtitle}>Create an account to start your adventure</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            placeholderTextColor={COLORS.gray[400]}
            value={formData.fullName}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, fullName: text }))}
            editable={!isSubmitting}
          />

          <TextInput
            style={styles.input}
            placeholder="Email *"
            placeholderTextColor={COLORS.gray[400]}
            value={formData.email}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isSubmitting}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number (optional)"
            placeholderTextColor={COLORS.gray[400]}
            value={formData.phone}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, phone: text }))}
            keyboardType="phone-pad"
            editable={!isSubmitting}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password *"
              placeholderTextColor={COLORS.gray[400]}
              value={formData.password}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
              secureTextEntry={!showPassword}
              editable={!isSubmitting}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={20} color={COLORS.gray[400]} />
              ) : (
                <Eye size={20} color={COLORS.gray[400]} />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.passwordHint}>
            Password must be at least 8 characters long and contain uppercase, lowercase, and numbers
          </Text>

          <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={isSubmitting}>
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/login" style={styles.link}>
              <Text style={styles.linkText}>Sign In</Text>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: SIZES.xl,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.xl,
    borderRadius: 16,
    ...SHADOWS.large,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.xxxl,
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
    marginBottom: SIZES.xl,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    borderRadius: 8,
    paddingHorizontal: SIZES.md,
    marginBottom: SIZES.md,
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: SIZES.xs,
  },
  passwordInput: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    borderRadius: 8,
    paddingHorizontal: SIZES.md,
    paddingRight: SIZES.xl * 2,
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
  },
  passwordToggle: {
    position: 'absolute',
    right: SIZES.md,
    top: 15,
  },
  passwordHint: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[600],
    marginBottom: SIZES.md,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.sm,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.lg,
  },
  footerText: {
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
  },
  link: {
    marginLeft: SIZES.xs,
  },
  linkText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
  },
  error: {
    color: COLORS.error,
    fontFamily: FONTS.regular,
    marginBottom: SIZES.md,
    padding: SIZES.md,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
  },
});