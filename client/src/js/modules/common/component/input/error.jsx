import React from 'react';
import Component from '../../base/component/react/component';
import Grid from 'material-ui/Grid';
import { FormHelperText } from 'material-ui/Form';


class InputError extends Component{
  render(){
    return <FormHelperText error>{this.props.children}</FormHelperText>
  }
}

export default InputError;
