const path = require('path');
const basePath = process.cwd();

const merge = require('webpack-merge');
const webpackConfig = require('../webpack.config');


/*** Dynamic Imports START ***/
const { dev: devServer } = require('./settings/env-devserver');
const { dev: clean } = require('./settings/assets-cleaner');
const { dev: copy } = require('./settings/assets-copy');
const { dev: config } = require('./settings/javascript-i18n');
const { dev: css } = require('./settings/style-sass');
const { dev: fonts } = require('./settings/assets-fonts');
const { dev: images } = require('./settings/assets-images');
const { dev: js } = require('./settings/javascript');
const { dev: markdown } = require('./settings/html-markdown');
const { dev: modernizr } = require('./settings/javascript-modernizr');
const { dev: nunjucks } = require('./settings/html-nunjucks');
const { dev: sprites } = require('./settings/assets-sprites');
const { dev: vue } = require('./settings/javascript-vue');
/*** Dynamic Imports END ***/

let { webpackEntryObj } = require('./libs/darvin-webpack');

const settings = {
  entry: webpackEntryObj,
  output: {
    devtoolLineToLine: false,
    // sourceMapFilename: '[name].js.map',
    path: path.resolve(basePath, 'dist'),
    pathinfo: false,
    filename: 'assets/[name].js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map'
};

module.exports = merge(webpackConfig, settings, clean, copy, js, css, config, fonts, images, modernizr, nunjucks, vue, sprites, markdown, devServer);
