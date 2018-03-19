import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware, routerReducer, push } from 'react-router-redux';
import ReduxThunk from "redux-thunk";




export const createStoreCreator = ({reducers,history,middleware})=>{

  return (development=false)=>{

    if(middleware===undefined){
      console.log("DEFAULT MIDDLEWARE");
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
      middleware = composeWithDevTools(middleware);
    }

    let store = createStore(combineReducers(reducers),middleware);

    return {store,history};

  }
};


export default createStoreCreator;
