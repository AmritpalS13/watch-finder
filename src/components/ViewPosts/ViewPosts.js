import React, { useState, useEffect } from 'react'
import { CardGroup } from 'react-bootstrap';
import { auth, db, storage } from '../../firebase-config';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

import DisplayCard from '../DisplayCard/DisplayCard';
import SearchPosts from './SearchPosts';
import TestCard from '../../TestCard';

//We need to pull the data, from the database.
function ViewPosts() {

    const imageListRef = ref(storage, "images/");
    
    
    const [posts, setPosts] = useState([]);
    const postCollectionRef = collection(db, "posts");
    const [search, setSearch] = useState("");

    //Testing the likes method.
    const[likes, setLikes] = useState([]);
    const [testLikes, setTestLikes] = useState([]); 
    const likedPostsCollection = collection(db, "liked-posts");

    const [currentUser, setCurrentUser] = useState(null);
    

    // The following is loading the page when it get's clicked.
    useEffect(() => {
        const getPostData = async () => {
            const data = await getDocs(postCollectionRef);
            //Appending the data to the posts state
            setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getPostData();
    }, [])
    const addLike = async (id) => {
        //This will append the posts that the user likes
        // setLikes((prev) => [...prev, id]);
        // await setDoc(doc(likedPostsCollection, auth.currentUser.uid),{
        //     likes: likes,
        // });
        posts.map(async (post) => {
            if(post.id == id) {
                setLikes((prev) => [...prev, post]);
                await setDoc(doc(likedPostsCollection, auth.currentUser.uid), {
                    likes: likes
                });
                console.log(likes)
            }
        })
        
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
                    addLike={addLike} 
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