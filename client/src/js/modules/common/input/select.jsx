import {Select} from 'modules/common/base/input';
import React from 'react';
// import SelectField from 'material-ui/Select';
import SelectField from 'react-select';
import { MenuItem } from 'material-ui/Menu';
//TODO: install react select and make it look in material design

class SelectInput extends Select{



  onChange=(event)=>{
    this.propagateValue(event.target.value);
  }

  // renderOption=(option)=>{
  //   const {value,label} = option;
  //   return <MenuItem value={value} key={label}>{label}</MenuItem>
  // }



  renderOptions=()=>{
    return this.props.options.map(this.renderOption);
  }


  render(){
    return (
      <SelectField {...this.props} clearable loading options={this.props.options} value={this.state.value} onChange={this.onChange}>
        {/* {this.renderOptions()} */}
      </SelectField>
    );
  }


}

export default SelectInput;
