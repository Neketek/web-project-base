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

  form=({render})=>{

    const commonProps = (name,label)=>{
      const error = this.shouldShowErrors(name)
      return {
        name,
        label:label?label:name[0].toUpperCase()+name.slice(1),
        fullWidth:true,
        required:true,
        error
      }
    };


    const firstNameProps = {
      ...commonProps('firstName',"First Name"),
    };

    const lastNameProps = {
      ...commonProps('lastName',"Last Name")
    };

    const emailProps = {
      ...commonProps('email')
    };

    const emailConfirmationProps = {
      ...commonProps("emailConfirmation","Confirm Email")
    }

    const passwordProps = {
      ...commonProps('password'),
      type:"password"
    };

    const passwordConfirmationProps = {
      ...commonProps("passwordConfirmation","Confirm Password"),
      type:"password"
    };

    const inviteCodeProps = {
      ...commonProps("inviteCode","Invite Code")
    }

    const error=(name)=>this.shouldShowErrorsText(name)?<FormHelperText error>{this.errors(name)[0]}</FormHelperText>:null;
    const showConfirmation=(name)=>!this.hasErrors(name)&&this.hasErrors(name+"Confirmation");

    const firstName = render.field(Text,firstNameProps);
    const lastName = render.field(Text,lastNameProps);
    const email = render.field(Text,emailProps);
    const emailConfirmation = showConfirmation("email")?render.field(Text,emailConfirmationProps):null;
    const password = render.field(Text,passwordProps);
    const passwordConfirmation = showConfirmation("password")?render.field(Text,passwordConfirmationProps):null;
    const inviteCode = this.props.inviteCode?render.field(Text,inviteCodeProps):null;

    const renderFieldAndError=(field,error)=>{
      if(!field){
        return null;
      }
      return (
        <Grid item xs={12}>
          {field}
          {error}
        </Grid>
      )
    };

    return (
        <Grid container justify='center' spacing={16} alignItems='center'>
          {renderFieldAndError(firstName,error("firstName"))}
          {renderFieldAndError(lastName,error("lastName"))}
          {renderFieldAndError(email,error("email"))}
          {renderFieldAndError(emailConfirmation,error("emailConfirmation"))}
          {renderFieldAndError(password,error("password"))}
          {renderFieldAndError(passwordConfirmation,error("passwordConfirmation"))}
          {renderFieldAndError(inviteCode,error("inviteCode"))}
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
  values:{
    email:"",
    emailConfirmation:"",
    password:"",
    passwordConfirmation:"",
    firstName:"",
    lastName:""
  },
  rules:{
    firstName:[
      Rule.String.notEmpty("First name should not be empty!")
    ],
    lastName:[
      Rule.String.notEmpty("Last name should not be empty!")
    ],
    email:[
      Rule.String.notEmpty("Email should not be empty!"),
      Rule.String.email()
    ],
    password:[
      Rule.String.notEmpty("Password should not be empty!")
    ]
  },
  inviteCode:true
});


export default SignUpForm;
