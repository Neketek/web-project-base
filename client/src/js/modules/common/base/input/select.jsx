import React from 'react';
import BaseInput from 'modules/common/base/input/base';
import PropTypes from 'prop-types';

const option=()=>PropTypes.shape({
  label:PropTypes.string.isRequired,
  value:PropTypes.any.isRequired
});

class SelectInput extends BaseInput{}

SelectInput.updateDefaultProps({
  options:[{label:"None",value:null}],
  value:{label:"None",value:null}
});

SelectInput.updatePropTypes({
  options:PropTypes.arrayOf(option()),
  value:option()
});

export default SelectInput;
