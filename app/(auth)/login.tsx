import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../theme/theme';
import { useAuthStore } from '@/store/auth';

export default function LoginScreen() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    try {
      setError('');
      
      // Input validation
      if (!email.trim() || !password.trim()) {
        setError('Please fill in all fields');
        return;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }

      setIsSubmitting(true);
      await login({ email, password });
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1625996689914-21abf6b7db0c?q=80&w=1000' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your adventure</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.gray[400]}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isSubmitting}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor={COLORS.gray[400]}
              value={password}
              onChangeText={setPassword}
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

          <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isSubmitting}>
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/signup" style={styles.link}>
              <Text style={styles.linkText}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    marginBottom: SIZES.md,
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