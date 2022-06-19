import React from 'react'
import { Button, Container } from 'react-bootstrap';
import './Header.css';
import logo from './WFT_logo.PNG';

function Header() {

  const forceDirect = () => {
    window.location.pathname='/login';
  }
  return (
      <div>
    <Container fluid className="hero">
        {/* <h1>Watch Finder Toronto</h1>
        <h6>Buy and sell used watches</h6> */}
        <img src={logo} />
        <div className='btn-field'>
            <button className='btn-view' onClick={() => window.location.pathname="viewposts"}>View</button>
            <button className='btn-create-post' onClick={() => {window.location.pathname="createpost"}}>Create Posting</button>            
        </div>
        <h1></h1>
    </Container>
    <Container fluid className="about">
        

    </Container>
    </div>
  )
}

export default Header