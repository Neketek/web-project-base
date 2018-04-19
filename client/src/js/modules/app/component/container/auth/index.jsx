import Base from "../base";
import React from "react";
import AuthenticationForm from 'modules/app/component/form/auth';
import PasswordResetForm from 'modules/app/component/form/password-reset';
import {Tabs} from 'modules/common/component/input';
import Grid from 'material-ui/Grid';
import {
  login
} from './thunk';
const LOGIN_TAB_VALUE = "login";
const SIGN_UP_TAB_VALUE = "sign-up";

class AuthContainer extends Base{

  container({render:container}){
    const {Auth,Switch,Route,Redirect} = this;
    const {match:{url}} = this.props;
    return (
      <Switch>
        <Route exact path={`${url}/`} render={()=><Redirect to={`${url}/${LOGIN_TAB_VALUE}`}/>}/>
        <Route exact path={`${url}/reset-password`} render={()=><PasswordResetForm/>}/>
        <Route path={`${url}/:tab`} render={props=>Auth(props)}/>
      </Switch>
    );
  }


  onTabChange=({value})=>{
    const {match:{url}} = this.props;
    this.redirect(`${url}/${value}`);
  }


  Auth=({match})=>{
    const {AuthForm} = this;
    return <AuthForm tab={match.params.tab}/>
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
  auth:"none"
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
