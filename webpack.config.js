module.exports = {
  entry: './js/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }  
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.(png|jp(e*)g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // images < 8kb are converted to base64 strings and inlined in the code
              // images > 8kb are passed to the file-loader with options to process
              limit: 0,
              name: 'img/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ]
  }
}