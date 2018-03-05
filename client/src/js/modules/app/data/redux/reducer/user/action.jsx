import {
  SET_USER_VARIABLE
} from './type';

import actionCreator from 'modules/common/base/data/redux/reducer/action-creator';

export const setUserVariable = actionCreator(Types.SET_USER_VARIABLE,"name","value");
