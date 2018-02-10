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
        APP:{this.state.text} 
        <input type="text" onChange={this.onChange} value={this.state.text}></input>
      </div>
    );
  }
}


export default App;
