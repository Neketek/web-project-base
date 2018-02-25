import React from "react";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import {Text, Select} from 'modules/common/input'
import LoginForm from 'modules/common/form/login';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {text:""};
  }

  onChange=(event)=>{
    console.log(event);
  }

  render(){
    return (

      <MuiThemeProvider>
        <Paper style={{padding:50}} zDepth={1} rounded={false}>
          <Text></Text>
          <Select></Select>
        </Paper>

      </MuiThemeProvider>
    );
  }
}


App.defaultProps = {
  onChange:(value)=>{console.log(value)},
  value:""
}

export default App;
