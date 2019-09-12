const path = require('path');
// const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  // plugins: [new CompressionPlugin({
  //   filename: '[path].br[query]',
  //   algorithm: 'brotliCompress',
  //   test: /\.(js|jsx)$/,
  //   compressionOptions: { level: 11 },
  //   threshold: 10240,
  //   minRatio: 0.8,
  //   deleteOriginalAssets: false,
  // })],
  entry: './client/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
    library: 'RecommendationsModule',
    libraryExport: 'default',
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules)|(__tests__)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
