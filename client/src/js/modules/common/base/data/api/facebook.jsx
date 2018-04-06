class FacebookAPI{

    static get FB(){
      if(!window.FB){
        throw Error(
          "Facebook SDK is undefined." +
          "Check SDK loading status and scripts loading order and mode."
        )
      }
      return window.FB;
    }


    static get isFacebookSDKInitilized(){
      return window.FB!==undefined;
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


export default FacebookAPI;
