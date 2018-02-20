import {Text} from 'modules/common/base/input';
import React from 'react';
import TextField from 'material-ui/TextField';

class TextInput extends Text{

  onChange=(event)=>{
    this.propagateValue(event.target.value);
  }


  render(){
    return (
      <TextField  {...this.props} value={this.state.value} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus}></TextField>
    );
  }

}


export default TextInput;
