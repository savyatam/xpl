import React from 'react';

const Navbar = () => {
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <ul className="right">
          <li><a href="/">Home</a></li>
          <li><a href='/login'>LOGIN</a></li>
          <li><a href='/signup'>SIGNUP</a></li>
          <li><a href='/logout'>LOGOUT</a></li>
          <li><a href='/yed'>All users</a></li>
          <li><a href='/imgs1'>View Posts</a></li>
          <li><a href='/imageup'>ImageUpload</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
