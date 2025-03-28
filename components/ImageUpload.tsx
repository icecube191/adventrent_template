import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image as ImageIcon, X, Star, StarOff } from 'lucide-react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '@/app/theme/theme';

interface ImageUploadProps {
  images: string[];
  primaryIndex: number;
  onImagesChange: (images: string[], primaryIndex: number) => void;
  maxImages?: number;
}

export default function ImageUpload({
  images,
  primaryIndex,
  onImagesChange,
  maxImages = 5,
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        
        // Check file size (5MB limit)
        const sizeInBytes = Buffer.from(result.assets[0].base64!, 'base64').length;
        if (sizeInBytes > 5 * 1024 * 1024) {
          setError('Image size must be less than 5MB');
          return;
        }

        onImagesChange([...images, base64Image], primaryIndex);
      }
    } catch (err) {
      setError('Failed to pick image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPrimaryIndex = index === primaryIndex
      ? Math.min(primaryIndex, newImages.length - 1)
      : primaryIndex > index
      ? primaryIndex - 1
      : primaryIndex;
    onImagesChange(newImages, newPrimaryIndex);
  };

  const setPrimaryImage = (index: number) => {
    onImagesChange(images, index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imageList}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.imageOverlay}>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}>
                <X size={16} color={COLORS.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.starButton}
                onPress={() => setPrimaryImage(index)}>
                {index === primaryIndex ? (
                  <Star size={16} color={COLORS.warning} fill={COLORS.warning} />
                ) : (
                  <StarOff size={16} color={COLORS.white} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {images.length < maxImages && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={pickImage}
            disabled={loading}>
            <ImageIcon size={24} color={COLORS.gray[400]} />
            <Text style={styles.addButtonText}>
              {loading ? 'Adding...' : 'Add Image'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <Text style={styles.helperText}>
        {images.length} of {maxImages} images • Tap star to set primary image
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.xl,
  },
  imageList: {
    gap: SIZES.md,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  image: {
    width: 200,
    height: 120,
    borderRadius: 12,
  },
  imageOverlay: {
    position: 'absolute',
    top: SIZES.xs,
    right: SIZES.xs,
    flexDirection: 'row',
    gap: SIZES.xs,
  },
  removeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: SIZES.xs,
    borderRadius: 6,
  },
  starButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: SIZES.xs,
    borderRadius: 6,
  },
  addButton: {
    width: 200,
    height: 120,
    backgroundColor: COLORS.gray[50],
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.gray[200],
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
    marginTop: SIZES.xs,
  },
  errorText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.error,
    marginTop: SIZES.sm,
  },
  helperText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[600],
    marginTop: SIZES.sm,
  },
});