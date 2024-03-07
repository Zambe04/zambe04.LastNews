const path = require('path');

module.exports = {
  entry:  './assets/JS/app.js',
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    port: 8080, 
    open: true,
    hot: true,
  },
  mode: "production",
};