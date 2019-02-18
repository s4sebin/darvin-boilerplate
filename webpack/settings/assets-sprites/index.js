const basePath = process.cwd();
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const prod = {
  plugins: [
    new SVGSpritemapPlugin({
      src: basePath + '/src/assets/images/icons/**/*.svg',
      styles: basePath + '/src/styles/tools/_svg-sprite.scss',
      filename: 'assets/images/sprites/svg-sprite.svg',
      gutter: 3,
    }),
  ],
};

const dev = {
  plugins: [
    new SVGSpritemapPlugin({
      src: basePath + '/src/assets/images/icons/**/*.svg',
      styles: basePath + '/src/styles/tools/_svg-sprite.scss',
      filename: 'assets/images/sprites/svg-sprite.svg',
      gutter: 3,
    }),
  ],
}

const prev = {
  plugins: [
    new SVGSpritemapPlugin({
      src: basePath + '/preview/assets/images/icons/**/*.svg',
      styles: basePath + '/preview/styles/tools/_svg-sprite.scss',
      filename: '../preview/assets/images/sprites/svg-sprite-darvin.svg',
      gutter: 3,
    }),
  ],
}

module.exports = {
  prod: prod,
  dev: dev,
  prev: prev
};
