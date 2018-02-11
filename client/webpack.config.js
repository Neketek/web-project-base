var path = require("path");
const CommonConfig = require("./webpack/common.config.js");
const WEBPACK_CONFIGS_PATH = path.join(__dirname,"webpack");
const commonConfig = new CommonConfig(WEBPACK_CONFIGS_PATH);


module.exports = env =>{
  if(commonConfig.getProccessBooleanParameter("--env.production")){
    return require("./webpack/prod.config.js")(WEBPACK_CONFIGS_PATH)(env);
  }else{
    return require("./webpack/dev.config.js")(WEBPACK_CONFIGS_PATH)(env);
  }
}
