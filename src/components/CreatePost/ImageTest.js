import React, { useState, useEffect } from 'react'
import { storage, auth } from '../../firebase-config';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';

function ImageTest() {
    //Allows the user to upload an image
    const [imageUpload, setImageUpload] = useState(null);


    const [imageList, setImageList] = useState([]);
    const imageListRef = ref(storage, "images/");

    //User uploads the image.
    const uploadImage = () => {
        if(imageUpload == null) {
            return;
        }
        //uploads the image to the Firebase Storage, and the directeroy is /images
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        //Allows for the auto refresh once an image is uploaded.
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            //This will get the URL, for where the image is stored and this can be passed directly into the <img src={url} />
            getDownloadURL(snapshot.ref).then( (url) => {
                //How we append an image directly to the end of the array.
                setImageList((prev) => [...prev, url])
            });
            
        })
    }
    //The following method is not needed, for the use of this function.
    // useEffect(() => {
    //     listAll(imageListRef).then((response) => {
    //         response.items.map( (item) => {
    //             getDownloadURL(item).then((url) => {
    //                 //Adding to the end of the list.
    //                 setImageList((prev) => [...prev, url]);
    //             })
    //         })
    //     });
    // }, [])
  return (
    <div>
        <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
        <button onClick={uploadImage}>Upload Image</button>
        {imageList.map( (url) => {
            return(
                <img src={url} />
            )
        })}
    </div>
  )
}

export default ImageTest