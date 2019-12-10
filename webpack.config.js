const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin= require('copy-webpack-plugin');

module.exports = {
  entry: "./src/JavaScript/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: false }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/images"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/fonts"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "main.css"      
    }),
    new CopyWebpackPlugin([
    {
      from: './src/images/favicon',
      to: 'assets/images/favicon'
    }
  ])
  ],
  devtool: "inline-source-map",

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000
  }
};
