import { Platform, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#FF385C',
  secondary: '#00A699',
  black: '#222222',
  white: '#FFFFFF',
  gray: {
    50: '#F7F7F7',
    100: '#EBEBEB',
    200: '#DDDDDD',
    300: '#CCCCCC',
    400: '#AAAAAA',
    500: '#888888',
    600: '#666666',
    700: '#444444',
    800: '#222222',
    900: '#111111'
  },
  success: '#00A699',
  error: '#FF5A5F',
  warning: '#FFB400'
};

export const SIZES = {
  // Base sizes
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,

  // Device dimensions
  width,
  height,

  // Platform-specific sizes
  headerHeight: typeof Platform !== 'undefined' ? Platform.select({
    ios: 44,
    android: 56,
    default: 64
  }) : 64,
  bottomTabHeight: typeof Platform !== 'undefined' ? Platform.select({
    ios: 49,
    android: 56,
    default: 49
  }) : 49,
  statusBarHeight: typeof Platform !== 'undefined' && Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,

  // Responsive sizes
  screenPadding: width < 375 ? 16 : 20,
  cardWidth: (width - (width < 375 ? 48 : 60)) / 2,
  maxContentWidth: 1200
};

export const FONTS = {
  regular: typeof Platform !== 'undefined' ? Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System'
  }) : 'System',
  medium: typeof Platform !== 'undefined' ? Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System'
  }) : 'System',
  semiBold: typeof Platform !== 'undefined' ? Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System'
  }) : 'System',
  bold: typeof Platform !== 'undefined' ? Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System'
  }) : 'System',
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32
  }
};

export const SHADOWS = typeof Platform !== 'undefined' ? Platform.select({
  ios: {
    small: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    medium: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
    },
    large: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
    }
  },
  android: {
    small: {
      elevation: 2,
    },
    medium: {
      elevation: 4,
    },
    large: {
      elevation: 6,
    }
  },
  default: {
    small: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 4,
    },
    large: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 6,
    }
  }
}) : {
  small: {},
  medium: {},
  large: {}
};

const theme = {
  COLORS,
  SIZES,
  FONTS,
  SHADOWS
};

export default theme;