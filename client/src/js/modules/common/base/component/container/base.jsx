import Component from '../react/component';
import React from 'react';
import {connect,Provider} from 'react-redux';

class ContainerBase extends Component{

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


export default ContainerBase;
