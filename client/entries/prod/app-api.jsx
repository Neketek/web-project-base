//creates asynch element for fb sdk script
const createFacebookSDKScriptElement=()=>{
  const e = document.createElement("script");
  e.async = true;
  e.defer = true;
  e.src = "https://connect.facebook.net/en_US/sdk.js";
  return e;
}

// creates async element for google api script
const createGoogleAPIScriptElement=()=>{
  const e = document.createElement("script");
  e.async = true;
  e.defer = true;
  e.src = "https://apis.google.com/js/api.js";
  return e;
}


// condition which checks status of the third party APIs
const isAPIInitialized=()=>window.FacebookSDKInitialized&&window.GoogleAPIAuth2Initilized;

/*
  Setter which sets callback which
  will be called when isAPIInitialized returns true.
  To avoid race condition when API initialized before
  callback was set, setter calls callback right after
  it was set if isAPIInitialized returns true.
*/
window.setOnAPIInitializedCallback=(callback)=>{
  window.onAPIInitialized=()=>{
    if(isAPIInitialized()){
      callback();
    }
  }
  window.onAPIInitialized();
}

window.setOnAPIInitializedCallback(()=>{});


const facebookSDKScriptElement = createFacebookSDKScriptElement();
const googleAPIScriptElement = createGoogleAPIScriptElement();

// facebook async init function, nothing special, read fb docs
window.fbAsyncInit=()=>{
  FB.init({
    appId:"173426159970380",
    version:"v2.8",
    cookies:true,
    xfbml:true
  });
  window.FacebookSDKInitialized=true;
  window.onAPIInitialized();
}

// google auth2 init function, nothing special, read google api docs
googleAPIScriptElement.onload=()=>{
  gapi.load("auth2",()=>{
    gapi.auth2.init({
      client_id:"941779526949-5eiip6mkv9bu7ed8eu4tmrhflg4canso.apps.googleusercontent.com",
      scope: 'profile,email'
    }).then(()=>{
      window.GoogleAPIAuth2Initilized = true;
      window.onAPIInitialized();
    });
  });

}

document.body.appendChild(facebookSDKScriptElement);
document.body.appendChild(googleAPIScriptElement);
