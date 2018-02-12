import {render} from "./hot-reload";
import App from 'modules/app/index'; // app entry component


render(App,"#root"); // initial render

if(module.hot){
  // update app using HMR (hot module reloading)
  module.hot.accept('modules/app/index', () => {
    const NextApp = require('modules/app/index').default;
    render(NextApp,"#root");
  })
}
