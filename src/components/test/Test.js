import React from 'react'

import './Test.css'
function Test() {
  return (
    <div class="container">
  <div class="left">
    <div class="header">
      <h2 class="animation a1">Welcome Back</h2>
      <h4 class="animation a2">Log in to your account using email and password</h4>
    </div>
    <div class="form">
      <input type="email" class="form-field animation a3" placeholder="Email Address" />
      <input type="password" class="form-field animation a4" placeholder="Password" />
      <p class="animation a5"><a href="#">Forgot Password</a></p>
      <button class="animation a6">LOGIN</button>
    </div>
  </div>
  <div class="right"></div>
</div>

  
  )
}

export default Test