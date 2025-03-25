import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Star } from 'lucide-react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../app/theme/theme';

interface VehicleCardProps {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

export default function VehicleCard({ id, title, type, price, rating, reviews, image }: VehicleCardProps) {
  return (
    <Link href={`/vehicle/${id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.rating}>
              <Star size={16} color={COLORS.warning} fill={COLORS.warning} />
              <Text style={styles.ratingText}>{rating}</Text>
              <Text style={styles.reviewCount}>({reviews})</Text>
            </View>
          </View>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.price}>${price}<Text style={styles.perDay}>/day</Text></Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: SIZES.md,
    ...SHADOWS.medium,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: SIZES.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.black,
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.sm,
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
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[600],
    marginBottom: SIZES.xs,
  },
  price: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.xl,
    color: COLORS.primary,
  },
  perDay: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[500],
  },
});