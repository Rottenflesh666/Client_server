import Config from 'webpack-config';
import Path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default new Config().merge({
  entry: Path.join(__dirname + '/../src/index.js'),
  output: {
    path: Path.join(__dirname + '/../build'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,

      },
      {
        test: /\.css$/,
        loader: 'css-to-string-loader!css-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.join(__dirname + '/../index.html'),
      inject: "body"
    })]
});