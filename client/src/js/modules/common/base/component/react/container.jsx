import Component from '../react/component';
import {connect,Provider} from 'react-redux';
import React from 'react';


class Container extends Component{

  renderContainer=(Class,props)=>{
    return <Class store={this.props.store} {...props}></Class>
  }

  render(){
    const props = {
      render:{
        container:this.renderContainer
      }
    }
    return this.container(props);
  }

  container(props){
    return null;
  }

  static mapDispatchToProps(dispatch,ownProps){
    return {}
  }


  static mapStateToProps(state,ownProps){
    return {}
  }

  static updateMapDispatchToProps(newMapDispatchToProps){
    const oldDispatchToProps = this.mapDispatchToProps;
    this.mapDispatchToProps = (dispatch,ownProps)=>{
      ownProps = Object.assign({},this.defaultProps,ownProps);
      const previous = oldDispatchToProps(dispatch,ownProps);
      return Object.assign(
        previous,
        newMapDispatchToProps(dispatch,ownProps,previous)
      )
    };
  }

  static updateMapStateToProps(newMapStateToProps){
    const oldStateToProps = this.mapStateToProps;
    this.mapStateToProps = (state,ownProps)=>{
      ownProps = Object.assign({},this.defaultProps,ownProps);
      const previous = oldStateToProps(state,ownProps);
      return Object.assign(
        previous,
        newMapStateToProps(state,ownProps,previous)
      )
    };
  }


  static connect(){
    const MappedContainer = connect(
      this.mapStateToProps,
      this.mapDispatchToProps
    )(this);
    class ConnectedContainer extends Component{
      render(){
        return (
          <Provider store = {this.props.store}>
            <MappedContainer {...this.props}></MappedContainer>
          </Provider>
        );
      }
    }
    return ConnectedContainer;
  }

}


export default Container;
