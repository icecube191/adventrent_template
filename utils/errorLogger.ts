import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { config } from '@/config';

interface ErrorLogPayload {
  error: Error;
  errorInfo: React.ErrorInfo;
  screen: string;
}

export async function logErrorToServer({ error, errorInfo, screen }: ErrorLogPayload) {
  if (!config.logErrorsEnabled) {
    return;
  }

  try {
    const deviceInfo = {
      platform: Platform.OS,
      version: Platform.Version,
      brand: Constants.deviceName,
      appVersion: Constants.expoConfig?.version || '1.0.0',
    };

    const response = await fetch(`${config.supabaseUrl}/functions/v1/log-error`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.supabaseAnonKey}`,
      },
      body: JSON.stringify({
        screen_name: screen,
        error_message: error.message,
        stack_trace: errorInfo.componentStack,
        app_version: deviceInfo.appVersion,
        device_info: deviceInfo,
      }),
    });

    if (!response.ok) {
      console.error('Failed to log error:', await response.text());
    }
  } catch (loggingError) {
    console.error('Error while logging error:', loggingError);
  }
}