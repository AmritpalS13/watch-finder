import React, { useState, useEffect } from 'react'
import { auth, db  } from './firebase-config';
import { addDoc, collection, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { Container, Row, Col, Card } from 'react-bootstrap';



import './TestForum.css';
import { v4 } from 'uuid';

function TestForum() {
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState(null);
    const [postInfo, setPostInfo] = useState([]);
    const [testDoc, setTestDoc] = useState();
    const colRef = collection(db, "comment-test-system");
    const commentRef = collection(db, "comment-test-system");

    const setPostComments = (comment) => {
        var temp = [];
        temp.push(comment);
        setComments(temp);
    }
    const setData = (data) => {
        var temp = postInfo;
        temp.push(data)
        setPostInfo(temp);
    }
    //Here's how we can design the Chat system.
    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(colRef);
            setPost(data.docs.map((doc) => ({...doc.data(), id: doc.id})))

            data.docs.map((doc) => {

            var test = {
                postData: doc.data(),
                commentsData: collection(db, 'comment-test-system', `${doc.id}`, 'comments'),
            };
            // setPostInfo((prev) => [...prev, test]);
            setData(test);
            const testRef = collection(db, 'comment-test-system', `${doc.id}`, 'comments');
            
            const testSubCol = async () => {
                const testData = await getDocs(testRef);
                testData.docs.map((doc) => {

                    //This would let us pull the comments from the post.
                    //Next we need to figure out how to append tot his directory.
                    setPostComments(doc.data());
                    
                })
            }
            testSubCol();
          
            })
        }
        getData();
    }, []);
    
    
    return (
        <Container>
            {
                postInfo.map((postData) => {
                    return (
                        <TestPost post={postData} />
                    )
                })
            }


    
        </Container>
    );
}

const TestPost = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    

    const addNewComment = () => {
        //Comment in the string.
        console.log("Comment to add", newComment);

        const addComment = async () => {
            const comm = await getDocs(post.commentsData);
            console.log(comm);
            
            await addDoc(post.commentsData,{
                comment: newComment,
            })
        }
        addComment();
        console.log("Comment has been added!");
    }

    const setPostComments = (com) => {
        var temp = comments;  
        temp.push(com);
        setComments(temp);
    }


    useEffect(() => {
        const commentsRef = post.commentsData;
        const getCommentsData = async () => {
            const comData = await getDocs(commentsRef);
            comData.docs.map((doc) => {
                setPostComments(doc.data().comment);
            })
        }
        getCommentsData();
    }, [])
    
    return (
        <Card  className="card-container" style={{marginTop:'20px', padding:'20px'}}>
            
        <Row>
            <Col md="auto">
            <img style={{height:'260px', width:'320px'}}src="https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review.jpg" />
            </Col>
            <Col>
        <Card.Header style={{fontSize:'24px'}}>{post.postData.model}</Card.Header>
        <Card.Body>
        <blockquote className="blockquote mb-0">
        <p>
        {' '}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
        erat a ante.{' '}
        </p>
        <footer className="blockquote-footer">
        {
            comments.map((comment) => {
                return (
                    <p>{comment}</p>
                )
            })
        }
        <p>Comments : </p> <input type="text" placeholder='comment....' onChange={(event) => setNewComment(event.target.value)} />
        <button onClick={() => addNewComment()}>submit</button>
        </footer>
        </blockquote>
        </Card.Body>
        </Col>
        </Row>
        </Card>
    )
}
export default TestForum