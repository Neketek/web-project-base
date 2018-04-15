import Base from "../base";
import React from "react";

class AuthContainer extends Base{
  container({render:container}){
    return <div>Authentification container</div>;
  }
}

AuthContainer.updateDefaultProps({
  authRequired:false
});

export default AuthContainer;
