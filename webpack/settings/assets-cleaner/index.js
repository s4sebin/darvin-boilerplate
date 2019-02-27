const CleanWebpackPlugin = require('clean-webpack-plugin');
const basePath = process.cwd();

const prod = {
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: basePath,
      exclude: ['preview'],
      verbose: true
    }),
  ],
};

const dev = {
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: basePath,
      exclude: ['preview'],
      verbose: true
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

