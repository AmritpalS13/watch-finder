
import React from 'react'
import PostImage from './PostImage'

import './CreatePost.css';
function Post({ inputModel, inputName, inputRef, inputPrice, inputDesc, createPost, inputImagesUid, inputImages }) {
  
  
  return (
    <div className='post-container'>
        <h6 style={{color:'white',fontSize:'24px'}}>Create a Posting!</h6>
        <input className="input-create" type="text" placeholder='Model' onChange={(e) => {inputModel(e.target.value)}}/>
        <label>Model </label>
        <input className="input-create" type="text" placeholder='Name'onChange={(e) => {inputName(e.target.value)}}/>
        <label>Name </label>
        <input className="input-create" type="text" placeholder='Refence'onChange={(e) => {inputRef(e.target.value)}}/>
        <label>Reference </label>
        <input className="input-create" type="number" placeholder='$ Price'onChange={(e) => {inputPrice(e.target.value)}}/>
        <label>Price</label>
        <textarea className="description" type="text" placeholder='Description...' onChange={(e) => {inputDesc(e.target.value)}} />
        <label>Description</label>
       
        {/**add image function */}
        <PostImage inputImagesUid={inputImagesUid} inputImages={inputImages}/>
        <button onClick={() => {createPost()}}type="submit" className="btn-post">Submit</button>
      
    </div>
  )

}

export default Post;