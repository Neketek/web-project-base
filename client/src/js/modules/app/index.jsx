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
