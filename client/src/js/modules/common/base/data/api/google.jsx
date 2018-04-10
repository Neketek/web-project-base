class GoogleAPI{

  static get auth2(){
    return gapi.auth2;
  }

  static get api(){
    return api;
  }

  static signIn(){
    return this.auth2.getAuthInstance().signIn();
  }

  static grantOfflineAccess(){
    return this.auth2.getAuthInstance().grantOfflineAccess();
  }

  static signOut(){
    return this.auth2.getAuthInstance().signOut();
  }

}

export default GoogleAPI;
