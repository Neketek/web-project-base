import {Button} from 'modules/common/base/input';
import React from 'react';
import MaterialButton from 'material-ui/Button';


class ButtonInput extends Button{
  render(){
    const override = {};
    return this.button(MaterialButton,this.props,override);
  }
}

export default ButtonInput;
