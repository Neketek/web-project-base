import 'css/index.scss';
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import App from 'modules/main/app';

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
  module.hot.accept('modules/main/app', () => {
    const NextApp = require('modules/main/app').default;
    renderApp(NextApp);
  })
}
// if (module.hot){
//   module.hot.accept();
// }
