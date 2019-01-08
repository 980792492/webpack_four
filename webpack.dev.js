const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin') //  clear 回滚 有问题

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: './dist',
    host: '127.0.0.1'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
})
