
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
        <input className='input-create' type="text" placeholder='Movement' />
        <label>Movement</label>
        <input className='input-create' type="text" placeholder='Material' />
        <label>Material</label>
        <textarea className="description" type="text" placeholder='Description...' onChange={(e) => {inputDesc(e.target.value)}} />
        <label>Description</label>

        {/**
         * Adding the other sections (TESTING)
         */
         }
        <label>Condtion</label>
        <select>
        <option value="1">--Condition of Watch--</option>
        <option value="2">Brand New</option>
        <option value="2">Used: Like New</option>
        <option value="used">Used</option>
        </select>
        <label>Included</label>
        <select>
        <option value="1">--Box/Papers--</option>
        <option value="2">Box and Papers</option>
        <option value="2">Box</option>
        <option value="2">Papers</option>
        <option value="used">None</option>
        </select>
        {/**add image function */}
        <PostImage inputImagesUid={inputImagesUid} inputImages={inputImages}/>
        <button onClick={() => {createPost()}}type="submit" className="btn-post">Submit</button>
      
    </div>
  )

}

export default Post;