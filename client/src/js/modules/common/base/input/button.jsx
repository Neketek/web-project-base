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
    onClick:PropTypes.func.isRequired
  };

  onClick=()=>{
    this.props.onClick({name:this.props.name,click:true});
  }

  button=(Class,props,override)=>{

    const overridingProps = Object.assign(
      {
        onClick:this.onClick,
        name:this.props.name
      },
      override
    );

    return <Class {...props} {...overridingProps}></Class>
  }

}

export default Button;
