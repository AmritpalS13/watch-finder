
import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase-config';
function ExistingUser( { login } ) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    // <Form>
    // <Form.Group className="mb-3" controlId="email">
    // <h5>Login Below</h5>
    // <Form.Label>Email address</Form.Label>
    // <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
    // <Form.Text className="text-muted">
    // We'll never share your email with anyone else.
    // </Form.Text>
    // </Form.Group>
    // <Form.Group className="mb-3" controlId="password" onChange={(e) => setPassword(e.target.value)}>
    // <Form.Label>Password</Form.Label>
    // <Form.Control type="password" placeholder="Password" />
    // </Form.Group>
    // <Button onClick={() => {login(email, password)}}variant="primary" type="submit">
    // Submit
    // </Button>
    // </Form>
    <div className='login-container'>
      <h6>Login below</h6>
      <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
      <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
      <button className='google-button' onClick={() => {login(email, password)}}>Login</button>
    </div>
  )
}

export default ExistingUser;