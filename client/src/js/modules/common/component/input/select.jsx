import {Select} from 'modules/common/base/component/input';
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
// import {Select} from 'modules/common/base/input';
// import React from 'react';
// // import SelectField from 'material-ui/Select';
// import SelectField from 'react-select';
// import { MenuItem } from 'material-ui/Menu';
// //TODO: install react select and make it look in material design
//
// class SelectInput extends Select{
//
//
//
//   onChange=(event)=>{
//     this.propagateValue(event.target.value);
//   }
//
//   // renderOption=(option)=>{
//   //   const {value,label} = option;
//   //   return <MenuItem value={value} key={label}>{label}</MenuItem>
//   // }
//
//
//
//   renderOptions=()=>{
//     return this.props.options.map(this.renderOption);
//   }
//
//
//   render(){
//     return (
//       <SelectField {...this.props} clearable loading options={this.props.options} value={this.state.value} onChange={this.onChange}>
//         {/* {this.renderOptions()} */}
//       </SelectField>
//     );
//   }
//
//
// }
//
// export default SelectInput;
//
//
// function renderInput(inputProps) {
//   const { InputProps, classes, ref, ...other } = inputProps;
//
//   return (
//     <TextField
//       {...other}
//       inputRef={ref}
//       InputProps={{
//         classes: {
//           input: classes.input,
//         },
//         ...InputProps,
//       }}
//     />
//   );
// }
//
// function renderSuggestion(params) {
//   const { suggestion, index, itemProps, highlightedIndex, selectedItem } = params;
//   const isHighlighted = highlightedIndex === index;
//   const isSelected = selectedItem === suggestion.label;
//
//   return (
//     <MenuItem
//       {...itemProps}
//       key={suggestion.label}
//       selected={isHighlighted}
//       component="div"
//       style={{
//         fontWeight: isSelected ? 500 : 400,
//       }}
//     >
//       {suggestion.label}
//     </MenuItem>
//   );
// }
//
// function getSuggestions(inputValue) {
//   let count = 0;
//
//   return suggestions.filter(suggestion => {
//     const keep =
//       (!inputValue || suggestion.label.toLowerCase().includes(inputValue.toLowerCase())) &&
//       count < 5;
//
//     if (keep) {
//       count += 1;
//     }
//
//     return keep;
//   });
// }
//
// const styles = {
//   container: {
//     flexGrow: 1,
//     height: 200,
//     width: 200,
//   },
// };
//
// function IntegrationDownshift(props) {
//   const { classes } = props;
//
//   return (
//     <Downshift>
//       {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
//         <div className={classes.container}>
//           {renderInput({
//             fullWidth: true,
//             classes,
//             InputProps: getInputProps({
//               placeholder: 'Search a country (start with a)',
//               id: 'integration-downshift',
//             }),
//           })}
//           {isOpen ? (
//             <Paper square>
//               {getSuggestions(inputValue).map((suggestion, index) =>
//                 renderSuggestion({
//                   suggestion,
//                   index,
//                   itemProps: getItemProps({ item: suggestion.label }),
//                   highlightedIndex,
//                   selectedItem,
//                 }),
//               )}
//             </Paper>
//           ) : null}
//         </div>
//       )}
//     </Downshift>
//   );
// }
//
// IntegrationDownshift.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
//
// export default withStyles(styles)(IntegrationDownshift);
