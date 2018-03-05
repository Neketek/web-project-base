import ContainerRoutingBase from 'modules/common/base/component/container/routing';
import Routing from './routing';
import { push } from 'react-router-redux';
import { Route, Switch } from 'react-router';
import React from 'react';
class AppContainerBase extends ContainerRoutingBase{

  tryToRedirectToLogin(){
    const {props} = this;
    if(props.private){
      const {user,location:{pathname}} = props;
      if(!user&&Routing.Private.contains(pathname)){
        this.redirect(Routing.Public.route.login())
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
  const {user}= state;
  return {
    user
  }
});

export default AppContainerBase;
