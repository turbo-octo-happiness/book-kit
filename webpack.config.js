var path = require('path');

var webpack = require('webpack');

var packageData = require('./package.json');

var filename = [packageData.name, packageData.version, 'js'];

module.exports = {
  entry: path.resolve(__dirname, 'public/js/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: filename.join('.'),
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
};
