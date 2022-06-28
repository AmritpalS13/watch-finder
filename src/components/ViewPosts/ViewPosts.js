import React, { useState, useEffect } from 'react'
import { CardGroup, Container, Row, Col, Accordion } from 'react-bootstrap';
import { auth, db, storage } from '../../firebase-config';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DisplayCard from '../DisplayCard/DisplayCard';
import SearchPosts from './SearchPosts';
import TestCard from '../../TestCard';
import ViewListing from '../ViewListing/ViewListing';

import './ViewPosts.css';
//We need to pull the data, from the database.
function ViewPosts() {
    //Here's where we load in the data.

    const imageListRef = ref(storage, "images/");
    
    const [comments, setComments] = useState(null);
    
    const [posts, setPosts] = useState([]);
    const postCollectionRef = collection(db, "posts");
    const [search, setSearch] = useState("");

    const [postId, setPostId] = useState("");
    //Testing the likes method.
    const [likes, setLikes] = useState([]);// the things the user liked.
    //Should contain an array of objects -> (posts -> post)



    const [currentUser, setCurrentUser] = useState(null);
    

    const [testPost, setTestPost] = useState([])//Object, of a post containg the comments.
    //When the user wants to view a specific post.
    const viewPost = (id) => {
        window.location.pathname= id;
    }

    // The following is loading the page when it get's clicked.
    useEffect(() => {
        const testGetPostData = async () => {
            const testPostData = await getDocs(postCollectionRef);
            //Pull the comments collection,
            testPostData.docs.map((doc) => {
                
                var temp = testPost;
                var tempPost = {
                    comments: collection(db, "posts", `${doc.id}`, 'comments'), // this will contain a refernce to the collection.
                    post: doc.data(),//Object containg all the data for the post
                }
                
                temp.push(tempPost);
                setTestPost(temp);
            })

        }
        const getPostData = async () => {
            const data = await getDocs(postCollectionRef);
            //Appending the data to the posts state
            setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id, comments: collection(db, "posts", `${doc.id}`, "comments")})));
        }
        //We should also read in the liked posts for the user!
        getPostData();

        //The following is testing how we will manage the new post methods.
        testGetPostData();
    }, [])
    
    return (
        
        

          
        <div className="viewlisting-bg">
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
                    comments={post.comments}
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