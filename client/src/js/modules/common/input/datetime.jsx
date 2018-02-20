import {DateTime} from 'modules/common/base/input';
import React from 'react';
import {DateTimePicker} from 'material-ui-pickers'

class DateTimeInput extends DateTime{

  onChange=(event)=>{
    const value = event.format(DateTime.FORMAT);
    this.propagateValue(value);
  }

  render(){
    return <DateTimePicker {...this.props} value={this.state.value} onChange={this.onChange} format={DateTime.FORMAT}></DateTimePicker>
  }

}

export default DateTimeInput;
