const CleanWebpackPlugin = require('clean-webpack-plugin');
const basePath = process.cwd();

const prod = {
  plugins: [
    new CleanWebpackPlugin(['dist/build'], {
      root: basePath,
      exclude: ['dist/preview/'],
    }),
  ],
};

const dev = {
  plugins: [
    new CleanWebpackPlugin(['dist/build'], {
      root: basePath,
      exclude: ['dist/preview/'],
    }),
  ],
}

const prev = {
  plugins: [
    new CleanWebpackPlugin(['dist/preview'], {
      root: basePath
    }),
  ],
}

module.exports = {
  prod: prod,
  dev: dev,
  prev: prev
};

