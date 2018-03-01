export default (type,...argNames)=>{
  return (...args)=>{
    const action = {type};
    argNames.forEach((name,index)=>{
      action[name]=args[index];
    });
    return action;
  }
}
