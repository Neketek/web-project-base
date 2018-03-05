import AppContainerBase from 'modules/app/component/container/base';
import PublicContainer from './public';
import PrivateContainer from './private';
import Grid from 'material-ui/Grid';
import React from 'react';

class MainContainer extends AppContainerBase{
  constructor(props){
    super(props);
  }

  container({render:{container}}){
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          {container(PrivateContainer)}
          {container(PublicContainer)}
        </Grid>
      </Grid>
    )
  }

}


export default MainContainer.connect();
