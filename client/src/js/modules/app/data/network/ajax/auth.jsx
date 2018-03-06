import Request from 'modules/common/base/data/networking/ajax';

const DefaultRequest=()=>new Request().post().json().jsonResponse().noCache().cookies();

export const login=(data)=>{
  return DefaultRequest().url('/app/login').jsonBody(data).fetch();
}

export default {
  login
}
