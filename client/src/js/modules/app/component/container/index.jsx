import AppContainerBase from 'modules/app/component/container/base';
import PublicContainer from './public';
import Grid from 'material-ui/Grid';
import React from 'react';
import { Redirect } from 'react-router'

class MainContainer extends AppContainerBase{
  constructor(props){
    super(props);
  }

  container({render}){
    const {container} = render;
    const {router} = this.props;
    // console.log("MAIN");
    // console.log({router});
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          {container(PublicContainer,{name:"public"})}
        </Grid>
      </Grid>
    )
  }

}
//
// MainContainer.updateDefaultProps({
//   private:false
// });


export default MainContainer.connect();
