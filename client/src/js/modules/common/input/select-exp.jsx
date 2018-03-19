import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Downshift from 'downshift';

const DEFAULT_NOT_FOUND_LABEL = "No results found";

class SelectTextInput extends React.Component{
  constructor(props){
    super(props);
    console.log("INPUT props");
    console.log({props});

  }

  render(){
    return(
      <TextField
        {...this.props}
        onClick={this.props.onClick}
      />
    );
  }
}

class SelectOptions extends React.Component{
  constructor(props){
    super(props);
    console.log("Options props");
    console.log({props});
  }

  getOptions(){
    return this.props.options.filter(option => {
      return !this.props.inputValue || option.label.toLocaleLowerCase().includes(this.props.inputValue.toLocaleLowerCase());
    });
  }

  renderOptions(options){
    return options.map((option, index) =>{
      const isHighlighted = this.props.highlightedIndex === index;
      const isSelected = this.props.selectedItem === option.label;
      return <MenuItem
        {...this.props.getItemProps({item:option.label})}
        key={option.label}
        selected={isSelected}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {option.label}
      </MenuItem>
    });
  }

  render(){
    const options = this.getOptions();
    return(
      <Paper square>
        {options.length>0?this.renderOptions(options):<MenuItem
          key={DEFAULT_NOT_FOUND_LABEL}
          selected={false}
          component="div"
          style={{
            color: 'grey'
            // fontWeight: isSelected ? 500 : 400,
          }}
        >
          {DEFAULT_NOT_FOUND_LABEL}
        </MenuItem>}

      </Paper>
    );
  }
}

class SelectInput extends React.Component{
  constructor(props){
    super(props);
    console.log({props});
    this.state = {isOpen:false};
    this.onTextFieldClick=()=>{
      console.log(  this.state.isOpen);
      this.state.isOpen = true;
      this.setState(this.state);
    }
  }

  render(){
    return (
      <Downshift
        // defaultInputValue="test"  //+
        // defaultIsOpen={this.isOpen} //+
        isOpen={this.state.isOpen}
        onOuterClick={() => this.setState({isOpen: false})}
        onInputValueChange={value=>console.log("input changes: "+value)}
        onChange={this.props.onChange}
        render={({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
        }) => (
          <div>
            <SelectTextInput
              {...getInputProps({
                label:this.props.label,
                placeholder:this.props.placeholder,
                onClick:this.onTextFieldClick
              })}
              ></SelectTextInput>
            {isOpen ? (
              <SelectOptions
                options={this.props.options}
                inputValue={inputValue}
                selectedItem={selectedItem}
                highlightedIndex={highlightedIndex}
                getItemProps={getItemProps}
                ></SelectOptions>
            ) : null}
          </div>
        )}
      />
    );
  }
}

SelectInput.defaultProps = {
  label:"no label",
  placeholder:""
}

export default SelectInput;
