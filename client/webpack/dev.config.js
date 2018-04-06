const Config = require("./common.config.js");
const webpack = require("webpack");


const DEV_CSS_RULE = {
  test: /\.(s*)css$/,
  use: [
    'style-loader', 'css-loader', 'sass-loader'
  ],
  exclude: [/node_modules/]
}


module.exports = dirname=>{

  return env=>{

    var commonConfig = new Config(dirname);

    let { polyfills, entry, path:outPath } = env;

    polyfills = polyfills=="true" || polyfills===undefined;

    var config = commonConfig.createEntryOutput(polyfills).dev(entry, outPath);

    config.resolve = commonConfig.createResolve();

    config.plugins = [
      commonConfig.createRule().define({
        "process.env":{
          "BABEL_ENV":JSON.stringify("development")
        }
      }),
      new webpack.HotModuleReplacementPlugin({}),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ];

    config.module = {
      rules: [
        DEV_CSS_RULE,
        commonConfig.createRule().babel()
      ]
    };

    config.devServer = {

      host:commonConfig.DEV_SERVER_HOST,
      port:commonConfig.DEV_SERVER_PORT,
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
      },
      headers:{
        'Access-Control-Allow-Origin': '*'
      }

    };

    return config;

  }
}
