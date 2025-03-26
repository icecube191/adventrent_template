import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Star, Calendar, DollarSign, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../theme/theme';
import { useAuthStore } from '@/store/auth';
import { vehiclesApi } from '@/utils/api';
import type { Vehicle } from '@/types/api';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1581393831734-5307269d1d00?q=80&w=1000';

export default function VehicleDetailScreen() {
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams();
  const { user } = useAuthStore();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchVehicle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await vehiclesApi.getVehicleById(id as string);
      setVehicle(data);
      // Set initial image to primary if available
      if (data.primaryImage) {
        const primaryIndex = data.images.findIndex(img => img === data.primaryImage);
        if (primaryIndex !== -1) {
          setCurrentImageIndex(primaryIndex);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load vehicle');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchVehicle();
  }, [fetchVehicle]);

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? (vehicle?.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev =>
      prev === (vehicle?.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleEdit = () => {
    router.push(`/vehicles/edit/${id}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error || !vehicle) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Vehicle not found'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchVehicle}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentImage = vehicle.images?.[currentImageIndex] || DEFAULT_IMAGE;
  const isOwner = user?.id === vehicle.ownerId;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        {vehicle.images?.length ? (
          <>
            <Image source={{ uri: currentImage }} style={[styles.image, { width }]} />
            {vehicle.images.length > 1 && (
              <>
                <TouchableOpacity style={[styles.imageButton, styles.prevButton]} onPress={handlePrevImage}>
                  <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.imageButton, styles.nextButton]} onPress={handleNextImage}>
                  <ChevronRight size={24} color={COLORS.white} />
                </TouchableOpacity>
                <View style={styles.pagination}>
                  {vehicle.images.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        index === currentImageIndex && styles.paginationDotActive,
                      ]}
                    />
                  ))}
                </View>
              </>
            )}
          </>
        ) : (
          <View style={[styles.placeholderContainer, { width }]}>
            <ImageOff size={48} color={COLORS.gray[400]} />
            <Text style={styles.placeholderText}>No images available</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{vehicle.title}</Text>
          <View style={styles.rating}>
            <Star size={16} color={COLORS.warning} fill={COLORS.warning} />
            <Text style={styles.ratingText}>{vehicle.rating}</Text>
            <Text style={styles.reviewCount}>({vehicle.reviews} reviews)</Text>
          </View>
        </View>

        <Text style={styles.type}>{vehicle.type}</Text>
        
        <Text style={styles.description}>{vehicle.description}</Text>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Features</Text>
          <View style={styles.featuresList}>
            {vehicle.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bookingContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${vehicle.price}</Text>
            <Text style={styles.perDay}>/day</Text>
          </View>
          
          {isOwner ? (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit Listing</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => router.push(`/booking/${id}`)}>
              <Calendar size={20} color={COLORS.white} style={styles.buttonIcon} />
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.xl,
  },
  errorText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: SIZES.md,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.xl,
    borderRadius: 8,
  },
  retryButtonText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: COLORS.gray[100],
  },
  image: {
    height: 300,
  },
  placeholderContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
    marginTop: SIZES.sm,
  },
  imageButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: SIZES.sm,
  },
  prevButton: {
    left: SIZES.md,
  },
  nextButton: {
    right: SIZES.md,
  },
  pagination: {
    position: 'absolute',
    bottom: SIZES.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.xs,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  paginationDotActive: {
    backgroundColor: COLORS.white,
  },
  content: {
    padding: SIZES.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.sm,
  },
  title: {
    flex: 1,
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.xxl,
    color: COLORS.black,
    marginRight: SIZES.md,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.black,
    marginLeft: SIZES.xs,
  },
  reviewCount: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[500],
    marginLeft: SIZES.xs,
  },
  type: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
    marginBottom: SIZES.md,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[700],
    lineHeight: 24,
    marginBottom: SIZES.xl,
  },
  featuresContainer: {
    marginBottom: SIZES.xl,
  },
  featuresTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.black,
    marginBottom: SIZES.md,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SIZES.xs,
  },
  featureItem: {
    backgroundColor: COLORS.gray[50],
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.md,
    borderRadius: 8,
    margin: SIZES.xs,
  },
  featureText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[700],
  },
  bookingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SIZES.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.xxl,
    color: COLORS.primary,
  },
  perDay: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[500],
    marginLeft: SIZES.xs,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.xl,
    borderRadius: 12,
    ...SHADOWS.medium,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[100],
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.xl,
    borderRadius: 12,
  },
  editButtonText: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[700],
  },
  buttonIcon: {
    marginRight: SIZES.sm,
  },
  bookButtonText: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
  },
});