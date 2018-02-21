import {DateTime} from 'modules/common/base/input';
import React from 'react';
import {DateTimePicker} from 'material-ui-pickers'

class DateTimeInput extends DateTime{

  onChange=(event)=>{
    const value = event.format(DateTime.FORMAT);
    this.propagateValue(value);
  }

  render(){
    const override = {
      format:DateTime.FORMAT
    }
    return this.input(DateTimePicker,this.props,override);
  }

}

export default DateTimeInput;
