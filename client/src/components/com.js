import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
class imgs1 extends Component {
  state = {
    posts: [],
    id:"",
    comm:"",
    com:[],
    filename:""
  }
  componentDidMount(){
    axios.get('/imm',tokenConfig())
    .then(res => {
      /*res.headers.new='yess';
      console.log(res.headers);*/

      this.setState({
        posts: res.data
      });
    })

    //console.log(state);
  }

  render(){
    localStorage.token=this.props.post
    console.log(this.props.post)
    const { posts } = this.state
    const postList = posts.length ? (
      posts.map(post => {
       const im='/imm/'+post.filename;
       console.log(im);
       const handleChange2=(e)=>
       {
         console.log(e.target.value);
         this.setState({comm:e.target.value});
         this.setState({id:post._id,filename:post.filename});
         console.log(post._id);
       }
       const handleSubmit=(e)=>{
         e.preventDefault();
         const user={id:this.state.id,comments:this.state.comm,filename:this.state.filename};
         console.log(user);
         axios.post('/found',{user})
         .then(res=>{
           console.log(res.data);
         });
         window.location.href = "/imgs2";
        }
        return (
          <div className="post card" key={post.id}>
            <img src={im} alt="" width="300" height="300"/>
              <div className="card-content">
              <p>IMAGE:{post.filename}</p>
              </div>
              <form onSubmit={handleSubmit}>
              <label>
              comment<input type='text' comment='comment' onChange={handleChange2}/></label>
              <button type='submit'>Add</button>
              </form>
            </div>
        )
      })
    ) : (
      <div className="center">No posts to show</div>
    );

    return (
      <div>
        <div className="container">
          {postList}
        </div>
      </div>
    )
  }
}

const tokenConfig = getState => {
  // Get token from localstorage
  const token = localStorage.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['auth'] = token;
  }

  return config;
};
//export const addpost={type:'ADD',post:localStorage.getItem("lastname")};
const mapdata=(state)=>{
  return{post:state.post}
}
export default connect(mapdata)(imgs1)
