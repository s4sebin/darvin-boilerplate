const path = require('path');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const prod = {
  plugins: [
    new SVGSpritemapPlugin({
      src: path.resolve(__dirname, 'src/assets/images/icons/**/*.svg'),
      styles: path.resolve(__dirname, 'src/styles/tools/_svg-sprite.scss'),
      filename: 'build/assets/images/sprites/svg-sprite.svg',
      gutter: 3,
    }),
  ],
};

const dev = {
  plugins: [
    new SVGSpritemapPlugin({
      src: path.resolve(__dirname, 'src/assets/images/icons/**/*.svg'),
      styles: path.resolve(__dirname, 'src/styles/tools/_svg-sprite.scss'),
      filename: 'build/assets/images/sprites/svg-sprite.svg',
      gutter: 3,
    }),
  ],
}

const prev = {
  plugins: [
    new SVGSpritemapPlugin({
      src: path.resolve(__dirname, 'preview/assets/images/icons/**/*.svg'),
      styles: path.resolve(__dirname, 'preview/styles/tools/_svg-sprite.scss'),
      filename: 'preview/assets/images/sprites/svg-sprite-darvin.svg',
      gutter: 3,
    }),
  ],
}

module.exports = {
  prod: prod,
  dev: dev,
  prev: prev
};
