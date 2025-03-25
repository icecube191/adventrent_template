import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Settings, LogOut, User as UserIcon, CreditCard as Edit2, ChevronRight } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth';
import { COLORS, FONTS, SIZES, SHADOWS } from '../theme/theme';

type Role = 'renter' | 'rentee' | 'both';

const ROLES: { value: Role; label: string; description: string }[] = [
  {
    value: 'renter',
    label: 'Renter',
    description: 'Browse and rent vehicles from others',
  },
  {
    value: 'rentee',
    label: 'Rentee',
    description: 'List your vehicles for rent',
  },
  {
    value: 'both',
    label: 'Both',
    description: 'Rent vehicles and list your own',
  },
];

export default function ProfileScreen() {
  const { user, isLoading, logout, updateUser } = useAuthStore();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRoleChange = async (newRole: Role) => {
    try {
      setIsUpdating(true);
      await updateUser({ role: newRole });
    } catch (error) {
      console.error('Failed to update role:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!user) {
    router.replace('/login');
    return null;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200' }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user.fullName}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit2 size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Type</Text>
        <View style={styles.roleContainer}>
          {ROLES.map((role) => (
            <TouchableOpacity
              key={role.value}
              style={[
                styles.roleCard,
                user.role === role.value && styles.roleCardActive,
                isUpdating && styles.roleCardDisabled,
              ]}
              onPress={() => handleRoleChange(role.value)}
              disabled={isUpdating}>
              <View style={styles.roleHeader}>
                <Text style={[styles.roleTitle, user.role === role.value && styles.roleTextActive]}>
                  {role.label}
                </Text>
                {user.role === role.value && (
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>Active</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.roleDescription, user.role === role.value && styles.roleTextActive]}>
                {role.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.menuList}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <UserIcon size={20} color={COLORS.gray[600]} />
              <Text style={styles.menuItemText}>Personal Information</Text>
            </View>
            <ChevronRight size={20} color={COLORS.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Settings size={20} color={COLORS.gray[600]} />
              <Text style={styles.menuItemText}>Preferences</Text>
            </View>
            <ChevronRight size={20} color={COLORS.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
            <View style={styles.menuItemLeft}>
              <LogOut size={20} color={COLORS.error} />
              <Text style={[styles.menuItemText, styles.logoutText]}>Log Out</Text>
            </View>
          </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SIZES.xl,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: SIZES.md,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.xl,
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  email: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
  },
  editButton: {
    padding: SIZES.sm,
  },
  section: {
    padding: SIZES.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  sectionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.black,
    marginBottom: SIZES.lg,
  },
  roleContainer: {
    gap: SIZES.md,
  },
  roleCard: {
    padding: SIZES.lg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.gray[200],
    backgroundColor: COLORS.white,
  },
  roleCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  roleCardDisabled: {
    opacity: 0.5,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.xs,
  },
  roleTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.black,
  },
  roleDescription: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
  },
  roleTextActive: {
    color: COLORS.primary,
  },
  activeBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: 16,
  },
  activeBadgeText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
  },
  menuList: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[700],
    marginLeft: SIZES.md,
  },
  logoutButton: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: COLORS.error,
  },
});