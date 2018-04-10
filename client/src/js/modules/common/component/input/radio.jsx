import React from 'react';
import { RadioBase } from 'modules/common/base/component/input';
import PropTypes from 'prop-types';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Radio from 'material-ui/Radio';

class RadioInput extends RadioBase{

  onChange = (event, checked) => {
    console.log('Show Radio: ' + event.target.checked);
    console.log('Show checked: ' + checked);
    this.propagateValue(checked);
  }


  render(){

    const props = this.inputProps(this.props, {checked: this.state.value});
    
    delete props.value;
    delete props.error;
    const input = <Radio {...props}/>;
    return (
          <FormControlLabel
            control={input}
            label={props.label}
          />
    )
  }
}


export default RadioInput;