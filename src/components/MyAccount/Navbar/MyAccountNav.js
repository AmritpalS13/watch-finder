import React from 'react'
import './MyAccountNav.css'

function MyAccountNav() {
  return (
    <div className='my-account-nav-container'>
        <button className='my-account-btn'>SAVED POSTS</button>
        <button className='my-account-btn'>MY POSTS</button>
        <button className='my-account-btn'>SALES</button>
    </div>
  )
}

export default MyAccountNav