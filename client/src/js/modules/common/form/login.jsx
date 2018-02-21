import React from 'react';
import {Form} from 'modules/common/base/form';
import {Text,Date,DateTime,Time,Select,Button} from 'modules/common/input';
import Grid from 'material-ui/Grid';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';

class LoginForm extends Form{

  onChange=(event)=>{
    this.propagateEvent(event);
  }


  onSubmit=()=>{
    this.dirtyFocusOnErrors();
    this.rerender();
  }

  form=(field,form)=>{

    const commonProps = (name)=>{
      const error = this.hasErrors(name)&&this.dirty(name)
      return {
        name,
        label:name[0].toUpperCase()+name.slice(1),
        fullWidth:true,
        required:true,
        error,
        errorText:error&&this.focus(name)?this.errors(name)[0]:undefined
      }
    };


    const loginProps = {
      ...commonProps('login')
    };

    const dateProps = {
      ...commonProps('date')
    };


    const passwordProps = {
      ...commonProps('password'),
      type:"password"
    }


    const error=(props)=>props.errorText?<FormHelperText error>{props.errorText}</FormHelperText>:null;

    // console.log(loginProps);

    const login = field(Text,loginProps);
    const password = field(Text,passwordProps);
    const date = field(Date,dateProps);

    return (
      <Grid container justify='center' spacing={16} alignItems='center'>
            <Grid item sm={6} xs={12}>
              {login}
              {error(loginProps)}
            </Grid>
            <Grid item sm={6} xs={12}>
              {password}
              {error(passwordProps)}
            </Grid>
            <Grid item xs={12}>
              <Grid container justify='center'>
                <Button variant='raised' size='large' name='login' onClick={this.onSubmit}>
                  Login
                </Button>
              </Grid>
            </Grid>
      </Grid>
    );
  }

  isValid=()=>{
    if(this.value("login").length==0){
      this.errors('login',["Login shouldn't be empty"]);
    }else{
      this.resetErrors('login');
    }
    if(this.value('password').length==0){
      this.errors('password',["Password shouldn't be empty"])
    }else{
      this.resetErrors('password');
    }
  }
}

LoginForm.updateDefaultProps({
  values:{
    password:"",
    login:"",
    date:null
  }
});


export default LoginForm;
