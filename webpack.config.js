const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const crypto = require("crypto");

module.exports = {
  entry: "./src/index.tsx",
  node: {
    fs: "empty",
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: `bundle.${crypto
      .createHash("sha1")
      .update(Math.random().toString())
      .digest("hex")}.js`,
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    port: 8000,
    host: "0.0.0.0",
    public: "aria.sparcs.org:33383",
    historyApiFallback: true,
  },
};
