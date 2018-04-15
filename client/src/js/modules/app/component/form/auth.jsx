import React from 'react';
import {Form,Rule} from 'modules/common/base/component/form';
import {Tabs} from 'modules/common/component/input';
import NameForm from './name';
import Grid from 'material-ui/Grid';
import LoginForm from './login';
import SignUpForm from './sign-up';

const LOGIN_NAME = "login";
const SIGN_UP_NAME = "sign-up";



class AuthForm extends Form{


    AuthTabs=(props)=>{
      return (
        <Tabs.Wrapper {...props}>
          <Tabs.Tab value={LOGIN_NAME} label="Login"/>
          <Tabs.Tab value={SIGN_UP_NAME} label="Sign Up"/>
        </Tabs.Wrapper>
      );
    }

    onTabChange=(event)=>{
      const {onTabChange} = this.props;
      if(onTabChange){
        onTabChange(event);
        return;
      }
      this.onChange(event);
    }

    form=({render:{field,error,form,input}})=>{
      let selected = null;
      const {AuthTabs, onTabChange} = this;
      const {onLogin,onSignUp} = this.props;

      const name = this.value("tab");
      if(name==LOGIN_NAME){
        selected = form(LoginForm,{name,onSubmit:onLogin});
      }else if(name==SIGN_UP_NAME){
        selected = form(SignUpForm,{name,onSubmit:onSignUp});
      }
      const tabs = input(
        AuthTabs,
        {
          name:"tab",
          onChange:onTabChange
        }
      );
      return (
        <Grid container justify="center">
          {tabs}
          {selected}
        </Grid>
      )
    }
}


AuthForm.updateDefaultProps({
  name:"auth",
  value:{
    tab:LOGIN_NAME
  }
});

export default AuthForm;
