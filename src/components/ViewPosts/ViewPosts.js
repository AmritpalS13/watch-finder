import React, { useState, useEffect } from 'react'
import { CardGroup } from 'react-bootstrap';
import { auth, db, storage } from '../../firebase-config';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

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

    //Testing the likes method.
    const [likes, setLikes] = useState([]);// the things the user liked.
    //Should contain an array of objects -> (posts -> post)
    const likesRef = collection(db, "liked-posts");


    const [currentUser, setCurrentUser] = useState(null);
    

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

    const viewPost = (id) => {
        //Change the route path, here.\
        window.location.pathname = "viewlisting";
        console.log("ID of the post: ", id);
    }
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
                    <DisplayCard
                    postId={post.id}
                    viewPost={viewPost}
                    imagesUid={post.imagesUid} 
                    model={post.model} 
                    name={post.name} 
                    price={post.price} 
                    desc={post.desc} 
                    authorEmail={post.author.email}
                    />
                )
            })
        }
            </CardGroup>
            </div>
        </div>
    )
}

export default ViewPosts