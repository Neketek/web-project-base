import {createStore,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import RootReducer from "../reducer";
import StateGetterClass from './getter';
import insertStateGetter from 'modules/common/base/redux/utils/insert-state-getter';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'

export const history = createHistory({
  basename:"/app"
});

export default (developent=false)=>{

  let middleware = null;

  const standardMiddleware = [
    ReduxThunk,
    routerMiddleware(history)
  ];

  middleware = applyMiddleware(...standardMiddleware);

  if(developent){
    middleware = composeWithDevTools(middleware);
  }

  return insertStateGetter(createStore(RootReducer,middleware),StateGetterClass);

}
