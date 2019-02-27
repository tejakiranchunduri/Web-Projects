const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: 'style.[contenthash].css'
})
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
  hash: true
})

const rootDirectory = path.resolve(__dirname)
const src = path.join(rootDirectory, 'src')

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  // resolve: {
  //   // Configure how modules are resolved.
  //   // For example, when calling import 'lodash' in ES2015, the resolve options can change where webpack goes to look for 'lodash'
  //   alias: {
  //     //Create aliases to import or require certain modules more easily. For example, to alias a bunch of commonly used src/ folders
  //   },
  //   /*
  //   extensions: ['.js', '.jsx', '.json']
  //   Automatically resolve certain extensions.
  //   */
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(scss)$/,
        use: [
          { loader: 'style-loader', options: {} },
          { loader: 'csss-loader' },
          { loader: 'sass-loader', options: { includePaths: ['../node_modules'] } },
          { loader: 'postcss-loader', options: { sourceMap: false } }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000, name: '[name].[ext]' }
          }
        ]
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, MiniCssExtractPluginConfig]
}
