const url=location=>(prefix="")=>`${prefix}/${location}`;

export const Public = {
  login:url("login"),
  signUp:url("sign-up")
}

export const Private = {
  dashboard:url(""),
}

const isUrlInStore = store => (prefix="") => location => {
  if(location===undefined){
    throw Error("Location can't be undefined!");
  }
  // console.log({location});
  for(const key in store){
    // console.log(store[key](prefix));
    if(store[key](prefix)==location){
      // console.log("TRUE");
      return true;
    }
  }
  return false;
}

export const isPrivate = isUrlInStore(Private);
export const isPublic = isUrlInStore(Public);

export default {Private,Public,isPrivate,isPublic};
