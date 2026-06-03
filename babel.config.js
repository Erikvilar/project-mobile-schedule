module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',

    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],

    [
      '@babel/plugin-transform-class-properties',
      {
        loose: true,
      },
    ],

    [
      '@babel/plugin-transform-private-methods',
      {
        loose: true,
      },
    ],

    [
      '@babel/plugin-transform-private-property-in-object',
      {
        loose: true,
      },
    ],

    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],

    'react-native-reanimated/plugin',
  ]
};
