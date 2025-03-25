import { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Star, Calendar, DollarSign } from 'lucide-react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../theme/theme';

export default function VehicleDetailScreen() {
  const { id } = useLocalSearchParams();
  const [vehicle] = useState({
    id,
    title: 'Yamaha WaveRunner VX',
    type: 'Jet Ski',
    price: 299,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1626447852999-c535d3a40db7?q=80&w=1000',
    description: 'Experience the thrill of riding this powerful Yamaha WaveRunner VX. Perfect for both beginners and experienced riders.',
    features: ['3 Seats', '110HP Engine', 'Fuel Efficient', 'Storage Compartment'],
  });

  const handleBookNow = () => {
    router.push(`/booking/${id}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: vehicle.image }} style={styles.image} />
      
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
          
          <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
            <Calendar size={20} color={COLORS.white} style={styles.buttonIcon} />
            <Text style={styles.bookButtonText}>Book Now</Text>
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
  image: {
    width: '100%',
    height: 300,
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
  buttonIcon: {
    marginRight: SIZES.sm,
  },
  bookButtonText: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
  },
});