import React from 'react';
import RouterContainer from 'modules/common/base/component/react/router-container';
import PropTypes from 'prop-types';
import {
  setContainerError
} from 'modules/app/data/redux/action/container';

const APP_AUTH_URL = "/auth/login";

class AppBaseContainer extends RouterContainer{

  constructor(props){
    super(props);
    this.tryToRedirectToAuth();
  }

  tryToRedirectToAuth(){
    const {authRequired, user} = this.props;
    if(authRequired&&!user.id){
      this.redirect(APP_AUTH_URL);
    }
  }

  errorScreen(){
    const {
      error:{
        title="Error",
        message="Error occured"
      },
      disableErrorScreen
    } = this.props;
    return (
      <div>
        <h1>{title}</h1>
        <h3>{message}</h3>
        <button onClick={disableErrorScreen}>Close</button>
      </div>
    );
  }

  loadingScreen(){
    const {
      loading:{
        title="Loading",
        message="Fetching data from server"
      }
    } = this.props;
    return (
      <div>
        <h1>{title}</h1>
        <h3>{message}</h3>
      </div>
    );
  }

  render(){
    const {error=false,loading=false} = this.props;
    if(error){
      return this.errorScreen();
    }else if(loading){
      return this.loadingScreen();
    }
    return super.render();
  }
}


AppBaseContainer.updateMapStateToProps((state,ownProps)=>{
  const {app:{user={},container={}}} = state;
  const {[ownProps.name]:current={}} = container;
  const {loading=false,error=false} = current;
  return {
    user,
    loading,
    error
  };
});


AppBaseContainer.updateMapDispatchToProps((dispatch,ownProps)=>{
  return {
    disableErrorScreen(){
      dispatch(setContainerError(ownProps.name,false));
    }
  }
});

AppBaseContainer.updateDefaultProps({
  name:null,
  authRequired:true,
  loading:false,
  error:false
});


const serviceScreenPropType = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.object
]);

AppBaseContainer.updatePropTypes({
  name:PropTypes.string.isRequired,
  authRequired:PropTypes.bool.isRequired,
  loading:serviceScreenPropType,
  error:serviceScreenPropType
});


export default AppBaseContainer;
