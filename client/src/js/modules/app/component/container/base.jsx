import ContainerBase from 'modules/common/base/component/container';
import Routing from './routing';
import { push } from 'react-router-redux';
import { Route, Switch } from 'react-router';
import React from 'react';
class AppContainerBase extends ContainerBase{


  constructor(props){
    super(props);
  }

  Route=props=>{
    return <Route {...props} location={this.props.router.location}></Route>
  }

  RouteSwitch=props=>{
    return <Switch {...props} location={this.props.router.location}></Switch>
  }

  tryToRedirectToLogin(){

    const {props} = this;
    if(props.private){
      const {user,router} = props;
      if(!user&&Routing.isPrivate()(router.location.pathname)){
        props.redirect(Routing.Public.login())
      }
    }
  }

  componentDidMount(){
    this.tryToRedirectToLogin();
  }

}

AppContainerBase.updateDefaultProps({
  private:true
});

AppContainerBase.updateMapStateToProps((state,ownProps)=>{
  // console.log({ownProps});
  const {user,router} = state;
  return {
    user,
    router,
    location:router.location
  }
});

AppContainerBase.updateMapDispatchToProps((dispatch,ownProps)=>{
  return {
    redirect:path=>dispatch(push(path))
  }
});


export default AppContainerBase;
