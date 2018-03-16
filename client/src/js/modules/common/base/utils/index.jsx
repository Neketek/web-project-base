/*
 * universal setter getter, propably i'll move it to separate file as an util
 */
export const getterSetter=(source,name=undefined,value=undefined,def=undefined)=>{
  if(name===undefined){
    throw Error("Value getter didn't receive name!");
  }
  if(value===undefined){
    const targetValue = source[name];
    return targetValue===undefined?def:targetValue;
  }else{
    source[name]=value;
    return value;
  }
}

export default {getterSetter};
