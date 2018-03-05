import DashboardContainer from "./dashboard";
import PrivateContainerBase from './base';
import Grid from 'material-ui/Grid';
import React from 'react';

class PrivateContainer extends PrivateContainerBase{
  container({render:{container}}){
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <this.RouteSwitch>
            <this.Route path="/" render={()=>container(DashboardContainer)}/>
          </this.RouteSwitch>
        </Grid>
      </Grid>
    )
  }
}

export default PrivateContainer.connect();
