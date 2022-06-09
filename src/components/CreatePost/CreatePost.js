import React, { useState } from 'react'
import Contaienr, { Container } from 'react-bootstrap';
import InputField from './InputField';




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
          />
        </div>
      </Container>
    )
}

export default CreatePost