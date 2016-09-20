const path = require('path');
const packageData = require('./package.json');

const filename = [packageData.name, packageData.version, 'js'];

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
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
