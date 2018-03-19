import React from 'react';
import BaseInput from './base';
import PropTypes from 'prop-types';
import moment from 'moment';

class TimeInput extends BaseInput{
  static FORMAT = "HH:mm";
}


TimeInput.updatePropTypes({
  value:PropTypes.string
});


export default TimeInput;
