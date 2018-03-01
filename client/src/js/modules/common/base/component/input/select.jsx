import React from 'react';
import BaseInput from './base';
import PropTypes from 'prop-types';

const option=()=>PropTypes.shape({
  label:PropTypes.string.isRequired,
  value:PropTypes.any
});

class SelectInput extends BaseInput{}

SelectInput.updateDefaultProps({
  options:[{label:"None",value:null}],
  value:null
});

SelectInput.updatePropTypes({
  options:PropTypes.arrayOf(option())
});

export default SelectInput;
