import ContainerBase from 'modules/common/base/component/container';
import SignUpForm from 'modules/app/component/form/sign-up';
import Grid from 'material-ui/Grid';
import React from 'react';

class SignUpContainer extends ContainerBase{
  container({render}){
    return (
      <Grid container justify="center">
        <SignUpForm onChange={this.props.onChange}></SignUpForm>
      </Grid>
    );
  }
}

SignUpContainer.updateDefaultProps({
  onChange(event){
    console.log(event);
  }
});


export default SignUpContainer.connect();
