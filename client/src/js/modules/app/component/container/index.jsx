import React from 'react';
import Base from './base';
import Auth from './auth';
import Dashboard from './dashboard';


class IndexContainer extends Base{

  Dashboard=(props)=>{
    return this.renderContainer(Dashboard,{...props,name:"dashboard",authRequired:false});
  }

  Auth=(props)=>{
    return this.renderContainer(Auth,{...props,name:"auth"});
  }

  container({render:{container}}){
    const {Switch,Route,Redirect} = this;
    return (
      <Switch>
        <Route path="/dashboard" render={props=>this.Dashboard(props)}/>
        <Route path="/auth" component={props=>this.Auth(props)}/>
      </Switch>
    )
  }
}

IndexContainer.updateDefaultProps({
  name:"index",
  auth:"none"
});

export default IndexContainer.connect();
