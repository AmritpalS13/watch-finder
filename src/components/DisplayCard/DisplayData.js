import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase-config';
import { Carousel, Card, Row, Col, ListGroup, ListGroupItem, Modal, Button, Form, Container, Accordion} from 'react-bootstrap';
import {ref, listAll, getDownloadURL} from 'firebase/storage';
import { storage, db } from '../../firebase-config';//importing the storage for images.
import { v4 } from 'uuid';
import './DisplayCard.css';
import './DisplayData.css';

import Comments from './Comments';
import ViewPosts from '../ViewPosts/ViewPosts';
import { addDoc, collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';

function DisplayData({ comments, post, postId, viewPost, model, name, price, desc, authorEmail, imagesUid, deletePost }) {
    //Might be usefule to associate the exact user with the post, so we can send a message to the user.
    // const [show, setShow] = useState(false);
    
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    //The following will determine if the user is logged in (Null or not Null)
    const [loggedIn, setLoggedIn] = useState(auth.currentUser);
    var log = loggedIn;// true if logged in.
    var del = false;
    //We need to find the associated images from the storage.
    const [imageList, setImageList] = useState([]);
    const imageListRef = ref(storage, `images/${imagesUid}/`);//Getting direct access to the images.

    const [postComments, setComments] = useState([]);

    const [newComment, setNewComment] = useState("");
    const [refresh, setRefresh] = useState(false);
    const addNewComment = () => {
      console.log("Comment to add : ", newComment);
      console.log("Comment being added by :", auth.currentUser.email);
      const addComment = async () => {
        await addDoc(comments, {
          comment: newComment,
          author: user,
        });
      }
      //Let's try and get some data about the person who is commenting;
      addComment();
      setRefresh(!refresh);

      console.log("Comment has been added!");
    }

    const setPostComments = (comment) => {
      var temp = postComments;
      temp.push(comment);
      setComments(temp);

    }

    const userRef = collection(db, 'users');
    useEffect(() => {
        //Finding the users,
        const getUsers = async () => {
          const userData = await getDocs(userRef);
          userData.docs.map((doc) => {
            
            if(doc.data().userId === auth.currentUser.uid) {
              setUser(doc.data());
            }
          })
        }
        getUsers();
        //We need to dig out the comments from the collection.
        const getComments = async () => {
          const commentsData = await getDocs(comments);
          commentsData.docs.map((doc) => {
            setPostComments(doc.data());
          })
        }
        getComments();
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        })
        if(loggedIn !== null) {
            log = true;
        } 
    }, [refresh])
    if(deletePost !== undefined) {
        del = true;
    } 
    return (
        <div>              
                    <>
                    <Row xs={1} md={2} className="g-4">
                        
                            <Col>
                                <Card  className="display-data-card" >
                                <Card.Title style={{fontStyle:'italic', fontSize:'12px', paddingLeft:'10px'}}>
                                    <img src={post.userData.profilePicture} className="profile-picture"/>
                                      {post.userData.userName}
                                    </Card.Title>
                                <Carousel>
      {imageList.map((image) => {
        return (
          <Carousel.Item >
            <Card.Img className="display-card-image"variant="top" src={image} />
            </Carousel.Item>
        )
      })}
      </Carousel>
                                    <Card.Body>
                                    <Card.Title className="watch-model-title">{model}</Card.Title>
                                    <Card.Title style={{fontStyle:'italic'}}>{name}</Card.Title>
                                    <Card.Title style={{fontStyle:'italic'}}>$ {price}</Card.Title>
                                    
                                    {/**
                                     * The description was removed
                                     */}
                                    </Card.Body>                                   
                                    <Card.Body>
                                    <button className='listing-btn' onClick={() => viewPost(postId)}>View Listing</button>
                                 
                                    {log && (<button className="listing-btn" onClick={() => {setShow(!show)}}>Message!</button>)}
                                    {show && (<ShowMessageSystem post={post}/>)}
                                    {del && (<button className="listing-btn" onClick={() => {deletePost(postId, imagesUid)}}>Delete</button>)}
                                    <Comments postComments={postComments} setNewComment={setNewComment} addNewComment={addNewComment}/>
                                    </Card.Body> 
                                </Card>
                            </Col>
                        
                    </Row>
                    </>
                    
        </div>      
    )
}


