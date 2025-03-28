module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@babel/plugin-transform-private-methods',
        { loose: true }
      ],
      [
        '@babel/plugin-transform-class-properties',
        { loose: true }
      ],
      [
        '@babel/plugin-transform-private-property-in-object',
        { loose: true }
      ],
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@components': './components',
            '@screens': './app/screens',
            '@utils': './utils',
            '@assets': './assets',
            '@hooks': './hooks',
            '@store': './store',
            '@config': './config',
            '@types': './types',
            '@server': './server',
            '@theme': './app/theme'
          }
        }
      ]
    ]
  };
};