import React from 'react';
import {Form,Rule} from 'modules/common/base/component/form';
import {Text,Date,DateTime,Time,Select,Button,InputError,Check} from 'modules/common/component/input';
import Grid from 'material-ui/Grid';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';

class LoginForm extends Form{

  form=({render:{field,error,form,input}})=>{

    const commonProps = (name)=>{
      const error = this.shouldShowErrors(name)
      return {
        name,
        label:this.label(name),
        fullWidth:true,
        required:true,
        error
      }
    };

    const loginProps = {
      ...commonProps('email')
    };

    const passwordProps = {
      ...commonProps('password'),
      type:"password"
    }

    const rememberMeProps = {
      name:"rememberMe",
      label:this.label("rememberMe")
    }

    // console.log(loginProps);

    const login = field(Text,loginProps);
    const loginError = error(InputError,{name:'email'});

    const password = field(Text,passwordProps);
    const passwordError = error(InputError,{name:'password'});

    const date = field(Date,commonProps('date'));
    const dateTime = field(DateTime,commonProps('DateTime'));
    const time = field(Time,commonProps('Time'));

    const rememberMe = input(Check,rememberMeProps);

    return (
        <Grid container justify='center' spacing={16} alignItems='center'>
              <Grid item xs={12}>
                {login}
                {loginError}
              </Grid>
              <Grid item xs={12}>
                {password}
                {passwordError}
              </Grid>
              <Grid item xs={12}>
                {rememberMe}
              </Grid>
              <Grid item xs={4}>
                <Grid container justify='center'>
                  <Button variant='raised' size='large' name='login' onClick={this.onSubmit}>
                    Login
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container justify='center'>
                  <a href="/app/authorize/facebook" name='facebook' >
                    Facebook login
                  </a>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container justify='center'>
                  <a href="/app/authorize/google" name='google' >
                    Google login
                  </a>
                </Grid>
              </Grid>
        </Grid>
    );
  }

}

LoginForm.updateDefaultProps({
  name:"login",
  values:{
    password:"",
    email:"",
    rememberMe:false
  },
  labels:{
    email:"Email",
    password:"Password",
    rememberMe:"Remember me"
  },
  rules:{
    email:[
      Rule.String.notEmpty("Email should not be empty!")
    ],
    password:[
      Rule.String.notEmpty("Password should not be empty!")
    ]
  }
});


export default LoginForm;
