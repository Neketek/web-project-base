import AppContainerBase from 'modules/app/component/container/base';
import AuthForm from 'modules/app/component/form/auth';
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
        <AuthForm onChange={this.props.onChange} onSubmit={this.props.onSubmit}></AuthForm>
      </Grid>
    );
  }
}

LoginContainer.updateMapDispatchToProps((dispatch,ownProps)=>{
  return {
    onSubmit(event){
      login().then(
        data=>{
          console.log(data);
        },
        error=>{
          console.log(error);
        }
      );
    }
  }
});

export default LoginContainer.connect();
