import Component from 'modules/common/base/react/component';
import React from 'react';
import PropTypes from 'prop-types';


const State=({values,errors,status})=>{

  if(this.state===undefined){
    this.state = {};
  }

  const defaltStatus = {
    dirty:{},
    focus:{},
    valid:false
  };

  return {
    values:Object.assign({},this.state.values,values),
    errors:Object.assign({},this.state.errors,errors),
    status:Object.assign(defaltStatus,this.state.status,status)
  };

}

const Event=(name,{values,errors,status})=>{
  const form = true;
  return {
    form,
    name,
    values,
    errors,
    status
  }
}


const getterSetter=(source,name=undefined,value=undefined,def=undefined)=>{
  if(name===undefined){
    throw Exception("Value getter didn't receive name!");
  }
  if(value===undefined){
    const targetValue = source[name];
    return targetValue===undefined?def:targetValue;
  }else{
    source[name]=value;
    return value;
  }
}

class FormBase extends Component{

  constructor(props){
    super(props);
    this.state = State(props);
    if(this.props.fireInitEvent){
      this.propagateEvent(null,false);//initial on change event which sends form snapshot to the parent component
    }
  }


  propagateEvent=(event,updateState=true)=>{
    if(event){
      const {name} = event;
      if(event.form){
        const {values,errors,status} = event;
        this.value(name,{values,errors,status});
      }else{
        const {value} = event;
        this.value(name,value);
      }
      this.dirty(name,true);
    }
    this.status('valid',this.isValid());
    this.props.onChange(Event(this.props.name,this.state));
    if(updateState){
      this.setState(this.state);
    }
  }

  value=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.values,name,value);
  }

  errors=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.errors,name,value,[]);
  }

  hasErrors=(name)=>{
    return this.errors(name).length>0;
  }

  resetErrors=(name)=>{
    this.errors(name,[]);
  }

  status=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.status,name,value);
  }

  dirty=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.status.dirty,name,value,false);
  }

  focus=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.status.focus,name,value,false);
  }

  rules(){
    return this.props.rules;
  }

  onFieldFocusChange=(event)=>{
    const {name,focus} = event;
    this.focus(name,focus);
    this.propagateEvent(null);
  }

  renderField=(Class,props)=>{
    return <Class value={this.value(props.name)} onChange={this.onChange} {...props} onBlur={this.onFieldFocusChange} onFocus={this.onFieldFocusChange}></Class>
  }

  renderForm=(Class,props)=>{
    return <Class fireInitEvent={false} {...this.value(props.name)} onChange={this.onChange} {...props}></Class>
  }

  render=()=>{
    return this.form(this.renderField,this.renderForm);
  }


  //render method for the form
  form=()=>{
    console.warn("Warning:default form render method");
    return null;
  }

  isValid=()=>{
    return true;
  }

  static defaultProps = {
    name:"noname",
    onChange(event){
      console.warn(`Warning:default form onChange callback in form ${event.name}`);
      console.log(event);
    },
    fireInitEvent:true
  }

  static propTypes = {
    name:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    fireInitEvent:PropTypes.bool.isRequired
  }

}


export default FormBase;
