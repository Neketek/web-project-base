import AppContainerBase from 'modules/app/component/container/base';
import LoginForm from 'modules/app/component/form/auth/login';
import Grid from 'material-ui/Grid';
import React from 'react';
import Routing from 'modules/app/component/container/routing';
import { push } from 'react-router-redux';
import { login } from 'modules/app/data/network/ajax/auth';
import {
  setUserVariable
} from 'modules/app/data/redux/reducer/user/action';
import {Facebook} from 'modules/common/base/data/sdk';

class LoginContainer extends AppContainerBase{
  container({render}){
    return (
      <Grid container justify="center">
        <LoginForm
          onChange={this.props.onChange}
          onSubmit={this.props.onSubmit}
          onFacebookLogin={this.props.onFacebookLogin}
        >
        </LoginForm>
      </Grid>
    );
  }
}

const actionLogin=data=>(dispatch,getState)=>{
  const {email,password}=data;
  login({email,password}).then(
    data=>console.log(data),
    error=>console.log(error)
  )
}

const actionFacebookLogin=()=>(dispatch,getState)=>{
  Facebook.login({scope:'public_profile,email'}).then(
    facebook=>login({facebook}).then(
      data=>console.log(data),
      error=>console.log(error)
    ),
    error=>console.log(error)
  );
}

LoginContainer.updateMapDispatchToProps((dispatch,ownProps)=>{
  return {
    onSubmit(event){
      dispatch(actionLogin(event.values));
    },
    onFacebookLogin(){
      dispatch(actionFacebookLogin());
    }
  }
});

export default LoginContainer.connect();
