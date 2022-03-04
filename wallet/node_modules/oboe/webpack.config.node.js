const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const version = fs.readFileSync('./build/version.txt', 'utf8')

module.exports = {
  entry: './src/entry.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'oboe-node.js',
    library: 'oboe',
    libraryTarget: 'umd2',
    libraryExport: 'default',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.BannerPlugin(version)
  ]
}
