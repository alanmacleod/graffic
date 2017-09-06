
var path = require('path');

module.exports = {
  entry: './src/main.js',
  devtool: "inline-sourcemap",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};
