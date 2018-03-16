import React from 'react';
import BaseInput from './base';
import PropTypes from 'prop-types';
import moment from 'moment';

class DateInput extends BaseInput{
  static FORMAT = "YYYY-MM-DD";
}

DateInput.updatePropTypes({
  value:PropTypes.string
});


export default DateInput;
