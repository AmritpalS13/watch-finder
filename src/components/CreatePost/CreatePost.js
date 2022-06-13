import React, { useState } from 'react'

import { db, auth, storage } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
//Following will be used for the storage of the images.
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';


import './CreatePost.css';
import Post from './Post';

import { v4 } from 'uuid';

function CreatePost() {
    //Watch Model/Brand
    const [model, setModel] = useState("");//Very important for finding specific brands.
    //Watch name
    const [name, setName] = useState("");
    //Watch ref, if available,
    const [watchRef, setRef] = useState("");
    //Watch price
    const [price, setPrice] = useState("");
    //Description
    const [desc, setDesc] = useState("");

    //user uploades images of the watches.
    const [images, setImages] = useState([]);
    const [imageUpload, setImageUpload] = useState(null);
    const [imagesUid, setImagesUid] = useState("");

    const postCollectionRef = collection(db, "posts");//reference specidic collection;
    const imageListRef = ref(storage, "images/");

    const inputModel = (input) => {
      setModel(input);
    }
    const inputName = (input) => {
      setName(input);
    }
    const inputRef = (input) => {
      setRef(input);
    }
    const inputPrice = (input) => {
      setPrice(input);
    }
    const inputDesc = (input) => {
      setDesc(input);
    }

    const inputImages = (input) => {
      setImageUpload(input);//Revice the files data.
    }
    const inputImagesUid = (input) => {
      setImagesUid(input);
    }

    const uploadImage = () => {
      if(imageUpload == null) {
        return;
      }
      
      //Map function was not working.
      for(var i = 0; i < imageUpload.length; ++i) {
        const imageRef = ref(storage, `images/${imagesUid}/${imageUpload[i].name + v4()}`);
        uploadBytes(imageRef, imageUpload[i]).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImages((prev) => [...prev, url]);
          })
        })
      }
    }

    //WIll have to mvoe the image upload to the database here.
    // const uploadImage = () => {
    //   if(imageUpload == null) {
    //     return;
    //   }
    //   const imageRef = ref(storage, `images/${imagesUid}`);
    //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
    //     getDownloadURL(snapshot.ref).then((url) => {
    //       setImages((prev) => [...prev, url]);
    //     })
    //   })

    // }
    
    const createPost = async () => {
      //Will first upload the images to the database
      uploadImage();
      await addDoc(postCollectionRef, {
        model,
        name,
        watchRef,
        price,
        desc,
        imagesUid,
        images,//Image list.
        author: {
          email: auth.currentUser.email,
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        }
      })
      alert("Post Created!");
    }
    //The post will be isgned the imagesUid, to help with the storage location

    return (
      <div className='create-post-container'>
        <div  className='create-post-section'>
          <Post 
            inputModel={inputModel} 
            inputName={inputName} 
            inputRef={inputRef} 
            inputPrice={inputPrice} 
            inputDesc={inputDesc}
            inputImagesUid={inputImagesUid}
            inputImages={inputImages}
            createPost={createPost}
          />
        </div>
      </div>

    )
}

export default CreatePost