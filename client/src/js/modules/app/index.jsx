import 'css/app.scss';
import React from "react";


class App extends React.Component{
  constructor(props){
    super(props);

    this.state={text:this.props.value};

    this.onChange=(event)=>{
      this.props.onChange(event.target.value);
      this.setState({text:event.target.value});
    }

  }

  render(){
    return (
      <div>
        ZAKA
        <input type="text" onChange={this.onChange} value={this.state.text}></input>
      </div>
    );
  }
}


export default App;
