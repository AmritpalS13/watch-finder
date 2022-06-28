
import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase-config';
function ExistingUser( { login } ) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    <div className='login-container'>
      <h6 className='existing-header'>Login below</h6>
      <input style={{padding:'10px'}} className="existing-input" type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
      <input  style={{padding:'10px'}} className="existing-input" type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
      <br />
      <button className='existing-btn' onClick={() => {login(email, password)}}>Login</button>
    </div>
  )
}

export default ExistingUser;