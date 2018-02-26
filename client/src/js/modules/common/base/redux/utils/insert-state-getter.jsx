export default (store,GetterClass,defRetGetter=false)=>{
  const oldGetState = store.getState;
  store.getState=(getter=defRetGetter)=>{
    const state = oldGetState();
    if(getter){
      return new GetterClass(state);
    }else{
      return state;
    }
  };
  return store;
}
