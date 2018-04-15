import Request from 'modules/common/base/data/networking/ajax';

const DefaultRequest=()=>new Request().post().json().jsonResponse().noCache().cookies();

export const login=(data)=>{
  return DefaultRequest().url('/app/auth/login').jsonBody(data).fetch();
}

export const signUp=(data)=>{
  return DefaultRequest().url('/app/auth/sign-up').jsonBody(data).fetch();
}

export const logout=(data)=>{
  return DefaultRequest().url('/app/auth/logout').jsonBody(data).fetch();
}

export default {
  login,
  signUp,
  logout
}
