import React from 'react';
import Component from 'modules/common/base/react/component';
import PropTypes from 'prop-types';


class Button extends Component{

  static defaultProps = {
    name:"noname",
    onClick(event){
      console.warn("Warning: defaul button onClick callback!");
      console.log(event);
    }
  };

  static propTypes = {
    name:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired
  };

}

export default Button;
