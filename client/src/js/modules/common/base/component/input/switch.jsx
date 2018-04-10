import React from 'react';
import Base from './base';
import PropTypes from 'prop-types';


class SwitchInput extends Base{}

SwitchInput.updateDefaultProps({
  value: false
});

SwitchInput.updatePropTypes({
  value:PropTypes.bool.isRequired
});

export default SwitchInput;