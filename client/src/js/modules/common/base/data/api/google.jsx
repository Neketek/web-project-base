class GoogleAPI{

  static get auth2(){
    return gapi.auth2;
  }

  static signIn(){
    return this.auth2.getAuthInstance().signIn();
  }

}

export default GoogleAPI;
