const defaultProps = {
  appId:'your-app-id',
  autoLogAppEvents:true,
  xfbml:true,
  version:'v2.12'
}

class FacebookSDK{

    static get FB(){
      if(!FB){
        throw Error(
          "Facebook SDK is undefined." +
          "Check SDK loading status and scripts loading order and mode."
        )
      }
      return FB;
    }

    static init(props){
      const initProps = Object.assign({},defaultProps,props)
      this.FB.init(initProps);
    }

    static FBRequestPromise=({request,args=[]})=>{
      const promiseExecutor = (resolve,reject)=>{
        try{
          request(response=>resolve(response),...args);
        }catch(e){
          reject(e);
        }
      };

      return new Promise(promiseExecutor);

    }

    static login(props){
      const args = [props];
      const request = this.FB.login;
      return this.FBRequestPromise({request,args});
    }

    static getLoginStatus(){
      const request = this.FB.getLoginStatus;
      return this.FBRequestPromise({request});
    }

    static logout(){
      const request = this.FB.logout;
      return this.FBRequestPromise({request})
    }

}


export default FacebookSDK;
