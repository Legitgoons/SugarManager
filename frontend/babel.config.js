module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js'],
        alias: {
          '@': './src',
        },
      },
    ],
    'babel-plugin-styled-components',
  ],
};
