import 'css/app.scss';
import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import { red, grey, amber } from 'material-ui/colors';
import createPalette from 'material-ui/styles/createPalette';
import { withStyles } from 'material-ui/styles';
import { createStore } from 'modules/app/redux/store';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { Provider } from 'react-redux';

import ContainerBase from 'modules/common/base/container';
class CurrentURL extends ContainerBase{

  render(){
    return (
      <div>
        <button onClick={this.props.goHome}> Go Home </button>
        <div>{this.props.url}</div>
      </div>
    );
  }

  static mapStateToProps(state){
    console.log(state);
    return {
      url:state.router.location.pathname
    }
  }

  static mapDispatchToProps(dispatch){
    return {
      goHome(){
        dispatch(push("/"));
      }
    }
  }
}

const ConnectedCurrentURL = CurrentURL.connect();



const development=true;
const {store,history} = createStore(development);
import { Route } from 'react-router'
import { Link } from 'react-router-dom';

// store.dispatch(push("/home"));
// console.log(store);

const muiTheme = createMuiTheme({
    palette: createPalette({
      primary: grey,
      accent: amber,
      error: red,
      type: 'light'
    })
});


class Text extends React.Component{
  render(){
    return <div>{this.props.children}</div>
  }
}

class App extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <MuiThemeProvider theme={muiTheme}>
        <Provider store = {store}>
          <ConnectedRouter history={history}>
            <div>
              <div>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/tutorial">Turorial</Link>
                <ConnectedCurrentURL store={store}></ConnectedCurrentURL>
              </div>
              <div>
                <Route exact path="/" component={()=><Text>APP</Text>}/>
                <Route path="/about" component={()=><Text>ABOUT</Text>}/>
                <Route path="/tutorial" component={()=><Text>TUTORIAL</Text>}/>
              </div>
            </div>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}


export default App;
