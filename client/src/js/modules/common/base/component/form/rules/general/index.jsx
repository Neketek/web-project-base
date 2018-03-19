export class General {
  static equals=text=>target=>(name,value)=>{
    if(value!=target){
      return {error:true,text};
    }
    return {error:false}
  }
}

export default General;
