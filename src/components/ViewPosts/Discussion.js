

import { collection, getDoc, getDocs, addDoc, waitForPendingWrites } from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import { db, auth } from '../../firebase-config'
import { Row, Col } from 'react-bootstrap';

import './Discussion.css';
function Discussion() {
    const [comment, setComment] = useState([]);
    const [user, setUser] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [newComment, setNewComment] = useState("");
    const discussionRef = collection(db, "discussion");
    const userRef = collection(db, "users");

    const setAddComment = (data) => {
        var temp = comment;
        temp.push(data);
        setComment(temp);
    }
    const addNewComment = () => {
        
        console.log("Comment being added by :", auth.currentUser.email);
        const addComment = async () => {
          await addDoc(discussionRef, {
            comment: newComment,
            author: user,
            time: new Date().getTime(), // this will be used to determine which comment came first.
          });
        }
        //Let's try and get some data about the person who is commenting;
        addComment();
        setRefresh(!refresh);
        console.log("Comment has been added!");
    }
    useEffect(() => {
        
        const getData = async () => {
            const data = await getDocs(discussionRef);
            data.docs.map((doc) => {
                setAddComment(doc.data());
            });
        }
        const getUsers = async () => {
            const userData = await getDocs(userRef);
            userData.docs.map((doc) => {
              
              if(doc.data().userId === auth.currentUser.uid) {
                setUser(doc.data());
              }
            })
        }
        getData();
        getUsers();
        
    }, [refresh]);
    const testFunc = (com) => {
        console.log(com.author.userId);
        window.location.pathname= com.author.userId;

    }
    return (
        <>
            <h1 className='dis-header'>Discussion</h1>
            <input className="dis-input" type="text" placeholder='comment...' onChange={(e) => setNewComment(e.target.value)}/> 
            <button className="dis-btn" onClick={() => addNewComment()}>Add</button>
            <div className="discussion-container">
                <div >
                {
                    comment.map((com) => {
                        return (
                            <div className='comment-container'>
                                <Row>
                                    <Col xs={3}>
                                    <img className='image-dis' src={com.author.profilePicture}/>
                                    <button className='image-profile-btn' onClick={() => testFunc(com)}>Profile</button>
                                    </Col>
                                    <Col xs={9}>
                                    <div className='com-container'>
                                        <h6 className='com-header' >{com.author.userName}</h6>
                                        <p className="com-comment" >{com.comment}</p>
                                    </div>
                        
                                    </Col>
                                </Row>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </>
    )


}

export default Discussion