const path = require('path');
const basePath = process.cwd();

let devServer = require('../../libs/devserver-storage');

const dev = {
  devServer: {
    before(app, server) {
      // set storage
      devServer.server = server;
      devServer.app = app;
    },
    /*watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },*/
    contentBase: [path.resolve(basePath, 'dist')],
    watchContentBase: true,
    compress: true,
    port: 7001,
    open: 'Google Chrome',
    writeToDisk: false,
    publicPath: '/',
    index: 'index.html'
  }
}

module.exports = {
  prod: {},
  dev: dev
};
