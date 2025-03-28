// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Add custom module resolution
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json'];
config.resolver.assetExts = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

module.exports = config;