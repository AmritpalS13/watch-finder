import React, { useState } from 'react'
import {Container, Navbar } from 'react-bootstrap';
import MyAccountTest from './MyAccountTest';
import './Navbar.css';
import image from './WFT_logo.PNG';
function NavbarTop({ auth, signUserOut, isUserNull, setIsAuth }) {
  
  
  const logo = "<WFT />";
  var noUser = false;
  if(isUserNull === null) {
    noUser = true;
  } else {
    setIsAuth(true);
  }
  return (
  <Navbar className='nav'>
  <Container>
    <button className="btn-navbar"onClick={() => window.location.pathname="/"}>
    Watch-Finder-Toronto
    </button>
    {/* <button className='btn-navbar-home' onClick={() => window.location.pathname="/"}>Watch Finder Toronto</button> */}
    {noUser ? ( <button className='btn-navbar' onClick={() => {window.location.pathname="login"}}>LOGIN</button>) : <></>}
    

    {noUser ? ( <button onClick={() => window.location.pathname="createaccount"}className='btn-navbar'>CREATE ACCOUNT</button>) : <></>}
    
    {!noUser ? (<button className='btn-navbar' onClick={() => {window.location.pathname="createpost"}}>CREATE POST</button>) : <></>}
    <button className='btn-navbar' onClick={() => window.location.pathname="viewposts"}>VIEW POSTS</button>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
    {!noUser ? (<button className='btn-navbar' onClick={signUserOut}>LOGOUT</button>) : <></>}
    {/* {!noUser ? (<button className='btn-navbar' style={{marginRight:'32px'}} onClick={() => {window.location.pathname="myaccount"}}>MY ACCOUNT</button>) : <></>} */}
     {!noUser ? (<MyAccountTest />) : <></>}
     <Navbar.Text>
        Signed in as: {!noUser ? (<p style={{color:'white'}}>{auth.currentUser.email}</p>) : <p>no user</p>}
      </Navbar.Text>

    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default NavbarTop;