import React from 'react';
import {Form,Rule} from 'modules/common/base/form';
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
    this.propagateEvent(null);
    // this.rerender();
  }

  form=(field,form)=>{

    const commonProps = (name)=>{
      const error = this.shouldShowErrors(name)
      return {
        name,
        label:name[0].toUpperCase()+name.slice(1),
        fullWidth:true,
        required:true,
        error
      }
    };


    const loginProps = {
      ...commonProps('login')
    };

    const passwordProps = {
      ...commonProps('password'),
      type:"password"
    }


    const error=(name)=>this.shouldShowErrorsText(name)?<FormHelperText error>{this.errors(name)[0]}</FormHelperText>:null;

    // console.log(loginProps);

    const login = field(Text,loginProps);
    const password = field(Text,passwordProps);


    return (
        <Grid container justify='center' spacing={16} alignItems='center'>
              <Grid item sm={6} xs={12}>
                {login}
                {error("login")}
              </Grid>
              <Grid item sm={6} xs={12}>
                {password}
                {error("password")}
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

}

LoginForm.updateDefaultProps({
  values:{
    password:"",
    login:""
  },
  rules:{
    login:[
      Rule.String.notEmpty("Login should not be empty!")
    ],
    password:[
      Rule.String.notEmpty("Password should not be empty!")
    ]
  }
});


export default LoginForm;
