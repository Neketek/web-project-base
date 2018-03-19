
const route=location=>(prefix='')=>`${prefix}/${location}`;

class RouteStore{

  constructor(routes){
    this.route={};
    for(const name in routes){
      this.add(name,routes[name]);
    }
  }

  add=(name,location)=>this.route[name]=route(location);

  containsPrefixed=(prefix='')=>location=>{

    if(location===undefined){
      throw Error("Location can't be undefined!");
    }

    // console.log({prefix,location})
    const {route} = this;
    for(const key in route){
      if(route[key](prefix)==location){
        return true;
      }
    }

    return false;

  }

  contains=this.containsPrefixed("");

}


export default RouteStore;
