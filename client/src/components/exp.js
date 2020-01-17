import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
class exp extends Component {

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
      name:this.state.name,
      price:this.state.price
    };
    console.log(user);
    axios.post('/found',{user},
    {
        headers: {
            "auth":localStorage.token,
            "Content-type": "application/json",
        },
    })
    .then(res=>{
      //console.log(res.data);
    });
  };

  render(){
    localStorage.token=this.props.post
    console.log(this.props.post)
   return(
     <form onSubmit={this.handleSubmit}>
     <label>
     name:<input type='text' name='name' onChange={this.handleChange1}/></label>
     <label>
     price:<input type='text' price='price' onChange={this.handleChange2}/></label>
     <button type='submit'>Add</button>
     </form>
   );
       }
     }

     const mapdata=(state)=>{
       return{post:state.post}
     }
     export default connect(mapdata)(exp)
