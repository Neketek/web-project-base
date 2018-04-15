import Base from "../base";
import React from "react";
import AuthenticationForm from 'modules/app/component/form/auth';
import {Tabs} from 'modules/common/component/input';
import Grid from 'material-ui/Grid';
import {
  login
} from './thunk';
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
    const {onLogin,onSignUp}=this.props;
    return (
      <AuthenticationForm
        values={{tab}}
        name="auth"
        onTabChange={this.onTabChange}
        onChange={event=>console.log(event)}
        onLogin={event=>onLogin(event.values)}
        onSignUp={event=>onSignUp(event.values)}
      />
    );
  }

}

AuthContainer.updateDefaultProps({
  authRequired:false
});

AuthContainer.updateMapDispatchToProps((dispatch,ownProps)=>{
  const {name} = ownProps;
  return {
    onLogin(data){
      dispatch(login(name,data));
    },
    onSignUp(data){
      console.log(data);
    }
  }
});

export default AuthContainer.connect();
