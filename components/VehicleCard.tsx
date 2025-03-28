import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Star, ImageOff } from 'lucide-react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../app/theme/theme';

interface VehicleCardProps {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  primaryImage?: string;
  images?: string[];
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1581393831734-5307269d1d00?q=80&w=1000';

export default function VehicleCard({
  id,
  title,
  type,
  price,
  rating,
  reviews,
  primaryImage,
  images,
}: VehicleCardProps) {
  const imageUrl = primaryImage || images?.[0] || DEFAULT_IMAGE;

  return (
    <Link href={`/vehicle/${id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              defaultSource={{ uri: DEFAULT_IMAGE }}
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <ImageOff size={32} color={COLORS.gray[400]} />
              <Text style={styles.placeholderText}>No image available</Text>
            </View>
          )}
        </View>
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
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
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.gray[100],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[600],
    marginTop: SIZES.xs,
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
    marginRight: SIZES.sm,
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