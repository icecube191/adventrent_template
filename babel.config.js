module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': '.',
          },
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
        },
      ],
      'react-native-reanimated/plugin',
      '@babel/plugin-transform-class-properties',
      '@babel/plugin-transform-optional-catch-binding',
      '@babel/plugin-transform-numeric-separator',
      '@babel/plugin-transform-nullish-coalescing-operator',
      '@babel/plugin-transform-optional-chaining',
      '@babel/plugin-transform-object-rest-spread',
      '@babel/plugin-transform-async-generator-functions'
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};