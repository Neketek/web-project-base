import React from 'react';
import PropTypes from 'prop-types';
import Component from '../react/component';


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
    this.state.value = props.value;
  }



  inputProps=(props,override)=>{
    const overridingProps = Object.assign(
      {},
      props,
      {
        onChange:this.onChange,
        onFocus:this.onFocus,
        onBlur:this.onBlur,
        value:this.state.value,
        name:props.name
      },
      override
    );
    return overridingProps;
  }

  //input render method
  input=(Class,props,override)=>{
    return <Class {...this.inputProps(props,override)}></Class>
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
    required:false,
    error:false
  }

  static propTypes = {
    onChange:PropTypes.func.isRequired,
    onFocus:PropTypes.func.isRequired,
    onBlur:PropTypes.func.isRequired,
    value:PropTypes.any,
    name:PropTypes.string.isRequired,
    disabled:PropTypes.bool.isRequired,
    error:PropTypes.bool.isRequired,
    label:PropTypes.oneOfType([PropTypes.string,PropTypes.node])
  }

}

export default InputBase;
