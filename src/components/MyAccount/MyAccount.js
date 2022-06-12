import React, {useState, useEffect } from 'react'
import MyAccountNav from './Navbar/MyAccountNav';
import './Navbar/MyAccountNav.css';
function MyAccount() {

  return (
    <div>
      <div className="my-account-navbar" style={{display:'flex', flexDirection:'row', justifyContent:'center', backgroundColor:'white'}}>
        <p style={{color:'white',display:'flex',justifyContent:'start'}}>Account</p>
        <MyAccountNav />
      </div>
      <h1>Below nav</h1>
    </div>
  )
}

export default MyAccount