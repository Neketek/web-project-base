import React from 'react';
import { Check } from 'modules/common/base/component/input';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import CheckBox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';


class CheckInput extends Check{

    onChange = (event,checked) => {
        console.log('Show Check: ' + event.target.checked);
        this.propagateValue(checked);
    }


    render() {
        const props = this.inputProps(this.props,{checked:this.state.value});
        delete props.value;
        delete props.error;
        const input = <CheckBox {...props}/>;
        return (
          <FormControlLabel
            control={input}
            label={props.label}
          />
        )
    }
}

export default CheckInput;
