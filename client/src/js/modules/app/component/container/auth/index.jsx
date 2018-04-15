import Base from "../base";
import React from "react";
import AuthentificationForm from 'modules/app/component/form/auth';
import {Tabs} from 'modules/common/component/input';
import Grid from 'material-ui/Grid';

const LOGIN_TAB_VALUE = "login";
const SIGN_UP_TAB_VALUE = "sign-up";
const LOGIN_URL = "/auth/login";
const SIGN_UP_URL = "/auth/sign-up";


class AuthContainer extends Base{

  container({render:container}){
    const {AuthForm} = this;
    const {location:{pathname}} = this.props;
    let tab = null;
    if(pathname == LOGIN_URL){
      tab=LOGIN_TAB_VALUE
    }
    else if(pathname == SIGN_UP_URL){
      tab=SIGN_UP_TAB_VALUE
    }
    return <AuthForm tab={tab}/>
  }


  onTabChange=({value})=>{
    if(value==LOGIN_TAB_VALUE){
      this.redirect(LOGIN_URL);
    }else if(value==SIGN_UP_TAB_VALUE){
      this.redirect(SIGN_UP_URL);
    }
  }


  AuthForm=({tab})=>{
    return (
      <AuthentificationForm
        values={{tab}}
        name="auth"
        onTabChange={this.onTabChange}
        onChange={event=>console.log(event)}
        onLogin={event=>console.log(event)}
        onSignUp={event=>console.log(event)}
      />
    );
  }

}

AuthContainer.updateDefaultProps({
  authRequired:false
});

export default AuthContainer.connect();
