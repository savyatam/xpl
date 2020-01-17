import React, { Component } from 'react'
import axios from 'axios'

class exp extends Component {

  handleSubmit=event=>{
    event.preventDefault();
    localStorage.clear();
      window.location.href = "/";
  };

  render(){

   return(
     <form onSubmit={this.handleSubmit}>
     <button type='submit'>logout</button>
     </form>
   );
       }
     }

export default exp
