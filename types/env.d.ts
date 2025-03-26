declare module '@env' {
  export const DB_HOST: string;
  export const DB_PORT: string;
  export const DB_NAME: string;
  export const DB_USER: string;
  export const DB_PASSWORD: string;
  export const JWT_SECRET: string;
  export const STRIPE_SECRET_KEY: string;
  export const STRIPE_WEBHOOK_SECRET: string;
  export const EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
}

// Ensure this file is treated as a module
export {};