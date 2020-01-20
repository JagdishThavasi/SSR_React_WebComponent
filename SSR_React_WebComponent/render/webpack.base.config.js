const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');
module.exports = {
  // Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
    new ReactLoadableSSRAddon({
      filename: 'assets-manifest.json',
    })
  ]
};
