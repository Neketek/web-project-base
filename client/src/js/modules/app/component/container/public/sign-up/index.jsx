import AppContainerBase from 'modules/app/component/container/base';
import SignUpForm from 'modules/app/component/form/sign-up';
import Grid from 'material-ui/Grid';
import React from 'react';
import {Text,Date,DateTime,Time,Select,Button} from 'modules/common/component/input';
class SignUpContainer extends AppContainerBase{
  container({render}){
    return (
      <Grid container justify="center">
        <Button variant='raised' size='large' onClick={()=>this.props.redirect("/login")}>LOGIN</Button>
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
