import React, { useState, useEffect } from 'react'
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage, auth, db } from '../../firebase-config';
import { Container, Row, Col, Carousel, Card, Accordion, Alert} from 'react-bootstrap';

import { Grid, Item } from '@mui/material';
import './ViewListing.css';
import { getDocs, addDoc, collection } from 'firebase/firestore';
//When the user clicked the listing, an ID will be provided, which we can pass into the class.
function ViewListing({post}) {
    
    const [postComments, setComments] = useState([]);
    const [newComment, setComment] = useState("");
    const [user, setUser] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const userRef = collection(db, 'users');
    const imageRef = ref(storage, `images/${post.imagesUid}/`);
    const setPostComments = (commentData) => {
        var temp = postComments;
        temp.push(commentData);
        setComments(temp);
    }
    const addNewComment = () => {
        console.log("Comment to add : ", newComment);
        console.log("Comment being added by :", auth.currentUser.email);
        const addComment = async () => {
          await addDoc(post.comments, {
            comment: newComment,
            author: user,
          });
        }
        //Let's try and get some data about the person who is commenting;
        addComment();
        alert("Comment Added");
        setRefresh(!refresh);
      }
    
    useEffect(() => {
        listAll(imageRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        })
        const getUsers = async () => {
            const userData = await getDocs(userRef);
            userData.docs.map((doc) => {
              
              if(doc.data().userId === auth.currentUser.uid) {
                setUser(doc.data());
              }
            })
        }
        const getCommentsData = async () => {
            
            const data = await getDocs(post.comments);
            data.docs.map((doc) => {
                setPostComments(doc.data());
            })
        }    
        getUsers();
        getCommentsData();
    }, [refresh]);
    
    return (
        <Container >
            <Row>
            <Col className='image-container'>
                <Carousel fade>
                {
                    imageList.map((image) => {
                    return (
                        <Carousel.Item >
                            <img className="image" src={image} />
                        </Carousel.Item>
                        )
                    })
                }
                </Carousel>
            </Col>
            <Col>
            <Container className="information-container">
                    
                    <Card className="text-center text-body">
                    <div className='listing-profile-container'>
                        <img className="profile-picture-listing"src={post.userData.profilePicture} />
                        <h6>{post.userData.userName}</h6>
                    </div>
                    <Card.Header className="title" >{post.model} {post.name} {post.watchRef}</Card.Header>
                    <Card.Body>
                    <Card.Title className="price" >$ {post.price}</Card.Title>
                    <Card.Text className="desc">
                        {post.desc}
                    </Card.Text>
                    <button>Just button</button>
                    
                    </Card.Body>
                   
                    </Card>
                
            </Container>      
            </Col>
            </Row>
            <Comments postComments={postComments} setComment={setComment} addNewComment={addNewComment}/>
        </Container>
    )
}
    const Comments = ({postComments, setComment, addNewComment}) => {
        
        return (
            <Row>
                <Col>
            {postComments.map((comment) => {
                
                return (
                    <div className="listing-comment-container" >
                    <Container>
                        <Row>
                            <Col xs={2}>
                                <img className="comment-image" src={comment.author.profilePicture} />
                            </Col>
                            <Col>
                                <h1 className="view-listing-username">{comment.author.userName}</h1>
                                <h6>{comment.comment}</h6>
                            </Col>
                        </Row>
                    </Container>
                    </div>
                )
            })
            }
            </Col>
            <Col>
                <div className='listing-add-comment'>
                    <input className="add-input" type="text" placeholder='Comment...' onChange={(e) => setComment(e.target.value)}/>
                    <br />
                    <button className='add-btn' onClick={() => addNewComment()}>Add Comment</button>
                </div>
            </Col>
            </Row>
        )
    }
// const Comments = ({postComments, setNewComment, addNewComment}) => {
//     console.log(postComments);
//     return (
//       <Accordion  style={{marginTop:'20px'}}>
//         <Accordion.Item className="main-comment-bar" eventKey="0">
//           <Accordion.Header>Comments</Accordion.Header>
//           <Accordion.Body>
//           {/* <ListGroup style={{}}className="list-group-flush">
//             {postComments.map((comment) => {
//               return (
                
                
//                 <ListGroupItem className="list-card item-comment" ></ListGroupItem>
                
//               )
//             })}
//             </ListGroup> */}
//             <div>
//               {
//                 postComments.map((comment) => {
//                   return (
//                     <div style={{padding:'20px',border:'2px solid white'}}>
//                       <p><img  style={{width:'50px', height:'50px', borderRadius:'50px'}}src={comment.author.profilePicture} /> {comment.author.userName}</p>
//                       <h6>{comment.comment}</h6>
//                     </div>
//                   )
//                 })
//               }
//             </div>
//             <input className="comment-input" type="text" placeholder='comment...' onChange={(event) => setNewComment(event.target.value)}/>
//             <button onClick={() => addNewComment()}>Submit</button>
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>
//     )
//   }

export default ViewListing