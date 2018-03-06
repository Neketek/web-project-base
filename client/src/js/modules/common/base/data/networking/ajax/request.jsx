function requestError(error){
  return {requestError:true,error};
}


function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new response;
}

class AjaxRequest{

  static JSONDataToFormData(data){
    const formData = new FormData();
    if(data.json){
      const json = JSON.stringify(data.json);
      formData.append('json',json);
    }
    const files = data.files;
    for(const key in files){
      formData.append(key,files[key]);
    }
    return formData;
  }

  constructor(){
    this.props = {
      headers:{}
    };
  }

  get(){
    this.props.method = 'get';
    return this;
  }

  post(){
    this.props.method = 'post';
    return this;
  }

  headers(headers){
    this.props.headers = Object.assign(
      {},
      this.props.headers,
      headers
    );
    return this;
  }

  json(){
    this.props.headers['Content-Type'] = 'application/json';
    return this;
  }

  form(){
    this.props.headers['Content-Type'] = 'multipart/form-data';
    return this;
  }

  jsonResponse(){
    this.props.headers['Accept'] = 'application/json';
    return this;
  }

  noCache(){
    this.props.headers['pragma']='no-cache';
    this.props.headers['cache-control']='no-cache';
    return this;
  }

  cache(type){
    this.props.headers['cache-control']=type;
    return this;
  }

  body(body){
    this.props.body = body;
    return this;
  }

  jsonBody(body){
    return this.body(JSON.stringify(body));
  }

  cookies(){
    this.props.cridentials = 'same-origin';
    return this;
  }

  CORSCookies(){
    this.props.cridentials = 'include';
    return this;
  }

  url(url){
    this.url = url;
    return this;
  }

  fetch(){
    return fetch(this.url,this.props).then(status,requestError);
  }

}

export default AjaxRequest;
