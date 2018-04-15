import React from 'react';
import RouterContainer from 'modules/common/base/component/react/router-container';
import PropTypes from 'prop-types';

const APP_AUTH_URL = "/auth/login";

class AppBaseContainer extends RouterContainer{

  constructor(props){
    super(props);
    this.tryToRedirectToAuth();
  }

  tryToRedirectToAuth(){
    const {authRequired,user} = this.props;
    if(authRequired&&!user.id){
      this.redirect(APP_AUTH_URL);
    }
  }

  errorScreen(){
    const {
      error:{
        title="Error",
        message="Error occured"
      }
    } = this.props;
    return (
      <div>
        <h1>{title}</h1>
        <h3>{message}</h3>
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
  return {user:state.app.user};
});

AppBaseContainer.updateDefaultProps({
  name:null,
  authRequired:true,
  loading:false,
  error:false
});

const serviceScreenDataShape = PropTypes.shape({
  title:PropTypes.string.isRequired,
  text:PropTypes.string.isRequired
});

const serviceScreenPropType = PropTypes.oneOfType([
  PropTypes.bool,
  serviceScreenDataShape
]);

AppBaseContainer.updatePropTypes({
  name:PropTypes.string.isRequired,
  authRequired:PropTypes.bool.isRequired,
  loading:serviceScreenPropType,
  error:serviceScreenPropType
});


export default AppBaseContainer;
