import AppContainerBase from 'modules/app/component/container/base';
import LoginContainer from './login';
import SignUpContainer from './sign-up';
import Grid from 'material-ui/Grid';
import React from 'react';
import { Route, Switch } from 'react-router';


class PublicContainer extends AppContainerBase{
  container({render}){
    const {container} = render;
    const {router,user} = this.props;
    // console.log(this.props);
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

PublicContainer.updateDefaultProps({
  private:false
})


export default PublicContainer.connect();
