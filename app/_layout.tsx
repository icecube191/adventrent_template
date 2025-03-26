import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function RootLayout() {
  useFrameworkReady();

  return (
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
  );
}