import React from 'react';
import BaseInput from 'modules/common/base/input/base';
import PropTypes from 'prop-types';

class CheckInput extends BaseInput{}

CheckInput.updateDefaultProps({
  value:false
});

CheckInput.updatePropTypes({
  value:PropTypes.bool.isRequired
});

export default CheckInput;
