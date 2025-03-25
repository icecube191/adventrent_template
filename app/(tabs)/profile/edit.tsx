import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Save } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../theme/theme';

export default function EditProfileScreen() {
  const { user, updateUser } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      await updateUser(formData);
      router.back();
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={[styles.saveButton, isSubmitting && styles.saveButtonDisabled]}>
          <Save size={20} color={COLORS.white} />
          <Text style={styles.saveButtonText}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={formData.fullName}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, fullName: text }))}
            placeholder="Enter your full name"
            placeholderTextColor={COLORS.gray[400]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.gray[400]}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, phone: text }))}
            placeholder="Enter your phone number"
            placeholderTextColor={COLORS.gray[400]}
            keyboardType="phone-pad"
          />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.xl,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  backButton: {
    padding: SIZES.xs,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.xl,
    color: COLORS.black,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.md,
    borderRadius: 8,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
    marginLeft: SIZES.xs,
  },
  errorContainer: {
    margin: SIZES.md,
    padding: SIZES.md,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
  },
  errorText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.error,
  },
  form: {
    padding: SIZES.xl,
  },
  inputGroup: {
    marginBottom: SIZES.xl,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[700],
    marginBottom: SIZES.xs,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    borderRadius: 8,
    paddingHorizontal: SIZES.md,
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.black,
    backgroundColor: COLORS.white,
  },
});