import React from 'react';
import {Form,Rule} from 'modules/common/base/component/form';
import {Text,Date,DateTime,Time,Select,Button,InputError} from 'modules/common/component/input';
import NameForm from './name';
import Grid from 'material-ui/Grid';
import LoginForm from './login';
import SignUpForm from 'sign-up';

const LOGIN_FORM_NAME = "login";
const SIGN_UP_NAME = "sign-up";


class AuthForm extends Form{
    form=({render:{field,error,form,input}})=>{
      let selected = null;
      const name = this.status("selected");
      if(name==LOGIN_FORM_NAME){
        selected = form(LoginForm,{name});
      }else if(name==SIGN_UP_NAME){
        selected = form(SignUpForm,{name});
      }
      return (
        <Grid container>
          {selected}
        </Grid>
      )
    }
}


AuthForm.updateDefaultProps({
  name:"auth",
  status:{
    selected:LOGIN_FORM_NAME
  }
});


export default AuthForm;
