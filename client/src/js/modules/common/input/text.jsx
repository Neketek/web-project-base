import {Text} from 'modules/common/base/input';
import React from 'react';
import TextField from 'material-ui/TextField';

class CustomTextField extends Text{

  onChange=(event)=>{
    this.propagateValue(event.target.value);
  }

  render(){
    return (
      <TextField {...this.props} onChange={this.onChange}></TextField>
    );
  }

}


export default CustomTextField;
