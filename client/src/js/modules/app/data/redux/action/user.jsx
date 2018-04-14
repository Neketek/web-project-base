import {
  SET_USER_VARIABLE,
  SET_USER
} from './type';

import actionCreator from 'modules/common/base/data/redux/reducer/action-creator';

export const setUserVariable = actionCreator(SET_USER_VARIABLE,"name","value");
export const setUser = actionCreator(SET_USER,"data");
