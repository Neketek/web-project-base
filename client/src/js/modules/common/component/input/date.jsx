import {Date} from 'modules/common/base/component/input';
import React from 'react';
import {DatePicker} from 'material-ui-pickers'
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import PropTypes from 'prop-types';

console.log("MuiPickersUtilsProvider");
console.log(MuiPickersUtilsProvider.propTypes);
console.log(MuiPickersUtilsProvider.propTypes.children);

class DateInput extends Date{

  onChange=(event)=>{
    const value = event.format(Date.FORMAT);
    this.propagateValue(value);
  }

  render=()=>{
    const override = {
      format:Date.FORMAT
    }
    const element = this.input(DatePicker,this.props,override);
    
    return <MuiPickersUtilsProvider children={element} utils={MomentUtils}/>;
  }

}

export default DateInput;
