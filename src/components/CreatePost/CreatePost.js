import React, { useState } from 'react'
import Contaienr, { Container } from 'react-bootstrap';
import InputField from './InputField';
import { db, auth } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';

import ImageTest from './ImageTest';

function CreatePost() {
    //Watch Model/Brand
    const [model, setModel] = useState("");//Very important for finding specific brands.
    //Watch name
    const [name, setName] = useState("");
    //Watch ref, if available,
    const [ref, setRef] = useState("");
    //Watch price
    const [price, setPrice] = useState("");
    //Description
    const [desc, setDesc] = useState("");

    //user uploades images of the watches.
    const [images, setImages] = useState([]);

    const postCollectionRef = collection(db, "posts");//reference specidic collection;
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

    const createPost = async () => {
      await addDoc(postCollectionRef, {
        model,
        name,
        ref,
        price,
        desc,
        images,//Image list.
        author: {
          email: auth.currentUser.email,
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        }
      })
    }
    return (
      <Container>
        <div className='create-post-header'>
          <h6>{model}</h6>
        </div>
        <div className='input-form'>
          <InputField 
            inputModel={inputModel}
            inputName={inputName}
            inputRef={inputRef}
            inputPrice={inputPrice}
            inputDesc={inputDesc}
            createPost={createPost}
          />
        </div>
        <ImageTest />
      </Container>
    )
}

export default CreatePost