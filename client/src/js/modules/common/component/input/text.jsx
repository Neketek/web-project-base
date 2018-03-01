import {Text} from 'modules/common/base/component/input';
import React from 'react';
import TextField from 'material-ui/TextField';

class TextInput extends Text{

  onChange=(event)=>{
    this.propagateValue(event.target.value);
  }


  render(){
    const override = {};
    return this.input(TextField,this.props,override);
  }

}


export default TextInput;
