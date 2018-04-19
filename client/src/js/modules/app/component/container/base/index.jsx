import React from 'react';
import RouterContainer from 'modules/common/base/component/react/router-container';
import PropTypes from 'prop-types';
import {
  setContainerLoading,
  setContainerError
} from 'modules/app/data/redux/action/container';
import {user} from "modules/app/data/network/ajax/get";
import {setUser} from 'modules/app/data/redux/action/user';

const APP_AUTH_URL = "/auth/login";

const APP_AUTH_TYPE_REDIRECT = "redirect";
const APP_AUTH_TYPE_FETCH = "fetch";
const APP_AUTH_TYPE_NONE = "none";

class AppBaseContainer extends RouterContainer{

  constructor(props){
    super(props);
    const {auth} = props;
    if(auth==APP_AUTH_TYPE_REDIRECT){
      this.redirectAuth();
    }else if(auth==APP_AUTH_TYPE_FETCH){
      this.fetchAuth();
    }
  }

  fetchAuth(){
    const {user,fetchUser} = this.props;
    if(!user.id){
      fetchUser();
    }
  }

  redirectAuth(){
    const {user} = this.props;
    if(!user.id){
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


AppBaseContainer.updateMapDispatchToProps((dispatch,ownProps,previous)=>{
  const {name} = ownProps;
  const {redirect} = previous;
  return {

    disableErrorScreen(){
      dispatch(setContainerError(ownProps.name,false));
    },

    fetchUser(){
      const loadingScreenData = {
        title:"Loading",
        message:"Fetching your profile"
      }
      dispatch(setContainerLoading(name,loadingScreenData))
      user.profile().then(
        data=>{
          if(data.error){
            redirect(APP_AUTH_URL);
            return;
          }
          dispatch(setUser(data));
        },
        error=>redirect(APP_AUTH_URL)
      ).finally(()=>dispatch(setContainerLoading(name,false)));
    }

  }
});

AppBaseContainer.updateDefaultProps({
  name:null,
  auth:"redirect",
  loading:false,
  error:false
});


const serviceScreenPropType = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.object
]);

AppBaseContainer.updatePropTypes({
  name:PropTypes.string.isRequired,
  auth:PropTypes.oneOf([
    APP_AUTH_TYPE_NONE,
    APP_AUTH_TYPE_FETCH,
    APP_AUTH_TYPE_REDIRECT
  ]).isRequired,
  loading:serviceScreenPropType,
  error:serviceScreenPropType
});


export default AppBaseContainer;
