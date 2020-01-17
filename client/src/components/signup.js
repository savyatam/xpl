import React, { Component } from 'react'
import axios from 'axios'

class routes2 extends Component {
  state = {
    name:"",
    price:0
  };
  handleChange1=event=>{
    this.setState({name:event.target.value});
  };
  handleChange2=event=>{
    this.setState({price:event.target.value});
  };
  handleSubmit=event=>{
    event.preventDefault();
    const user={
      email:this.state.name,
      password:this.state.price
    };
    console.log(user.email);
    axios.post('/signup',{user})
    .then(res=>{
      console.log(res.data);
    });
  };

  render(){
   return(
     <form onSubmit={this.handleSubmit}>
     <label>
     email:<input type='text' name='name' onChange={this.handleChange1}/></label>
     <label>
     password:<input type='text' price='price' onChange={this.handleChange2}/></label>
     <button type='submit'>Signup</button>
     </form>
   );
       }
     }

export default routes2
