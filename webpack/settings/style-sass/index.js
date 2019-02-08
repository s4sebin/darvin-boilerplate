const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const prod = {
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 2,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer({
                flexbox: 'no-2009'
              }),
            ],
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css',
    }),
  ]
};

const dev = {
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 2,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer({
                flexbox: 'no-2009'
              }),
            ],
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css',
    }),
  ]
}

module.exports = {
  prod: prod,
  dev: dev
};
