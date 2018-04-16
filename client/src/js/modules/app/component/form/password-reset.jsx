import React from 'react';
import {Form,Rule} from 'modules/common/base/component/form';
import {Text,Date,DateTime,Time,Select,Button,InputError} from 'modules/common/component/input';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

class PasswordResetForm extends Form{

  EmailBlock=({render:{field,error}})=>{
    const disabled = this.status("tokenRequested")&&!this.status("tokenSent");
    let email = field(Text,{
      required:true,
      fullWidth:true,
      name:"email",
      disabled
    });
    let emailError = error(InputError,{
      name:"email"
    });
    return (
      <Grid item xs={12}>
        {email}
        {emailError}
      </Grid>
    );
  }

  onTokenRequest=()=>{
    this.props.onTokenRequest(this.value("email"));
    this.status("tokenRequested",true);
    this.rerender();
  }

  RequestTokenButton=()=>{
    if(this.hasErrors("email")){
      return null;
    }else if(this.status("tokenRequested")){
      return (
        <Grid>
          <Typography variant="subheading" gutterBottom>
            Requesting token
          </Typography>
          <LinearProgress/>
        </Grid>
      );
    }
    return (
      <Button
        onClick={this.onTokenRequest}
        color="primary">
        Send me password reset token
      </Button>
    );
  }

  TokenBlock=({render:{field,error}})=>{
    if(!this.status("tokenSent")){
      return null;
    }
    let token = field(Text,{
      required:true,
      fullWidth:true,
      name:"token"
    });
    let tokenError = error(InputError,{
      name:"token"
    });
    return (
      <Grid item xs={12}>
        {token}
        {tokenError}
      </Grid>
    )
  }

  PasswordBlock=({render:{field,error}})=>{
    if(this.hasErrors('token')||!this.status('tokenSent')){
      return null;
    }
    const general = {
      required:true,
      fullWidth:true,
      type:"password"
    }
    let password = field(Text,{
      ...general,
      name:"password"
    });

    let passwordError = error(InputError,{
      name:"password"
    })

    let passwordConfirmation,passwordConfirmationError=null;

    if(!this.hasErrors("password")&&this.hasErrors("passwordConfirmation")){
      passwordConfirmation = field(Text,{
        ...general,
        name:"passwordConfirmation"
      });

      passwordConfirmationError = error(InputError,{
        name:"passwordConfirmation"
      });
    }

    return (
      <Grid item xs={12}>
        {password}
        {passwordError}
        {passwordConfirmation}
        {passwordConfirmationError}
      </Grid>
    )
  }

  rules(){
    return{
      ...this.props.rules,
      passwordConfirmation:[
        Rule.General.equals("Password and confirmation are not equal")(this.value("password"))
      ]
    }
  }

  form=(params)=>{
    const {
      EmailBlock,
      TokenBlock,
      PasswordBlock,
      RequestTokenButton,
    } = this;
    return (
        <Grid container justify='center' spacing={16}>
          <EmailBlock {...params}/>
          <RequestTokenButton/>
          <TokenBlock {...params}/>
          <PasswordBlock {...params}/>
        </Grid>
    );
  }

}


PasswordResetForm.updateDefaultProps({
  name:"passwordReset",
  labels:{
    email:"Your account email",
    token:"Password reset token",
    password:"New password",
    passwordConfirmation:"Confirm new password"
  },
  values:{
    email:"",
    token:"",
    password:"",
    passwordConfirmation:""
  },
  rules:{
    email:[
      Rule.String.notEmpty("Email should not be empty!"),
      Rule.String.email()
    ],
    token:[
      Rule.String.notEmpty("Token should not be empty")
    ],
    password:[
      Rule.String.notEmpty("Password should not be empty")
    ]
  },
  onTokenRequest(email){
    console.log(email);
  }
});

export default PasswordResetForm;
