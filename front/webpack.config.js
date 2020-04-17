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
    rules: [{
      test: /\.css/,
        // ローダー名
        use: [
          // linkタグに出力する機能
          "style-loader",
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false
            }
          }
        ]
      },
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