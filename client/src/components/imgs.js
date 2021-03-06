import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import exp from './exp.js'
class imgs extends Component {
  state = {
    posts: [],
    id:"",
    comm:"",
    com:[]
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
         this.setState({id:post._id});
         console.log(post._id);
       }
       const fnc=(ans)=>{if(ans==this.state.id)
                        return postList1;}
       const handleSubmit=(e)=>{
         e.preventDefault();
         const user={id:this.state.id,comments:this.state.comm};
         console.log(user);
         axios.post('/found',{user})
         .then(res=>{
           this.setState({
             com: res.data.comments,id:res.data._id
           });
           console.log(res.data);
         });
        }
        const posts1  = this.state.com
        const postList2=(<div className="center">No posts to show</div>)
        const postList1 = posts1.length ? (
          posts1.map(post => {

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
              <div>{(post._id==this.state.id)?postList1:postList2}</div>
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
export default connect(mapdata)(imgs)
