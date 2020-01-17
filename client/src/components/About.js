import React, { Component } from 'react'
import {connect} from 'react-redux'
class About extends Component {
  render(){console.log(this.props.post)
  return (
    <div>
      <div className="container">
        <h4 className="center">Home</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repudiandae repellat illo magni eligendi cupiditate voluptates eius nam voluptate. Incidunt nihil ullam quae quia officia quaerat, deserunt eligendi explicabo totam?</p>
      </div>
    </div>
  )}
}
const mapdata=(state)=>{
  return{post:state.post}
}
export default connect(mapdata)(About)
