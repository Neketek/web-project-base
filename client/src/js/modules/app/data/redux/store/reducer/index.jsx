import {combineReducers} from "redux";
import user from './user';
import container from './container';
const combinedReducers = combineReducers({user,container});
export default combinedReducers;
