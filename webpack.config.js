var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extractPlugin = new ExtractTextPlugin({
  filename: 'css/main.css'
});

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
       // publicPath: '/'
    },
    devServer: {
      contentBase: './src',
      historyApiFallback: true,
      hot: true,
      open: true,
      port: 8095
    },
    resolve: {
      alias: {
        jquery: "jquery/src/jquery"
      }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
              test: /\.scss$/,
              use: ['css-hot-loader'].concat(extractPlugin.extract({
                use: ['css-loader', 'sass-loader']
              }))
            },
            {
              test: /\.html$/,
              use: ['html-loader']
            },
            {
              test: /\.(jpg|png)$/,
              use: {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'img/',
                  publicPath: 'img/'
                }
              }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
        extractPlugin,
        new HtmlWebpackPlugin({
          template: 'src/index.html'
        })
    ]
};
