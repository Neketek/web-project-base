import ContainerBase from 'modules/common/base/component/container';
import LoginContainer from './login';
import SignUpContainer from './sign-up';
import Grid from 'material-ui/Grid';
import React from 'react';
import { Route } from 'react-router';

class PublicContainer extends ContainerBase{
  container({render}){
    const {container} = render;
    const {match} = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Route path="/login" render={()=>container(LoginContainer)} />
          <Route path="/sign-up" component={()=>container(SignUpContainer)} />
        </Grid>
      </Grid>
    )
  }
}


export default PublicContainer.connect();
