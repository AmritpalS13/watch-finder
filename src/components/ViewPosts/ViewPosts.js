import React, { useState, useEffect } from 'react'
import { CardGroup } from 'react-bootstrap';
import { auth, db, storage } from '../../firebase-config';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DisplayCard from '../DisplayCard/DisplayCard';
import SearchPosts from './SearchPosts';
import TestCard from '../../TestCard';
import ViewListing from '../ViewListing/ViewListing';

//We need to pull the data, from the database.
function ViewPosts() {

    const imageListRef = ref(storage, "images/");
    
    
    const [posts, setPosts] = useState([]);
    const postCollectionRef = collection(db, "posts");
    const [search, setSearch] = useState("");

    const [postId, setPostId] = useState("");
    //Testing the likes method.
    const [likes, setLikes] = useState([]);// the things the user liked.
    //Should contain an array of objects -> (posts -> post)



    const [currentUser, setCurrentUser] = useState(null);
    
    //When the user wants to view a specific post.
    const viewPost = (id) => {
        window.location.pathname= id;
    }

    // The following is loading the page when it get's clicked.
    useEffect(() => {
        const getPostData = async () => {
            const data = await getDocs(postCollectionRef);
            //Appending the data to the posts state
            setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        //We should also read in the liked posts for the user!
        getPostData();
    }, [])
    
    return (
        <div>
            <div className="search-section" style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <SearchPosts setSearch={setSearch}/>
            </div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <CardGroup>
               
        {
            posts.map( (post) => {
                return (
                    <>
                    <DisplayCard
                    post={post}
                    postId={post.id}
                    viewPost={viewPost}
                    imagesUid={post.imagesUid} 
                    model={post.model} 
                    name={post.name} 
                    price={post.price} 
                    desc={post.desc} 
                    authorEmail={post.author.email}
                    />
                    </>
                )
            })
        }
            </CardGroup>
            </div>
                <Routes>
                    <Route path="/viewlisting" element={<ViewListing posts={posts} id={postId} />} />
                </Routes>
        </div>
    )
}

export default ViewPosts