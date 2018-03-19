import ContainerBase from '../base';
import { push } from 'react-router-redux';
import { Route, Switch } from 'react-router';
import React from 'react';


class ContainerRoutingBase extends ContainerBase{

  constructor(props){
    super(props);
  }

  redirect=location=>this.props.redirect(location);

  location=()=>this.props.location;

  bindRouterComponent=Class=>props=><Class {...props} location={this.location()}></Class>;

  Route=this.bindRouterComponent(Route);

  RouteSwitch=this.bindRouterComponent(Switch);

}

ContainerRoutingBase.updateMapStateToProps((state,ownProps)=>{
  const {router:{location}} = state;
  return {
    location
  }
});

ContainerRoutingBase.updateMapDispatchToProps((dispatch,ownProps)=>{
  return {
    redirect:path=>dispatch(push(path))
  }
});


export default ContainerRoutingBase;
