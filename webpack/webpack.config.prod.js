const path = require('path');
const basePath = process.cwd();
const merge = require('webpack-merge');

const webpackConfig = require('../webpack.config');

/*** Dynamic Imports START ***/
const { prod: analyzer } = require('./settings/bundler-analyzer');
const { prod: clean } = require('./settings/assets-cleaner');
const { prod: copy } = require('./settings/assets-copy');
const { prod: config } = require('./settings/javascript-i18n');
const { prod: css } = require('./settings/style-sass');
const { prod: fonts } = require('./settings/assets-fonts');
const { prod: images } = require('./settings/assets-images');
const { prod: js } = require('./settings/javascript');
const { prod: modernizr } = require('./settings/javascript-modernizr');
const { prod: nunjucks } = require('./settings/html-nunjucks');
const { prod: sprites } = require('./settings/assets-sprites');
const { prod: vue } = require('./settings/javascript-vue');
/*** Dynamic Imports END ***/

let { webpackEntryObj } = require('./libs/darvin-webpack');

const settings = {
  entry: webpackEntryObj,
  output: {
    devtoolLineToLine: true,
    sourceMapFilename: 'assets/[name].js.map',
    path: path.resolve(basePath, 'dist/build'),
    pathinfo: false,
    filename: 'assets/[name].js',
    chunkFilename: 'async/[name].chunk.js',
    publicPath: '/'
  },
  devtool: 'source-map',
};

module.exports = merge(webpackConfig, settings, js, css, config, clean, fonts, images, modernizr, nunjucks, vue, sprites, analyzer, copy);
