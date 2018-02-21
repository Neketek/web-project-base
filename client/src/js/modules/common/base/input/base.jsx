import React from 'react';
import PropTypes from 'prop-types';
import Component from 'modules/common/base/react/component';


class InputBase extends Component{

  constructor(props){
    super(props);
    this.state = {
      value:this.props.value
    };
  }


  onBlur=(event)=>{
    this.props.onBlur({name:this.props.name,focus:false});
  }

  onFocus=(event)=>{
    this.props.onFocus({name:this.props.name,focus:true});
  }

  propagateValue=(value)=>{
    this.props.onChange({name:this.props.name,value});
    this.setState({value});
  }

  componentWillReceiveProps(props){
    this.state.value = this.props.value;
  }

  //input render method
  input=(Class,props,override)=>{
    const overridingProps=Object.assign(
      {
        onChange:this.onChange,
        onFocus:this.onFocus,
        onBlur:this.onBlur,
        value:this.state.value,
        name:this.props.name
      },
      override
    );
    return <Class {...props} {...overridingProps}></Class>
  }


  static defaultProps = {
    onChange(event){
      console.warn(`Warning: Default onChange callback in [${event.name}] input!`);
      console.log(event);
    },
    onFocus(event){
      console.log(event);
    },
    onBlur(event){
      console.log(event);
    },
    value:null,
    name:"noname",
    label:"no label",
    disabled:false,
    required:false
  }

  static propTypes = {
    onChange:PropTypes.func.isRequired,
    onFocus:PropTypes.func.isRequired,
    onBlur:PropTypes.func.isRequired,
    value:PropTypes.any,
    name:PropTypes.string.isRequired,
    disabled:PropTypes.bool.isRequired,
    label:PropTypes.oneOfType([PropTypes.string,PropTypes.node])
  }

}

export default InputBase;
