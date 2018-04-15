import _ from 'lodash';
import {
  SET_CONTAINER_DATA,
  UPDATE_CONTAINER_DATA,
  SET_CONTAINER_LOADING,
  SET_CONTAINER_ERROR
} from 'modules/app/data/redux/action/type/container';

const setServiceScreen=(state,name,action)=>{
  if(state[action.name]==undefined){
    state[action.name] = {};
  }
  state[action.name][name] = action.data;
  return state;
}

export default (state={},action)=>{
  state = _.clone(state);
  const {name,data} = action;
  switch(action.type){
    case SET_CONTAINER_DATA:
      state[name]=data;
      return state;
    case UPDATE_CONTAINER_DATA:
      state[name] = Object.assign(
        {},
        state[name],
        data
      )
      return state;
    case SET_CONTAINER_LOADING:
      return setServiceScreen(state,"loading",action);
    case SET_CONTAINER_ERROR:
      return setServiceScreen(state,"error",action);

  }
  return state;
}
