import AppContainerBase from 'modules/app/component/container/base';
import SignUpForm from 'modules/app/component/form/auth/sign-up';
import Grid from 'material-ui/Grid';
import React from 'react';
import { signUp } from 'modules/app/data/network/ajax/auth';

class SignUpContainer extends AppContainerBase{
  container({render}){
    return (
      <Grid container justify="center">
        <SignUpForm onChange={this.props.onChange} onSubmit={this.props.onSubmit}></SignUpForm>
      </Grid>
    );
  }
}

export const signUpAction=data=>(dispatch,getState)=>{
  const {name,password,email}=data;
  const signUpData = {name,password,email};
  signUp(signUpData).then(
    response=>{
      response.json().then(
        data=>{
          console.log(data);
        },
        error=>{

        }
      )
    },
    error=>{
      console.log(error);
    }
  )
}

SignUpContainer.updateDefaultProps({
  onChange(event){
    console.log(event);
  }
});

SignUpContainer.updateMapDispatchToProps((dispatch,ownProps)=>{
  return {
    onSubmit(event){
      dispatch(signUpAction(event.values));
    }
  }
});


export default SignUpContainer.connect();
