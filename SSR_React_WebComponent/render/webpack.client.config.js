const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const config = {
  // Tell webpack the root file of our
  // server application
  entry: './client/client.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'client-bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = merge(baseConfig, config);
