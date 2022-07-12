import React, {useState, useEffect} from 'react';
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase-config';
import { Container, Row, Col } from 'react-bootstrap';

import './UserProfile.css';
import Dashboard from './Dashboard';
import DisplayCard from '../DisplayCard/DisplayCard';
import TestDisplayCard from './TestDisplayCard';

function UserProfile({ user }) {
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [dashboardData, setDashboardData] = useState([]);
    const [posts, setPosts] = useState([]);
    const userRef = collection(db, "users");
    const dashboardRef = collection(db, 'users', `${user.userId}`, 'dashboard');

    //Right now we will figure out how we can add a friend.
    
    
    const addFriend = async () => {
        //This would be the reference to the friends collection for the current user that's logged in.
        const friendsRef = collection(db, "users", `${currentUser.userId}`, "friends");//The following is the reference to the friends sub collection.
        const add = async () => {
            const addCol = await setDoc(doc(friendsRef, user.userId), {
                friend: user,
            })
        }
        add();
        alert("Friend added!");
    }
    const messageSent = () => {
        //we want to add a document into the message-test collection.
        const addMessageSystem = async () => {
            //This would be how we create a sub collection inside the document, that we can now use.

            const subCol = await addDoc(dashboardRef, {
                comment: message,
                author: currentUser,
            });
        }
        addMessageSystem();
        alert("message uploaded!");
    };
    const findUser = (docData) => {
        if(docData.userId === auth.currentUser.uid) {
            setCurrentUser(docData);   
        }
    }
    const setDashboardComments = (comment) => {
        var temp = dashboardData;
        temp.push(comment);
        setDashboardData(temp);
    }
    useEffect(() => {
        const getUsersData = async () => {
            const userData = await getDocs(userRef);
            //Iterating over all the users.
            userData.docs.map((doc) => {
                findUser(doc.data());
            })
        }
        const getCommentData = async () => {
            const data = await getDocs(collection(db, "users", `${user.userId}`, "dashboard"));
            data.docs.map((doc) => {
                setDashboardComments(doc.data());
            })

        }
        const getUsersPosts = async () => {
            const data = await getDocs(collection(db, 'posts'));
            setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getUsersData();
        getCommentData();
        getUsersPosts();
    }, [])
  
    return (
        // <Container>
        //     <Row className='user-profile-container'>
        //         <Col>
        //         <img style={{width:'200px', height:'200px'}}src={user.profilePicture} />
        //         <br />
        //         <button onClick={() => addFriend()}>Add Friend</button>
        //         </Col>
        //         <Col xs={8}>
        //         <h1>{user.userName}</h1>
        //         <h6>{user.bio}</h6>
        //         </Col>
        //     </Row>
        //     <input className="dash-input" type="text" placeholder='Write something to the Dashboard.....' onChange={(e) => setMessage(e.target.value)}/>
        //     <br />
        //     <button className="input-btn" onClick={() => messageSent()}>Submit</button>
        //     <Row>
        //     <Col>
        //     {
        //         dashboardData.map((data) => {
        //             return (
        //                 <Dashboard data={data} />
        //             )
        //         })
        //     }
        //     </Col>
        //     <Col>
        //         <h6>{user.userName} posts</h6>
        //         <DisplayUserPosts posts={posts} user={user} />


        //     </Col>
        //     </Row>
        // </Container>
        <Container fluid>
                                    <img style={{width:'100px', height:'100px'}} src={user.profilePicture} />
                        <button>Add Friend</button>
                        <h1>{user.userName}</h1>
            <Row>
                <Col >                    
                        <h6>{user.userName} Posts</h6>
                        <DisplayUserPosts posts={posts} user={user} />
                </Col>
                <Col >
                        <h6>Feed</h6>
                        <DisplayUserPosts posts={posts} user={user} />
                </Col>
                <Col >
                        <h6>Dash</h6>
                        <DisplayUserPosts posts={posts} user={user} />
                </Col>
            </Row>
        </Container>
    );
}

const DisplayUserPosts = ({posts, user}) => {

    return (
        <>
             {
                posts.map((post) => {
                    if(post.author.id === user.userId) {
                        return (
                            <DisplayCard
                    post={post}
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
                })
            }
        </>
    )
}


export default UserProfile