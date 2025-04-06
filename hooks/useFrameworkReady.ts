import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export function useFrameworkReady() {
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'System': Platform.select({
      ios: Inter_400Regular,
      android: Roboto_400Regular,
    }),
    'System-Medium': Platform.select({
      ios: Inter_500Medium,
      android: Roboto_500Medium,
    }),
    'System-Bold': Platform.select({
      ios: Inter_700Bold,
      android: Roboto_700Bold,
    }),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Wait for fonts to load
        if (!fontsLoaded) {
          return;
        }

        // Add any other initialization logic here
        // For example: loading user preferences, checking authentication state, etc.

        setIsReady(true);
      } catch (e) {
        console.warn('Error loading resources:', e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded]);

  return isReady;
} 