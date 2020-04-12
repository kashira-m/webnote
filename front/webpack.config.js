const path = require('path');
module.exports = {
  mode: 'development',
  watch:true,
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, '../back/app/static'),
    filename: "bundla.js"
  },
  module: {
    rules: [
      {
      test: /\.js$/,
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: 'babel-loader',
      query: {
        presets: [
          "@babel/preset-env", 
          "@babel/preset-react"
        ]
      }
    }]
  }
};