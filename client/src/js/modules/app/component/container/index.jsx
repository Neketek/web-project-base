import React from 'react';
import Base from './base';
import Auth from './auth';
import Dashboard from './dashboard';


class IndexContainer extends Base{

  Dashboard=(props)=>{
    return this.renderContainer(Dashboard,{name:"dashboard"});
  }

  Auth=(props)=>{
    return this.renderContainer(Auth,{name:"auth"});
  }

  container({render:{container}}){
    const {Switch,Route} = this;
    return (
      <Switch>
        <Route path="/dashboard" component={this.Dashboard}/>
        <Route path="/auth" component={this.Auth}/>
      </Switch>
    )
  }
}

IndexContainer.updateDefaultProps({
  name:"index",
  authRequired:false
});

export default IndexContainer;
