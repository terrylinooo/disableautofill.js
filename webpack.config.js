/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
const TerserPlugin = require('terser-webpack-plugin');

const distDir = '../dist';
const disableautofill = ['./src/index.js'];

module.exports = (env, argv) => ({
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
  entry: {
    disableautofill,
  },
  output: {
    filename: `${distDir}/[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
});
