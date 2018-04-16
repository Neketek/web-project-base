import {
  SET_USER_VARIABLE,
  SET_USER
} from 'modules/app/data/redux/action/type/user';

import _ from 'lodash';

export default (state={},action)=>{
  switch(action.type){
    case SET_USER_VARIABLE:
      state = _.clone(state);
      state[action.name]=action.value;
      break;
    case SET_USER:
      return action.data;
  }
  return state;
}
