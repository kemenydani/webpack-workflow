const ENV = process.env.NODE_ENV;

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('./package.json');
var extractPlugin = new ExtractTextPlugin({
  filename: 'css/main.css'
});

const config = {
    entry: {
      app: './src/js/index.js',
      //vendor: Object.keys(pkg.dependencies)
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: ENV === 'production' ? 'js/bundle.min.js' : 'js/bundle.js',
    },
    devServer: {
      contentBase: './src',
      historyApiFallback: true,
      hot: true,
      open: true,
      port: 8095,
      inline: false,
      quiet: true
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
          //$: "jquery",
          //jQuery: "jquery"
        }),
        extractPlugin,
        new HtmlWebpackPlugin({
          template: 'src/index.html'
        }),
        //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.min-[hash:6].js'}),
    ]
};

if (ENV === 'production') {

    config.devtool = '#source-map'
    config.plugins = (config.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        ie8: true,
        mangle: true,
        compress: {
          warnings: false
        },
        output: {
          comments: false
        },
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ])
    module.exports = config;
}