import React from 'react';
import BaseInput from './base';
import PropTypes from 'prop-types';

class RadioInput extends BaseInput{}

RadioInput.updateDefaultProps({
  value:false
});

RadioInput.updatePropTypes({
  value:PropTypes.bool.isRequired
});

export default RadioInput;
