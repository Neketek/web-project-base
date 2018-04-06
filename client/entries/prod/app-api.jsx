const createFacebookSDKScriptElement=()=>{
  const e = document.createElement("script");
  e.async = true;
  e.src = "https://connect.facebook.net/en_US/sdk.js";
  return e;
}


const createGoogleAPIScriptElement=()=>{
  const e = document.createElement("script");
  e.async = true;
  e.src = "https://apis.google.com/js/api.js";
  return e;
}

const isAPIInitialized=()=>window.FBInitialized;

window.setOnAPIInitializedCallback=(callback)=>{
  console.log("INITIALIZING CALLBACK");
  window.onAPIInitialized=()=>{
    if(isAPIInitialized()){
      callback();
    }
  }
  console.log("onAPIInitialized");
  console.log(window.onAPIInitialized);
  window.onAPIInitialized();
}

//setting default on inilized api callback
window.setOnAPIInitializedCallback(()=>{
  console.log("DEFAULT CALLBACK");
});
document.body.appendChild(createFacebookSDKScriptElement());
document.body.appendChild(createGoogleAPIScriptElement());

window.fbAsyncInit=()=>{
  FB.init({
    appId:"173426159970380",
    version:"v2.8",
    cookies:true,
    xfbml:true
  });
  window.FBInitialized=true;
  window.onAPIInitialized();
}
