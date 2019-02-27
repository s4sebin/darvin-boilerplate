const basePath = process.cwd();
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const prod = {
  plugins: [
    new SVGSpritemapPlugin({
      src: basePath + '/src/assets/images/icons/**/*.svg',
      filename: 'assets/images/sprites/svg-sprite.svg',
      gutter: 3,
    }),
  ],
};

const dev = {
  plugins: [
    new SVGSpritemapPlugin({
      src: basePath + '/src/assets/images/icons/**/*.svg',
      filename: 'assets/images/sprites/svg-sprite.svg',
      gutter: 3,
    }),
  ],
}

const prev = {
  plugins: [
    new SVGSpritemapPlugin({
      src: basePath + '/preview/assets/images/icons/**/*.svg',
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
