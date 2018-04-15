import {
  login as loginRequest,
  signUp as signUpRequest
} from 'modules/app/data/network/ajax/auth';


import {
  setContainerLoading,
  setContainerError
} from 'modules/app/data/redux/action/container';


export const login=(name,data)=>(dispatch,getState)=>{
  const {email,password,rememberMe} = data;
  const title = "Loggin in";
  const message = "Wait a moment...";
  setContainerLoading(name,{title,message});
  loginRequest({email,password,rememberMe}).then(
    json=>{
      if(json.error){
        const {title,message} = json.error;
        setContainerError(name,{title,message});
        return;
      }
      setContainerLoading(name,false);
    },
    error=>{
      console.log(error);
    }
  )
};


export const signUp=(data)=>(dispatch,getState)=>{

};
