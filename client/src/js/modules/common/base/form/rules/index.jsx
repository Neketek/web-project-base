export class String {

  static notEmpty=(text)=>{
    return (name,value)=>{
      if(value.length==0){
        return {error:true,text};
      }
      return {error:false};
    }
  }

}

export default {String}
