import AppContainerBase from 'modules/app/component/container/base';
import SignUpForm from 'modules/app/component/form/sign-up';
import Grid from 'material-ui/Grid';
import React from 'react';
import { signUp } from 'modules/app/data/network/ajax/auth';

class SignUpContainer extends AppContainerBase{
  container({render}){
    return (
      <Grid container justify="center">
        <SignUpForm onChange={this.props.onChange}></SignUpForm>
      </Grid>
    );
  }
}

export const signUpAction=data=>(dispatch,getState)=>{
  const signUpData = {
    name:{
      first:data.firstName,
      last:data.lastName
    },
    email:data.email,
    password:data.password
  }
}

SignUpContainer.updateDefaultProps({
  onChange(event){
    console.log(event);
  }
});


export default SignUpContainer.connect();
