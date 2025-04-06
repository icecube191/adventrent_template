import type { ApiError } from '@/types/api';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

function isError(error: Error | ApiError): error is Error {
  return 'stack' in error && 'name' in error;
}

export async function logErrorToServer(error: Error | ApiError, context?: Record<string, any>) {
  try {
    const errorData = {
      message: error.message,
      ...(isError(error) ? {
        name: error.name,
        stack: error.stack,
      } : {
        code: error.code,
        status: error.status,
      }),
      context,
      timestamp: new Date().toISOString(),
    };

    await fetch(`${API_URL}/logs/error`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorData),
    });
  } catch (e) {
    // If we can't log to server, at least log to console
    console.error('Failed to log error to server:', e);
    console.error('Original error:', error);
    if (context) {
      console.error('Error context:', context);
    }
  }
} 