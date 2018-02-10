var path = require("path");
var CommonConfig = require("./common.config.js");
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var _ = require('lodash');

// console.log(process.argv);

var DEV_CSS_RULE = {
  test: /\.(s*)css$/,
  use: [
    'style-loader', 'css-loader', 'sass-loader'
  ],
  exclude: [/node_modules/]
}

var BABEL_RULE = {
    test: /\.jsx?$/,
    use: [
      'babel-loader',
    ],
    exclude: /node_modules/
};

console.log(BABEL_RULE);

module.exports = function(env) {

  var commonConfig = CommonConfig(__dirname);

  var config = commonConfig.createEntryOutput(env.entry, env.path, commonConfig.CLIENT_DEV_ENTRIES_ROOT, true);

  config.resolve = commonConfig.createResolve();

  config.plugins = [
    new webpack.HotModuleReplacementPlugin({}),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ];

  config.module = {
    rules: [DEV_CSS_RULE, BABEL_RULE]
  };

  config.devServer = {
    host: "0.0.0.0",
    port: 9000,
    inline: true,
    publicPath:commonConfig.DEV_SERVER_PUBLIC_PATH, // flask style publicPath
    clientLogLevel: "info", // disables browser dev server console log none, error, warning or info (default)
    hot: true, // hot module replacement
    compress: true, // gzip compression of dev server data,
    contentBase: commonConfig.SERVER_STATIC_JS_FOLDER,
    overlay: {
      warnings: true,
      errors: true
    },
    watchOptions: {
      poll: 3000
      // watch:true
    },
    headers:{
      'Access-Control-Allow-Origin': '*'
    }
  };

  // console.log(config);

  return config;

}
