import React from 'react';
import BaseInput from 'modules/common/base/input/base';
import PropTypes from 'prop-types';
import moment from 'moment';

class TimeInput extends BaseInput{}

TimeInput.updateDefaultProps({
  value:moment()
});

TimeInput.updatePropTypes({
  value:PropTypes.oneOfType([Date,PropTypes.string,moment]),
});


export default TimeInput;
