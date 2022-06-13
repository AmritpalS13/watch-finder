import React, {useEffect, useState} from 'react'

import {auth, db, storage } from '../../../firebase-config';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'; 
import DisplayCard from '../../DisplayCard/DisplayCard';



function SavedPosts() {
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikesPosts] = useState([]);

    const postCollectionRef = collection(db, "posts");
    const likedPostColletionRef = collection(db, "liked-posts");
    

    useEffect(() => {
        const getPostData = async () => {
            const data = await getDocs(postCollectionRef);
            data.docs.map((doc) => {
                // console.log(doc.id);
            })
            setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        const getLikedPostData = async () => {
            const likeData = await getDocs(likedPostColletionRef);
            // setLikesPosts(likeData.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getLikedPostData();
        getPostData();
        

    }, [])
    useEffect(() => {
        const getLikedPostData = async () => {
            const likeData = await getDocs(likedPostColletionRef);
            likeData.docs.map((doc) => {
                if(doc.id === auth.currentUser.uid) {
                    console.log(doc.data().likes);
                    // doc.data().likes.map( (likeId) => {
                    //     posts.map((post) => {
                    //         if(post.id === likeId) {
                    //             setLikesPosts((prev) => [...prev, post]);
                    //             console.log(post);
                    //         }
                    //     })
                    // })
                    setLikesPosts(doc.data().likes);
                    
                }
            })
            // setLikesPosts(likeData.docs.map((doc) => ({...doc.data(), id: doc.id})));

        }
        getLikedPostData();
        
    }, []);
    console.log(likedPosts);
    return (
        <div>
            {likedPosts.map((like) => {
                return(
                    <div>
                        {posts.map((post) => {
                            if(post.id === like) {
                                return (
                                    <DisplayCard
                                    postId={post.id}
                                   
                                    imagesUid={post.imagesUid} 
                                    model={post.model} 
                                    name={post.name} 
                                    price={post.price} 
                                    desc={post.desc} 
                                    authorEmail={post.author.email}
                                    />
                                )
                            }
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default SavedPosts