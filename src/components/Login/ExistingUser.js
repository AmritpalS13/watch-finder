
import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase-config';
function ExistingUser( { login } ) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    <div className='login-container'>
      <h6>Login below</h6>
      <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
      <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
      <button className='google-button' onClick={() => {login(email, password)}}>Login</button>
    </div>
  )
}

export default ExistingUser;