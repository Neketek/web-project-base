var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var _ = require('lodash');

// var JS_SRC = path.join(__dirname,"js");
var NODE_MODULES = path.join(__dirname,"node_modules");
var SERVER_STATIC_FOLDER = path.join(__dirname,"../server/static");
var SERVER_STATIC_JS_FOLDER = path.join(__dirname,"../server/static/js");


//dev config start

var DEV_CSS_RULE = {
  test:/\.(s*)css$/,
  use:[
    'style-loader',
    'css-loader',
    'sass-loader'
  ]
}


var DEV_SERVER = {
  host: "0.0.0.0",
  port: 9000,
  inline:true,
  publicPath: "0.0.0.0:9000/static/js", // flask style publicPath
  clientLogLevel: "info", // disables browser dev server console log none, error, warning or info (default)
  hot: true, // hot module replacement
  compress:true, // gzip compression of dev server data,
  contentBase:SERVER_STATIC_JS_FOLDER,
  overlay: {
    warnings: true,
    errors: true
  },
  watchOptions:{
    poll:3000
  }
}

var DEV_PLUGIN_CONFIG = [
  new webpack.HotModuleReplacementPlugin({})
];

var DEV_MODULE_CONFIG = {
  rules:[
    DEV_CSS_RULE
  ]
};

var DEV_CONFIG = {
  module:DEV_MODULE_CONFIG,
  plugins:DEV_PLUGIN_CONFIG,
  devServer:DEV_SERVER
};

// dev config end

// prod config start

var PROD_CSS_RULE = {
  test:/\.(s*)css$/,
  use:ExtractTextPlugin.extract({
      fallback:'style-loader',
      use:[
        'css-loader',
        'sass-loader'
      ]
    }
  )
}

var PROD_LANDING_CSS_PLUGIN = new ExtractTextPlugin({filename:'../css/landing.css'});
var PROD_APP_CSS_PLUGIN = new ExtractTextPlugin({filename:'../css/app.css'});

var PROD_CONFIG = {};
// prod config ent

//landing config start

var DEV_LANDING_CONFIG = {
  entry:{
    landing:"./js/dev-landing.jsx"
  },
  output:{
    path:SERVER_STATIC_JS_FOLDER,
    filename:'[name].min.js'
  }
};

var PROD_LANDING_CONFIG = _.copyDeep(DEV_LANDING_CONFIG);
PROD_LANDING_CONFIG.entry.landing = "./js/landing.jsx";

DEV_LANDING_CONFIG = Object.assign({},DEV_LANDING_CONFIG,DEV_CONFIG);
PROD_LANDING_CONFIG = Object.assign({},PROD_LANDING_CONFIG,PROD_CONFIG);
// landing config end

// app config start

var DEV_APP_CONFIG = {
  entry:{
    app:"./js/dev-app.jsx"
  },
  output:{
    path:SERVER_STATIC_JS_FOLDER,
    filename:'[name].min.js'
  }
};

var PROD_APP_CONFIG = _.copyDeep(DEV_APP_CONFIG);
PROD_APP_CONFIG.entry.app = "./js/app.jsx";

DEV_APP_CONFIG = Object.assign({},DEV_APP_CONFIG,DEV_CONFIG);
PROD_APP_CONFIG = Object.assign({},PROD_APP_CONFIG,PROD_CONFIG);

// app config end

var CONFIG = DEV_APP_CONFIG;


module.exports = CONFIG;
