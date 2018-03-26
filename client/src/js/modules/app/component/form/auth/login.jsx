import React from 'react';
import {Form,Rule} from 'modules/common/base/component/form';
import {Text,Date,DateTime,Time,Select,Button,InputError} from 'modules/common/component/input';
import Grid from 'material-ui/Grid';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';

class LoginForm extends Form{

  form=({render:{field,error,form}})=>{

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




    // console.log(loginProps);

    const login = field(Text,loginProps);
    const loginError = error(InputError,{name:'email'});

    const password = field(Text,passwordProps);
    const passwordError = error(InputError,{name:'password'});

    const date = field(Date,commonProps('date'));

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
                {date}
              </Grid>
              <Grid item xs={6}>
                <Grid container justify='center'>
                  <Button variant='raised' size='large' name='login' onClick={this.onSubmit}>
                    Login
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container justify='center'>
                  <button name='facebook' onClick={this.props.onFacebookLogin}>
                    Facebook login
                  </button>
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
    email:""
  },
  labels:{
    email:"Email",
    password:"Password"
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
