import {Date} from 'modules/common/base/component/input';
import React from 'react';
import {DatePicker} from 'material-ui-pickers'


class DateInput extends Date{

  onChange=(event)=>{
    const value = event.format(Date.FORMAT);
    this.propagateValue(value);
  }

  render=()=>{
    const override = {
      format:Date.FORMAT
    }
    return this.input(DatePicker,this.props,override);
  }

}

export default DateInput;
