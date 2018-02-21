import Component from 'modules/common/base/react/component';
import React from 'react';
import PropTypes from 'prop-types';



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
    throw Error("Value getter didn't receive name!");
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
    this.state = this.State(props);
    this.status('valid',this.isValid());
    if(this.props.dirtyFocusOnErrors){
      this.dirtyFocusOnErrors();
    }
    if(this.props.fireInitEvent){
      this.propagateEvent(null,false);//initial on change event which sends form snapshot to the parent component
    }
  }


  State=({values,errors,status})=>{
    if(this.state===undefined){
      this.state = {
        values:{},
        errors:{},
        status:{
          dirty:{},
          focus:{},
          valid:false
        }
      }
    }
    return {
      values:Object.assign({},this.state.values,values),
      errors:Object.assign({},this.state.errors,errors),
      status:Object.assign({},this.state.status,status)
    };

  }


  updateStateFromProps(props){
    this.setState(this.State(props));
    this.status('valid',this.isValid());
  }


  componentWillReceiveProps(props){
    this.updateStateFromProps(props);
    if(this.props.dirtyFocusOnErrors){
      this.dirtyFocusOnErrors();
      this.rerender();
    }
  }


  propagateEvent=(event,updateState=true)=>{
    if(event){
      const {name} = event;
      if(event.form){
        const {form,values,errors,status} = event;
        this.value(name,{form,values,errors,status});
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

  status=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.status,name,value);
  }

  dirty=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.status.dirty,name,value,false);
  }

  focus=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.status.focus,name,value,false);
  }

  valid=()=>{
    return this.status('valid');
  }

  hasErrors=(name)=>{
    return this.errors(name).length>0;
  }

  resetErrors=(name)=>{
    this.errors(name,[]);
  }

  shouldShowErrors=(name)=>{
    return this.errors(name).length>0&&this.dirty(name);
  }

  shouldShowErrorsText=(name)=>{
    return this.shouldShowErrors(name)&&this.focus(name);
  }


  // this method is designed to show erros when user tries to submit form which contains errors
  dirtyFocusOnErrors=()=>{
    for(const name in this.state.errors){
      if(this.errors(name).length>0){
        this.focus(name,true);
        this.dirty(name,true);
      }
    }
  }


  resetFocus=()=>{
    this.state.status.focus={};
  }


  onFieldFocusChange=(event)=>{
    const {name,focus} = event;
    if(focus){
      this.resetFocus();
    }
    this.focus(name,focus);
    this.rerender();
  }

  renderField=(Class,props)=>{
    const defaultProps = {
      onChange:this.onChange,
      onBlur:this.onFieldFocusChange,
      onFocus:this.onFieldFocusChange,
      value:this.value(props.name)
    }
    return <Class {...defaultProps} {...props}></Class>
  }

  renderForm=(Class,props)=>{
    const {values,status,errors} = this.value(props.name);
    const defaultProps = {
      onChange:this.onChange,
      fireInitEvent:false,
      values,
      status,
      errors
    }
    return <Class {...defaultProps} {...props}></Class>
  }

  render=()=>{
    return this.form(this.renderField,this.renderForm);
  }


  //render method for the form
  form=()=>{
    console.warn("Warning:default form render method");
    return null;
  }

  rules(){
    return this.props.rules;
  }

  areAllFormsValid(){
    // console.log("FORMS");
    for(const name in this.state.values){
      const value = this.value(name);
      if(value&&value.form){
        if(!value.status.valid){
          return false;
        }
      }
    }
    return true;
  }

  validateByRules(){
    // console.log("RULES");
    let areAllFieldsValid = true;
    const fieldsRules = this.rules();
    // console.log(fieldsRules);
    for(const name in fieldsRules){
      const rules = fieldsRules[name];
      const value = this.value(name);
      this.resetErrors(name);
      const errors = [];
      // console.log(rules);
      for(const rule of rules){
        // console.log(rule);
        const result = rule(name,value);
        if(result.error){
          areAllFieldsValid=false;
          errors.push(result.text);
        }
      }
      this.errors(name,errors);
    }
    return areAllFieldsValid;
  }

  isValid=()=>{
    // console.log("VALIDATION");
    return this.validateByRules()&&this.areAllFormsValid();
  }

  static defaultProps = {
    name:"noname",
    onChange(event){
      console.warn(`Warning:default form onChange callback in form ${event.name}`);
      console.log(event);
    },
    fireInitEvent:true,
    dirtyFocusOnErrors:false,
    rules:{}
  }

  static propTypes = {
    name:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    fireInitEvent:PropTypes.bool.isRequired,
    dirtyFocusOnErrors:PropTypes.bool.isRequired,
    rules:PropTypes.object.isRequired
  }

}


export default FormBase;
