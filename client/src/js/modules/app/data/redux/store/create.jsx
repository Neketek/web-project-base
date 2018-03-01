import app from "../reducer";
import createStoreCreator from 'modules/common/base/data/redux/store/create-creator';
import createHistory from 'history/createBrowserHistory'

const history = createHistory({
  basename:"/app"
});

export default createStoreCreator({app,history});
