import AppContainerBase from 'modules/app/container/base';

class AppContainerPrivateBase extends AppContainer{

  constructor(props){
    super(props);
    this.tryToRedirectToLogin();
  }

  tryToRedirectToLogin(){
    const {props} = this;
    const {user,location:{pathname}} = props;
    if(!user&&Routing.Private.contains(pathname)){
      this.redirect(Routing.Public.route.login())
    }
  }
  
}

AppContainerBase.updateMapStateToProps((state,ownProps)=>{
  const {user}= state;
  return {
    user
  }
});

export default AppContainerPrivateBase;
