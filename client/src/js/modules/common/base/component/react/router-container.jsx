import Container from './container';
import { push } from 'react-router-redux';
import { Route, Switch } from 'react-router';
import React from 'react';


class RouterContainer extends Container{

  constructor(props){
    super(props);
  }

  redirect=location=>this.props.redirect(location);

  location=()=>this.props.location;

  bindRouterComponent=Class=>props=><Class {...props} location={this.location()}></Class>;

  Route=this.bindRouterComponent(Route);

  Switch=this.bindRouterComponent(Switch);

}

RouterContainer.updateMapStateToProps((state,ownProps)=>{
  const {router:{location}} = state;
  return {
    location
  }
});

RouterContainer.updateMapDispatchToProps((dispatch,ownProps)=>{
  return {
    redirect:path=>dispatch(push(path))
  }
});


export default RouterContainer;
