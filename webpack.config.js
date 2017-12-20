module.exports = {
  entry: [
    './src/index.ts'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
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
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  devtool: 'source-map'
}
