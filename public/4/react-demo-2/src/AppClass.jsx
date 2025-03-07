import React from 'react';
import UserParser from './components/userParser'
import Home from './Home'
class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state ={
      initialage:22,
      mount:true
    }
  }
  changemountstatus=()=>{
   this.setState({mount:!this.state.mount})
  }
  changeinitialage=()=>{
    this.setState({initialage:this.state.initialage+50})
  }
  render(){
    let homecomponent = ""
    if(this.state.mount === true)
    {console.log(this.state.initialage)
      homecomponent = <Home age={this.state.initialage}></Home>
    }
  return (
    <div className="App">
           <UserParser greetings="happy birthday">Please greet the user: </UserParser>
           <button onClick={this.changeinitialage} className="btn btn-success" style={{'margin': '15px'}}>Change Inital Age</button>
           {homecomponent}
           {/* <Home age={this.state.initialage} /> */}
           <button onClick={this.changemountstatus} className="btn btn-success" style={{'margin': '15px'}}>{this.state?.mount ? '(Un)mount' : 'Mount' }</button>
    </div>
  );
  }
}

export default App;
