import React from 'react';

class Home extends React.Component {
   constructor(props)
   {
       super(props);
       this.state = {
            age : props.age,
       }
   }

   // runs after the component has been initialized in DOM
   componentDidMount()
   {
       console.log("component is mounted")
   }
   // updates the state based on new props
   componentWillReceiveProps(nextProps)
   {     
       console.log("component will receive props",nextProps) 
       this.setState({age:nextProps.age})
   }
   // runs before component is unmounted from DOM
   componentWillUnmount()
   {
       console.log("component will unmount")
   }
   makeolder = () =>
   {
          this.setState({age:this.state.age+1})
   }
  render(){
      
  return (
    <div >
        <div>{this.state.age}</div>
        <button onClick={this.makeolder} className="btn btn-success" style={{'margin': '15px'}}>Increase Age</button>  
    </div>
  );
  }
}

export default Home;
