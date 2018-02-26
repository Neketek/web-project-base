import 'css/app.scss';
import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import {red,grey, amber} from 'material-ui/colors';
import createPalette from 'material-ui/styles/createPalette';
import { withStyles } from 'material-ui/styles';
import {default as createStore,history} from 'modules/app/redux/store/create';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { Route } from 'react-router'
import { Provider } from 'react-redux';

const development=true;
const store = createStore(development);
store.dispatch(push("/home"));
// console.log(store);

const muiTheme = createMuiTheme({
    palette: createPalette({
      primary: grey,
      accent: amber,
      error: red,
      type: 'light'
    })
});


class App extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <MuiThemeProvider theme={muiTheme}>
        <Provider store = {store}>
          <ConnectedRouter history={history}>
            <div>APP</div>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}


export default App;
