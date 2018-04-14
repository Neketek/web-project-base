import {
  SET_CONTAINER_DATA,
  UPDATE_CONTAINER_DATA,
  SET_CONTAINER_LOADING
} from './type';

import actionCreator from 'modules/common/base/data/redux/reducer/action-creator';

export const setContainerData = actionCreator(SET_CONTAINER_DATA,"name","data");
export const updateContainerData = actionCreator(UPDATE_CONTAINER_DATA,"name","data");
export const setContainerLoading = actionCreator(SET_CONTAINER_LOADING,"name","data");
