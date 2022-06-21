import React from 'react'
import './SearchPost.css';

function SearchPosts({ setSearch }) {
  return (
    <>
        <h6 className="search-title" style={{marginTop:'40px', marginRight:'50px', color:'white'}}>Search: </h6>
        <input className="search-input" type="text" placeholder='Search...' onChange={(e) => setSearch(e.target.value)}></input>
    </>
  )
}

export default SearchPosts