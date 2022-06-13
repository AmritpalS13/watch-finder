import React from 'react'
import './MyAccountNav.css'

function MyAccountNav() {
  return (
    <div className='my-account-nav-container'>
        <button className='my-account-btn' onClick={() => window.location.pathname="/myaccount"}>SAVED POSTS</button>
        <button className='my-account-btn' onClick={() => window.location.pathname="/myaccount/myposts"}>MY POSTS</button>
        <button className='my-account-btn'>SALES</button>
    </div>
  )
}

export default MyAccountNav