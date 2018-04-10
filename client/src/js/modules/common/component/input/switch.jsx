import React from 'react';
import { SwitchBase } from 'modules/common/base/component/input';
import PropTypes from 'prop-types';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

class SwitchInput extends SwitchBase{

  onChange = (event, checked) => {
    console.log('Show Switch: ' + event.target.checked);
    this.propagateValue(checked);
  }


  render() {

    const props = this.inputProps(this.props, {checked: this.state.value});

    delete props.value;
    delete props.error;
    const input = <Switch {...props}/>;
    return (
      <FormControlLabel
        control={input}
        label={props.label}
      />
    )
  }
}

export default SwitchInput;