import React from "react";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import SelectExp from 'modules/common/input/select-exp.jsx';
import {Text} from 'modules/common/component/input';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {text:""};
  }

  onChange=(event)=>{
    console.log(event);
  }

  render(){
    let options = [
      {label:'One', value:1},
      {label:'Two', value:2},
      {label:'Three', value:3},

    ];
    return (

      <MuiThemeProvider>
        <Paper style={{padding:50}} zDepth={1} rounded={false}>
          {/* <Text></Text> */}
          <SelectExp
            name={"SingleSelection"}
            value={{label:"label", value:1}}
            options={options}
            onChange={selectedItem => console.log(selectedItem)}
            label="Select the value:"
            placeholder="Placeholder"
            resetValue={null}
            onBlur={()=>console.log("onBlur!")}
            onFocus={()=>console.log("onFocus!")}
            disabled={false}
            isLoading={false}
          ></SelectExp>
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
