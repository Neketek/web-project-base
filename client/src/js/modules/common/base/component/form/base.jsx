import Component from '../react/component';
import React from 'react';
import PropTypes from 'prop-types';
import {getterSetter} from '../../utils';

/*
 * creates form event object
 */


const Event=(name,{values,errors,status,nested})=>{
  const form = true;
  return {
    form,
    name,
    values,
    errors,
    status,
    nested
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
    // "private" object which stores not shared state
    this.private = {
      /*
       * if focus(name,value) was called at least once
       * during component lifecycle, this value should be true.
       * resetFocus calls reset this value to false.
       * This value is important to understand
       * should form reset focus entirely after
       * props.dirtyFocusOnErrors was changed.
       */
      fieldFocusChanged:false
    };
    this.status('valid',this.isValid());
    if(this.props.dirtyFocusOnErrors){
      this.dirtyFocusOnErrors();
    }
    if(this.props.fireInitEvent){
      this.propagateEvent(null,{rerender:false});//initial on change event which sends form snapshot to the parent component
    }
  }

  onChange=(event)=>{
    this.propagateEvent(event);
  }

  onSubmit=()=>{
    if(!this.status('valid')){
      this.dirtyFocusOnErrors();
      this.propagateEvent(null);
    }else{
      const {props:{name},state} = this;
      this.props.onSubmit(Event(name,state));
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
   */
  State=({values,errors,status,nested})=>{
    if(this.state===undefined){
      this.state = {
        values:{},
        errors:{},
        status:{
          dirty:{},
          focus:{},
          valid:false
        },
        nested:{}
      }
    }
    return {
      values:Object.assign({},this.state.values,values),
      errors:Object.assign({},this.state.errors,errors),
      status:Object.assign({},this.state.status,status),
      nested:Object.assign({},this.state.nested,nested)
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
    if(this.props.dirtyFocusOnErrors!=props.dirtyFocusOnErrors){
      // console.log("DIRTY FOCUS UPDATE:"+this.props.name);
      // console.log({value:props.dirtyFocusOnErrors,old:this.props.dirtyFocusOnErrors});
      // console.log({fieldFocusChanged:this.private.fieldFocusChanged})
      if(props.dirtyFocusOnErrors){
        this.dirtyFocusOnErrors();
      }else if(!this.private.fieldFocusChanged){
        this.resetFocus();
      }
      this.propagateEvent(null);
    }
  }

  /*
   * propagates form event to parent component
   */

  propagateEvent=(event,props={rerender:true,validate:true})=>{
    // console.log("EVENT");
    // console.log({event});
    if(event){
      const {name,form} = event;
      if(form){
        const {form,values,errors,status} = event;
        this.value(name,values);
        this.nested(name,{values,errors,status});
      }else{
        const {value} = event;
        this.value(name,value);
        this.dirty(name,true);
      }
    }
    if(props.validate){
      this.status('valid',this.isValid());
    }
    this.props.onChange(Event(this.props.name,this.state));
    if(props.rerender){
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
    if(value!==undefined){
      this.private.fieldFocusChanged=true;
    }
    return getterSetter(this.state.status.focus,name,value,false);
  }

  nested=(name=undefined,value=undefined)=>{
    return getterSetter(this.state.nested,name,value,{});
  }

  isNested=(name=undefined)=>{
    return this.nested(name).name===undefined;
  }
  /*
   * allows modification of the static labels withoud
   * change of the getter
   */
  labels=()=>{
    return this.props.labels;
  }
  /*
   * label getter
   */
  label=(name)=>{
    return this.labels()[name];
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
    for(const name in this.state.values){
      if(this.hasErrors(name)||this.isNested(name)){
        this.focus(name,true);
        this.dirty(name,true);
      }
    }
  }

  /*
   * removes focus from all fields
   */
  resetFocus=()=>{
    this.private.fieldFocusChanged = false;
    this.state.status.focus={};
    const {resetParentFocus}=this.props;
    if(resetParentFocus){
      resetParentFocus();
    }
  }

  /*
   * tracks focus status of the fields
   */

  onFieldFocusChange=(event)=>{
    // console.log({fieldFocusChangedEvent:event});
    const {name,focus}=event;
    if(focus){
      // console.log('reset parent focus');
      this.resetFocus();
    }
    this.focus(name,focus);
    this.propagateEvent(null);
  }


  /*
   * standard error render method which contains important predefined props
   * and contains default condition which decides
   */

  renderFieldError=(Class,props)=>{
    const {name}=props;
    // console.log(props);
    const shouldRenderError = this.shouldShowErrorsText(name);
    if(!shouldRenderError){
      return null;
    }
    return <Class {...props}>{this.errors(name)[0]}</Class>
  }

  /*
   * field render method which contains important predefined props
   */

  renderField=(Class,props)=>{
    const {name} = props;
    const defaultProps = {
      onChange:this.onChange,
      onBlur:this.onFieldFocusChange,
      onFocus:this.onFieldFocusChange,
      value:this.value(name),
      error:this.shouldShowErrors(name)
    }
    return <Class {...defaultProps} {...props}></Class>
  }
  /*
   * sub-form render method which contains important predefined props
   */
  renderForm=(Class,props)=>{
    const {name}=props;
    const nestedFormState = this.nested(name);
    const values = this.value(name);
    const dirtyFocusOnErrors = this.dirty(name)&&this.focus(name);
    const defaultProps = {
      onChange:this.onChange,
      dirtyFocusOnErrors,
      ...nestedFormState,
      /*
       * supressing nestedFormState.values to be able to set them
       * in the parent form state.values
       */
      values,
      labels:this.label(name),
      resetParentFocus:this.resetFocus
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
        form:this.renderForm,
        error:this.renderFieldError
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
    console.warn("Warning:default form render method. Override this.form method!");
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
    for(const name in this.state.nested){
      const {status:{valid}} = this.nested(name);
      if(!valid){
        return false
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
    name:null,
    onChange(event){
      console.warn(`Warning:default form onChange callback in form ${event.name}`);
      console.log(event);
    },
    onSubmit(event){
      console.warn(`Warning:default form onSubmit callback in form ${event.name}`);
      console.log(event);
    },
    values:{},
    status:{},
    errors:{},
    nested:{},
    rules:{},
    labels:{},
    fireInitEvent:true,
    dirtyFocusOnErrors:false
  }

  static propTypes = {
    name:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    onSubmit:PropTypes.func,
    values:PropTypes.object,
    errors:PropTypes.object,
    status:PropTypes.shape({
      valid:PropTypes.bool,
      focus:PropTypes.object,
      dirty:PropTypes.object
    }),
    rules:PropTypes.object.isRequired,
    labels:PropTypes.object.isRequired,
    fireInitEvent:PropTypes.bool.isRequired,
    dirtyFocusOnErrors:PropTypes.bool.isRequired
  }

}


export default FormBase;
