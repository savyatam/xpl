import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
class exp extends Component {

  state = {
    name:"",
    price:"",
    id:"",
    com:[]
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
      id:this.state.name,
      comments:this.state.price
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
      this.setState({
        com: res.data.comments
      });
      console.log(res.data);
    });
  };

  render(){
    localStorage.token=this.props.post
    console.log(this.props.post)
    const posts  = this.state.com
    const postList = posts.length ? (
      posts.map(post => {

      //console.log(axios.defaults);
        return (
          <div className="post card" key={post.id}>
            <div className="card-content">
              <span className="card-title">{post.title}</span>
              <p>comments:{post}</p>
            </div>
          </div>
        )
      })
    ) : (
      <div className="center">No posts to show</div>
    );
   return(
     <form onSubmit={this.handleSubmit}>
     <label>
     id<input type='text' name='name' onChange={this.handleChange1}/></label>
     <label>
     comment<input type='text' price='price' onChange={this.handleChange2}/></label>
     <button type='submit'>Add</button>
     {postList}
     </form>
   );
       }
     }

     const mapdata=(state)=>{
       return{post:state.post}
     }
     export default connect(mapdata)(exp)
