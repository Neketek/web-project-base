import 'css/app.scss';
import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import {red,grey, amber} from 'material-ui/colors';
import createPalette from 'material-ui/styles/createPalette';
import Reboot from 'material-ui/Reboot';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
// import {Text,Date,DateTime,Time,Select} from 'modules/common/input';
import LoginForm from 'modules/common/form/login';


const muiTheme = createMuiTheme({
    palette: createPalette({
      primary: grey,
      accent: amber,
      error: red,
      type: 'light'
    })
});


import { TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers'

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

      <MuiThemeProvider theme={muiTheme}>
        <Reboot/>
        <LoginForm onChange={this.onChange}></LoginForm>
      </MuiThemeProvider>
    );
  }
}


App.defaultProps = {
  onChange:(value)=>{console.log(value)},
  value:""
}

export default App;
