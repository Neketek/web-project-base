import {render} from "./hot-reload";
import App from 'modules/app/index'; // app entry component


render(App,"#root"); // initial render

//important part which enables hot reloading
// for some reason it will not work if this code will be wrapped in function
if(module.hot){
  // update app using HMR (hot module reloading)
  // technically here you are informing webpack that you are waiting for updates for 'modules/app/index'
  // accept function has a callback parameter which should update root component
  module.hot.accept('modules/app/index', () => {
    const NextApp = require('modules/app/index').default;
    render(NextApp,"#root");
  })
}
