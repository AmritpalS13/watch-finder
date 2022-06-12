import React, { useState, useEffect } from 'react'
import { storage, auth } from '../../firebase-config';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';

const PostImage = ({ inputImagesUid, inputImages }) => {
    // const [imageUpload, setImageUpload] = useState(null);
    const [imagePath, setImagePath] = useState("");

    //All the images the user want's associated with the post.
    const [imageList, setImageList] = useState([]);
    
    // const images = [];
    // const uploadImage = () => {
    //     if(imageUpload == null) {
    //         return;
    //     }
    //     //const imageRef = ref(storage, `post-images/${}`)
    // }
    

    return (
        <div>
            {/**Now the images are going straight to the parent component, and uploads are handled there. */}
            <input multiple type="file" name="image" onChange={(event) => {inputImagesUid(v4()); inputImages(event.target.files);}}/>
            <button type="submit">Submit Images</button>
        </div>
    )
} 
    
export default PostImage;