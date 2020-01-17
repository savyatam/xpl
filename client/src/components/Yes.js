import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
class Yes extends Component {
  state = {
    posts: []
  }

  componentDidMount(){
    axios.get('/uses',tokenConfig())
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
    //console.log(posts);
    localStorage.token=this.props.post
    console.log(this.props.post)
    const { posts } = this.state
    const postList = posts.length ? (
      posts.map(post => {

      //console.log(axios.defaults);
        return (
          <div className="post card" key={post.id}>
            <div className="card-content">
              <span className="card-title">{post.title}</span>
              <p>User:{post.email}</p>
            </div>
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
const mapdata=(state)=>{
  return{post:state.post}
}
export default connect(mapdata)(Yes)
