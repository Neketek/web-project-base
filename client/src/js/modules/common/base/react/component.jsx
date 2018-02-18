import React from 'react';

class Component extends React.Component{

  static updatePropTypes(propTypes){
    this.propTypes = Object.assign({},super.propTypes,propTypes);
  }

  static updateDefaultProps(defaultProps){
    this.propTypes = Object.assign({},super.propTypes,defaultProps);
  }

  static propTypes = {};
  static defaultProps = {};

}

export default Component;