// const Comments = ({postComments, setNewComment, addNewComment}) => {
//   return (
//     <Accordion  style={{marginTop:'20px'}}>
//       <Accordion.Item className="main-comment-bar" eventKey="0">
//         <Accordion.Header>Comments</Accordion.Header>
//         <Accordion.Body>
//         {/* <ListGroup style={{}}className="list-group-flush">
//           {postComments.map((comment) => {
//             return (
              
              
//               <ListGroupItem className="list-card item-comment" ></ListGroupItem>
              
//             )
//           })}
//           </ListGroup> */}
//           <div>
//             {
//               postComments.map((comment) => {
//                 return (
//                   <div style={{padding:'20px',border:'2px solid white'}}>
//                     <p><img  style={{width:'50px', height:'50px', borderRadius:'50px'}}src={comment.author.profilePicture} /> {comment.author.userName}</p>
//                     <h6>{comment.comment}</h6>
//                   </div>
//                 )
//               })
//             }
//           </div>
//           <input className="comment-input" type="text" placeholder='comment...' onChange={(event) => setNewComment(event.target.value)}/>
//           <button onClick={() => addNewComment()}>Submit</button>
//         </Accordion.Body>
//       </Accordion.Item>
//     </Accordion>
//   )
// }


const ShowMessageSystem = ({post}) => {
    const [show, setShow] = useState(true);

    const [message, setMessage] = useState("");
    const [docID, setDocID] = useState("");// we will need this value
    const [convos, setConvos] = useState(null);

    const [users, setUsers] = useState([]);

    const [user, setUser] = useState(null);
    //Reciever will always be the author of the post.
    //sender will always be determined by auth, that is the user that is logged in.
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [currentUser, setCurrentUser] = useState(null);//This will be the currently logged in user. We will need this as we will write to the db
    const usersRef = collection(db, "users");

    //get the reference to the DB,
    const messageRef = collection(db, "messaging-system");

    //The following will check if a conversation already exists.
    //We need to also update the comments collection here.
    
    const sendMess = async () => {
      
      

      //We want to push the message-system ID into the array.
      
      //The message is being sent, we can store it in the sub collection for the user that posted the ad.
      var uniqueID = v4();
      //This doc, will contain the information we need.
      await addDoc(messageRef, {
        convoExists: true,
        messages: message,
        postId: post.id,
        reciever: post.author.id,
        sender: auth.currentUser.uid,
        messageID: uniqueID,
      });
      //The messageID is how we will link the reciver and sender.
      //Now we should append that messageID, or the UniqueID to the user.
      var tempArray = user.messages;
      tempArray.push(uniqueID);
      //Now we want to update that field in the user's DOC,
      //We're gonna wana auto generate, so we can link it to a chat system.
      const userRef = doc(db, "users", post.author.id);
      const updateUserMessagesArray = async () => {
        await updateDoc(userRef, {
          messages: tempArray,
        })
      }
      updateUserMessagesArray();
      
    }

    const testSendMessage = () => {
      console.log(currentUser);
      const messageRef = collection(db, "users", `${post.author.id}`, "message-system");
      const createChatLink = async () => {
        await setDoc(doc(messageRef, `${currentUser.userId}`), {
          chat_id: v4(),
          sender: currentUser,
        })
      }
      const mesRef = collection(db, 'users', `${post.author.id}`, "message-system", `${currentUser.userId}`);
      const addMessage = async () => {
        await setDoc()
      }
      createChatLink();

    }
    //The flow within the db,
    // Users -> message-system -> generated_id -> 
    const submitMessage = () => {
      
      
      
    }
    useEffect(() => {
      const getConvoData = async () => {
        const data = await getDocs(messageRef);
        setConvos(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      }
      const getUsersData = async () => {
        const data = await getDocs(usersRef);
        data.docs.map((doc) => {
          if(doc.id == post.author.id) {
            setUser(doc.data());//This will be the reciver
            //We want to append their messages array which is in "users".
          }
        })
      }
      const getCurrentUserData = async () => {
        const data = await getDocs(usersRef);
        data.docs.map((doc) => {
          if(doc.id === auth.currentUser.uid) {
            setCurrentUser(doc.data());
          }
        })
      }
      getUsersData();
      getConvoData();
      getCurrentUserData();
      
    }, []);
    
    return (
        <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="card-title">{post.model} {post.name} - ${post.price}</Modal.Title>
          
        </Modal.Header>
        
        <Modal.Body >
          <Form>
          
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" onChange={(event) => setMessage(event.target.value)} rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className='listing-btn' onClick={handleClose}>
            Close
          </button>
          {/* <button className="listing-btn" onClick={submitMessage}>
            Submit
          </button> */}
          <button className='listing-btn' onClick={testSendMessage}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
    )
}
export default DisplayData;