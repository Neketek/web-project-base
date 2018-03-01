import ContainerBase from 'modules/common/base/component/container';
import LoginForm from 'modules/app/component/form/login';
import Grid from 'material-ui/Grid';
import React from 'react';

class LoginContainer extends ContainerBase{
  container({render}){
    return (
      <Grid container justify="center">
        <LoginForm onChange={this.props.onChange}></LoginForm>
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
