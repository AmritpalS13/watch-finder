import React from 'react'
import { Button, Container } from 'react-bootstrap';
import './Header.css';

function Header() {

  const forceDirect = () => {
    window.location.pathname='/login';
  }
  return (
      <div>
    <Container fluid className="hero">
        <h1>Watch Finder Toronto</h1>
        <h6>Buy and sell used watches</h6>
        <div className='btn-field'>
            <button onClick={() => {window.location.pathname="/login"}} className='btn-login'>Login</button>
            <button className='btn-view'>View</button>
            <button className='btn-create-post'>Create Posting</button>            
        </div>
        <h1></h1>
    </Container>
    <Container fluid className="about">
        <h3 style={{fontSize: '72px'}}>About Us</h3>
        <p>The website is built for face to face (f2f) watch purchases
          Be it used or new list your watch here along with 
          the details
        </p>
    </Container>
    </div>
  )
}

export default Header