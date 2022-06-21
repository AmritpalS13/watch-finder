import React, { useEffect, useState } from 'react'
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../../firebase-config';
import { connectStorageEmulator } from 'firebase/storage';
import DisplayCard from '../../DisplayCard/DisplayCard';
import MyAccountNav from '../Navbar/MyAccountNav';

import { Container } from 'react-bootstrap';

import './MyPosts.css';

function MyPosts() {
    //We will load in posts here.
    const [posts, setPosts] = useState([]);
    //These will contain all the posts made by the user.
    const [myPosts, setMyPosts] = useState([]);

    //A reference to that collection containing the "posts(all of them)"
    const postCollectionRef = collection(db, "posts");

    const addLikedPosts = () => {
        posts.map( (post) => {
            if(post.author.id === auth.currentUser.uid) {
                setMyPosts((prev) => [...prev, post]);
            } else {
                console.log("nothing founfdgdfgd");
            }
        })
    }
    useEffect(() => {
        const getPostData = async () => {
            const data = await getDocs(postCollectionRef);//recieve all the post data.
            setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));//Including the doc.id
        }
        getPostData();
        // addLikedPosts();   
    }, [])
    
    const deletePost = async (id, imagesUid) => {
        //we should also delete the images associated with the post.
        const imagesRef = ref(storage, `images/${imagesUid}/`);
        deleteObject(imagesRef).then(() =>{
            console.log("images deleted");
        }).catch((error) => {
            console.log(error);
        })
        const documentDoc = doc(db, "posts", id);
        await deleteDoc(documentDoc);
        alert("Post Deleted");
    }
    return (
        <div>
            <Container>
            <h6 className="my-posts-header" style={{display:'flex',justifyContent:'center'}}>My Posts</h6>
            <div>
            {posts.map((post) => {
                if(post.author.id == auth.currentUser.uid) {
                    return (
                    <div>
                    <DisplayCard
                    postId={post.id}
                    imagesUid={post.imagesUid} 
                    model={post.model} 
                    name={post.name} 
                    price={post.price} 
                    desc={post.desc} 
                    authorEmail={post.author.email}
                    deletePost={deletePost}
                    />
                    </div>
                    )
                }
            })}
            </div>
            </Container>
        </div>
    )
}

export default MyPosts