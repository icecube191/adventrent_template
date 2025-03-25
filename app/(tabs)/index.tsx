import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { MapPin, Search } from 'lucide-react-native';
import { COLORS, FONTS, SIZES } from '../theme/theme';
import VehicleCard from '../../components/VehicleCard';

// Mock data for testing
const MOCK_VEHICLES = [
  {
    id: '1',
    title: 'Yamaha WaveRunner VX',
    type: 'Jet Ski',
    price: 299,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1626447852999-c535d3a40db7?q=80&w=1000',
  },
  {
    id: '2',
    title: 'Can-Am Maverick X3',
    type: 'Side-by-Side',
    price: 399,
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1625996687302-70a7afa8d5ca?q=80&w=1000',
  },
  {
    id: '3',
    title: 'Polaris Sportsman 850',
    type: 'ATV',
    price: 249,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1625996565898-fc8f8da56f61?q=80&w=1000',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.location}>
          <MapPin size={20} color={COLORS.primary} />
          <Text style={styles.locationText}>Miami, FL</Text>
        </View>
        <Text style={styles.greeting}>Find your next adventure</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color={COLORS.gray[400]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search vehicles..."
          placeholderTextColor={COLORS.gray[400]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={MOCK_VEHICLES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VehicleCard {...item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
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
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  locationText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.black,
    marginLeft: SIZES.xs,
  },
  greeting: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.xxxl,
    color: COLORS.black,
    marginTop: SIZES.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[50],
    margin: SIZES.md,
    padding: SIZES.md,
    borderRadius: 12,
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
  listContent: {
    padding: SIZES.md,
  },
});