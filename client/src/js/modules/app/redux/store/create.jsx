import app from "../reducer";
import StateGetterClass from './getter';
import createStoreCreator from 'modules/common/base/redux/store/create-creator';
import createHistory from 'history/createBrowserHistory'

const history = createHistory({
  basename:"/app"
});

export default createStoreCreator({app,history,StateGetterClass}); 
