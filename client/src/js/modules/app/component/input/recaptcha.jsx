import Component from "modules/common/base/component/react/component";
import React from 'react';


class Recaptcha extends Component{

  static execute(widgetId){
    grecaptcha.execute(widgetId);
  }

  constructor(props){
    super(props);
    if(!window.grecaptcha){
      throw Exception("No Recaptcha API Client found")
    }
  }
  render(){
    return <div ref={element=>this.containerRef=element}></div>;
  }

  componentDidMount(){
    const {
      id,
      callback
    } = this.props;
    grecaptcha.render(
      this.containerRef,
      {
        id,
        callback,
        "sitekey":"6LfXN1QUAAAAAMlT7UF5yoZZhHs1_Q7qfsvQNbUV",
        "size":"invisible"
      }
    );
  }
}

Recaptcha.defaultProps = {
  id:"recaptcha",
  callback:(resp)=>{
    console.log("Recaptcha response");
    console.log({resp})
  }
}

export default Recaptcha;
