import React from 'react';
import '../../styles/header.css';
import { Link } from 'react-router';

function Header() {
  return (
    <div className='header container'>
        <div className='title'></div>
        <div className='container'>
          <Link to="/">
            <p className='item'>HOME</p>
          </Link>
          <p className='item'>ABOUT</p>
          <p className="item">GITHUB</p>
        </div>
        <div className="container">
          <Link to="/login">
            <button className='login button'>LOGIN</button>
          </Link>
          <Link to="/signup">
            <button className = 'button'>SIGN UP</button>
          </Link>
        </div>
    </div>
  )
}

export default Header