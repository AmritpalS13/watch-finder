import React, { useState } from 'react'
import {Container, Navbar, Nav, Button} from 'react-bootstrap';
import { auth } from '../../firebase-config';
import './Navbar.css';
function NavbarTop({ auth, isAuth, signUserOut, isUserNull, setIsAuth }) {
  console.log(auth);
  var noUser = false;
  if(isUserNull === null) {
    noUser = true;
  } else {
    setIsAuth(true);
  }
  return (
  <Navbar>
  <Container>
    <Navbar.Brand onClick={() => window.location.pathname="/"}>Watch Finder Toronto</Navbar.Brand>
    <button className='btn-navbar' onClick={signUserOut}>Logout</button>
    <button className='btn-navbar' onClick={() => {window.location.pathname="login"}}>Login</button>
    <button className='btn-navbar' onClick={() => {window.location.pathname="createpost"}}>Create Post</button>
    <button className='btn-navbar' >View Posts</button>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
    <button className='btn-navbar' >My Account</button>
      <Navbar.Text>
        Signed in as: <a>{!noUser ? (<p>{auth.currentUser.email}</p>) : <p>no user</p>}</a>
      </Navbar.Text>

    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default NavbarTop;