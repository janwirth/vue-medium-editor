const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path')
const PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = function (options) {
  options = options || {}
  return {
    entry: './index',
    resolve: {
      extensions: [ '.es6', '.js' ]
    },
    output: {
      filename: `vueMediumEditor${ PRODUCTION ? '.min' : '' }.js`,
      path: path.resolve(__dirname, 'dist'),
      library: 'vueMediumEditor',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: PRODUCTION ? ['es2015', 'babili'] : ['es2015']
            }
          }
        }
      ]
    },
    plugins: PRODUCTION ? [ new UglifyJSPlugin() ] : []
  }
}
