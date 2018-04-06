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
    const commonConfig = new Config(__dirname);

    let { polyfills, entry, path:outPath } = env;

    polyfills = polyfills=="true" || polyfills===undefined;

    // console.log({polyfills, entry, outPath});

    const config = commonConfig.createEntryOutput(polyfills).prod(entry,outPath);
    config.resolve = commonConfig.createResolve();

    const ProdCSSPlugin = ()=>{
      const filename = path.join("../css",entry+".css");
      return new ExtractTextPlugin({filename});
    };


    config.plugins = [
      commonConfig.createRule().define({
        "process.env": {
          "BABEL_ENV": JSON.stringify("production"),
          "NODE_ENV": JSON.stringify("production")
        }
      }),
      ProdCSSPlugin(),
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
