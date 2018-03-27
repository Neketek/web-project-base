import {Time} from 'modules/common/base/component/input';
import React from 'react';
import {TimePicker} from 'material-ui-pickers'
import moment from 'moment';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

class TimeInput extends Time{

  onChange=(event)=>{
    const value = event.format(Time.FORMAT);
    this.propagateValue(value);
  }

  stateValueToString=()=>{
    return this.state.value?moment(this.state.value,Time.FORMAT):null
  }

  render(){

    const override = {
      value:this.stateValueToString(),
      format:Time.FORMAT
    }

    const element = this.input(TimePicker,this.props,override);

    return <MuiPickersUtilsProvider children={element} utils={MomentUtils} />;

  }

}

export default TimeInput;
