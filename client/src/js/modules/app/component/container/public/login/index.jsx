import AppContainerBase from 'modules/app/component/container/base';
import LoginForm from 'modules/app/component/form/login';
import Grid from 'material-ui/Grid';
import React from 'react';
import Routing from 'modules/app/component/container/routing';
import { push } from 'react-router-redux';
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

LoginContainer.updateMapDispatchToProps((dispatch,ownProps)=>{
  return {
    onSubmit(event){
      const {values:{login}}=event;
      dispatch(setUserVariable("email",login));
      dispatch(push(Routing.Private.route.dashboard()));
    }
  }
});

export default LoginContainer.connect();
