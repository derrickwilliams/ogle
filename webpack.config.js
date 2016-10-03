const { join: makePath } = require('path');

module.exports = {
  entry: makePath(__dirname, 'src/ui'),
  output: {
    path: makePath(__dirname, 'ui'),
    filename: 'ogle.js'
  },
  module: {
    preLoaders: [
      { test: /\.html$/, include: /src\/ui/, loader: 'riotjs', query: { type: 'none' } },
    ],
    loaders: [
      { test: /\.js$|\.html$/, include: /src\/ui/, loader: 'babel', query: { presets: 'es2015-riot' } },
    ]
  }
}