import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Search as SearchIcon, SlidersHorizontal, MapPin } from 'lucide-react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../theme/theme';
import { vehiclesApi } from '@/utils/api';
import VehicleCard from '@/components/VehicleCard';
import type { Vehicle } from '@/types/api';

const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes
const RESULTS_PER_PAGE = 20;

interface SearchFilters {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
}

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Request location permission and get current location
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        }
      } catch (err) {
        console.warn('Error getting location:', err);
      }
    })();
  }, []);

  const fetchVehicles = useCallback(async (refresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const newPage = refresh ? 1 : page;
      const cacheKey = `vehicles_${JSON.stringify({ searchQuery, filters, page: newPage })}`;
      
      // Check cache first
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          setVehicles(refresh ? data : [...vehicles, ...data]);
          setHasMore(data.length === RESULTS_PER_PAGE);
          setLoading(false);
          return;
        }
      }

      // Fetch from API
      const params = {
        ...filters,
        q: searchQuery,
        page: newPage,
        limit: RESULTS_PER_PAGE,
        ...(location && {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
          radius: 100, // 100km radius
        }),
      };

      const data = await vehiclesApi.getVehicles(params);
      
      // Cache results
      await AsyncStorage.setItem(cacheKey, JSON.stringify({
        data,
        timestamp: Date.now(),
      }));

      setVehicles(refresh ? data : [...vehicles, ...data]);
      setHasMore(data.length === RESULTS_PER_PAGE);
      setPage(newPage + 1);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters, page, location, vehicles]);

  useEffect(() => {
    fetchVehicles(true);
  }, [searchQuery, filters]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchVehicles();
    }
  };

  const handleRefresh = () => {
    setPage(1);
    fetchVehicles(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color={COLORS.gray[400]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vehicles..."
            placeholderTextColor={COLORS.gray[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => router.push('/search/filters')}>
            <SlidersHorizontal size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {location && (
          <View style={styles.locationContainer}>
            <MapPin size={16} color={COLORS.primary} />
            <Text style={styles.locationText}>
              Results within 100km of your location
            </Text>
          </View>
        )}
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <VehicleCard {...item} />}
          contentContainerStyle={styles.list}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshing={loading && page === 1}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            !loading ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No vehicles found</Text>
              </View>
            ) : null
          }
          ListFooterComponent={
            loading && page > 1 ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={COLORS.primary} />
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SIZES.md,
    paddingTop: SIZES.xl,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[50],
    borderRadius: 12,
    padding: SIZES.md,
  },
  searchIcon: {
    marginRight: SIZES.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.black,
  },
  filterButton: {
    marginLeft: SIZES.md,
    padding: SIZES.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.sm,
  },
  locationText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[600],
    marginLeft: SIZES.xs,
  },
  list: {
    padding: SIZES.md,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  retryText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.xl,
  },
  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
  },
  loadingContainer: {
    padding: SIZES.xl,
  },
});