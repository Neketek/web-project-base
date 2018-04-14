import Request from 'modules/common/base/data/networking/ajax';

const DefaultRequest=()=>{
  return new Request()
    .post()
    .json()
    .jsonResponse()
    .noCache()
    .cookies()
};

export const user = {
  profile:(data)=>{
    return DefaultRequest(data).url("/app/get/profile/user").jsonBody(data).fetch()
  },
  list:(data)=>{
    return DefaultRequest(data).url("/app/get/list/user").jsonBody(data).fetch()
  }
}
