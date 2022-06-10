
import React from 'react'


function Post({ inputModel, inputName, inputRef, inputPrice, inputDesc, createPost }) {
  return (
    <div className='post-container'>
        <h6 style={{color:'#2f415d',borderBottom:'5px solid', borderColor:'#2f415d'}}>Create a Posting!</h6>
        <input type="text" placeholder='Model' onChange={(e) => {inputModel(e.target.value)}}/>
        <label>Model </label>
        <input type="text" placeholder='Name'onChange={(e) => {inputName(e.target.value)}}/>
        <label>Name </label>
        <input type="text" placeholder='Refence'onChange={(e) => {inputRef(e.target.value)}}/>
        <label>Reference </label>
        <input type="number" placeholder='$ Price'onChange={(e) => {inputPrice(e.target.value)}}/>
        <label>Price</label>
        <button className="btn-post">Submit</button>
    </div>
  )

}

export default Post;