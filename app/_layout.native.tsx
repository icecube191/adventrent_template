import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

console.log('Native Layout component importing gesture handler...');
console.log('Gesture handler available:', !!require('react-native-gesture-handler'));

export default function RootLayout() {
  console.log('RootLayout component rendering');
  useFrameworkReady();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
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
        <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
} 