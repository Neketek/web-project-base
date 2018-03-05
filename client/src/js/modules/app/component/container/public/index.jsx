import AppPublicContainerBase from './base';
import LoginContainer from './login';
import SignUpContainer from './sign-up';
import Grid from 'material-ui/Grid';
import React from 'react';


class PublicContainer extends AppPublicContainerBase{
  container({render:{container}}){
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <this.RouteSwitch>
            <this.Route path="/login" render={()=>container(LoginContainer)}/>
            <this.Route path="/sign-up" render={()=>container(SignUpContainer)}/>
          </this.RouteSwitch>
        </Grid>
      </Grid>
    )
  }
}

export default PublicContainer.connect();
