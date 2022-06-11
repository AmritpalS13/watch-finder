
import React from 'react'
import PostImage from './PostImage'


function Post({ inputModel, inputName, inputRef, inputPrice, inputDesc, createPost, inputImagesUid, inputImages }) {
  
  
  return (
    <div className='post-container'>
      
        <h6 style={{color:'#790b0c',borderBottom:'5px solid', borderColor:'#790b0c'}}>Create a Posting!</h6>
        <input type="text" placeholder='Model' onChange={(e) => {inputModel(e.target.value)}}/>
        <label>Model </label>
        <input type="text" placeholder='Name'onChange={(e) => {inputName(e.target.value)}}/>
        <label>Name </label>
        <input type="text" placeholder='Refence'onChange={(e) => {inputRef(e.target.value)}}/>
        <label>Reference </label>
        <input type="number" placeholder='$ Price'onChange={(e) => {inputPrice(e.target.value)}}/>
        <label>Price</label>
        {/**add image function */}
        <PostImage inputImagesUid={inputImagesUid} inputImages={inputImages}/>
        <button onClick={() => {createPost()}}type="submit" className="btn-post">Submit</button>
      
    </div>
  )

}

export default Post;