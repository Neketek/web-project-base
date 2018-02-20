import {Time} from 'modules/common/base/input';
import React from 'react';
import {TimePicker} from 'material-ui-pickers'
import moment from 'moment';

class TimeInput extends Time{

  onChange=(event)=>{
    const value = event.format(Time.FORMAT);
    this.propagateValue(value);
  }

  stateValueToString=()=>{
    return this.state.value?moment(this.state.value,Time.FORMAT):null
  }

  render(){
    return <TimePicker ampm={false} {...this.props} value={this.stateValueToString()} onChange={this.onChange} format={Time.FORMAT}></TimePicker>
  }

}

export default TimeInput;
