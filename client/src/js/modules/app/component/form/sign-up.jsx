import React from 'react';
import {Form,Rule} from 'modules/common/base/component/form';
import {Text,Date,DateTime,Time,Select,Button,InputError} from 'modules/common/component/input';
import NameForm from './name';
import Grid from 'material-ui/Grid';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';

class SignUpForm extends Form{

  onChange=(event)=>{
    const emailChanged = event.name=="email"?true:false;
    const passwordChanged = event.name=="password"?true:false;
    if(emailChanged){
      this.value("emailConfirmation","");
    }
    if(passwordChanged){
      this.value("passwordConfirmation","");
    }
    this.propagateEvent(event);
  }

  form=({render:{form,error,field}})=>{

    const {labels} = this.props;

    const commonProps = (name)=>{
      return {
        name,
        label:labels[name],
        fullWidth:true,
        required:true,
      }
    };


    const emailProps = {
      ...commonProps('email')
    };

    const emailConfirmationProps = {
      ...commonProps("emailConfirmation")
    }

    const passwordProps = {
      ...commonProps('password'),
      type:"password"
    };

    const passwordConfirmationProps = {
      ...commonProps("passwordConfirmation"),
      type:"password"
    };

    const showConfirmation=(name)=>!this.hasErrors(name)&&this.hasErrors(name+"Confirmation");

    const email = field(Text,emailProps);
    const emailError = error(InputError,{name:emailProps.name});

    const emailConfirmation = showConfirmation("email")?field(Text,emailConfirmationProps):null;
    const emailConfirmationError = error(InputError,{name:emailConfirmationProps.name});

    const password = field(Text,passwordProps);
    const passwordError = error(InputError,{name:passwordProps.name});

    const passwordConfirmation = showConfirmation("password")?field(Text,passwordConfirmationProps):null;
    const passwordConfirmationError = error(InputError,{name:passwordConfirmationProps.name});

    const renderFieldAndError=(f,e)=>{
      if(!f){
        return null;
      }
      return (
        <Grid item xs={12}>
          {f}
          {e}
        </Grid>
      )
    };

    return (
        <Grid container justify='center' spacing={16} alignItems='center'>
          <Grid item xs={12}>
            {form(NameForm,{name:"name"})}
          </Grid>
          {renderFieldAndError(email,emailError)}
          {renderFieldAndError(emailConfirmation,emailConfirmationError)}
          {renderFieldAndError(password,passwordError)}
          {renderFieldAndError(passwordConfirmation,passwordConfirmationError)}
        </Grid>
    );
  }

  rules=()=>{
    return {
      ...this.props.rules,
      passwordConfirmation:[
        Rule.General.equals("Password does not match confirmation!")(this.value("password"))
      ],
      emailConfirmation:[
        Rule.General.equals("Email does not match confirmation!")(this.value("email"))
      ]
    }
  }
}



SignUpForm.updateDefaultProps({
  name:"signUp",
  labels:{
    email:"Email",
    password:"Password",
    emailConfirmation:"Confirm email",
    passwordConfirmation:"Confirm password",
    name:{
      first:"First name",
      last:"Last name"
    }
  },
  values:{
    email:"",
    emailConfirmation:"",
    password:"",
    passwordConfirmation:"",
    name:{
      first:"",
      last:""
    }
  },
  rules:{
    email:[
      Rule.String.notEmpty("Email should not be empty!"),
      Rule.String.email()
    ],
    password:[
      Rule.String.notEmpty("Password should not be empty!")
    ]
  }
});


export default SignUpForm;
