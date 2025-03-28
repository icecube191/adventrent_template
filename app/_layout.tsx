import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import ErrorBoundary from '@/components/ErrorBoundary';

console.log('Layout component importing gesture handler...');
console.log('Gesture handler available:', !!require('react-native-gesture-handler'));

export default function RootLayout() {
  console.log('RootLayout component rendering');
  useFrameworkReady();

  useEffect(() => {
    console.log('RootLayout mounted');
    return () => console.log('RootLayout unmounted');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <Stack 
            screenOptions={{
              headerShown: false,
              contentStyle: { 
                backgroundColor: 'white'
              }
            }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
          </Stack>
          <StatusBar style={typeof Platform !== 'undefined' && Platform.OS === 'ios' ? 'dark' : 'auto'} />
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}