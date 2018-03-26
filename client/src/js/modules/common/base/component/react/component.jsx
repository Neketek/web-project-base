import React from 'react';

class Component extends React.Component{

  static updatePropTypes(propTypes){
    this.propTypes = Object.assign({},this.propTypes,propTypes);
  }

  static updateDefaultProps(defaultProps){
    this.defaultProps = Object.assign({},this.defaultProps,defaultProps);
  }

  rerender=(callback)=>{
    this.forceUpdate(callback);
  }

  static propTypes = {};
  static defaultProps = {};

}

export default Component;
