import React, { Component } from 'react'
import axios from 'axios'

class Yes extends Component {
  state = {
    posts: []
  }
  componentDidMount(){
    axios.get('/yes')
    .then(res => {
      console.log(res.data);
      this.setState({
        posts: res.data
      });
    })
    //console.log(state);
  }
  render(){
    //console.log(posts);
    const { posts } = this.state
    const postList = posts.length ? (
      posts.map(post => {
        return (
          <div className="post card" key={post.id}>
            <div className="card-content">
              <span className="card-title">{post.title}</span>
              <p>{post.username}</p>
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
          <h4 className="center">Home</h4>
          {postList}
        </div>
      </div>
    )
  }
}

export default Yes
