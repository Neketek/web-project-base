import React from 'react';
import BaseInput from 'modules/common/base/input/base';
import PropTypes from 'prop-types';
import moment from 'moment';

class DateTimeInput extends BaseInput{
  static FORMAT = "YYYY-MM-DD HH:mm";
}

DateTimeInput.updatePropTypes({
  value:PropTypes.string
});

export default DateTimeInput;
