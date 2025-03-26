import { useEffect } from 'react';
import { Platform } from 'react-native';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    if (typeof Platform !== 'undefined' && Platform.OS === 'web') {
      window.frameworkReady?.();
    }
  }, []);
}