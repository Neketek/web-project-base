import {Date} from 'modules/common/base/input';
import React from 'react';
import {DatePicker} from 'material-ui-pickers'


class DateInput extends Date{

  onChange=(event)=>{
    const value = event.format(Date.FORMAT);
    this.propagateValue(value);
  }

  render(){
    console.log(this.state);
    return <DatePicker {...this.props} value={this.state.value} onChange={this.onChange} format={Date.FORMAT}></DatePicker>
  }

}

export default DateInput;
