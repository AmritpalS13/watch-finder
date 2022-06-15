import React, {useState, useEffect } from 'react'
import MyPosts from './MyPosts/MyPosts';
import MyAccountNav from './Navbar/MyAccountNav';
import './Navbar/MyAccountNav.css';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SavedPosts from './SavesPosts/SavedPosts';

//WHen user goes on my account show theh user's posts.
function MyAccount() {
  return (
    <div>
      <div className="my-account-navbar" style={{display:'flex', flexDirection:'row', justifyContent:'center', backgroundColor:'white'}}>
        <p style={{color:'white',display:'flex',justifyContent:'start'}}>Account</p>
        <MyAccountNav />
      </div>
      <MyPosts />
      
    </div>
  )
}

export default MyAccount