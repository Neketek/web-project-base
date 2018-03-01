import ContainerBase from 'modules/common/base/component/container';
import PublicContainer from './public';
import Grid from 'material-ui/Grid';
import React from 'react';

class MainContainer extends ContainerBase{
  container({render}){
    const {container} = render;
    const {match} = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          {container(PublicContainer)}
        </Grid>
      </Grid>
    )
  }
}


export default MainContainer.connect();
