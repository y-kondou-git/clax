const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    lib: './lib/index.ts',
    counter: './examples/counter/index.ts'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'clax',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: 'source-map-loader'
      },
      {
        test: /\.ts$/,
        exclude: '/node_modules/',
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: 'pug-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/counter/index.pug',
      filename: 'counter.html'
    })
  ]
}
