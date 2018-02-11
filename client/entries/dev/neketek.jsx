import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import App from 'modules/app/index';

const state = {value:"ZALUPA"};
const onChange = value=>{
  state.value=value;
  console.log(state);

};

const renderApp=Component=>{
  return ReactDOM.render(
    <AppContainer>
      <Component onChange={onChange} value={state.value}/>
    </AppContainer>,
    document.querySelector("#root")
  );
}


renderApp(App);

if(module.hot) {
  module.hot.accept('modules/app/index', () => {
    const NextApp = require('modules/app/index').default;
    renderApp(NextApp);
  })
}
// if (module.hot){
//   module.hot.accept();
// }
