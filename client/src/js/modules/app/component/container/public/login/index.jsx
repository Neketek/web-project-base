import AppContainerBase from 'modules/app/component/container/base';
import LoginForm from 'modules/app/component/form/login';
import Grid from 'material-ui/Grid';
import React from 'react';
import Routing from 'modules/app/component/container/routing';

class LoginContainer extends AppContainerBase{
  container({render}){
    const onSubmit=()=>this.props.redirect(Routing.Public.signUp());
    return (
      <Grid container justify="center">
        <LoginForm onChange={this.props.onChange} onSubmit={onSubmit}></LoginForm>
      </Grid>
    );
  }
}

LoginContainer.updateDefaultProps({
  onChange(event){
    console.log(event);
  }
});


export default LoginContainer.connect();
