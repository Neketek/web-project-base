import { AppContainer } from 'react-hot-loader';
import ReactDOM from "react-dom";
import React from "react";

// Component: root component like app or landing index component
// rootSelector: jquery style selector which is used to define React root DOM element
export const render=(Component,rootSelector)=>{
  return ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.querySelector(rootSelector)
  );
}
