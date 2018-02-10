var path = require("path");
var CommonConfig = require("./common.config.js");
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var _ = require('lodash');


// console.log(process.argv);



var DEV_CSS_RULE = {
  test:/\.(s*)css$/,
  use:[
    'style-loader',
    'css-loader',
    'sass-loader'
  ]
}


module.exports = function(env){

  var commonConfig = CommonConfig(__dirname);

  var config = commonConfig.createEntryOutput(env.entry,env.path,commonConfig.CLIENT_DEV_ENTRIES_ROOT);

  config.resolve = commonConfig.createResolve();

  config.plugins = [
    new webpack.HotModuleReplacementPlugin({})
  ];

  config.module = {
    rules:[
      DEV_CSS_RULE
    ]
  };

  config.devServer = {
    host: "0.0.0.0",cd
    port: 9000,
    inline:true,
    publicPath: "0.0.0.0:9000/static/js", // flask style publicPath
    clientLogLevel: "info", // disables browser dev server console log none, error, warning or info (default)
    hot: true, // hot module replacement
    compress:true, // gzip compression of dev server data,
    contentBase:commonConfig.SERVER_STATIC_JS_FOLDER,
    overlay: {
      warnings: true,
      errors: true
    },
    watchOptions:{
      poll:3000
      // watch:true
    }
  };

  console.log(config);

  return config;

}
