import {DateTime} from 'modules/common/base/component/input';
import React from 'react';
import {DateTimePicker} from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';


class DateTimeInput extends DateTime{

  onChange=(event)=>{
    const value = event.format(DateTime.FORMAT);
    this.propagateValue(value);
  }

  render(){
    const override = {
      format:DateTime.FORMAT
    }

    const element = this.input(DateTimePicker,this.props,override);

    return <MuiPickersUtilsProvider children={element} utils={MomentUtils} />
  }

}

export default DateTimeInput;
