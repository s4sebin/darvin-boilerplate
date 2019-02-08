const CleanWebpackPlugin = require('clean-webpack-plugin');
const basePath = process.cwd();

const prod = {
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: basePath,
    }),
  ],
};

const dev = {
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: basePath,
    }),
  ],
}

module.exports = {
  prod: prod,
  dev: dev
};

