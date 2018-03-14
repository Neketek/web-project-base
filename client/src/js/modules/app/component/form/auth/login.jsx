import React from 'react';
import {Form,Rule} from 'modules/common/base/component/form';
import {Text,Date,DateTime,Time,Select,Button} from 'modules/common/component/input';
import Grid from 'material-ui/Grid';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';

class LoginForm extends Form{

  form=({render})=>{

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


    const error=(name)=>this.shouldShowErrorsText(name)?<FormHelperText error>{this.errors(name)[0]}</FormHelperText>:null;

    // console.log(loginProps);

    const login = render.field(Text,loginProps);
    const password = render.field(Text,passwordProps);


    return (
        <Grid container justify='center' spacing={16} alignItems='center'>
              <Grid item xs={12}>
                {login}
                {error("login")}
              </Grid>
              <Grid item xs={12}>
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
      Rule.String.notEmpty("Login should not be empty!")
    ],
    password:[
      Rule.String.notEmpty("Password should not be empty!")
    ]
  }
});


export default LoginForm;
