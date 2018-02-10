var path = require("path");

function CommonConfig(dirname){

  var obj = {};
  obj.CLIENT_ROOT = path.join(dirname,"..");
  obj.CLIENT_SOURCE_ROOT = path.join(obj.CLIENT_ROOT,"src");
  obj.CLIENT_CSS_ROOT = path.join(obj.CLIENT_SOURCE_ROOT,"css");
  obj.CLIENT_JS_ROOT = path.join(obj.CLIENT_SOURCE_ROOT,"js");
  obj.CLIENT_ENTRIES_ROOT = path.join(obj.CLIENT_ROOT,"entries");
  obj.CLIENT_DEV_ENTRIES_ROOT = path.join(obj.CLIENT_ENTRIES_ROOT,"dev");
  obj.CLIENT_PROD_ENTRIES_ROOT = path.join(obj.CLIENT_ENTRIES_ROOT,"prod");

  obj.NODE_MODULES = "node_modules";

  obj.SERVER_STATIC_FOLDER = path.join(obj.CLIENT_ROOT,"../server/static");
  obj.SERVER_STATIC_JS_FOLDER = path.join(obj.SERVER_STATIC_FOLDER,"js");


  obj.getProcessParameterValue=function(name){
    try{
      return process.argv[process.argv.indexOf(name)+1];
    }
    catch(e){
      return undefined;
    }
  }


  obj.getProccessBooleanParameter=function(name){
    return process.argv.indexOf(name)!=-1;
  }


  obj.createResolve=function(){
    return {
      alias:{
        css:obj.CLIENT_CSS_ROOT+"/",
        modules:path.join(obj.CLIENT_JS_ROOT,"modules")+"/"
      }
    }
  }

  obj.createEntryOutput=function(entryName,entryPath,entryRoot){

    var entryConfig = {};

    entryConfig[entryName]=path.join(entryRoot,entryPath);

    return {
      // context:entryRoot+"/",
      entry:entryConfig,
      output:{
        path:obj.SERVER_STATIC_JS_FOLDER,
        filename:"[name].min.js"
      }
    };

  }


  return obj;
};

module.exports = CommonConfig;
