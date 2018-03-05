import {RouteStore} from 'modules/common/base/component/container/routing';

export const Public = new RouteStore({
  login:"login",
  signUp:"sign-up"
});


export const Private = new RouteStore({
  dashboard:""
});


export default {Private,Public};
