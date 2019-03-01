const CleanWebpackPlugin = require('clean-webpack-plugin');
const basePath = process.cwd();
const darvinConfig = require('../../../.darvinrc');

const prod = {
  plugins: [
    new CleanWebpackPlugin([darvinConfig.outputDir], {
      root: basePath,
      exclude: [`${darvinConfig.preview.dir}`],
      verbose: true
    }),
  ],
};

const dev = {
  plugins: [
    new CleanWebpackPlugin([darvinConfig.outputDir], {
      root: basePath,
      exclude: [`${darvinConfig.preview.dir}`],
      verbose: true
    }),
  ],
}

const prev = {
  plugins: [
    new CleanWebpackPlugin([`${darvinConfig.preview.outputDir}`], {
      root: basePath
    }),
  ],
}

module.exports = {
  prod: prod,
  dev: dev,
  prev: prev
};

