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

class LoginContainer extends AppContainerBase{
  container({render}){
    return (
      <Grid container justify="center">
        <LoginForm onChange={this.props.onChange} onSubmit={this.props.onSubmit}></LoginForm>
      </Grid>
    );
  }
}

const actionLogin=data=>(dispatch,getState)=>{
  const {email,password}=data;
  login({email,password}).then(
    data=>data.json().then(
      data=>{
        console.log(data);
      },
      parsingError=>{
        console.log(parsingError);
      }
    ),
    error=>{
      console.log(error);
    }
  )
}

LoginContainer.updateMapDispatchToProps((dispatch,ownProps)=>{
  return {
    onSubmit(event){
      dispatch(actionLogin(event.values));
    }
  }
});

export default LoginContainer.connect();
