import React, { Component } from 'react'
import axios from 'axios'
//import {connect} from 'react-redux'
//import {createStore} from 'redux';
import store from '../App.js'
class routes extends Component {
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
    console.log(user);localStorage.setItem("lastname",'nrw');
    axios.post('/login',{user})
    .then(res=>{
      localStorage.setItem("lastname",res.data.token);
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
     <button type='submit'>Login</button>
     </form>
   );
       }
     }
export const addpost={type:'ADD',post:localStorage.getItem("lastname")};
export default routes
