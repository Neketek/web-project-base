import AppContainerBase from 'modules/app/component/container/base';
import Routing from '../routing';

class AppContainerPrivateBase extends AppContainerBase{

  constructor(props){
    super(props);
    this.tryToRedirectToLogin();
  }

  render(){
    console.log({props:this.props});
    console.log("RENDER PRIVATE");
    if(this.userIsAuthorized()){
      console.log("RENDER PRIVATE CONTEND");
      return super.render();
    }
    console.log("UNAUTHORIZED");
    return null;
  }

  tryToRedirectToLogin(){
    const {props} = this;
    const {location:{pathname}} = props;
    if(!this.userIsAuthorized()&&Routing.Private.contains(pathname)){
      this.redirect(Routing.Public.route.login())
    }
  }

  user=()=>this.props.user;

  userIsAuthorized=()=>this.props.user.email;

}

AppContainerBase.updateMapStateToProps((state,ownProps)=>{
  const {app:{user}} = state;
  return {
    user
  }
});

export default AppContainerPrivateBase;
