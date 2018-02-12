const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

class Config {
  constructor(dirname) {

    this.DEV_SERVER_PATH = "http://localhost:9000";
    this.DEV_SERVER_PUBLIC_PATH = this.DEV_SERVER_PATH + "/static/js/";
    this.DEV_SERVER_HOST = "0.0.0.0";
    this.DEV_SERVER_PORT = "9000";

    this.CLIENT_ROOT = path.join(dirname, "..");
    this.CLIENT_SOURCE_ROOT = path.join(this.CLIENT_ROOT, "src");
    this.CLIENT_CSS_ROOT = path.join(this.CLIENT_SOURCE_ROOT, "css");
    this.CLIENT_JS_ROOT = path.join(this.CLIENT_SOURCE_ROOT, "js");
    this.CLIENT_ENTRIES_ROOT = path.join(this.CLIENT_ROOT, "entries");
    this.CLIENT_DEV_ENTRIES_ROOT = path.join(this.CLIENT_ENTRIES_ROOT, "dev");
    this.CLIENT_PROD_ENTRIES_ROOT = path.join(this.CLIENT_ENTRIES_ROOT, "prod");

    this.NODE_MODULES = "node_modules";

    this.SERVER_STATIC_FOLDER = path.join(this.CLIENT_ROOT, "../server/static");
    this.SERVER_STATIC_JS_FOLDER = path.join(this.SERVER_STATIC_FOLDER, "js");
    this.SERVER_STATIC_CSS_FOLDER = path.join(this.SERVER_STATIC_FOLDER,"css");

    this.RESOLVE_EXTENSIONS = ['.js', '.jsx', '.scss', '.css'];

  }

  getProccessParameterValue(name) {
    try {
      return process.argv[process.argv.indexOf(name) + 1];
    } catch (e) {
      return undefined;
    }
  }

  getProccessBooleanParameter(name) {
    return process.argv.indexOf(name) != -1;
  }

  createRule() {

    const rules = {};

    rules.babel = () => {
      return {test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/}
    };

    rules.define = (variables)=>{
      return new webpack.DefinePlugin(variables);
    }

    return rules;

  }

  createEntryOutput() {

    const entries = {};

    entries.dev = (entryName, entryPath) => {
      const entryConfig = {};

      entryConfig[entryName] = [
        "babel-polyfill",
        "react-hot-loader/patch",
        "webpack-dev-server/client?" + this.DEV_SERVER_PATH,
        "webpack/hot/only-dev-server",
        path.join(this.CLIENT_DEV_ENTRIES_ROOT, entryPath)
      ];

      return {
        entry: entryConfig,
        output: {
          publicPath: this.DEV_SERVER_PUBLIC_PATH,
          path: this.SERVER_STATIC_JS_FOLDER,
          filename: "[name].min.js"
        }
      };
    };

    entries.prod = (entryName, entryPath) => {

      const entryConfig = {};

      entryConfig[entryName] = [
        "babel-polyfill",
        path.join(this.CLIENT_PROD_ENTRIES_ROOT, entryPath)
      ];

      return {
        entry: entryConfig,
        output: {
          path: this.SERVER_STATIC_JS_FOLDER,
          filename: "[name].min.js"
        }
      };
    };

    return entries;

  }

  createResolve() {
    return {
      extensions: this.RESOLVE_EXTENSIONS,
      alias: {
        css: this.CLIENT_CSS_ROOT + "/",
        modules: path.join(this.CLIENT_JS_ROOT, "modules") + "/"
      }
    }
  }

}

module.exports = Config;
