import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import ReduxThunk from "redux-thunk";


export const applyStateGetter = (store,GetterClass)=>{
  const oldGetState = store.getState;
  store.getState=(getter=false)=>{
    const state = oldGetState();
    if(getter){
      return new GetterClass(state);
    }else{
      return state;
    }
  };
  return store;
}


export const createStoreCreator = ({reducers,history,middleware,StateGetterClass})=>{

  return (development=false)=>{

    if(middleware===undefined){
      let middlewareList = [ReduxThunk];
      if(history){
        middlewareList.push(routerMiddleware(history));
        reducers = {
          ...reducers,
          router:routerReducer
        }
      }
      middleware = applyMiddleware(...middlewareList);
    }

    if(development){
      console.log("DEV ON");
      middleware = composeWithDevTools(middleware);
    }

    let store = createStore(combineReducers(reducers),middleware);
    if(StateGetterClass!==undefined){
      store = applyStateGetter(store,StateGetterClass);
    }
    return {store,history};

  }
};


export default createStoreCreator;
