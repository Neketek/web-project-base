import {
  SET_USER_VARIABLE
} from './type';

import _ from 'lodash';

export default (state={},action)=>{
  switch(action.type){
    case SET_USER_VARIABLE:
      state = _.copy(state);
      state[action.name]=action.value;
      break;
  }
  return state;
}
