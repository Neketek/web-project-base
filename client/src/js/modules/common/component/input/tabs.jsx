import {Base} from 'modules/common/base/component/input';
import React from 'react';
import Tabs,{Tab} from 'material-ui/Tabs';
import PropTypes from 'prop-types';

class Wrapper extends Base{

  onChange=(event,value)=>{
    this.propagateValue(value);
  }

  render(){
    const {value}=this.state;
    const props = {
      ...this.props,
      value,
      onChange:this.onChange
    }

    return <Tabs {...props}></Tabs>
  }
}

Wrapper.defaultProps={
  name:'tabs',
  value:null
}

Wrapper.propTypes={
  name:PropTypes.string.isRequired,
  value:PropTypes.any
}

export default {Wrapper,Tab};
