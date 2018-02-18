import React from 'react';
import BaseInput from 'modules/common/base/input/base';
import PropTypes from 'prop-types';
import moment from 'moment';

class DateTimeInput extends BaseInput{}

DateTimeInput.updateDefaultProps({
  value:moment()
});

DateTimeInput.updatePropTypes({
  value:PropTypes.oneOfType([Date,PropTypes.string,moment]),
});

export default DateTimeInput;
