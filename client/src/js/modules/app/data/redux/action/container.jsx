import {
  SET_CONTAINER_DATA,
  UPDATE_CONTAINER_DATA,
  SET_CONTAINER_LOADING,
  SET_CONTAINER_ERROR
} from './type/container';

import actionCreator from 'modules/common/base/data/redux/reducer/action-creator';

export const setContainerData = actionCreator(SET_CONTAINER_DATA,"name","data");
export const updateContainerData = actionCreator(UPDATE_CONTAINER_DATA,"name","data");
export const setContainerLoading = actionCreator(SET_CONTAINER_LOADING,"name","data");
export const setContainerError = actionCreator(SET_CONTAINER_ERROR,"name","data");
