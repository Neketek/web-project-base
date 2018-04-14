import _ from 'lodash';
import {
  SET_CONTAINER_DATA,
  UPDATE_CONTAINER_DATA,
  SET_CONTAINER_LOADING
} from 'modules/app/data/redux/action/type/container';

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
      if(state[name]==undefined){
        state[name] = {};
      }
      state[name].loading = data;
      return state;
  }
  return state;
}
