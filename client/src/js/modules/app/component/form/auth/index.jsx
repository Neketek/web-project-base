import React from 'react';
import {Form,Rule} from 'modules/common/base/component/form';
import {Text,Date,DateTime,Time,Select,Button,Tabs} from 'modules/common/component/input';
import Grid from 'material-ui/Grid';
import SignUpForm from './sign-up';
import LoginForm from './login';
import Paper from 'material-ui/Paper';

const FormTabs = ({parent})=>{
  return (
    <Tabs.Wrapper
      indicatorColor="primary"
      textColor="primary"
      centered
      name='tab'
      onChange={(event)=>{
        parent.onChange(event);
      }}
      value={parent.value('tab')}
      >
      <Tabs.Tab label="Login" value="login"></Tabs.Tab>
      <Tabs.Tab label="Sign up" value="signUp"></Tabs.Tab>
    </Tabs.Wrapper>
  )
}

const SelectedForm = ({form,parent})=>{
  const tab = parent.value('tab');
  switch(tab){
    case 'login':
      return form(LoginForm,{name:tab});
    case 'signUp':
      return form(SignUpForm,{name:tab})
    default:
      return null;
  }
}

class AuthForm extends Form{

  form=({render:{form,field,error}})=>{
    return (
      <Grid container justify='center'>
        <Grid item xs = {12}>
          <FormTabs parent={this}></FormTabs>
          <SelectedForm parent={this} form={form}></SelectedForm>
        </Grid>
      </Grid>
    )
  }
}


AuthForm.updateDefaultProps({
  name:"auth",
  values:{
    tab:'login'
  }
})

export default AuthForm;
