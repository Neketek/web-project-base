const Config = require("./common.config.js");
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require("path");


const PROD_CSS_RULE = {
  test: /\.(s*)css$/,
  use:ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
  })
};



const UGLIFY_JS_PLUGIN = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
    },
    output: {
        comments: false,
    },
});


module.exports = dirname =>{
  return env =>{
    var commonConfig = new Config(__dirname);

    var config = commonConfig.createEntryOutput().prod(env.entry, env.path);

    config.resolve = commonConfig.createResolve();

    const ProdCSSPlugin = (entryName)=>{
      const filename = path.join("../css",entryName+".css");
      return new ExtractTextPlugin({filename});
    };


    config.plugins = [
      commonConfig.createRule().define({
        "process.env": {
          "BABEL_ENV": JSON.stringify("production"),
          "NODE_ENV": JSON.stringify("production")
        }
      }),
      ProdCSSPlugin(env.entry),
      UGLIFY_JS_PLUGIN,
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ];

    config.module = {
      rules:[
        PROD_CSS_RULE,
        commonConfig.createRule().babel()
      ]
    };

    return config;
  }
}
