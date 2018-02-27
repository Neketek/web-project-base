import Component from 'modules/common/base/react/component';
import React from 'react';
import PropTypes from 'prop-types';


/*
 * creates form event object
 */

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

/*
 * universal setter getter, propably i'll move it to separate file as an util
 */
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
  /*
   * creates the initial state from props
   * fire initial onChange event to provide form snapshot
   * to the parent component via this.props.onChage
   */
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

  /*
   * creates state object from props
   * values: field and sub-forms snapshots
   * errors: fields snapshot
   * status:{
   *  valid: is form data valid
   *  dirty: fields dirty statuses
   *  focus: fields focus statuses
   * }
   */
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

  /*
   * creates new state from props and validates it
   */
  updateStateFromProps(props){
    this.setState(this.State(props));
    this.status('valid',this.isValid());
  }

  /*
   * handles props updates during while component is mounted
   */
  componentWillReceiveProps(props){
    this.updateStateFromProps(props);
    if(this.props.dirtyFocusOnErrors){
      this.dirtyFocusOnErrors();
      this.rerender();
    }
  }

  /*
   * propagates form event to parent component
   */
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

  /*
   * setter/getter for this.state.value[name]
   * returns null if value[name] is undefined
   */
  value=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.values,name,value);
  }
  /*
   * setter/getter for this.state.errors[name]
   * return [] if errors[name] is undefined
   */
  errors=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.errors,name,value,[]);
  }
  /*
   * setter/getter for this.state.status[name]
   * return null if status[name] is undefined
   */
  status=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.status,name,value);
  }
  /*
   * setter/getter for this.state.status.dirty[name]
   * return false if dirty[name] is undefined
   */
  dirty=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.status.dirty,name,value,false);
  }
  /*
   * setter/getter for this.state.status.focus[name]
   * return false if focus[name] is undefined
   */
  focus=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.status.focus,name,value,false);
  }
  /*
   * getter for this.state.status.valid
   */
  valid=()=>{
    return this.status('valid');
  }
  /*
   * checks is this.state.errors[name] list is empty
   */
  hasErrors=(name)=>{
    return this.errors(name).length>0;
  }
  /*
   * sets this.state.errors[name]=[]
   */
  resetErrors=(name)=>{
    this.errors(name,[]);
  }
  /*
   * if field has errors and it's dirty returns true
   * otherwise returns false
   */
  shouldShowErrors=(name)=>{
    return this.errors(name).length>0&&this.dirty(name);
  }
  /*
   * if field should show errors and it's in focus returns true
   * otherwise returns false
   */
  shouldShowErrorsText=(name)=>{
    return this.shouldShowErrors(name)&&this.focus(name);
  }

  /*
   * set dirty(name,true) and focus(name,true) for all names
   * for which hasErrors(name) returns true
   */

  dirtyFocusOnErrors=()=>{
    for(const name in this.state.errors){
      if(this.hasErrors(name)){
        this.focus(name,true);
        this.dirty(name,true);
      }
    }
  }

  /*
   * removes focus from all fields
   */
  resetFocus=()=>{
    this.state.status.focus={};
  }

  /*
   * tracks focus status of the fields
   */

  onFieldFocusChange=(event)=>{
    const {name,focus} = event;
    if(focus){
      this.resetFocus();
    }
    this.focus(name,focus);
    this.rerender();
  }

  /*
   * field render method which contains important predefined props
   */
  renderField=(Class,props)=>{
    const defaultProps = {
      onChange:this.onChange,
      onBlur:this.onFieldFocusChange,
      onFocus:this.onFieldFocusChange,
      value:this.value(props.name)
    }
    return <Class {...defaultProps} {...props}></Class>
  }
  /*
   * sub-form render method which contains important predefined props
   */
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

  /*
   * NOTE:do not override
   * overriden render method which calls form(renderField,renderForm)
   * makes form creation more comfortable by passing additional arguments
   * to render method
   */
  render=()=>{
    const props = {
      render:{
        field:this.renderField,
        form:this.renderForm
      }
    }
    return this.form(props);
  }


  /*
   * NOTE: do not override defaul render method!
   * main render method for the form
   * should be overriden in child classes
   * to enable rendering
   */
  form=()=>{
    console.warn("Warning:default form render method");
    return null;
  }

  /*
   * NOTE: can be overriden
   * returns field validation rules
   */
  rules(){
    return this.props.rules;
  }

  /*
   * checks form.status.valid for each sub-form
   * returns true if all forms are valid othewise returns false
   */
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

  useRules=(name,rules)=>{
    const value = this.value(name);
    const errors = [];
    for(const rule of rules){
      const {error,text} = rule(name,value);
      if(error){
        errors.push(text);
      }
    }
    return errors;
  }

  /*
   * NOTE:do not override!
   * Performs default fields validation
   * using given rules.
   * Saves all errors which were generated by this.rules()[name] to this.state.errors[name]
   */
  validateByRules(){
    // console.log("RULES");
    let areAllFieldsValid = true;
    const fieldsRules = this.rules();
    // console.log(fieldsRules);
    for(const name in fieldsRules){
      const rules = fieldsRules[name];
      const value = this.value(name);
      this.resetErrors(name);
      const errors = this.useRules(name,rules);
      if(errors.length>0){
        areAllFieldsValid = false;
      }
      this.errors(name,errors);
    }
    return areAllFieldsValid;
  }

  /*
   * NOTE:can be overriden
   * default isValid method which checks fields using rules and
   * forms using their form.status.valid.
   */
  isValid=()=>{
    return this.defaultIsValid();
  }

  defaultIsValid=()=>{
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
