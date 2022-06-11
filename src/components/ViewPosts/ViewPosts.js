import React, { useState, useEffect } from 'react'

import { auth, db, storage } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

import DisplayCard from '../DisplayCard/DisplayCard';

//We need to pull the data, from the database.
function ViewPosts() {

    const imageListRef = ref(storage, "images/");
    const image = ref(storage, 'images/636a258f-b0df-4664-aa5b-539129a988cb.png');
    
    const [posts, setPosts] = useState([]);
    const postCollectionRef = collection(db, "posts");

    const test = {
        model: 'Seiko',
        name: 'Tank',
        price: 300,
    }
    

    //The following is loading the page when it get's clicked.
    // useEffect(() => {
    //     const getPostData = async () => {
    //         const data = await getDocs(postCollectionRef);
    //         //Appending the data to the posts state
    //         setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    //     }
    //     getPostData();
    // }, [])
    
    return (
        <div>   
            <DisplayCard model={test.model} name={test.name} price={test.price}/>
        </div>
    )
}

export default ViewPosts