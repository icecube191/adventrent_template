import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { config } from '@/config';
import api from './api';

interface ErrorLogPayload {
  error: Error;
  errorInfo: React.ErrorInfo;
  screen: string;
}

export async function logErrorToServer({ error, errorInfo, screen }: ErrorLogPayload) {
  if (!config.features.errorLogging) {
    return;
  }

  try {
    const deviceInfo = {
      platform: Platform.OS,
      version: Platform.Version,
      brand: Constants.deviceName,
      appVersion: Constants.expoConfig?.version || '1.0.0',
    };

    await api.post('/api/logs/error', {
      screen_name: screen,
      error_message: error.message,
      stack_trace: errorInfo.componentStack,
      app_version: deviceInfo.appVersion,
      device_info: deviceInfo,
    });
  } catch (loggingError) {
    console.error('Error while logging error:', loggingError);
  }
}