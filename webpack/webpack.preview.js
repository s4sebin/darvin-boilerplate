const path = require('path');
const basePath = process.cwd();

const merge = require('webpack-merge');

const darvinConfig = require('../.darvinrc');
const webpackConfig = require('../webpack.config');

/*** Dynamic Imports START ***/
const { prev: clean } = require('./settings/assets-cleaner');
const { prev: css } = require('./settings/style-sass');
const { prev: fonts } = require('./settings/assets-fonts');
const { dev: js } = require('./settings/javascript');
const { dev: vue } = require('./settings/javascript-vue');
const { prev: sprites } = require('./settings/assets-sprites');
/*** Dynamic Imports END ***/

const settings = {
  entry: [`${darvinConfig.preview.entry}`],
  output: {
    devtoolLineToLine: false,
    path: path.resolve(basePath, `${darvinConfig.preview.outputDir}`),
    pathinfo: false,
    filename: `${darvinConfig.preview.outputFile}`,
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  watchOptions: {
    aggregateTimeout: 300,
    ignored: ['**/*.woff', '**/*.woff2', '**/*.jpg', '**/*.png', '**/*.svg', 'node_modules'],
  },
};

module.exports = merge(webpackConfig, settings, clean, js, css, fonts, vue, sprites);
