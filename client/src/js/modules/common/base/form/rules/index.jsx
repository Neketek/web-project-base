const AT_SIGN_MISSED_ERROR = "Your email should contain one \"@\" sign.";
const LOCAL_PART_EMPTY_ERROR = "Your local part of email can't be empty.";
const LOCAL_PART_NOTVALID_CHAR_ERROR = "Your local part of email is not valid. It should not contain any of this symbols \"(),:;<>@[\\] and whitespaces.";
const DOMAIN_PART_NOTVALID_CHAR_ERROR = "Your domain part of email domain part is not valid. It should contain only this symbols \"a-z, A-Z, 0-9, -, .\" ";
const DOMAIN_PART_DOT_MISSED_ERROR = "Your domain part of email should contains at least one \".\" sign.";
const DOMAIN_PART_NOTVALID_BEGIN_ERROR = "Your domain part of email can't begins with \".\" or \"-\" .";
const DOMAIN_PART_NOTVALID_END_ERROR = "Your domain part of email can't ends with \".\", \"-\" or being an empty.";


export class General {
  static equals=text=>target=>(name,value)=>{
    if(value!=target){
      return {error:true,text};
    }
    return {error:false}
  }
}


export class String {

  static notEmpty=(text)=>{
    return (name,value)=>{
      if(value.length==0){
        return {error:true,text};
      }
      return {error:false};
    }
  }

  static email=()=>{
    return (name,value)=>{
      let at_sign_position = value.search(/@/);
      if(at_sign_position < 0){
        return {error: true, text: AT_SIGN_MISSED_ERROR};
      }else{
        let local_part = value.substr(0, at_sign_position);
        let domain_part = value.substr(at_sign_position+1, value.length-1);
        // validate local part of email
        if(local_part.length == 0){
          return {error: true, text: LOCAL_PART_EMPTY_ERROR};
        }
        if(local_part.search(/["()\[\]\\,:;\s<>@]/g) > 0){
          return {error: true, text: LOCAL_PART_NOTVALID_CHAR_ERROR};
        }
        // validate domain part of email
        if(domain_part.search(/[^a-zA-Z0-9.-]/g) >= 0 ){
          return {error: true, text: DOMAIN_PART_NOTVALID_CHAR_ERROR};
        }else{
          if(domain_part.search(/\./) < 0){
            return {error: true, text: DOMAIN_PART_DOT_MISSED_ERROR};
          }
          if(domain_part.search(/^\./) == 0 || domain_part.search(/^-/) == 0){
            return {error: true, text: DOMAIN_PART_NOTVALID_BEGIN_ERROR};
          }
          if(domain_part.search(/\.$/)  == domain_part.length-1 || domain_part.search(/-$/) == domain_part.length-1){
            return {error: true, text: DOMAIN_PART_NOTVALID_END_ERROR};
          }
        }
      }
      return {error:false, text: ""};
    }
  }

}

export default {String,General}
