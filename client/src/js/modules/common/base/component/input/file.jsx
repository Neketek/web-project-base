import React from 'react';
import BaseInput from './base';
import PropTypes from 'prop-types';


class FileInput extends BaseInput{}

FileInput.updateDefaultProps({
  value:[]
});

FileInput.updatePropTypes({
  value:PropTypes.array
});

export default FileInput;
