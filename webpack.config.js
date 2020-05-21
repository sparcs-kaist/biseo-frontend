const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const crypto = require('crypto')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: `bundle.${crypto.createHash('sha1').update(Math.random().toString()).digest('hex')}.js`,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    public: 'kong.sparcs.org:7300',
    historyApiFallback: true
  }
}
