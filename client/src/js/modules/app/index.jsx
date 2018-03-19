import 'css/app.scss';
import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import { red,black,blue,grey, amber } from 'material-ui/colors';
import createPalette from 'material-ui/styles/createPalette';
import { withStyles } from 'material-ui/styles';
import { createStore } from 'modules/app/data/redux/store';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { Provider } from 'react-redux';
import MainContainer from './component/container';

// store.dispatch(push("/home"));
// console.log(store);

const muiTheme = createMuiTheme({
    // palette: createPalette({
    //   // primary: black,
    //   // accent: blue,
    //   // error: red,
    //   type: 'light'
    // })
});


class App extends React.Component{



  constructor(props){
    super(props);

    //NOTE:doing this only to fix hot reloading
    let storeSource = this.props;
    if(!storeSource.store){
       storeSource = createStore(this.props.development);
    }
    this.store=storeSource.store;
    this.history=storeSource.history;

  }

  render(){
    const {history,store} = this;
    return (
      <MuiThemeProvider theme={muiTheme}>
        <ConnectedRouter history={history} store={store}>
          <MainContainer store={store}></MainContainer>
        </ConnectedRouter>
      </MuiThemeProvider>
    );
  }
}


export default App;
